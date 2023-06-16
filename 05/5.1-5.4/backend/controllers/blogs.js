const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')


blogsRouter.get('/', async (_request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    console.log(blog)
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.likes){
        body.likes = 0
    }

    const user = await User.findById(request.user)

    const blog = new Blog({
        ...body,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(401).json({ error: 'Invalid blog id' })
    }

    const user = request.user

    if (blog.user.toString() === user){
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }

    response.status(401).json({ error: 'Unauthorized user' })

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        likes: body.likes,
    }

    await Blog.findByIdAndUpdate(
        request.params.id, blog, { new: true }
    )

    response.json(await Blog.findById(request.params.id))
})

module.exports = blogsRouter