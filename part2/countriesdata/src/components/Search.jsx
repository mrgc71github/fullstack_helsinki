import { useEffect, useState } from 'react'
import { getAllCountries } from '../services/countryService.js'
import Weather from './Weather.jsx'


const CountryDetails = ({ country }) => (
    <section>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital?.join(', ') ?? 'Unknown'}</p>
        <p>Area: {country.area?.toLocaleString() ?? 'Unknown'} km²</p>
        <h3>Languages</h3>
        <ul>
            {Object.values(country.languages ?? {}).map(language => (
                <li key={language}>{language}</li>
            ))}
        </ul>
        {country.flags?.png && (
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="160" />
        )}

        <Weather country={country.capitalInfo} ></Weather>

    </section>
)

const Search = () => {
    const [countries, setCountries] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [error, setError] = useState(null)
    let filteredCountries = []

    useEffect(() => {
        getAllCountries()
            .then(setCountries)
            .catch(fetchError => {
                console.error('Error fetching countries:', fetchError)
                setError(`Could not load countries: ${fetchError.message}`)
            })
    }, [])

    if (searchTerm == '') {
        filteredCountries = []
    } else {
        filteredCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
    }


    const renderResults = () => {
        if (selectedCountry) {
            return (
                <>
                    <button onClick={() => setSelectedCountry(null)}>Back to results</button>
                    <CountryDetails country={selectedCountry} />
                </>
            )
        }

        switch (filteredCountries.length) {
            case 0:
                return searchTerm.trim() ? <p>No countries found.</p> : null
            case 1:
                return <CountryDetails country={filteredCountries[0]} />
            default:
                if (filteredCountries.length > 10) {
                    return <p>Too many matches, specify another filter.</p>
                }

                return (
                    <ul>
                        {filteredCountries.map(country => (
                            <li key={country.cca3}>
                                {country.name.common}{' '}
                                <button onClick={() => setSelectedCountry(country)}>Show</button>
                            </li>
                        ))}
                    </ul>
                )
        }
    }

    return (
        <>
            <div>
                <input
                    onChange={event => {
                        setSearchTerm(event.target.value)
                        setSelectedCountry(null)
                    }}
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                />
            </div>
            {error ? <p role="alert">{error}</p> : renderResults()}
        </>
    )
}

export default Search
