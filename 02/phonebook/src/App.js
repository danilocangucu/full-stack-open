import { useState } from 'react'

const Persons = ({ newFilter, regexFilter, persons }) => {
  let isFilterNow = (newFilter.length > 0)
  return (
    <>
    {isFilterNow ?
    (persons.map((person, i) => {
      if (person.name.match(regexFilter)){
        return (
          <div key={i}>{person.name} {person.number}</div>
        )
      }
    })) :
    (persons.map((person, i) =>
    <div key={i}>{person.name} {person.number}</div>
    ))}
    </>
  )
}

const PersonForm = ({ onSubmit, value, onChange, inputNames }) => {
  return (
    <form onSubmit={onSubmit}>
        {inputNames.map((text, i) => {
          return (
          <div key={i}>
          {text}: <input 
          value={value[i]}
          onChange={onChange[i]}
          />
          </div>
          )
        }
        )}
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Filter = ( handleFilter ) => {
  return (
    <>
    filter shown with: <input
    onChange={handleFilter.handleFilter}
    />
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567" },
    { name: 'Danilo Costa', number: "09348763" },
    { name: 'Jan Korte', number: "9384867" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const inputNames = ["name", "number"]

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
      
      <Filter 
      handleFilter={handleFilter}
      />

      <h2>add a new</h2>
      <PersonForm
      onSubmit={addPerson}
      value={[newName, newNumber]}
      onChange={[handleNewName, handleNewNumber]}
      inputNames={inputNames}
      />
      <h2>Numbers</h2>

      <Persons
      newFilter={newFilter}
      regexFilter={regexFilter}
      persons={persons}
      />
    </div>
  )
}

export default App