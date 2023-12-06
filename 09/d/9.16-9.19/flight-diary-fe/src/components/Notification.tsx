interface NotificationProp {
    message: string;
}

const Notification = ({ message }: NotificationProp) => (
    <div>
        {message}
    </div>
);

export default Notification;
