/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import logo from '../images/logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId, setUsername } from '../../userSlice';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  
  const [error, setError] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/users/login", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) 
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        setError(errorData.message || "Login failed"); 
        console.log("error")
      } else {
        const data = await response.json(); 
        
        const userId = data.id;
        const username = data.username;
        console.log("Login successful", data);
        dispatch(setUserId(userId));
        dispatch(setUsername(username));
        
  
        navigate(`/home?userId=${userId}`);
      
        onClose();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError("An unknown error occurred"); 
      }
    }
  }

  return (
    <div className='modal_overlay'>
      <div className='modal_content'>
        <button className='close_button' onClick={onClose}>X</button>
        <div className='login_box'>
          <form className='login_form' onSubmit={onSubmit}> 
            <img src={logo} alt="Logo" />
            <h1>Welcome back!</h1>
            <label htmlFor="email">Email Address</label>
            <input 
              id="email" 
              type="email" 
              placeholder='name@email.com' 
              className='input_user'
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder='password' 
              className='input_user'
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" className='login_button'>Login</button>
            {error && <div className="error_message">{error}</div>} 
            <footer className='login_footer'>
              <a href="/reset-password">Forgot password?</a>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
