import os
from typing import List
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = (
    "You are a helpful and empathetic AI Healthcare Assistant. "
    "Provide clear, informative advice for symptoms, suggest safe home remedies, "
    "and strongly emphasize consulting a medical doctor for severe or persistent issues. "
    "Always clarify you are an AI, not a doctor."
)

class MessageItem(BaseModel):
    sender: str
    text: str

class ChatHistoryRequest(BaseModel):
    messages: List[MessageItem]

@app.post("/api/chat")
async def chat_endpoint(request: ChatHistoryRequest):
    if not request.messages:
        return {"reply": "Please enter a valid message."}

    if not api_key:
        return {"reply": "⚠️ API Key not found in .env file."}

    try:
        client = genai.Client(api_key=api_key)

        # Convert chat history to Gemini's expected role/content structure
        contents = []
        for msg in request.messages:
            role = "user" if msg.sender == "user" else "model"
            contents.append(
                types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=msg.text)]
                )
            )

        # Generate response with conversation history and system instructions
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT
            ),
        )
        return {"reply": response.text}
    except Exception as e:
        print("Backend Error:", str(e))
        return {"reply": f"AI Generation Error: {str(e)}"}