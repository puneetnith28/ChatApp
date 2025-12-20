import React from 'react';
import OtherUser from './OtherUser';
import ChatBot from './ChatBot';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";

const OtherUsers = () => {
    // my custom hook
    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);

    if (!otherUsers) return null; // return null instead of undefined

    return (
        <div style={{
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ChatBot />
            {
                otherUsers.map((user) => (
                    <OtherUser key={user._id} user={user} />
                ))
            }
        </div>
    );
};

export default OtherUsers;
