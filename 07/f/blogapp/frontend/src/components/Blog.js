import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

const Blog = ({ blog }) => {
  const style = {
    marginBottom: 2,
    padding: 5,
  };

  return (
    <div style={style} className="blog">
      <Typography variant="body1" gutterBottom>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
      </Typography>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Blog;
