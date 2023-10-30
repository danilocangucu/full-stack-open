import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
