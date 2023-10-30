import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import {
  showNotification,
  clearNotification,
} from "./reducers/notificationReducer";

import {
  addBlog,
  removeBlog,
  setBlogs,
  updateBlog,
} from "./reducers/blogReducer";
import { removeUser, setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  // const [user, setUser] = useState("");
  const [info, setInfo] = useState({ message: null });

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  const notifyWith = (message, type = "info") => {
    dispatch(showNotification({ message, type }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      storageService.saveUser(user);
      notifyWith("welcome!");
    } catch (e) {
      notifyWith("wrong username or password", "error");
    }
  };

  const logout = async () => {
    storageService.removeUser();
    dispatch(removeUser());
    notifyWith("logged out");
  };

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog);
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    dispatch(addBlog(createdBlog));
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = await blogService.update(blogToUpdate);
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
    dispatch(updateBlog(updatedBlog));
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    );
    if (ok) {
      await blogService.remove(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
      dispatch(removeBlog(blog.id));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs
          .slice()
          .sort(byLikes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog)}
              canRemove={user && blog.user.username === user.username}
              remove={() => remove(blog)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
