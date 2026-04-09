import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero'; 
import CreateEvent from './components/CreateEvent';
import EventsList from './components/EventsList';
import Login from './components/Login';

const MainLayout = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000000 100%);
`;

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  // 🎫 Simple check for the token to control access
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🚪 Default route is now Login */}
        <Route path="/" element={<PageWrapper><Login /></PageWrapper>} />
        
        {/* 🔒 System Routes: Only accessible if isAuthenticated is true */}
        <Route path="/home" element={isAuthenticated ? <PageWrapper><Hero /></PageWrapper> : <Navigate to="/" />} />
        <Route path="/create" element={isAuthenticated ? <PageWrapper><CreateEvent /></PageWrapper> : <Navigate to="/" />} />
        <Route path="/events" element={isAuthenticated ? <PageWrapper><EventsList /></PageWrapper> : <Navigate to="/" />} />
        
        {/* Fallback for safety */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // 🧭 Check auth status here to decide whether to show the Navbar
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <MainLayout>
        {/* 🛡️ Navbar only appears after successful Identity Verification */}
        {isAuthenticated && <Navbar />} 
        <AnimatedRoutes />
      </MainLayout>
    </Router>
  );
}

export default App;