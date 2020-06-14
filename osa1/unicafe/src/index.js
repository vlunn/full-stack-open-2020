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

const StatLine = ({text, score, isPercentage}) => {
  if (isPercentage) {
    return <div>{text} {score} %</div>
  }
  return <div>{text} {score}</div>
}

const Statistics = (props) => {

  const percentagePositive = (props.scoreAll === 0) ? 0 : props.scorePositive / props.scoreAll * 100

  return (
    <div>
      <Title text={'statistics'}/>
      <StatLine text={props.titleGood} score={props.scoreGood} isPercentage={false} />
      <StatLine text={props.titleNeutral} score={props.scoreNeutral} isPercentage={false} />
      <StatLine text={props.titleBad} score={props.scoreBad} isPercentage={false} />
      <StatLine text={props.titleAll} score={props.scoreAll} isPercentage={false} />
      <StatLine text={props.titleAvg} score={props.scoreAvg} isPercentage={false} />
      <StatLine text={props.titlePositive} score={percentagePositive} isPercentage={true} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const titleGood = 'good'
  const titleNeutral = 'neutral'
  const titleBad = 'bad'
  const titleAll = 'all'
  const titleAvg = 'average'
  const titlePositive = 'positive'

  const updateStats = (vote) => {
    setAll(all + 1)
    setAvg((good - bad + vote) / (all + 1))
  }

  const handleGood = () => {
    setPositive(positive + 1)
    setGood(good + 1)
    updateStats(1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    updateStats(0)
  }

  const handleBad = () => {
    setBad(bad + 1)
    updateStats(-1)
  }

  return (
    <div>
      <Feedback handleGood={handleGood} textGood={titleGood}
                handleNeutral={handleNeutral} textNeutral={titleNeutral}
                handleBad={handleBad} textBad={titleBad}
      />
      <Statistics scoreGood={good} titleGood={titleGood} 
                  scoreNeutral={neutral} titleNeutral={titleNeutral} 
                  scoreBad={bad} titleBad={titleBad}
                  scoreAll={all} titleAll={titleAll}
                  scoreAvg={avg} titleAvg={titleAvg}
                  scorePositive={positive} titlePositive={titlePositive}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)