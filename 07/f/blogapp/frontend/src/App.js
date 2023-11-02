import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserBlogs from "./components/UserBlogs";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";
import Navbar from "./components/NavBar";

import {
  showNotification,
  clearNotification,
} from "./reducers/notificationReducer";

import { addBlog, setBlogs } from "./reducers/blogReducer";

import { removeUser, setUser } from "./reducers/userReducer";

import Box from "@mui/material/Box";
import { List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const info = { message: null };

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

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

  if (!user) {
    return (
      <div>
        <Typography variant="h2" gutterBottom>
          Log in to application
        </Typography>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div>
        <Notification info={info} />
      </div>
      <Routes>
        <Route path="/users" element={<UserBlogs />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route
          path="/"
          element={
            <div>
              <Typography variant="h2" gutterBottom>
                blogs
              </Typography>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <NewBlog createBlog={createBlog} />
              </Togglable>
              <Box spacing={2}>
                <List>
                  {blogs
                    .slice()
                    .sort(byLikes)
                    .map((blog) => (
                      <ListItem key={blog.id}>
                        <Blog blog={blog} />
                      </ListItem>
                    ))}
                </List>
              </Box>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
