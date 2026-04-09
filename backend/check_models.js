const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function getModels() {
    console.log("🔍 Checking available models...");
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("\n✅ YOUR AVAILABLE MODELS:");
        if (data.models) {
            data.models.forEach(model => {
                // We only care about models that can generate text
                if (model.supportedGenerationMethods.includes("generateContent")) {
                     console.log(`👉 ${model.name.replace("models/", "")}`);
                }
            });
        } else {
            console.log("❌ Error:", data);
        }
    } catch (error) {
        console.error("❌ Connection Error:", error);
    }
}

getModels();