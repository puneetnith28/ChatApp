import React from 'react';
import { Link } from 'react-router-dom';
// import bgImage from '../assets/76960b5a-539d-4156-a369-c1b6f0db45bc.png';

const LandingPage = () => {
  return (
    <div style={{
      // minHeight: '100vh',
      backgroundImage: `url('/bg2.jpg')`,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      display: 'flex',
      borderRadius: '50px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        padding: '32px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.3)',
        color: '#fff',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to Chatify</h1>
        <p style={{ fontSize: '16px', marginBottom: '24px' }}>
          Real-time conversations with beautiful UI, fast messages, and end-to-end connection. Start chatting today!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/login" style={buttonStyle}>Login</Link>
          <Link to="/signup" style={{ ...buttonStyle, backgroundColor: '#3b82f6', color: 'white' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  border: '1px solid #fff',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

export default LandingPage;
