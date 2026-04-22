const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
require('dotenv').config();
const { readdirSync } = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
// Updated CORS to allow your specific live frontend
app.use(cors({
    origin: "https://ai-powered-event-planner.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "connect-src 'self' https://ai-event-planner-backend.onrender.com"
    );
    next();
});

// 🛡️ ROUTES CONFIGURATION
// We explicitly define the /auth prefix to match your frontend axios calls
app.use('/api/v1/auth', require('./routes/auth')); 

// 📁 Dynamic loader for other routes (like events.js)
// This will map any other file in /routes to /api/v1/filename
readdirSync('./routes').forEach((route) => {
    if (route !== 'auth.js') { // Skip auth since we defined it explicitly above
        app.use('/api/v1', require('./routes/' + route));
    }
});

// Test Route to check if server is working
app.get('/', (req, res) => {
    res.send('Neural Planner API is Running...');
})

const server = () => {
    db(); // Connect to Database
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
}

server();