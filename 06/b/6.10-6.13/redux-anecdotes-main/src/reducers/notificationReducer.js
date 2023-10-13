import { createSlice } from "@reduxjs/toolkit";

const initialState = "Notification rendered!"

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification: (state, action) => action.payload,
        removeNotification: () => null
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer