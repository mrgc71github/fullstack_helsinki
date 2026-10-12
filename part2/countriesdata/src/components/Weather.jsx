import { useEffect, useState } from 'react'
import { getWeather } from '../services/weatherService.js'

const Weather = ({ country }) => {
  const lat = country.latlng[0]
  const lng = country.latlng[1]

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getWeather(lat, lng)
      .then((response) => setWeather(response))
      .catch(() => {
        setWeather('No weather found for these coordinates')
      })
  }, [lat, lng])

  return (
    <div>
      {weather && (
        typeof weather === 'string' ? (
          <p>{weather}</p>
        ) : (
          <>
            <p>Temperature: {weather.current.temperature}°C</p>
            <img
              src={weather.current.weather_icons[0]}
              alt={weather.current.weather_descriptions[0]}
            />
            <p>Wind: {weather.current.wind_speed} km/h</p>
          </>
        )
      )}
    </div>
  )
}

export default Weather