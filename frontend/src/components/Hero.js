import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tilt from 'react-parallax-tilt';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const HeroContainer = styled.div`
  min-height: 90vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 100%);
  padding: 50px 20px;
`;

// 🚀 NEW FOR TASK 2: Toggle & Search Styles
const ToggleContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  background: ${props => props.active ? 'rgba(0, 240, 255, 0.2)' : 'transparent'};
  color: ${props => props.active ? '#00f0ff' : '#888'};
  border: 1px solid ${props => props.active ? '#00f0ff' : '#333'};
  padding: 10px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.3s;
  box-shadow: ${props => props.active ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none'};
  &:hover { color: #00f0ff; border-color: #00f0ff; }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00f0ff;
  border-radius: 30px;
  color: white;
  margin-bottom: 30px;
  text-align: center;
  outline: none;
  transition: 0.3s;
  &:focus { box-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 50px rgba(0, 240, 255, 0.1);
  margin-bottom: 40px;
`;

const GlowTitle = styled.h1`
  font-size: 4rem;
  color: #00f0ff;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00f0ff;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1.2rem;
  margin-bottom: 30px;
  letter-spacing: 2px;
`;

const LaunchButton = styled.button`
  background: transparent;
  color: #ff003c;
  border: 2px solid #ff003c;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #ff003c;
    color: white;
    box-shadow: 0 0 30px #ff003c;
    transform: scale(1.05);
  }
`;

const RecommendationSection = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.color || '#ff003c'};
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 3px;
  margin-bottom: 20px;
  text-align: center;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const EventCard = styled.div`
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  color: white;
  transition: 0.3s;
  &:hover { border-color: #00f0ff; transform: translateY(-5px); }
`;

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recommendations, setRecommendations] = useState([]);

  // 🚀 NEW STATES FOR TASK 2
  const [activeView, setActiveView] = useState('neural'); // 'neural' or 'hub'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 🧠 Your original Neural Match logic
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!userId || userId === 'undefined') return;

        const res = await axios.get(`https://ai-event-planner-backend.onrender.com/api/v1/recommendations?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecommendations(res.data);
      } catch (err) {
        console.error("❌ AI Fetch Error:", err.message);
      }
    };
    getRecommendations();
  }, [location.pathname]);

  // 🌐 NEW: Global Search Handler for Task 2
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 1) {
      try {
        const res = await axios.get(`https://ai-event-planner-backend.onrender.com/api/v1/search?query=${value}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Search Error:", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <HeroContainer>
      <Tilt perspective={1000} glitchMax={0.5} scale={1.02}>
        <GlassCard>
          <GlowTitle>Neural Planner</GlowTitle>
          <Subtitle>AI-Driven Event Orchestration</Subtitle>
          <LaunchButton onClick={() => navigate('/events')}>
            Enter System
          </LaunchButton>
        </GlassCard>
      </Tilt>

      {/* 🚀 STEP 2 DONE: THE TOGGLE UI */}
      <ToggleContainer>
        <TabButton active={activeView === 'neural'} onClick={() => setActiveView('neural')}>
          🧠 Neural Match
        </TabButton>
        <TabButton active={activeView === 'hub'} onClick={() => setActiveView('hub')}>
          🌐 College Hub
        </TabButton>
      </ToggleContainer>

      <RecommendationSection>
        {activeView === 'neural' ? (
          <>
            <SectionTitle>Recommended for You</SectionTitle>
            <EventGrid>
              {recommendations.length > 0 ? (
                recommendations.map((event) => (
                  <EventCard key={event._id}>
                    <span style={{color: '#00f0ff', fontSize: '0.7rem'}}>● {event.category}</span>
                    <h4 style={{margin: '10px 0'}}>{event.title}</h4>
                    <p style={{fontSize: '0.8rem', color: '#888'}}>{event.description}</p>
                  </EventCard>
                ))
              ) : (
                <p style={{textAlign: 'center', color: '#444', gridColumn: '1/-1'}}>No events matching your neural profile yet.</p>
              )}
            </EventGrid>
          </>
        ) : (
          <>
            <SectionTitle color="#00f0ff">College Event Hub</SectionTitle>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <SearchInput 
                placeholder="Search all events (e.g. Hackathon, Coding)..." 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <EventGrid>
              {searchResults.length > 0 ? (
                searchResults.map((event) => (
                  <EventCard key={event._id}>
                    <span style={{color: '#ff003c', fontSize: '0.7rem'}}>● {event.category}</span>
                    <h4 style={{margin: '10px 0'}}>{event.title}</h4>
                    <p style={{fontSize: '0.8rem', color: '#888'}}>{event.description}</p>
                  </EventCard>
                ))
              ) : (
                <p style={{textAlign: 'center', color: '#444', gridColumn: '1/-1'}}>Type to search the global campus database.</p>
              )}
            </EventGrid>
          </>
        )}
      </RecommendationSection>
    </HeroContainer>
  );
};

export default Hero;