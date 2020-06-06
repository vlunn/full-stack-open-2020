import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <>
      <h1>Hello, {props.name}!</h1>
      <p>Yhteenlaskettu ikäsi Vivin kanssa on: {props.cmbdAge}!</p>
    </>
  )
}

const Footer = () => {
  return (
    <>
      Greeting app created by: <a href="https://github.com/vlunnikivi">vlunnikivi</a>
    </>
  )
}

const App = () => {
const vivinIka = 23
const vainonIka = 22

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Väinö" cmbdAge={vivinIka + vainonIka}/>
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
