# 🩺 AI Healthcare Chatbot

An intelligent, full-stack healthcare assistant built with **FastAPI**, **React (Vite)**, and **Google Gemini 3.6 Flash**. It provides conversational health insights, home remedy guidance, symptom context memory, and safety disclaimers.

---

## ✨ Features
* **Multi-Turn Context Memory:** Retains prior symptom context across the entire conversation session.
* **Markdown Formatting:** Neatly renders medical lists, step-by-step remedies, and emphasized text.
* **Emergency Disclaimer Banner:** Direct safety alerts for urgent medical conditions.
* **Quick-Prompt Suggestion Chips:** One-click shortcuts for common health queries.
* **Secure API Configuration:** Manages secrets safely via environment variables.

---

## 🛠️ Tech Stack
* **Frontend:** React, Vite, Lucide Icons, Axios, React-Markdown
* **Backend:** FastAPI, Uvicorn, Pydantic, Python-Dotenv
* **AI Model:** Google Gemini 3.6 Flash (`google-genai` SDK)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/muskan2205/ai-healthcare-chatbot.git](https://github.com/muskan2205/ai-healthcare-chatbot.git)
cd ai-healthcare-chatbot
