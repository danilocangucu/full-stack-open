import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "CREATED":
            return `Anecdote created: ${action.payload}`
        case "REMOVE":
            return ''
        case "ERROR":
            return action.payload
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    useEffect(() => {
        if (notification !== '') {
            const timer = setTimeout(() => {
                notificationDispatch({ type: 'REMOVE' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext