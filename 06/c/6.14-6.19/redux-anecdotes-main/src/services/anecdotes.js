import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const saveVote = async (id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`)
    const newVoteCount = anecdote.data.votes + 1
    const object = {...anecdote.data, votes: newVoteCount }
    const response = await axios.put(`${baseUrl}/${id}`, object)
    return response.data
}

export default {
    getAll,
    createNew,
    saveVote
}