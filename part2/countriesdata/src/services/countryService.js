const urlCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const getAllCountries = async () => {
    const response = await fetch(urlCountries)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}