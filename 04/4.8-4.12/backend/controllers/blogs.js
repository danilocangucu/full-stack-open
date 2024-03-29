const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (_request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    if (!request.body.likes){
        request.body.likes = 0
    }

    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter