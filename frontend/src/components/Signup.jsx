import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log(error);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
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
      <div className="signup-container" style={{
        width: '100%',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'rgba(30, 30, 40, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#ffffff',
          letterSpacing: '-0.5px'
        }}>
          Create Account
        </h1>

        <form onSubmit={onSubmitHandler}>
          {[{
            label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name"
          }, {
            label: "Username", name: "username", type: "text", placeholder: "Choose a username"
          }, {
            label: "Password", name: "password", type: "password", placeholder: "Create a password"
          }, {
            label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password"
          }].map(field => (
            <div key={field.name} style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                padding: '0 0 8px 0',
                fontSize: '14px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>{field.label}</label>
              <input
                value={user[field.name]}
                onChange={(e) => setUser({ ...user, [field.name]: e.target.value })}
                type={field.type}
                placeholder={field.placeholder}
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
          ))}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            {['male', 'female'].map(gender => (
              <div key={gender} style={{ 
                display: 'flex', 
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => handleCheckbox(gender)}>
                <input
                  type="checkbox"
                  checked={user.gender === gender}
                  onChange={() => handleCheckbox(gender)}
                  style={{
                    marginRight: '8px',
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#6366f1'
                  }}
                />
                <p style={{
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
              </div>
            ))}
          </div>

          <p style={{ 
            textAlign: 'center', 
            margin: '20px 0',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px'
          }}>
            Already have an account? <Link to="/login" style={{
              color: '#6366f1',
              textDecoration: 'none',
              fontWeight: '600'
            }}>Login</Link>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          @media (max-width: 480px) {
            .signup-container {
              padding: 24px !important;
              border-radius: 12px !important;
            }

            .signup-container h1 {
              font-size: 26px !important;
            }

            .signup-container input {
              height: 44px !important;
              font-size: 14px !important;
            }

            .signup-container button {
              font-size: 15px !important;
              padding: 12px 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
