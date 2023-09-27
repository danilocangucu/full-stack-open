const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// if (process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

const url = process.env.MONGODB_URI
// console.log(url)

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Mongoose makes things easy',
    important: true,
})

note.save().then(_ => {
    console.log('note saved!')
    mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })