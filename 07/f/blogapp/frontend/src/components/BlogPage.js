import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { List, ListItem } from "@mui/material";

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
      <br />
      <Typography variant="h4" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <Button
            size="small"
            variant="contained"
            type="submit"
            style={{ marginLeft: "10px" }}
            onClick={() => like(blog)}
          >
            like
          </Button>
        </div>
        <div>added by {blog.user.name}</div>
        <br />
      </Typography>
      {blog.comments.length > 0 && (
        <div>
          <Typography variant="h6">Comments</Typography>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              comment(blog);
            }}
          >
            <Grid container>
              <Grid item>
                <TextField
                  size="small"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Grid>
              <Button
                size="small"
                variant="contained"
                type="submit"
                style={{ marginLeft: "10px" }}
              >
                add comment
              </Button>
            </Grid>
          </form>
          <Box>
            <List>
              {blog.comments.map((c, i) => (
                <ListItem key={i}>
                  {i + 1}: {c}
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
