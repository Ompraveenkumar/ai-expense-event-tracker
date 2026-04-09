import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

// ... (Your styled components remain exactly the same)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;

const Form = styled.form`
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 15px;
  border: 1px solid #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  color: #00f0ff;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const Input = styled.input`
  background: #1a1a2e;
  border: 1px solid #333;
  padding: 15px;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  outline: none;
  transition: 0.3s;
  &:focus { border-color: #00f0ff; box-shadow: 0 0 10px rgba(0, 240, 255, 0.3); }
`;
const TextArea = styled.textarea`
  background: #1a1a2e;
  border: 1px solid #333;
  padding: 15px;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  outline: none;
  min-height: 100px;
  transition: 0.3s;
  &:focus { border-color: #00f0ff; }
`;

const Select = styled.select`
  background: #1a1a2e;
  border: 1px solid #333;
  padding: 15px;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  &:focus { border-color: #00f0ff; }
`;

const MagicSubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, #00f0ff, #0077ff);
  color: black;
  font-weight: bold;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 10px;

  &:disabled {
    background: gray;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const LoadingText = styled.p`
  color: #00f0ff;
  text-align: center;
  font-weight: bold;
  animation: blink 1s infinite;
  @keyframes blink { 50% { opacity: 0.5; } }
`;

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 🧠 UPDATE: Changed 'type' to 'category' to match your Backend & MongoDB
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'Tech', // Updated default and name
    days: '1'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Using 'category' in the prompt now
      const promptText = `Create a strict day-by-day schedule for a ${formData.days}-day ${formData.category} named "${formData.title}" happening at ${formData.location}. The description is: "${formData.description}". Return the response in a structured JSON format with a strict "schedule" array.`;

      console.log("🤖 Sending Prompt:", promptText);

      const aiResponse = await axios.post('http://localhost:5000/api/v1/generate-schedule', 
        { prompt: promptText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const generatedSchedule = aiResponse.data.schedule; 
      console.log("✅ AI Schedule Received:", generatedSchedule);

      // 🛡️ Sending data to Backend - 'category' will now properly map to MongoDB
      await axios.post('http://localhost:5000/api/v1/add-event', 
        { ...formData, ai_schedule: generatedSchedule },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Event Created Successfully!');
      navigate('/home'); // Navigating to home so you can see the recommendation

    } catch (error) {
      console.error("❌ Error:", error);
      alert('Error creating event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Initialize Event</Title>
        <Input name="title" placeholder="Event Name (e.g. Tech Nova)" onChange={handleChange} required />
        <Input name="date" type="date" onChange={handleChange} required />
        <Input name="location" placeholder="Location" onChange={handleChange} required />

        <TextArea 
          name="description" 
          placeholder="Describe the vibe... AI will use this!" 
          onChange={handleChange} 
        />
        
        {/* 🧠 UPDATE: Name changed to 'category' and values simplified for matching */}
        <Select name="category" value={formData.category} onChange={handleChange}>
          <option value="Tech">Tech</option>
          <option value="Coding">Coding</option>
          <option value="Cultural">Cultural</option>
          <option value="Workshop">Workshop</option>
          <option value="Music">Music</option>
        </Select>

        <Select name="days" onChange={handleChange}>
          <option value="1">1 Day Event</option>
          <option value="2">2 Days Event</option>
          <option value="3">3 Days Event</option>
        </Select>

        <MagicSubmitButton 
          type="submit" 
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? '🤖 AI IS THINKING...' : '⚡ GENERATE SCHEDULE (AI)'}
        </MagicSubmitButton>

        {loading && <LoadingText>Generating detailed plan... Please wait...</LoadingText>}
      </Form>
    </Container>
  );
};

export default CreateEvent;