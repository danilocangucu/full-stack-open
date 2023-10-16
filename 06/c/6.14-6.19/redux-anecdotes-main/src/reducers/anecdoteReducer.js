import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    addVote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload)
      anecdoteToChange.votes += 1
    }
  }
})

export const {
  appendAnecdote,
  setAnecdotes,
  addVote
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVoteToAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.saveVote(id)
    dispatch(addVote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer