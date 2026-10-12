import { useState } from 'react'

const Filter = ({ persons }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

return (
    <>
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..." />
        </div><div>
            <h2>Filtered Numbers</h2>
            {filteredPersons.length > 0 && searchTerm !== '' ? (
                <ul>
                    {filteredPersons.map((person, index) => (
                        <li key={index}>{person.name}: {person.number}</li>
                    ))}
                </ul>
            ) : (
                <p>No matching names found.</p>
            )}
        </div>
    </>
)
}

export default Filter