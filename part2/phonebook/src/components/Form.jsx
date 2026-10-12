import { useState } from 'react'
import personService from '../services/persons.js'

const Form = ({ persons, setPersons, showNotification }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const addPerson = event => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.some(person => person.name === personObject.name)) {
            const updateNumber = window.confirm(`${newName} is already in the phonebook, do you want to update the number?`)
            if (!updateNumber) {
                return
            }
            const existingPerson = persons.find(person => person.name === personObject.name)
            if (!existingPerson) {
                showNotification(`Information of ${newName} has already been removed from server.`, 'error')
                return
            }
            personService.update(existingPerson.id, personObject)
                .then(response => {
                    setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
                    showNotification(`${newName}'s number has been updated.`, 'success')
                })
                .catch(error => {
                    showNotification(`Failed to update ${newName}: ${error.message}`, 'error')
                })
            setNewName('')
            setNewNumber('')
            return
        }
        personService.create(personObject)
            .then(response => {
                setPersons(persons.concat(response))
                showNotification(`${newName} has been added to the phonebook.`, 'success')
            })
            .catch(error => {
                showNotification(`Failed to add ${newName}: ${error.message}`, 'error')
            })
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                phone: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default Form