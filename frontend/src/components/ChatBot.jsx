import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setShowChatOnMobile, setIsChatbotSelected } from "../redux/userSlice";
import { FaRobot } from "react-icons/fa";

const ChatBot = () => {
  const dispatch = useDispatch();
  const { isChatbotSelected } = useSelector((store) => store.user);

  const selectChatbotHandler = () => {
    dispatch(setSelectedUser(null));
    dispatch(setIsChatbotSelected(true));
    dispatch(setShowChatOnMobile(true));
  };

  return (
    <>
      <div
        onClick={selectChatbotHandler}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          borderRadius: "12px",
          backgroundColor: isChatbotSelected ? "rgba(99, 102, 241, 0.2)" : "transparent",
          color: "#ffffff",
          cursor: "pointer",
          transition: "all 0.3s ease",
          border: isChatbotSelected ? "1px solid #6366f1" : "1px solid transparent",
          marginBottom: "6px",
        }}
        onMouseEnter={(e) => {
          if (!isChatbotSelected) {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isChatbotSelected) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        <div style={{ position: "relative", width: "48px", height: "48px" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaRobot size={28} color="#ffffff" />
          </div>

          <span
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "14px",
              height: "14px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
              border: "3px solid rgba(30, 30, 40, 0.95)",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              AI Assistant
            </p>
            <span
              style={{
                fontSize: "11px",
                color: "#10b981",
                fontWeight: "600",
              }}
            >
              Online
            </span>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "2px",
            }}
          >
            Chat with AI
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
