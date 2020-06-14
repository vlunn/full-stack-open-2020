import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) =>
  <button onClick={onClick}>{text}</button>

const Title = ({text}) =>
  <h1>{text}</h1>

const Feedback = (props) => {
  return (
    <div>
      <Title text='give feedback' />
      <Button onClick={props.handleGood} text={props.textGood} />
      <Button onClick={props.handleNeutral} text={props.textNeutral} />
      <Button onClick={props.handleBad} text={props.textBad} />
    </div>
  )
}

const StatLine = ({text, score}) =>
  <div>{text} {score}</div>

const Statistics = (props) => {
  return (
    <div>
      <Title text={'statistics'}/>
      <StatLine text={props.titleGood} score={props.scoreGood}/>
      <StatLine text={props.titleNeutral} score={props.scoreNeutral}/>
      <StatLine text={props.titleBad} score={props.scoreBad}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const titleGood = 'good'
  const titleNeutral = 'neutral'
  const titleBad = 'bad'

  return (
    <div>
      <Feedback handleGood={() => setGood(good + 1)} textGood={titleGood}
                handleNeutral={() => setNeutral(neutral + 1)} textNeutral={titleNeutral}
                handleBad={() => setBad(bad + 1)} textBad={titleBad}
      />
      <Statistics scoreGood={good} titleGood={titleGood} 
                  scoreNeutral={neutral} titleNeutral={titleNeutral} 
                  scoreBad={bad} titleBad={titleBad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)