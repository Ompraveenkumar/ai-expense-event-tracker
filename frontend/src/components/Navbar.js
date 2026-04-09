import React, { useState, useEffect } from 'react'; // 👈 Added useEffect & useState
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 👈 Added useLocation
import { FaRobot, FaCalendarAlt, FaPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Nav = styled.nav`
  height: 80px;
  background: rgba(26, 26, 46, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  border-bottom: 2px solid #00f0ff; 
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  color: #00f0ff;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);

  &:hover {
    color: #ffffff;
    text-shadow: 0 0 20px #00f0ff;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 30px;
`;

const MenuItem = styled(Link)`
  color: #e0e0e0;
  font-size: 1.1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;

  &:hover {
    color: #00f0ff;
    transform: translateY(-2px);
  }
`;

const AuthLink = styled(MenuItem)`
  color: #ff003c; 
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    color: #ff4d7a;
    text-shadow: 0 0 10px #ff003c;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Used to detect page changes
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔄 Sync auth state whenever the page or URL changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]); // Triggers check on every navigation

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    
    Swal.fire({
      title: 'Neural Link Disconnected',
      icon: 'info',
      background: '#1a1a2e',
      color: '#ff003c',
      showConfirmButton: false,
      timer: 1500
    });
    
    navigate('/login');
  };

  return (
    <Nav>
      <Logo to="/">
        <FaRobot /> NEURAL PLANNER
      </Logo>
      <Menu>
        <MenuItem to="/create">
          <FaPlus /> New Event
        </MenuItem>
        <MenuItem to="/events">
          <FaCalendarAlt /> My Schedule
        </MenuItem>
        
        {/* 👇 Real-time Auth Toggle */}
        {isAuthenticated ? (
          <AuthLink as="button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </AuthLink>
        ) : (
          <AuthLink to="/login">
            <FaSignInAlt /> Login
          </AuthLink>
        )}
      </Menu>
    </Nav>
  );
};

export default Navbar;