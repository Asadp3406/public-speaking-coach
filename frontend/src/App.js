import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FiMic, FiStopCircle, FiLoader, FiMessageSquare, FiFileText, FiPlay, FiCpu } from 'react-icons/fi';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
}

function App() {
  const [appState, setAppState] = useState('welcome'); // 'welcome' or 'coaching'
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [status, setStatus] = useState('Click the microphone to start your session.');
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  
  const socket = useRef(null);
  const feedbackEndRef = useRef(null);

  useEffect(() => {
    if (!recognition) {
      setStatus('Speech Recognition is not supported. Please use Google Chrome for the best experience.');
      return;
    }

    recognition.onresult = (event) => {
      const newTranscript = event.results[event.results.length - 1][0].transcript.trim();
      setTranscript(prev => `${prev} ${newTranscript}.`);
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(newTranscript);
        setIsLoadingFeedback(true);
      }
    };

    recognition.onend = () => {
      if (isListening) {
        setIsListening(false);
        setStatus('Session ended. Click the microphone to start again.');
      }
    };
  }, [isListening]);

  useEffect(() => {
    feedbackEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [feedback]);

  const startCoaching = () => {
    setAppState('coaching');
  };

  const toggleListen = () => {
    if (isListening) {
      recognition.stop();
      if(socket.current) socket.current.close();
    } else {
      setTranscript('');
      setFeedback([]);
      setStatus('Connecting to the coach...');
      
      // === THIS LINE IS NOW CORRECTLY POINTING TO YOUR LIVE BACKEND ===
      socket.current = new WebSocket('wss://public-speaking-coach.onrender.com'); 

      socket.current.onopen = () => {
        recognition.start();
        setIsListening(true);
        setStatus('Listening...');
      };

      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if(message.type === 'feedback') {
          setFeedback(prev => [...prev, message.data]);
          setIsLoadingFeedback(false);
        }
      };

      socket.current.onclose = () => {
        if (isListening) {
          recognition.stop();
        }
      };

      socket.current.onerror = () => {
        setStatus('Could not connect to coach. Please refresh and try again.');
        setIsListening(false);
      }
    }
  };

  if (appState === 'welcome') {
    return (
      <div className="app-wrapper">
        <div className="app-container">
          <div className="coach-card welcome-screen">
            <h1>AI Presentation Coach</h1>
            <p>Welcome! Get ready to improve your public speaking with instant, AI-powered feedback. When you're ready, press the button below to begin.</p>
            <button onClick={startCoaching}>
              <FiPlay />
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className={`coach-card ${isListening ? 'listening-active' : ''}`}>
          <header className="header">
            <h1>Live Coaching Session</h1>
          </header>

          <div className="controls">
            <button onClick={toggleListen} className={isListening ? 'stop-button' : ''}>
              {isListening ? <FiStopCircle /> : <FiMic />}
              {isListening ? 'Stop Session' : 'Start Session'}
            </button>
          </div>

          <div className="status-indicator">
            {isListening && !isLoadingFeedback && <FiMic />}
            {isLoadingFeedback && <FiLoader className="spinner" />}
            <span style={{ marginLeft: '0.5rem' }}>{status}</span>
          </div>

          <div className="results-grid">
            <div className="transcript-section">
              <h4><FiFileText /> Your Transcript</h4>
              <div className="transcript-box">
                {transcript || "Your spoken text will appear here..."}
              </div>
            </div>
            <div className="feedback-section">
              <h4><FiMessageSquare /> AI Coach Feedback</h4>
              <div className="feedback-stream">
                {feedback.length === 0 && !isLoadingFeedback && <p>Feedback will appear here as you speak.</p>}
                {feedback.map((item, index) => (
                  <div key={index} className="feedback-bubble">
                    <div className="feedback-avatar"><FiCpu /></div>
                    <div className="feedback-content"><pre>{item}</pre></div>
                  </div>
                ))}
                <div ref={feedbackEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;