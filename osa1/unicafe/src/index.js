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

const StatisticsLine = ({text, score, isPercentage}) => {
  if (isPercentage) {
    return <tr><td>{text}</td><td>{score} %</td></tr>
  }
  return <tr><td>{text}</td><td>{score}</td></tr>
}

const Statistics = (props) => {

  const title = 'statistics'

  if (props.scoreAll === 0) {
    return (
      <div>
        <Title text={title}/>
        <div>No feedback given</div>
      </div>
    )
  }

  const percentagePositive = props.scorePositive / props.scoreAll * 100

  return (
    <div>
      <Title text={title}/>
      <table>
        <tbody>
          <StatisticsLine text={props.titleGood} score={props.scoreGood} isPercentage={false} />
          <StatisticsLine text={props.titleNeutral} score={props.scoreNeutral} isPercentage={false} />
          <StatisticsLine text={props.titleBad} score={props.scoreBad} isPercentage={false} />
          <StatisticsLine text={props.titleAll} score={props.scoreAll} isPercentage={false} />
          <StatisticsLine text={props.titleAvg} score={props.scoreAvg} isPercentage={false} />
          <StatisticsLine text={props.titlePositive} score={percentagePositive} isPercentage={true} />
        </tbody>
      </table>
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