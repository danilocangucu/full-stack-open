import { useState, useEffect } from "react";
import personsService from "./services/persons";
import { Persons, PersonForm, Filter, Notification } from "./components";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setNewName] = useState("");
  const [number, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");
  const [resultMessage, setResultMessage] = useState(null);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const inputNames = ["name", "number"];
  let regexFilter = new RegExp(`${newFilter}`, "gi");

  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name, number };

    const existingPerson = persons.find((person) => person.name === newPerson.name)
    
    if (!existingPerson){
      personsService.create(newPerson)
      .then(() => {
        personsService.getAll().then((response) => setPersons(response));
      });

      setNewName("");
      setNewNumber("");
      setResultMessage(`Added ${newPerson.name}`)
      setIsErrorMessage(false)
      setTimeout(() => {
        setResultMessage(null)
      }, 3000)
    } else {
      if (window.confirm(`${newPerson.name} already exists. Do you want to update their number?`)){
        personsService.update(newPerson, existingPerson.id)
        .then(response => {
          if (response.status == 200) {
            const newPersons = persons.map((p) => {
              return p.id == existingPerson.id
                ? { ...p, number: newPerson.number }
                : p;
            });
            setPersons(newPersons);
          }
        })
        .catch((error) => {
          setResultMessage(`Information of ${newPerson.name} has already been removed from server`)
          setIsErrorMessage(true)
          personsService.getAll().then((response) => setPersons(response));
        });
      }
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personsService
      .remove(person)
      .then((response) => {
        if (response.status == 204) {
          setPersons(persons.filter((p) => p.id !== person.id));
        }
      })
      .catch((error) => console.log(error));
    }
  };

  const personProps = {
    newFilter, regexFilter, persons, deletePerson
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handleFilter={handleFilter} />

      <h2>Add new person</h2>
      <Notification message={[resultMessage, isErrorMessage]} />
      <PersonForm
        onSubmit={addPerson}
        value={[name, number]}
        onChange={[handleNewName, handleNewNumber]}
        inputNames={inputNames}
      />

      <h2>Persons</h2>
      <Persons {...personProps} />
    </div>
  );
};

export default App;
