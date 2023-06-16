import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, username, onDeleteBlog }) => {
	const [showBlog, setShowBlog] = useState(false)

	const toggleBlogVisibility = () => {
		setShowBlog(!showBlog)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const addLike = async () => {
		try {
			updateBlogLikes(blog.id)
		} catch(error) {
			console.error(error)
		}
	}

	const handleDeleteBlog = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
			onDeleteBlog(blog)
		}
	}

	return (
		<div style={blogStyle}>
			{blog.title} <button onClick={toggleBlogVisibility}>{showBlog ? 'hide' : 'show'}</button>
			{
				showBlog ? (
					<div>
						<p>{blog.url}</p>
						<p>likes {blog.likes} <button onClick={addLike}>Like</button></p>
						<p>{blog.user.name}</p>
						{username === blog.user.username ?
							<button onClick={handleDeleteBlog}>delete</button> :
							null}

					</div>
				) : (
					null
				)
			}
		</div>
	)}

export default Blog