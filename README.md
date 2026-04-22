# <p align="center">🤖 AI-Powered Event Planner</p>

---

## <h2 align="left"><font color="#007ACC">🌐 Live Production Links</font></h2>

> **Frontend Dashboard:** [https://ai-event-planner-frontend.onrender.com](https://ai-event-planner-frontend.onrender.com)  
> **Backend API:** [https://ai-event-planner-backend-6t4n.onrender.com](https://ai-event-planner-backend-6t4n.onrender.com)

---

## <h2 align="left"><font color="#007ACC">🚀 Project Overview</font></h2>

The AI-Powered Event Planner is a sophisticated full-stack platform designed to automate event logistics through **Predictive Neural Insights**. By integrating the **Google Gemini API**, the application analyzes user interests to generate optimized event schedules, themes, and descriptions in real-time.

---

## <h2 align="left"><font color="#007ACC">✨ Core Features</font></h2>

* 🆔 **Neural Identity System:** Secure user authentication with hashed passwords and JWT.
* 🧠 **AI Event Generation:** Leverages Gemini AI to suggest event details based on user interests.
* ⚡ **Real-time Management:** Create, update, and track events with a sleek, futuristic UI.
* 📱 **Responsive Design:** Fully optimized for all devices using Framer Motion and Styled Components.

---

## <h2 align="left"><font color="#007ACC">🛠️ Technical Tech Stack</font></h2>

* **Frontend:** React.js, Styled Components, Framer Motion, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (NoSQL)
* **AI Engine:** Google Gemini AI
* **Deployment:** Render (Frontend & Backend)

---

## <h2 align="left"><font color="#007ACC">📋 API Endpoints</font></h2>

### **Authentication**
* `POST /api/v1/auth/signup` - Registers a new Neural Identity.
* `POST /api/v1/auth/login` - Authenticates user and returns JWT.

### **Events Management**
* `GET /api/v1/events` - Fetches all AI-generated events.
* `POST /api/v1/events` - Creates a new event entry.

---

## <h2 align="left"><font color="#007ACC">🔧 Installation & Local Setup</font></h2>

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Ompraveenkumar/ai-event-planner.git](https://github.com/Ompraveenkumar/ai-event-planner.git)
2.Setup Environment Variables:
Create a .env file in the backend folder:

Code snippet
PORT=5000
MONGO_URL=your_mongodb_uri
GEMINI_API_KEY=your_api_key
JWT_SECRET=your_secret_key

3.Install Dependencies & Start:

Backend:
cd backend && npm install && npm start

Frontend:
cd frontend && npm install && npm start
