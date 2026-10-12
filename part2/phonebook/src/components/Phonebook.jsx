import personService from '../services/persons'

const Phonebook = (props) => {
  const deletePerson = (id) => {
    const person = props.persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          props.showNotification(`${person.name} has been removed from the phonebook.`, 'error  ')
          props.setPersons(props.persons.filter(p => p.id !== id))
        })
        .catch(error => {
          props.showNotification(`Failed to delete ${person.name}: ${error.message}`, 'error')
        })
    }
  }
  return (
    <ul>
      {props.persons.map((person, index) => (
        <li className = "phones" key={index}>{person.name}: {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></li>
      ))}
    </ul>
  )
}

export default Phonebook