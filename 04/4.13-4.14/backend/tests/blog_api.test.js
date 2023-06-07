const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.biggerListOfBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blog list is returned in JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.biggerListOfBlogs.length)
})

test('all blog posts has id as unique identifier property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog).toBeDefined())
})

test('HTTP POST request to /api/blogs creates a new blog post', async () => {
    const newBlog = {
        title: 'Jest testing: Top features and how to use them',
        author: 'Alberto Gimeno',
        url: 'https://blog.logrocket.com/jest-testing-top-features/',
        likes: 8
    }

    await api
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
    await api
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
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)
    })
})

test('deleting a valid blog is replied with status code 204', async () => {
    const blogListAtStart = await helper.blogsInDb()
    const blogToDelete = blogListAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogListAtEnd = await helper.blogsInDb()
    const contents = blogListAtEnd.map(blog => blog.title)

    expect(contents).not.toContain(blogToDelete.title)
})

test('deleting an invalid blog is replied with status code 400', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
        .get(`/api/notes/${validNonExistingId}`)
        .expect(404)
})

test('updating number of likes of valid blog works correctly', async () => {
    const blogListAtStart = await helper.blogsInDb()
    const blogToUpdate = blogListAtStart[0]

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: blogToUpdate.likes + 10 })
        .expect(200)

    const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)

    expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 10)
})

test('updating number of likes of invalid blog works correctly', async () => {
    const validNonExistingId = await helper.nonExistingId()
    console.log(validNonExistingId)

    await api
        .put(`/api/blogs/${validNonExistingId}`)
        .send({ likes: 100 })
        .expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})