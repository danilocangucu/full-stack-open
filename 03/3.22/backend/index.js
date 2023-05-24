const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
	console.log('Method', request.method)
	console.log('Path', request.path)
	console.log('Body', request.body)
	console.log('----')
	next()
}

app.use(requestLogger)
app.use(express.static('build'))
// app.use(express.static('../frontend/src'));

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
		.then(person => {
			response.json(person)
		})
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => {
			next(error)
		})
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(_ => {
			response.status(204).end()
		})
		.catch(error => {
			next(error)
		})
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findById(request.params.id)
		.then(person => {
			if (person){
				Person.findByIdAndUpdate(
					request.params.id,
					{ name, number },
					{ new: true, runValidators: true, context: 'query' }
				)
					.then(updatedPerson => {
						response.json(updatedPerson)
					})
					.catch(error => {
						next(error)
					})
			} else {
				response.status(404).send({ error: 'person not found' })
			}
		})
})

app.get('/info', (request, response) => {
	const date = new Date()
	const formattedDateTime = date.toString()
	response.status(200).send(`
    <p>Phonebook has info for ${Person.length} people</p>
    <p>${formattedDateTime}</p>
    `).end()
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError'){
		return response.status(400).send({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
