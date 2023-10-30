import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) => {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeBlog: (state, action) =>
      state.filter((blog) => blog.id !== action.payload),
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export default blogSlice.reducer;
