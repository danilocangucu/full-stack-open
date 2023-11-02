import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createBlog({ title, author, url });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create a new blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="title"
              label="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              id="author"
              label="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <TextField
              id="url"
              label="URL"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Grid>
          <br />
        </Grid>
      </form>
    </div>
  );
};

export default BlogForm;
