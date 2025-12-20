import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find(user =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }

    return (
        <div className="sidebar" style={{
            borderRight: '2px solid rgba(255, 255, 255, 0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '320px',
            minWidth: '280px',
            backgroundColor: 'rgba(20, 20, 30, 0.6)'
        }}>
            <form onSubmit={searchSubmitHandler} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
            }}>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    style={{
                        padding: '12px 16px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        outline: 'none',
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '14px',
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
                <button type="submit" style={{
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}>
                    <BiSearchAlt2 style={{ width: '24px', height: '24px' }} />
                </button>
            </form>

            <div style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                margin: '16px 0'
            }}></div>

            <OtherUsers />

            <div style={{ marginTop: '16px' }}>
                <button onClick={logoutHandler} style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '10px',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}>
                    Logout
                </button>
            </div>

            <style>
                {`
                    @media (max-width: 768px) {
                        .sidebar {
                            width: 100% !important;
                            min-width: 100% !important;
                            border-right: none !important;
                            border-bottom: none !important;
                            height: 100% !important;
                            max-height: 100vh;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Sidebar;
