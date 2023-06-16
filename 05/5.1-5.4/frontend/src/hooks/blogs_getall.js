import { useState, useEffect } from "react";
import blogService from "../services/blogs";

const useGetAllBlogs = (user, blogsUpdated) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (user) {
            blogService.getAll().then((fetchedBlogs) => {
            setBlogs(fetchedBlogs);
            });
        }
    }, [user, blogsUpdated]);

    return blogs;
};

export default useGetAllBlogs;
