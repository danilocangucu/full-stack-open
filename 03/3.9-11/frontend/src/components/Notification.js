const Notification = ({ message }) => {
    const [resultMessage, isErrorMessage] = message
    
    if (resultMessage === null) {
    return null;
    }

    let notificationStyle = {
        backgroundColor: 'lightgrey',
        padding: '10px',
        marginBottom: "10px"
    }

    if (!isErrorMessage) {
        notificationStyle = {
            ...notificationStyle,
            color: 'green',
            border: "2px solid green",
        }
    } else {
        notificationStyle = {
            ...notificationStyle,
            color: 'red',
            border: "2px solid red"
        }
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification