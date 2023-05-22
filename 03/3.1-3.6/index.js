const express = require("express");
const app = express();
var morgan = require('morgan');

app.use(express.json());

morgan.token("response-body", function (req, res) {
    if (req.method == 'POST'){
        return JSON.stringify(req.body);
    }
    return
});

morgan.token("type", function (req, res) {
    return req.headers["content-type"];
});

app.use(morgan(':method :url :status :type :res[content-length] - :response-time ms :response-body'));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const phonebookStyle = `
    "color: gray; line-height: 1.5em;"
`

app.get('/api/persons', (_, response) => {
    response.json(persons)
})

app.get('/info', (_, response) => {
    const requestReceivedTime = new Date().toString();

    response.send(`
    <div style=${phonebookStyle}>Phonebook has info for ${persons.length} people<br>
    ${requestReceivedTime}</div>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = `Person with id ${id} doesn't exist`
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 100000);
    const body = request.body;

    if (!body.name || !body.number){
        return response.status(400).json({
            error: `Person's name or/and number missing`
        })
    }

    if (typeof body.number !== 'string' || typeof body.name !== 'string'){
        return response.status(400).json({
            error: `Person's name and number must be a string`
        })
    }

    const findPerson = (condition) => persons.find(condition);

    const sameName = findPerson(person => person.name === body.name) ? "name" : null;
    const sameNumber = findPerson(person => person.number === body.number) ? "number" : null;
    const sameId = findPerson(person => person.id === body.number) ? "id" : null;

    if (sameName || sameNumber || sameId){
        let sameConditions = [];
        const conditions = [sameName, sameNumber, sameId];

        for (const condition of conditions){
            if (condition) {
                sameConditions.push(condition)
            }
        }

        return response.status(400).json({
            error: `The ${sameConditions.join(' and ')} already exist`
        })
    }

    const person = {
        id: id,
        name: body.name,
        number: String(body.number),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})