import React from 'react';

const LanguageRow = ({language}) =>
  <li>{language.name}</li>

const LanguageDisplay = ({languages}) => {
  return (
    <ul>{languages.map(language => 
      <LanguageRow key={language.iso639_1} language={language} />)}
    </ul>
  )
}

const FlagDisplay = ({url, width}) => {
  return (
    <svg width={width} height={width}>
      <image href={url} width={width}/>
    </svg>
  )
}

const CountryDisplay = ({country}) => {
  return (
    <>
      <h2>{country.name}</h2>
      capital: {country.capital}
      <br />
      population: {country.population}
      
      <h3>languages</h3>
      <LanguageDisplay languages={country.languages}/>

      <FlagDisplay url={country.flag} width={"200"}/>
    </>
  )
}

export default CountryDisplay;
