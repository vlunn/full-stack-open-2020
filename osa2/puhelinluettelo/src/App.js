import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const TextInputField = ({title, newValue, handleChange}) =>
  <div>{title}: <input value={newValue} onChange={handleChange} /></div>

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <TextInputField title={'name'} 
                      newValue={props.newName}
                      handleChange={props.handleNameChange}/>
      <TextInputField title={'number'} 
                      newValue={props.newNumber}
                      handleChange={props.handleNumberChange}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({handleFilterChange}) =>
  <div>filter shown with <input onChange={handleFilterChange}></input></div>

const DeleteButton = ({handleClick, person}) => 
  <button onClick={() => handleClick(person)}>Delete</button>

const PhoneBookRow = ({person, handleClick}) =>
  <p>{person.name} {person.number} <DeleteButton handleClick={handleClick}
                                                 person={person}/></p>

const Contacts = ({contacts, handleClick}) =>
  <>{contacts.map(person => <PhoneBookRow key={person.name} 
                                          person={person}
                                          handleClick={handleClick}/>)}</>

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const contactsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    // Update number if the person already exists:
    const index = persons.findIndex(person => person.name === newName)
    if (index > -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(persons[index].id, newPerson)
          .then(response => 
            setPersons(persons.filter(
              person => person.id !== response.id)
              .concat(response)))
      }
      clearForm()
      return
    }

    // Else: create new person
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        clearForm()
      })
  }

  const handleClick = (person) => {
    const confirmResult = window.confirm(`Delete ${person.name}?`)
    
    if (confirmResult) {
      personService
      .remove(person.id)
      .then(
        setPersons(persons.filter(
          existingPerson => existingPerson.id !== person.id)))
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={(event) => setNewFilter(event.target.value)}/>

      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit}
                  newName={newName} handleNameChange={(event) => setNewName(event.target.value)}
                  newNumber={newNumber} handleNumberChange={(event) => setNewNumber(event.target.value)}/>
      
      <h3>Numbers</h3>
      <Contacts contacts={contactsToShow} handleClick={handleClick}/>
    </div>
  )
}

export default App
