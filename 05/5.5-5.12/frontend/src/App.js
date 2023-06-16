import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [name, setName] = useState('')

	const [blogs, setBlogs] = useState([])
	const [blogsVersion, setBlogsVersion] = useState(0)

	const blogFormRef = useRef()

	useEffect(() => {
		if (user) {
			blogService.getAll().then((fetchedBlogs) => {
				const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
				setBlogs(sortedBlogs)
			})
		}
	}, [user, blogsVersion])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	useEffect(() => {
		if (user) {
			setName(user.name)
		}
	}, [user])

	if (!blogs) return null

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')

		} catch (error) {
			setNotificationMessage(error.response.data.error)
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()

		window.localStorage.removeItem('loggedBlogappUser')
		window.location.href = '/'

		setUser(null)

	}

	const addBlog = async (blogObject) => {
		try {
			await blogService.create(blogObject)

			blogFormRef.current.toggleVisibility()
			setBlogsVersion(blogsVersion + 1)
			setNotificationMessage(`${blogObject.title} by ${blogObject.author} added`)
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)

		} catch (error) {
			console.error(error)
			setNotificationMessage(error.response.data.error)
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		}
	}

	const updateBlogLikes = async (blogId) => {
		const blogToUpdate = blogs.find((blog) => blog.id === blogId)
		const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

		try {
			await blogService.addLike(updatedBlog)
			setBlogsVersion(blogsVersion + 1)
		} catch (error) {
			console.error(error)
		}
	}


	const handleDeleteBlog = async (blogToDelete) => {
		if (blogToDelete) {
			try {
				await blogService.deleteBlog(blogToDelete)
				setBlogsVersion(blogsVersion + 1)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<div>

			<Notification message={notificationMessage}/>

			{!user && (
				<>
					<h2>login to application</h2>
					<Togglable buttonLabel="log in">
						<LoginForm
							username={username}
							password={password}
							handleUsernameChange={({ target }) => setUsername(target.value)}
							handlePasswordChange={({ target }) => setPassword(target.value)}
							handleSubmit={handleLogin}
						/>
					</Togglable>
				</>
			)}

			{user && (
				<>
					<h2>blogs</h2>
					<p>{name} logged in
						<button onClick={handleLogout}>logout</button></p>

					<h2>create new</h2>
					<Togglable buttonLabel="create blog" ref={blogFormRef}>
						<BlogForm createBlog={addBlog}/>
					</Togglable>
					{blogs.map(blog => (
						<Blog
							key={blog.id}
							blog={blog}
							updateBlogLikes={updateBlogLikes}
							username={user.username}
							onDeleteBlog={handleDeleteBlog}/>
					))}
				</>
			)}


		</div>
	)
}

export default App