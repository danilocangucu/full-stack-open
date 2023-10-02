const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const saltRounds = 10

    if (password.length < 3) {
        return response.status(400).json({
            error: 'Password length must be at least 3 characters'
        })
    }

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (_request, response) => {
    const users = await User
        .find({}).populate('blogs',
            { url: 1, title: 1, author: 1 }
        )

    response.json(users)
})

module.exports = usersRouter