import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.get(baseUrl, config)
	return response.data
}

const create = async blog => {
	const config = {
		headers: {
			Authorization: token,
			'Content-Transfer-Encoding': 'application/json'
		}
	}

	try {
		const response = await axios.post(baseUrl, blog, config)
		return response.data
	} catch (error) {
		console.log('Error', error.response.data.error)
		throw error
	}

}

const addLike = async blog => {
	const config = {
		headers: {
			Authorization: token,
			'Content-Transfer-Encoding': 'application/json'
		}
	}

	try {
		const response = await axios.put(baseUrl+`/${blog.id}`, blog, config)
		return response.data
	} catch (error) {
		console.log('Error', error)
		throw error
	}

}

const deleteBlog = async blog => {
	const config = {
		headers: {
			Authorization: token,
			'Content-Transfer-Encoding': 'application/json'
		}
	}
	const response = await axios.delete(baseUrl + `/${blog.id}`, config)
	return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAll,
	setToken,
	create,
	addLike,
	deleteBlog
}