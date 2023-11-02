import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { List, ListItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const UserPage = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blog);

  const userBlogs = blogs.filter((b) => b.user.id === id);
  const userName =
    userBlogs.length > 0 ? userBlogs[0].user.name : "User not found";

  const style = {
    marginBottom: 2,
    padding: 5,
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {userName}
      </Typography>
      <Typography variant="h5" gutterBottom>
        added blogs
      </Typography>
      <div style={style}>
        <Box spacing={2}>
          <List>
            {userBlogs.map((b) => (
              <ListItem key={b.id}>
                <Typography variant="body1" gutterBottom>
                  <Link to={`/blogs/${b.id}`}>{b.title}</Link> by {b.author}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </div>
  );
};

export default UserPage;
