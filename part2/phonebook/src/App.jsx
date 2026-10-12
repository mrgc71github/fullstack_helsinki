import { useState, useEffect, useRef } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Phonebook from './components/Phonebook.jsx'
import Notification from './components/Notification.jsx'

import personService from './services/persons.js'

function App() {
  const [notification, setNotification] = useState(null)
  const notificationTimeout = useRef(null)

  //List of persons
  const [persons, setPersons] = useState([])

  const showNotification = (message, type) => {
    clearTimeout(notificationTimeout.current)
    setNotification({ message, type })
    notificationTimeout.current = setTimeout(() => {
      setNotification(null)
      notificationTimeout.current = null
    }, 5000)
  }

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        showNotification(`Failed to fetch persons: ${error.message}`, 'error')
      })
  }, [])

  useEffect(() => () => clearTimeout(notificationTimeout.current), [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notification?.message ?? null}
        type={notification?.type}
      />
      <h2>Search</h2>
      <Filter persons={persons} />

      <h2>Add a new</h2>
      <Form persons={persons} setPersons={setPersons} showNotification={showNotification} />

      <h2>Numbers</h2>
      <Phonebook persons={persons} setPersons={setPersons} showNotification={showNotification} />
    </div>
  )
}

export default App
