import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567" },
    { name: 'Danilo Costa', number: "09348763" },
    { name: 'Jan Korte', number: "9384867" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  let containsName = false
  let regexFilter = new RegExp(`${newFilter}`, 'gi');

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    // way of quitting for each?
    // another more efficient way?
    persons.forEach(person => {
      if (person.name === personObject.name){
        containsName = true
        return
      }
    })
    if (!containsName){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(
        `${personObject.name} is already added to phonebook`
      )
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input
        onChange={handleFilter}
      />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
            name: <input
            value={newName}
            onChange={handleNewName}/>
        </div>
        <div>
            number: <input
            value={newNumber}
            onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {newFilter.length > 0 ? 
        (persons.map((person, i) => {
          if (person.name.match(regexFilter)){
            return (
              <div key={i}>{person.name} {person.number}</div>
              )
          }
          return 
        })) :
        (persons.map((person, i) =>
          <div key={i}>{person.name} {person.number}</div> ))}
    </div>
  )
}

export default App