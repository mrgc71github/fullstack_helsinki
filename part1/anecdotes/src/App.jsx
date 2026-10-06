import { useState } from 'react'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomIndex = Math.floor(Math.random(0, 1) * anecdotes.length)

  const [selected, setSelected] = useState(randomIndex)

  const [alreadyViewed, setAlreadyViewed] = useState([randomIndex])

  const buttonHandler = () => {
    if (alreadyViewed.length === anecdotes.length) {
      showVotes(1)
    } else {
      let randomIndex2 = Math.floor(Math.random(0, 1) * anecdotes.length)
      while (alreadyViewed.includes(randomIndex2)) {
        randomIndex2 = randomIndex2 + 1;
        if (randomIndex2 >= anecdotes.length) {
          randomIndex2 = 0;
        }
      }
      setAlreadyViewed([...alreadyViewed, randomIndex2])
      setSelected(randomIndex2)
      console.log('alreadyViewed', alreadyViewed)
      console.log('selected', selected)
      console.log('randomIndex', randomIndex)
      console.log('votes', votes)
      console.log('anecdotes', anecdotes.length)
    }

  }

  const showVotes = (status) => {
    console.log('status', status)
    if (status === 1) {
      const maxVotes = Math.max(...votes)
      const indexMaxVotes = votes.indexOf(maxVotes)
      return (
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[indexMaxVotes]}</p>
          <p>has {maxVotes} votes</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>First you have to view all anecdotes</p>
        </div>
      )
    }
  }

  const Button = ({ handleClick }) => (
    <button onClick={handleClick}>
      next anecdote
    </button>
  )

  const Vote = ({ handleClick }) => (
    <button onClick={handleClick}>
      vote
    </button>
  )

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const buttonHandlerVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <p><Vote handleClick={buttonHandlerVote} /> <Button handleClick={buttonHandler} /></p>
      {showVotes(alreadyViewed.length === anecdotes.length ? 1 : 0)}
    </div>
  )
}

export default App
