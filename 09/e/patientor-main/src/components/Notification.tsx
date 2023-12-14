import React, { useEffect, useState } from "react";

const Notification = ({ message }: { message: string }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) {
        return null;
    }

    return <div>{message}</div>;
};

export default Notification;