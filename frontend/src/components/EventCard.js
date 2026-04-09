import React from 'react';
import styled from 'styled-components';
import axios from 'axios'; // 👈 Added for the delete request

const Card = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #00f0ff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
  transition: 0.3s;
  color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
  }
`;

const Badge = styled.span`
  background: #ff003c;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const ScheduleBox = styled.div`
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
`;

const Task = styled.div`
  border-left: 2px solid #00f0ff;
  padding-left: 15px;
  margin: 12px 0;
`;

const DeleteButton = styled.button`
  background: transparent;
  color: #ff4d4d;
  border: 1px solid #ff4d4d;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.3s;
  margin-left: 10px;

  &:hover {
    background: #ff4d4d;
    color: white;
    box-shadow: 0 0 10px #ff4d4d;
  }
`;

// Added 'onDelete' prop to handle UI refresh
const EventCard = ({ event, onDelete }) => {
    console.log("🔍 Data for " + event.title + ":", event.ai_schedule);

    // 👇 Added Delete Logic
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
            try {
                await axios.delete(`http://ai-expense-event-tracker.onrender.com/api/v1/delete-event/${event._id}`);
                if (onDelete) onDelete(event._id); 
            } catch (err) {
                console.error("Delete failed", err);
                alert("Could not delete event. Check if backend route exists.");
            }
        }
    };

  return (
    <Card>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{color: '#00f0ff', margin: 0}}>{event.title}</h2>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Badge>{event.type || 'Tech'}</Badge>
            {/* 👇 Added Delete Button */}
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </div>
      </div>
      
      <p style={{opacity: 0.8, marginTop: '10px'}}>📍 {event.location}</p>
      <p style={{fontSize: '0.9rem', color: '#888'}}>📅 {new Date(event.date).toDateString()}</p>

    <ScheduleBox>
  <h4 style={{ color: '#ff003c', marginBottom: '10px', textTransform: 'uppercase' }}>Neural Schedule:</h4>
  {(() => {
    // 🕵️‍♂️ Step 1: Get the raw data
    let raw = event.ai_schedule;

    // 🕵️‍♂️ Step 2: Unwrap nested arrays (Fixes the [[{...}]] issue in your console)
    while (Array.isArray(raw) && raw.length === 1 && (Array.isArray(raw[0]) || typeof raw[0] === 'object')) {
      if (Array.isArray(raw[0])) {
          raw = raw[0];
      } else if (raw[0].schedule) {
          raw = raw[0].schedule;
          break; 
      } else {
          break;
      }
    }

    // 🕵️‍♂️ Step 3: Final target list
    const list = Array.isArray(raw) ? raw : (raw?.schedule || []);

    // 🚀 Step 4: Render the schedule items
    if (list.length > 0) {
      return list.map((item, index) => (
        <Task key={index}>
          <span style={{ color: '#00f0ff', fontWeight: 'bold' }}>{item.time}</span>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.95rem' }}>{item.activity}</p>
        </Task>
      ));
    }

    return <p style={{ color: '#888', fontSize: '0.8rem' }}>Neural processing pending...</p>;
  })()}
</ScheduleBox>
    </Card>
  );
};

export default EventCard;