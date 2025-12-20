import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setShowChatOnMobile, setIsChatbotSelected } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
    dispatch(setShowChatOnMobile(true));
    dispatch(setIsChatbotSelected(false));
  };

  const isSelected = selectedUser?._id === user?._id;

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          borderRadius: "12px",
          backgroundColor: isSelected ? "rgba(99, 102, 241, 0.2)" : "transparent",
          color: "#ffffff",
          cursor: "pointer",
          transition: "all 0.3s ease",
          border: isSelected ? "1px solid #6366f1" : "1px solid transparent",
          marginBottom: "6px"
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
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
            }}
          >
            <img
              src={user?.profilePhoto}
              alt="user-profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {isOnline && (
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
                boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)"
              }}
            />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <p style={{
              fontWeight: "500",
              fontSize: "15px"
            }}>{user?.fullName}</p>
            {isOnline && (
              <span style={{
                fontSize: "11px",
                color: "#10b981",
                fontWeight: "600"
              }}>Online</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUser;
