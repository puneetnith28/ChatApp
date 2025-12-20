import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    }

    return (
        <form onSubmit={onSubmitHandler} style={{ 
            padding: '16px 20px', 
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(30, 30, 40, 0.6)',
            flexShrink: 0,
            position: 'relative',
            bottom: 0
        }}>
            <div style={{ position: 'relative', width: '100%' }}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Type a message...'
                    style={{
                        width: '100%',
                        padding: '14px 50px 14px 16px',
                        fontSize: '15px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#6366f1';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                />
                <button
                    type="submit"
                    style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#6366f1',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
                >
                    <IoSend />
                </button>
            </div>
        </form>
    );
}

export default SendInput;
