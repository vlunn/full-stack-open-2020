import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'
import WeatherDisplay from './components/WeatherDisplay'

const CountryRow = ({country, handleClick}) => {
  return (
    <div>{country.name}
      <button onClick={() => handleClick(country)}>show</button>
    </div>
  )
}

const Display = ({countrylist, handleClick}) => {
  if (countrylist.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countrylist.length > 1) {
    return countrylist.map(country => <CountryRow key={country.name} country={country} handleClick={handleClick}/>)
  }
  else if (countrylist.length === 1) {
    return (
      <>
        <CountryDisplay country={countrylist[0]}/>
        <WeatherDisplay city={countrylist[0].capital} countryCode={countrylist[0].alpha2Code}/>
      </>
    )
  }
  return <div>No countries to show</div>
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ selected, setSelected ] = useState([])
  
  const countriesToShow = selected.length > 0 ? 
    selected:
    countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setSelected([])
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleClick = (country) =>
    setSelected([country])

  return (
    <div>
      find countries <input onChange={handleFilterChange}/>
      <Display countrylist={countriesToShow} handleClick={handleClick}/>
    </div>
  );
}

export default App;
