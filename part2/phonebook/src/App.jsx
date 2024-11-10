import { useState, useEffect } from 'react'
import Services from './services/server'
import './index.css'

const Notification = ({ message }) => {
  if (!message) return null
  return (
    <div className = "error">
      {message}
    </div>
  )
}

const List = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person, i) => (
        <li key={i}>
          {person.name} {person.number}
          <button onClick={handleDelete(person.id)}>Remove</button>
          </li>
      ))}
    </ul>
  )
}

const PersonForm = ({handleNameChange, handleNumberchange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" onChange={handleNameChange} />
      </label>
      <label>
        Number:
        <input type="text" onChange={handleNumberchange} />
      </label>
      <input type="submit" value="Add" />
    </form>
  )
}

const SearchPerson = ({ handlesearchchange, submitSearch}) => {
  return (
    <form onSubmit={submitSearch}>
      <label>
        Search:
        <input type="text" onChange={handlesearchchange} />
      </label>
      <input type="submit" value="Search" />
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ShowPersons, setShowPersons] = useState([]) 

  useEffect(() => {
    Services.getAll().then((res) => {
      setPersons(res.data)
      setShowPersons(res.data)
    })
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')

  const submitSearch = (e) => {
    e.preventDefault()
    setShowPersons(persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLocaleLowerCase())))
    setNewSearch('')
  }

  const handlesearchchange = (e) => {
    setNewSearch(e.target.value)
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberchange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleDelete = (id) => (e) => {
    const person = persons.filter((person) => person.id === id)
    if(confirm(`Are you sure you want to delete ${person[0].name}?`)) {
      Services.remove(id).then((res) => {
        setPersons(persons.filter((person) => person.id !== id))
        setShowPersons(persons)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    for(let i = 0; i < persons.length; i++) {
      if(persons[i].name === newPerson.name) {
        if(confirm(`Person ${newPerson.name} already exists. Do you want to update their number?`)) {
          Services.update(persons[i].id, newPerson).then((res) => {
            setPersons(persons.map((person) => {
              if(person.id === res.data.id) {
                return res.data
              }
              return person
            }))
            setShowPersons(persons)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage(`${newPerson.name} updated`)
            }, 1000)
          })
          .catch((err) => {
            setMessage(err.response.data.message)
          })
          return
        }
      }
    }
    
    Services.create(newPerson).then((res) => {
      setPersons(persons.concat(res))
      setShowPersons(persons)
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setMessage(`${newPerson.name} added to phonebook`)
      }, 1000)
    })
    .catch((err) => {
      setMessage(err.response.data.message)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <h3>Search</h3>
      <SearchPerson handlesearchchange={handlesearchchange} submitSearch={submitSearch} />
      <h3>Add new</h3>
      <PersonForm handleNameChange={handleNameChange} handleNumberchange={handleNumberchange} handleSubmit={handleSubmit} />
      <h3>People</h3>
      <List persons={ShowPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App