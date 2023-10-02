const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const agent = supertest.agent(app)

const setAuthToken = (token) => {
    agent.set('Authorization', `Bearer ${token}`)
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.findOneAndDelete({ username: 'user1' })

    await api
        .post('/api/users')
        .send({
            username: 'user1',
            password: 'user1',
            name: 'User 1'
        })
        .expect(201)

    const response = await api
        .post('/api/login')
        .send({
            username: 'user1',
            password: 'user1'
        })

    setAuthToken(response.body.token)

    const blogObjects = helper.biggerListOfBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blog list is returned in JSON', async () => {
    await agent
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await agent.get('/api/blogs')

    expect(response.body).toHaveLength(helper.biggerListOfBlogs.length)
})

test('all blog posts has id as unique identifier property', async () => {
    const response = await agent.get('/api/blogs')
    response.body.forEach(blog => expect(blog).toBeDefined())
})

test('HTTP POST request to /api/blogs creates a new blog post', async () => {
    const newBlog = {
        title: 'Jest testing: Top features and how to use them',
        author: 'Alberto Gimeno',
        url: 'https://blog.logrocket.com/jest-testing-top-features/',
        likes: 8
    }

    await agent
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogListAtEnd = await helper.blogsInDb()

    expect(blogListAtEnd).toHaveLength(
        helper.biggerListOfBlogs.length + 1
    )

    const contents = blogListAtEnd.map(b => b.title)
    expect(contents).toContain(
        'Jest testing: Top features and how to use them'
    )
})

test('creating a blog post without likes, it should default to 0 likes', async () => {
    const newBlogWithoutLikes = {
        title: 'Jest testing: Top features and how to use them',
        author: 'Alberto Gimeno',
        url: 'https://blog.logrocket.com/jest-testing-top-features/',
    }
    await agent
        .post('/api/blogs')
        .send(newBlogWithoutLikes)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const blogListAtEnd = await helper.blogsInDb()

    expect(
        blogListAtEnd[blogListAtEnd.length - 1].likes
    ).toBe(0)
})

test('creating a blog post without title or url is replied with status code 400', async () => {
    helper.incompleteBlogs.forEach(async blog => {
        await agent
            .post('/api/blogs')
            .send(blog)
            .expect(400)
    })
})

test('creating a blog post without token returns status code 401', async () => {
    const newBlogWithoutLikes = {
        title: 'Jest testing: Top features and how to use them',
        author: 'Alberto Gimeno',
        url: 'https://blog.logrocket.com/jest-testing-top-features/',
    }
    await api
        .post('/api/blogs')
        .send(newBlogWithoutLikes)
        .expect(401)
        .expect('Content-type', /application\/json/)
})

afterAll(async () => {
    await mongoose.connection.close()
})