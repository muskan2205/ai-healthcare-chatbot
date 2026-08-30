# 🩺 AI Healthcare Chatbot

An intelligent, full-stack conversational healthcare assistant powered by **Google Gemini**, **FastAPI**, and **React**. The application provides structured health advice, home remedies, context-aware conversations, and emergency safety disclaimers.

---

## 📸 Architecture
ai-healthcare-chatbot/
│
├── frontend/                # React (Vite) User Interface
│   ├── src/                 # Chat components, styles, and API handlers
│   ├── public/              # Static assets
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite build configuration
│
├── main.py                  # FastAPI backend server with Gemini API integration
├── .gitignore               # Ignored system & secret files
└── README.md                # Project documentation
## ✨ Features

* **Contextual Memory:** Retains prior symptom context across the entire conversation.
* **Symptom Triage & Guidance:** Suggests practical home remedies and lifestyle adjustments.
* **Emergency Disclaimer Banner:** Directly warns users to seek emergency services when critical symptoms arise.
* **Quick-Prompt Suggestions:** Fast shortcuts for common healthcare questions.
* **Markdown Support:** Renders bold text, itemized lists, and structured remedies clearly.
* **Secure Environment:** Protects Gemini API keys via `.env` configuration.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Lucide React, Axios, React-Markdown, CSS3
* **Backend:** FastAPI, Uvicorn, Pydantic, Python-Dotenv
* **LLM Engine:** Google Gemini API (`google-genai` SDK)

---

## 🚀 Getting Started

### 1. Clone the Repository
bash
git clone [https://github.com/muskan2205/ai-healthcare-chatbot.git](https://github.com/muskan2205/ai-healthcare-chatbot.git)
cd ai-healthcare-chatbot
#BACKEND SETUP
# Install Python dependencies
pip install fastapi uvicorn google-genai python-dotenv pydantic

# Create a .env file and add your Gemini API Key
# GEMINI_API_KEY=your_gemini_api_key_here

# Run the FastAPI server
uvicorn main:app --reload --port 8000
3. Frontend Setup
# Open a new terminal and navigate to frontend
cd frontend

# Install Node dependencies
npm install

# Start the frontend development server
npm run dev
Open http://localhost:5173 in your browser to start chatting

Disclaimer
This chatbot is designed strictly for educational and informational purposes. It does not provide official medical diagnoses, treatment plans, or emergency interventions. Always consult a qualified medical professional for health concerns.


```bash
git clone [https://github.com/muskan2205/ai-healthcare-chatbot.git](https://github.com/muskan2205/ai-healthcare-chatbot.git)
cd ai-healthcare-chatbot
