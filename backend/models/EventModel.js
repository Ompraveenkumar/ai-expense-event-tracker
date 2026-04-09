const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "General"
    },
    // 👇 UPGRADED: Now it can store the full JSON list!
    ai_schedule: { 
        type: Array, 
        default: [] 
    }
}, {timestamps: true})

// This forces Mongoose to look at the 'events' collection specifically
module.exports = mongoose.model('Event', EventSchema, 'events');