const EventSchema = require("../models/EventModel")
const User = require("../models/User"); 

exports.addEvent = async (req, res) => {
    // 🧠 UPDATE: Destructure category AND type (for compatibility)
    const { title, date, location, description, category, type, ai_schedule } = req.body

    try {
        // Validations - Exact same as your original
        if(!title || !date || !location || !description){
            return res.status(400).json({message: 'All fields are required!'})
        }

        // 🧠 NEURAL FIX: Your original default template logic preserved
        const finalSchedule = ai_schedule && ai_schedule.length > 0 ? ai_schedule : [
            { time: "09:00 AM - 10:00 AM", task: "Check-in and Registration" },
            { time: "10:00 AM - 11:30 AM", task: "Opening Keynote & Vision" },
            { time: "11:30 AM - 01:00 PM", task: "Deep Dive Session 1" },
            { time: "01:00 PM - 02:00 PM", task: "Networking Lunch" },
            { time: "02:00 PM - 04:30 PM", task: "Interactive Workshops" },
            { time: "04:30 PM - 05:00 PM", task: "Closing Remarks" }
        ];

        // 🧠 LOGIC UPDATE: Use 'category' if present, otherwise use 'type'
        // This ensures MongoDB never defaults to "General" if you selected "Tech"
        const event = EventSchema({
            title,
            date,
            location,
            description,
            category: category || type || "General", 
            ai_schedule: finalSchedule 
        })

        await event.save()
        res.status(200).json({message: 'Event Added Successfully!'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getEvents = async (req, res) => {
    try {
        const events = await EventSchema.find().sort({createdAt: -1})
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await EventSchema.findByIdAndDelete(id);
        
        if(!event) {
            return res.status(404).json({message: 'Event not found!'});
        }

        res.status(200).json({message: 'Event Deleted Successfully!'});
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

// 🧠 AI RECOMMENDATION LOGIC - Keeping your flexible regex logic exactly as is
exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.query.userId; 
        const user = await User.findById(userId);

        if (!user || !user.interests || user.interests.length === 0) {
            return res.status(200).json([]);
        }

        const interestRegexArray = user.interests.map(interest => new RegExp(interest, 'i'));

        const recommendations = await EventSchema.find({
            category: { $in: interestRegexArray }
        });

        console.log(`Found ${recommendations.length} recommendations for user ${userId}`);
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}