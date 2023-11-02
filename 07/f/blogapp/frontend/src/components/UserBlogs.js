import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Typography from "@mui/material/Typography";

const UserBlogs = () => {
  const blogs = useSelector((state) => state.blog);

  const userPosts = blogs.reduce((acc, blog) => {
    const user = blog.user;
    if (!acc[user.id]) {
      acc[user.id] = {
        id: user.id,
        name: user.name,
        posts: 0,
      };
    }
    acc[user.id].posts++;
    return acc;
  }, {});

  const userPostsArray = Object.values(userPosts);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPostsArray.map((userPost) => (
              <TableRow key={userPost.id}>
                <TableCell>
                  <Link to={`/users/${userPost.id}`}>{userPost.name}</Link>
                </TableCell>
                <TableCell>{userPost.posts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserBlogs;
