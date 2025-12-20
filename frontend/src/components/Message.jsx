import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwnMessage = message?.senderId === authUser?._id;

  return (
    <div
      ref={scroll}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isOwnMessage ? "flex-end" : "flex-start",
        marginBottom: "12px",
        padding: "0 8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexDirection: isOwnMessage ? "row-reverse" : "row",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={
              isOwnMessage ? authUser?.profilePhoto : selectedUser?.profilePhoto
            }
            alt="profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
          <time style={{ fontSize: "12px", opacity: 0.5, color: "white" }}>
            {new Date(message?.createdAt).toLocaleTimeString([], {
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
          borderRadius: isOwnMessage ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          backgroundColor: isOwnMessage ? "#6366f1" : "rgba(255, 255, 255, 0.1)",
          color: "#ffffff",
          alignSelf: isOwnMessage ? "flex-end" : "flex-start",
          wordBreak: "break-word",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          fontSize: "15px",
          lineHeight: "1.5"
        }}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
