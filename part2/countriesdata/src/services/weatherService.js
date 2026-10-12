const urlWeather = 'https://api.openweathermap.org/data/4.0/onecall/current?'

export const getWeather = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `${urlWeather}lat=${lat}&lon=${lon}&appid=${apiKey}`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}