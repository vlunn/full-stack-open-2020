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
        {props.name} {props.exerciseCount}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.parts[0].name} exerciseCount={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exerciseCount={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exerciseCount={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  let exerciseCount = 0;
  props.parts.forEach(part => {
    exerciseCount += part.exercises
  });

  return (
    <>
      <p>Number of exercises {exerciseCount}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',  
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
