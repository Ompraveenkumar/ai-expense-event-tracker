import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  height: 90vh; /* Takes up most of the screen */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #00f0ff;
  text-transform: uppercase;
  letter-spacing: 5px;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.7), 
               0 0 20px rgba(0, 240, 255, 0.5);
`;

const StartButton = styled(Link)`
  margin-top: 40px;
  padding: 15px 40px;
  font-size: 1.5rem;
  background: transparent;
  color: #ff003c;
  border: 2px solid #ff003c;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(255, 0, 60, 0.4);
  transition: 0.3s;

  &:hover {
    background: #ff003c;
    color: white;
    box-shadow: 0 0 30px #ff003c;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>AI Event Planner</Title>
      <StartButton to="/create">Initialize System</StartButton>
    </HomeContainer>
  );
};

export default Home;