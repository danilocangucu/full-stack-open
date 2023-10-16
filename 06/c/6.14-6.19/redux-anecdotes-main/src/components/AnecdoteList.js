import { useDispatch, useSelector } from "react-redux";
import { addVote, addVoteToAnecdote } from "../reducers/anecdoteReducer";
import { createNotification, removeNotification, setNotificationWithTimeout } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(
            anecdote => anecdote.content.includes(state.filter.filter)
        )
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    
    return(
        <>
        {sortedAnecdotes.map(anecdote => 
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => {
                    dispatch(setNotificationWithTimeout(`You voted for "${anecdote.content}"`, 5))
                    dispatch(addVoteToAnecdote(anecdote.id))
                }}    
            />
        )}
        </>
    )
}

export default AnecdoteList