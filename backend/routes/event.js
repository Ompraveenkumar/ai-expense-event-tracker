const { 
    addEvent, 
    getEvents, 
    deleteEvent, 
    getRecommendations // 🧠 Added for AI Recommendations
} = require('../controllers/eventController'); 
const router = require('express').Router();
const EventSchema = require("../models/EventModel"); // 👈 Added to allow direct search

// URL: http://localhost:5000/api/v1/add-event
router.post('/add-event', addEvent)

// URL: http://localhost:5000/api/v1/get-events
router.get('/get-events', getEvents)

// URL: http://localhost:5000/api/v1/delete-event/:id
router.delete('/delete-event/:id', deleteEvent) 

// 🧠 AI Recommendation Route
// URL: http://localhost:5000/api/v1/recommendations
router.get('/recommendations', getRecommendations) 

// 🌐 TASK 2: College Hub Global Search Route
// URL: http://localhost:5000/api/v1/search
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);

        // Searches title or category using case-insensitive regex
        const results = await EventSchema.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        }).sort({ date: 1 });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: "Search failed" });
    }
});

module.exports = router;