import React from 'react'

const Header = (props) => 
  <h2>{props.courseName}</h2>

const Part = ({name, exerciseCount}) => 
  <p>{name} {exerciseCount}</p>

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exerciseCount={part.exercises}/>
      )}
    </>
  )
}

const Total = ({parts}) => {

  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return <b>Total of {total} exercises</b>
}

const Course = ({course}) => {

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course
