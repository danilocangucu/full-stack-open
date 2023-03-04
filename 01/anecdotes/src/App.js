import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
      <button onClick={handleClick}>
        {text}
      </button>
  )
}

const AnecdoteOfTheDay = ({ anecdotes, anecdotesVotes, selected }) => {
  return (
  <>
  <h1>Anecdote of the day</h1>
  <div>{anecdotes[selected]}</div>
  <div>has {anecdotesVotes[selected].votes} votes</div>
  </>
  )
}

const AnecdoteMostVoted = ({ anecdotes, anecdotesVotes }) => {
  let [higherVote, index] = [0, 0]

  anecdotesVotes.forEach(element => {
    if (element.votes > higherVote){
      higherVote = element.votes
      index = element.index
    }
  });

  if (higherVote === 0){
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <div>No votes yet</div>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[index]}</div>
      <div>has {anecdotesVotes[index].votes} votes</div>
    </div>
  )
}

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
   
  const [selected, setSelected] = useState(0)
  const anecdotesVotesInitial = [
    { index: 0, votes: 0},
    { index: 1, votes: 0},
    { index: 2, votes: 0},
    { index: 3, votes: 0},
    { index: 4, votes: 0},
    { index: 5, votes: 0},
    { index: 6, votes: 0},
    { index: 7, votes: 0}  
  ]
  const [anecdotesVotes, setVotes] = useState(anecdotesVotesInitial)
  const nextAnecdotes = () => {
    const randomNumber = (Math.floor(Math.random() * anecdotes.length))
    setSelected(randomNumber)
  }

  const addVote = () => {
    const nextVotes = anecdotesVotes.map(anecdote => {
      if (anecdote.index === selected){
        return {
          ...anecdote,
          votes: anecdote.votes + 1
        }
      } else {
        return anecdote
      }
    })
    setVotes(nextVotes)
  }

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        anecdotesVotes={anecdotesVotes}
        selected={selected}
      />
      <Button handleClick={addVote} text='vote'/>
      <Button handleClick={nextAnecdotes} text='next anecdote'/>
      <AnecdoteMostVoted 
        anecdotes={anecdotes}
        anecdotesVotes={anecdotesVotes}
      />
    </div>
  )
}

export default App