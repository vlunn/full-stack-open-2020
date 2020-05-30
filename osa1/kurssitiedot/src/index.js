import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.partName} {props.exerciseCount}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part partName={props.part1} exerciseCount={props.exerciseCount1}/>
      <Part partName={props.part2} exerciseCount={props.exerciseCount2}/>
      <Part partName={props.part3} exerciseCount={props.exerciseCount3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exerciseCount}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course}/>
      <Content part1={part1} part2={part2} part3={part3} exerciseCount1={exercises1} exerciseCount2={exercises2} exerciseCount3={exercises3}/>
      <Total exerciseCount={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
