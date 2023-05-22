const mongoose = require('mongoose')

const argsLen = process.argv.length
const [, , password, name, number] = process.argv;


if (argsLen < 3){
    console.log('give password as required argument, name and number as optionals')
    process.exit(1)
}

const url =
    `mongodb+srv://admin:${password}@cluster0.vz36wjj.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
    console.log("phonebook:");
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close();
        process.exit(1);
    });
}

if (argsLen === 4 || argsLen > 5){
    console.log('give password as required argument, name and number as optionals')
    process.exit(1)
} else if (argsLen === 5){
    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then((result) => {
        console.log(`added ${person.name} number ${person.number} to phonebook.`);
        mongoose.connection.close();
    });
}

