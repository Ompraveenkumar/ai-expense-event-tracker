const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

exports.generateSchedule = async (req, res) => {
    try {
        // 👇 DEBUG LOG: This will print exactly what the frontend sent
        console.log("👉 Backend RECEIVED:", req.body);

        const { prompt } = req.body;

        // Validation Check
        if (!prompt) {
            console.log("❌ Error: Prompt is missing in the request body!");
            return res.status(400).json({ message: "Prompt is required in the JSON body" });
        }

        console.log("🤖 Asking Gemini...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("✅ Gemini Answered!");
        
        // Clean the text to ensure it's valid JSON
        // 👇 ADDED .trim() and global flag to the regex for extra safety
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        // Find the actual start and end of the JSON object 
        const startIndex = cleanText.indexOf('{');
        const endIndex = cleanText.lastIndexOf('}');
        const finalJsonString = cleanText.substring(startIndex, endIndex + 1);

        const jsonSchedule = JSON.parse(finalJsonString);

        res.status(200).json({ schedule: jsonSchedule });

    } catch (error) {
        console.error("❌ SERVER ERROR:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};