import React, { useState } from 'react'

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

const PhoneBookRow = ({person}) =>
  <p>{person.name} {person.number}</p>

const Contacts = ({contacts}) =>
  <>{contacts.map(person => <PhoneBookRow key={person.name} person={person}/>)}</>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const contactsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    if (persons.findIndex(person => person.name === newName) > -1) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)
  
  const handleFilterChange = (event) =>
    setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit}
                  newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>
      <Contacts contacts={contactsToShow}/>
    </div>
  )
}

export default App
