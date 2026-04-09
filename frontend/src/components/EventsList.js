import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion'; 
import EventCard from './EventCard'; 

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #00f0ff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 40px;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 🎫 Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');

        // 🛡️ Pass the token in the Authorization header
        const res = await axios.get('http://ai-expense-event-tracker.onrender.com/api/v1/get-events', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEvents(res.data);
      } catch (err) {
        console.error("❌ Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const removeEventFromUI = (id) => {
    setEvents(events.filter(event => event._id !== id));
  };

  return (
    <Container>
      <Title>Neural Schedules</Title>
      {events.length === 0 ? (
        <p style={{color: 'white', textAlign: 'center'}}>No events found. Start by creating one!</p>
      ) : (
        <Grid>
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <EventCard 
                event={event} 
                onDelete={removeEventFromUI} 
              />
            </motion.div>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EventsList;