import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { FaRobot } from "react-icons/fa";

const ChatBotMessages = () => {
    const scroll = useRef();
    const { chatbotMessages } = useSelector(store => store.message);
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatbotMessages]);

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
            {(!chatbotMessages || chatbotMessages.length === 0) ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '16px',
                    opacity: 0.7
                }}>
                    <FaRobot size={64} color="#6366f1" />
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '18px',
                        textAlign: 'center'
                    }}>
                        Hi! I'm your AI assistant. How can I help you today?
                    </p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        width: '100%',
                        maxWidth: '400px'
                    }}>
                        {[
                            "Ask me anything",
                            "Get help with tasks",
                            "Learn something new",
                            "Have a conversation"
                        ].map((suggestion, idx) => (
                            <div key={idx} style={{
                                padding: '12px',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: '10px',
                                textAlign: 'center',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '14px',
                                border: '1px solid rgba(99, 102, 241, 0.2)'
                            }}>
                                💡 {suggestion}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                chatbotMessages.map((msg) => (
                    <div
                        key={msg._id}
                        ref={scroll}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: msg.isBot ? "flex-start" : "flex-end",
                            marginBottom: "12px",
                            padding: "0 8px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flexDirection: msg.isBot ? "row" : "row-reverse",
                            }}
                        >
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: msg.isBot ? "#6366f1" : "transparent"
                                }}
                            >
                                {msg.isBot ? (
                                    <FaRobot size={24} color="#ffffff" />
                                ) : (
                                    <img
                                        src={authUser?.profilePhoto}
                                        alt="profile"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                            </div>
                            <div>
                                <time style={{ fontSize: "12px", opacity: 0.5, color: "white" }}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </time>
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "6px",
                                padding: "12px 16px",
                                maxWidth: "70%",
                                borderRadius: msg.isBot ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                                backgroundColor: msg.isBot ? "rgba(99, 102, 241, 0.15)" : "#6366f1",
                                color: "#ffffff",
                                alignSelf: msg.isBot ? "flex-start" : "flex-end",
                                wordBreak: "break-word",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                                fontSize: "15px",
                                lineHeight: "1.5",
                                border: msg.isBot ? "1px solid rgba(99, 102, 241, 0.3)" : "none"
                            }}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatBotMessages;
