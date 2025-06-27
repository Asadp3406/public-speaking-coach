import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
}

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('Click "Start Session" to begin your practice.');
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  
  const socket = useRef(null);

  useEffect(() => {
    if (!recognition) {
      setStatus('Speech Recognition is not supported by this browser. Please use Google Chrome.');
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
        setStatus('Session stopped. Click Start to begin again.');
      }
    };
  }, [isListening]);

  const toggleListen = () => {
    if (isListening) {
      recognition.stop();
      if(socket.current) socket.current.close();
    } else {
      setTranscript('');
      setFeedback('');
// Replace "ai-coach-backend.onrender.com" with YOUR actual Render URL
socket.current = new WebSocket('https://public-speaking-coach.onrender.com');
      socket.current.onopen = () => {
        recognition.start();
        setIsListening(true);
        setStatus('Listening...');
      };

      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if(message.type === 'feedback') {
          setFeedback(prev => `${prev}\n\n${message.data}`);
          setIsLoadingFeedback(false);
        }
      };

      socket.current.onclose = () => {
        if (isListening) {
          recognition.stop();
        }
      };
    }
  };

  return (
    <div className="container my-5">
      <div className="card text-center p-4">
        
        <header className="mb-4">
          <h1 className="display-5">AI Presentation Coach</h1>
          <p className="lead text-muted">Your personal assistant for powerful public speaking.</p>
        </header>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <button onClick={toggleListen} className={`btn ${isListening ? 'btn-danger' : 'btn-primary'} btn-lg px-5`}>
            {isListening ? 'Stop Session' : 'Start Session'}
          </button>
        </div>
        
        <p className={`status-text mb-4 ${isListening ? 'listening' : ''}`}>{status}</p>

        <div className="row text-start">
          <div className="col-md-6 mb-4 mb-md-0">
            <h4 className="mb-3">Your Transcript</h4>
            <div className="analysis-box">
              {transcript || "Your spoken text will appear here..."}
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="mb-3 d-flex align-items-center">
              AI Coach Feedback
              {isLoadingFeedback && <div className="spinner-border text-primary ms-3" role="status"></div>}
            </h4>
            <div className="analysis-box">
              <pre>{feedback || "Live feedback from the AI will appear here..."}</pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;