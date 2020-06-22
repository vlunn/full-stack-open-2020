import React, { useState, useEffect } from 'react';
import axios from 'axios'

const WeatherImage = ({iconId, description}) => {
  if (iconId === '') {
    return <></>
  }

  return (
    <>
      <img src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
          alt={`weather icon of ${description}`}>
      </img>
      <br />
      {description}
    </>
  )
}

const TemperatureDisplay = ({kelvins}) => {
  const convertToCelsius = kelvin => (kelvin - 273.15).toFixed(1)
  return <><strong>Temperature: </strong>{convertToCelsius(kelvins)} Celsius</>
}

const WindDisplay = ({speed, direction}) => 
  <><strong>Wind: </strong>{speed}, <strong>direction: </strong>{direction}</>

const WeatherDisplay = ({city, countryCode}) => {
  const [weather, setWeather] = useState({
    name: '',
    main: {
      temp: 0
    },
    weather: [{
      description: 'empty',
      icon: ''
    }],
    wind: {
      speed: 0,
      deg: 0
    }
  })

  useEffect(() => {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(response => setWeather(response.data))
    },
    [city, countryCode]
  )

  return (
    <>
      <h3>Weather in {weather.name}</h3>
      <TemperatureDisplay kelvins={weather.main.temp}/>
      <br />
      <WeatherImage iconId={weather.weather[0].icon}
                    description={weather.weather[0].description} />
      <br />
      <WindDisplay speed={weather.wind.speed} direction={weather.wind.deg} />
    </>
  )
}

export default WeatherDisplay;
