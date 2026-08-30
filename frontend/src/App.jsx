
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Stethoscope, AlertTriangle } from 'lucide-react';

const SUGGESTIONS = [
  'Cold & Flu Home Remedies',
  'Managing a Mild Fever',
  'Foods to soothe an upset stomach',
  'Headache relief techniques',
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your AI Healthcare Assistant. Describe your symptoms or select a common topic below.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (textToSend) => {
    const text = textToSend.trim();
    if (!text || loading) return;

    const userMessage = { sender: 'user', text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat', {
        messages: updatedMessages,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Error connecting to the backend server. Please verify Uvicorn is running.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Stethoscope size={28} color="#0284c7" />
          <h2 style={styles.headerTitle}>AI Healthcare Assistant</h2>
        </div>
      </header>

      {/* Emergency Disclaimer Banner */}
      <div style={styles.emergencyBanner}>
        <AlertTriangle size={18} color="#b91c1c" style={{ flexShrink: 0 }} />
        <span>
          <strong>Emergency Disclaimer:</strong> If you or someone else is experiencing chest pain, severe bleeding, or difficulty breathing, call emergency services immediately.
        </span>
      </div>

      <main style={styles.chatContainer}>
        <div style={styles.messageList}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.sender === 'bot' && (
                <div style={{ ...styles.avatar, backgroundColor: '#e0f2fe' }}>
                  <Bot size={18} color="#0284c7" />
                </div>
              )}
              <div
                style={{
                  ...styles.bubble,
                  ...(msg.sender === 'user' ? styles.userBubble : styles.botBubble),
                }}
              >
                {msg.sender === 'bot' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
              {msg.sender === 'user' && (
                <div style={{ ...styles.avatar, backgroundColor: '#e2e8f0' }}>
                  <User size={18} color="#475569" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ ...styles.messageRow, justifyContent: 'flex-start' }}>
              <div style={{ ...styles.avatar, backgroundColor: '#e0f2fe' }}>
                <Bot size={18} color="#0284c7" />
              </div>
              <div style={{ ...styles.bubble, ...styles.botBubble, fontStyle: 'italic', color: '#64748b' }}>
                Analyzing symptoms with AI...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div style={styles.chipContainer}>
          {SUGGESTIONS.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendMessage(suggestion)}
              disabled={loading}
              style={styles.chip}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleFormSubmit} style={styles.inputForm}>
          <input
            type="text"
            placeholder="Type your symptoms (e.g., severe headache, fever)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" disabled={loading || !input.trim()} style={styles.sendButton}>
            <Send size={18} />
          </button>
        </form>
      </main>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    margin: 0,
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '14px 24px',
  },
  headerContent: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.25rem',
    color: '#0f172a',
    fontWeight: 600,
  },
  emergencyBanner: {
    backgroundColor: '#fef2f2',
    borderBottom: '1px solid #fee2e2',
    color: '#991b1b',
    padding: '10px 16px',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    paddingRight: '6px',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '75%',
    padding: '10px 14px',
    borderRadius: '16px',
    fontSize: '0.92rem',
    lineHeight: 1.5,
  },
  userBubble: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    borderBottomRightRadius: '4px',
  },
  botBubble: {
    backgroundColor: '#ffffff',
    color: '#1e293b',
    borderBottomLeftRadius: '4px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
  },
  chipContainer: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    padding: '8px 0',
    whiteSpace: 'nowrap',
  },
  chip: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '20px',
    padding: '6px 12px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  inputForm: {
    display: 'flex',
    gap: '10px',
    paddingTop: '6px',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: '#ffffff',
  },
  sendButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 18px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
  },
};