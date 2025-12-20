import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);

    return (
        <div className="messages-container" style={{
            padding: '16px',
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxHeight: '100%'
        }}>
            {
                messages && messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            }
        </div>
    );
}

export default Messages;
