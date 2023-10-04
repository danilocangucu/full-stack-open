const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

describe('registering users', () => {
    test('succeeds if they\'re valid', async () => {
        await Promise.all(
            helper.twoValidUsers.map(async (user) => {
                await api.post('/api/users').send(user).expect(201)
            })
        )
    })

    test('fails with status code 401 and error message if they\'re not valid', async () => {
        const requests = helper.twoInvalidUsers.map(async (user) => {
            const response = await api.post('/api/users').send(user)
            expect(response.status).toBe(400)
            return response
        })

        const responses = await Promise.all(requests)
        const errorMessages = responses.map((response) => {
            const parsedError = JSON.parse(response.text)
            return parsedError.error
        })

        const expectedErrorMessages = [
            'User validation failed: username: Path `username` (`us`) is shorter than the minimum allowed length (3).',
            'Password length must be at least 3 characters',
        ]
        const allErrorMessagesPresent = expectedErrorMessages.every(
            (expectedMessage) => {
                return errorMessages.includes(expectedMessage)
            }
        )

        expect(allErrorMessagesPresent).toBe(true)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
