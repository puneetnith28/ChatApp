import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowChatOnMobile } from '../redux/userSlice';

const HomePage = () => {
  const { authUser, showChatOnMobile } = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    // Reset mobile view on component mount
    dispatch(setShowChatOnMobile(false));
  }, [dispatch]);

  return (
    <div className="home-container" style={{
      display: 'flex',
      height: '90vh',
      maxHeight: '700px',
      width: '95vw',
      maxWidth: '1400px',
      margin: '0 auto',
      borderRadius: '16px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      overflow: 'hidden',
      backgroundColor: 'rgba(30, 30, 40, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
    }}>
      <div className={`sidebar-wrapper ${showChatOnMobile ? 'hide-on-mobile' : ''}`}>
        <Sidebar />
      </div>
      <div className={`message-wrapper ${!showChatOnMobile ? 'hide-on-mobile' : ''}`}>
        <MessageContainer />
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .home-container {
              flex-direction: column;
              height: 100vh !important;
              max-height: 100vh !important;
              width: 100vw !important;
              max-width: 100vw !important;
              border-radius: 0 !important;
              border: none !important;
            }

            .sidebar-wrapper, .message-wrapper {
              width: 100% !important;
              height: 100% !important;
              flex: 1;
            }

            .hide-on-mobile {
              display: none !important;
            }
          }

          @media (min-width: 769px) {
            .sidebar-wrapper {
              flex: 0 0 auto;
            }
            .message-wrapper {
              flex: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
