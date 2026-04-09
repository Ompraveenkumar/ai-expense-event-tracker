const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    // 🧠 AI Feature: Updated with a default empty array
    interests: {
        type: [String],
        default: []
    },
    bookedEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
}, { timestamps: true });

// 🛡️ SECURITY: Hash password automatically
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return; 
    }
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error; 
    }
});

// 🚀 REPLACEMENT: Remove old model if it exists to prevent caching errors
if (mongoose.models.User) {
    delete mongoose.models.User;
}

module.exports = mongoose.model('User', UserSchema);