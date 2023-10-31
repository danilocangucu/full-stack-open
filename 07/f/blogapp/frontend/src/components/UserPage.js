import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPage = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blog);

  const userBlogs = blogs.filter((b) => b.user.id === id);
  const userName =
    userBlogs.length > 0 ? userBlogs[0].user.name : "User not found";

  return (
    <div>
      <h2>{userName}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((b, i) => (
          <li key={i}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
