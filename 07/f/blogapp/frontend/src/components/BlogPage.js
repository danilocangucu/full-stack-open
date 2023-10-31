import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogs = useSelector((state) => state.blog);

  const blog = blogs.find((b) => b.id === id);

  const [newComment, setNewComment] = useState("");

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = await blogService.update(blogToUpdate);
    dispatch(updateBlog(updatedBlog));
  };

  const comment = async (blog) => {
    const blogToUpdate = {
      ...blog,
      comments: [...blog.comments, newComment],
      user: blog.user.id,
    };
    const updatedBlog = await blogService.update(blogToUpdate);
    dispatch(updateBlog(updatedBlog));
    setNewComment("");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.comments.length > 0 && (
        <div>
          <h3>comments</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              comment(blog);
            }}
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">add comment</button>
          </form>
          <ul>
            {blog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
