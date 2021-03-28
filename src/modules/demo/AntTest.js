import React from 'react';
import {Button, notification, message} from 'antd';

function AntTest() {
    return (
        <div>
            <h2>Antd Test Page</h2>
            <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
            <Button onClick={success}>Success</Button>
        </div>
    );
}

const success = () => {
    message.success('This is a success message');
};

const openNotificationWithIcon = type => {
    notification[type]({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
};

export default AntTest;
