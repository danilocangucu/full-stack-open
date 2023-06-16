import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import useGetAllBlogs from './hooks/blogs_getall'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogsUpdated, setBlogsUpdated] = useState(false)
  const blogs = useGetAllBlogs(user, blogsUpdated)

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
      setName(user.name);
    }
  }, [user]);

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

  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title, author, url
    }

    try {
      await blogService.create({
        blog
      })

      setTitle('')
      setAuthor('')
      setUrl('')

      setBlogsUpdated(true)
      setNotificationMessage(`${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (error) {
      setNotificationMessage(error.response.data.error)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  if (!blogs) return null

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm>
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          </LoginForm>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const createBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
          <div>
            title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
            author
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
            url
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>
        </form>
  )

  return (
    <div>

      <Notification message={notificationMessage}/>
      
      {!user && (
        <>
        <h2>login to application</h2>
        {loginForm()}
        </>
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <p>{name} logged in
          <button onClick={handleLogout}>logout</button></p>

          <h2>create new</h2>
          {createBlogForm()}

          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}


    </div>
  )
}

export default App