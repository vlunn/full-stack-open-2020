import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onclick, text}) => 
  <button onClick={onclick}>{text}</button>

const Display = ({title, anecdote, votes}) => {
  return (
    <>
      <h1>{title}</h1>
      {anecdote}
      <br></br>
      has {votes} votes
      <br></br>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [maxPoints, setMaxPoints] = useState(0)
  const [favAnecdoteInd, setFavAnecdoteInd] = useState(0)

  const randomIndex = (length) =>
    Math.floor(Math.random() * length)

  const vote = (index) => {
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)

    // Check if anecdote became the new favorite:
    if ((copy[index]) > maxPoints) {
      setMaxPoints(maxPoints + 1)
      setFavAnecdoteInd(index)
    }
  }

  return (
    <div>
      <Display title={'Anecdote of the day'} anecdote={anecdotes[selected]} votes={points[selected]}/>
      <Button text={'vote'} onclick={() => vote(selected)}/>
      <Button text={'next anecdote'} onclick={() => setSelected(randomIndex(anecdotes.length))}/>
      <Display title={'Anecdote with most votes'} anecdote={anecdotes[favAnecdoteInd]} votes={points[favAnecdoteInd]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)