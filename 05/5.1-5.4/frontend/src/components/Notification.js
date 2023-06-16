const Notification = ({ message }) => {
    if (message === null){
        return null
    }

    return (
        <div className='error2'>
            {message}
        </div>
    )
}

export default Notification