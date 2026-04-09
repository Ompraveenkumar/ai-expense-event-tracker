import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000000 100%);
`;

const LoginForm = styled(motion.form)`
  background: rgba(0, 0, 0, 0.85);
  padding: 40px;
  border-radius: 15px;
  border: 1px solid #ff003c;
  box-shadow: 0 0 20px rgba(255, 0, 60, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background: #1a1a2e;
  border: 1px solid #333;
  padding: 15px;
  padding-right: 45px; 
  color: white;
  border-radius: 5px;
  outline: none;
  width: 100%;
  font-size: 1rem;
  &:focus { border-color: #ff003c; box-shadow: 0 0 10px rgba(255, 0, 60, 0.2); }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 15px;
  color: #888;
  cursor: pointer;
  z-index: 10; 
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  transition: 0.3s;
  &:hover { color: #ff003c; }
`;

const AuthButton = styled(motion.button)`
  background: #ff003c;
  color: white;
  padding: 15px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 5px;
`;

const RegisterLink = styled.p`
  color: #888;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 10px;
  cursor: pointer;
  &:hover { color: #00f0ff; text-decoration: underline; }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterPopup = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'CREATE NEURAL IDENTITY',
      background: '#0a0a1a',
      color: '#00f0ff',
      html: `
        <div style="display: flex; flex-direction: column; gap: 15px; align-items: center; width: 100%; padding-top: 10px;">
          <input id="swal-name" class="swal2-input" placeholder="Full Name" 
            style="background: #1a1a2e; color: white; border: 1px solid #00f0ff; width: 85%; margin: 0; height: 50px; border-radius: 5px; font-family: inherit;">
          
          <input id="swal-email" class="swal2-input" placeholder="Email" 
            style="background: #1a1a2e; color: white; border: 1px solid #00f0ff; width: 85%; margin: 0; height: 50px; border-radius: 5px; font-family: inherit;">
          
          <div style="position: relative; width: 85%; margin: 0; display: flex; align-items: center;">
            <input id="swal-pass" type="password" class="swal2-input" placeholder="Password" 
              style="background: #1a1a2e; color: white; border: 1px solid #00f0ff; width: 100%; margin: 0; height: 50px; padding-right: 45px; border-radius: 5px; font-family: inherit;">
            <button id="toggle-reg-pass" type="button" 
              style="position: absolute; right: 12px; background: none; border: none; color: #00f0ff; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; z-index: 10;">👁️</button>
          </div>

          <div style="width: 85%; text-align: left; margin-top: 10px;">
            <label style="color: #00f0ff; font-size: 0.8rem; margin-bottom: 5px; display: block;">NEURAL INTERESTS:</label>
            <div id="interest-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #1a1a2e; padding: 10px; border: 1px solid #333; border-radius: 5px; max-height: 100px; overflow-y: auto;">
              <label style="color: white; font-size: 0.75rem; cursor: pointer;"><input type="checkbox" value="Tech" class="interest-chk"> Tech</label>
              <label style="color: white; font-size: 0.75rem; cursor: pointer;"><input type="checkbox" value="Music" class="interest-chk"> Music</label>
              <label style="color: white; font-size: 0.75rem; cursor: pointer;"><input type="checkbox" value="Coding" class="interest-chk"> Coding</label>
              <label style="color: white; font-size: 0.75rem; cursor: pointer;"><input type="checkbox" value="Sports" class="interest-chk"> Sports</label>
              <label style="color: white; font-size: 0.75rem; cursor: pointer;"><input type="checkbox" value="Arts" class="interest-chk"> Arts</label>
              <label style="color: white; font-size: 0.75rem; cursor: pointer;"><input type="checkbox" value="Science" class="interest-chk"> Science</label>
            </div>
          </div>
        </div>
      `,
      didOpen: () => {
        const toggleBtn = document.getElementById('toggle-reg-pass');
        const passwordInput = document.getElementById('swal-pass');
        toggleBtn.addEventListener('click', () => {
          const isPass = passwordInput.type === 'password';
          passwordInput.type = isPass ? 'text' : 'password';
          toggleBtn.textContent = isPass ? '🙈' : '👁️';
        });
      },
      showCancelButton: true,
      confirmButtonText: 'REGISTER',
      confirmButtonColor: '#00f0ff',
      cancelButtonColor: '#444',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const email = document.getElementById('swal-email').value;
        const password = document.getElementById('swal-pass').value;
        
        const interests = Array.from(document.querySelectorAll('.interest-chk:checked'))
          .map(cb => cb.value);

        if (!name || !email || !password) {
          Swal.showValidationMessage('All neural fields required!');
          return false;
        }
        return { name, email, password, interests };
      }
    });

    if (formValues) {
      try {
        await axios.post('http://localhost:5000/api/v1/auth/signup', formValues);
        Swal.fire({ 
          icon: 'success', 
          title: 'Identity Created!', 
          background: '#0a0a1a', 
          color: '#00f0ff',
          confirmButtonColor: '#00f0ff' 
        });
      } catch (err) {
        Swal.fire({ 
          icon: 'error', 
          title: 'Registration Failed', 
          text: err.response?.data?.message || "Sync error", 
          background: '#0a0a1a', 
          color: '#ff003c' 
        });
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });
      
      // 🚀 NEURAL HANDSHAKE: Save token AND userId for AI matching
      localStorage.setItem('token', res.data.token);
      
      // Safety check: Use either ._id or .id based on your backend structure
      const userId = res.data.user?._id || res.data.user?.id;
      
      if (userId) {
          localStorage.setItem('userId', userId);
          window.location.href = "/home";
      } else {
          console.error("Neural Identity (userId) not found in server response");
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Invalid credentials.';
      Swal.fire({ 
        icon: 'error', 
        title: 'Access Denied', 
        text: errorMsg, 
        background: '#1a1a2e', 
        color: '#ff003c',
        confirmButtonColor: '#ff003c'
      });
    }
  };

  return (
    <LoginContainer>
      <LoginForm 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleLogin}
      >
        <h2 style={{color: '#ff003c', textAlign: 'center', textTransform: 'uppercase'}}>Identity Verification</h2>
        
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        
        <PasswordWrapper>
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </PasswordWrapper>

        <AuthButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">LOGIN</AuthButton>

        <RegisterLink onClick={handleRegisterPopup}>
          Don't have an account? Create Neural Identity
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;