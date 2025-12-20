import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import ChatBotMessages from './ChatBotMessages';
import ChatBotInput from './ChatBotInput';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser, setShowChatOnMobile, setIsChatbotSelected } from '../redux/userSlice';
import { IoArrowBack } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers, isChatbotSelected } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    const handleBack = () => {
        dispatch(setShowChatOnMobile(false));
        if (isChatbotSelected) {
            dispatch(setIsChatbotSelected(false));
        }
    };
    

    return (
        <>
            {isChatbotSelected ? (
                <div className="message-container" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '0',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        backgroundColor: 'rgba(30, 30, 40, 0.95)',
                        color: 'white',
                        padding: '16px 20px',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        flexShrink: 0
                    }}>
                        <button
                            onClick={handleBack}
                            className="back-button"
                            style={{
                                display: 'none',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '8px',
                                marginRight: '4px',
                                borderRadius: '50%',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <IoArrowBack size={24} />
                        </button>
                        <div style={{
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative',
                                backgroundColor: '#6366f1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FaRobot size={28} color="#ffffff" />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '8px'
                            }}>
                                <p style={{ fontWeight: '600' }}>AI Assistant</p>
                                <span style={{
                                    fontSize: '11px',
                                    color: '#10b981',
                                    fontWeight: '600'
                                }}>Online</span>
                            </div>
                        </div>
                    </div>
                    <ChatBotMessages />
                    <ChatBotInput />
                </div>
            ) : selectedUser !== null ? (
                <div className="message-container" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '0',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        backgroundColor: 'rgba(30, 30, 40, 0.95)',
                        color: 'white',
                        padding: '16px 20px',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        flexShrink: 0
                    }}>
                        <button
                            onClick={handleBack}
                            className="back-button"
                            style={{
                                display: 'none',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '8px',
                                marginRight: '4px',
                                borderRadius: '50%',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <IoArrowBack size={24} />
                        </button>
                        <div style={{
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative',
                                // border: isOnline ? '2px solid #22c55e' : '2px solid transparent' // green if online
                            }}>
                                <img
                                    src={selectedUser?.profilePhoto}
                                    alt="user-profile"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '8px'
                            }}>
                                <p>{selectedUser?.fullName}</p>
                            </div>
                        </div>
                    </div>
                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '64px',
                        marginBottom: '20px'
                    }}>💬</div>
                    <h1 style={{
                        fontSize: '32px',
                        color: 'white',
                        fontWeight: '700',
                        marginBottom: '12px'
                    }}>
                        Hi, {authUser?.fullName}! 👋
                    </h1>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                        Select a chat to start conversation
                    </p>
                </div>
            )}

            <style>
                {`
                    @media (max-width: 768px) {
                        .message-container {
                            width: 100% !important;
                            height: 100% !important;
                        }

                        .back-button {
                            display: flex !important;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                `}
            </style>
        </>
    );
}

export default MessageContainer;
