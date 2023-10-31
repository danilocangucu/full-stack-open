import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userPostsArray.map((userPost, index) => (
            <tr key={index}>
              <td>
                <Link to={`/users/${userPost.id}`}>{userPost.name}</Link>
              </td>
              <td>{userPost.posts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBlogs;
