import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }

    setUser({
      username: "",
      password: ""
    });
  };

  return (
    <div style={{
      minWidth: '320px',
      maxWidth: '450px',
      width: '90%',
      margin: '0 auto',
      padding: '20px'
    }}>
      <div className="login-container" style={{
        width: '100%',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'rgba(30, 30, 40, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#ffffff',
          letterSpacing: '-0.5px'
        }}>Welcome Back</h1>

        <form onSubmit={onSubmitHandler}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              padding: '0 0 8px 0',
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '12px 16px',
                height: '48px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
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
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              padding: '0 0 8px 0',
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 16px',
                height: '48px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
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
          </div>

          <p style={{
            textAlign: 'center',
            margin: '20px 0',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px'
          }}>
            Don't have an account? <Link to="/signup" style={{
              color: '#6366f1',
              textDecoration: 'none',
              fontWeight: '600'
            }}>Sign up</Link>
          </p>

          <div>
            <button type="submit" style={{
              width: '100%',
              padding: '14px 0',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}>
              Login
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          @media (max-width: 480px) {
            .login-container {
              padding: 24px !important;
              border-radius: 12px !important;
            }

            .login-container h1 {
              font-size: 26px !important;
            }

            .login-container input {
              height: 44px !important;
              font-size: 14px !important;
            }

            .login-container button {
              font-size: 15px !important;
              padding: 12px 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
