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

export const setNotificationWithTimeout = (content, timeout) => {
    return async dispatch => {
        dispatch(createNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer