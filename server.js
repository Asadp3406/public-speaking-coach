require('dotenv').config();
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const port = 5000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function getAIFeedback(transcript) {
  try {
    const prompt = `
      You are an expert public speaking coach. Analyze the following transcript from a user practicing their speech.
      Provide short, bulleted, constructive feedback in a friendly and encouraging tone.
      Focus on these areas:
      - **Clarity & Conciseness:** Comment on sentence structure and impact.
      - **Filler Words:** Identify filler words (e.g., "um", "ah", "like", "so").
      - **Pacing:** Comment on the perceived speaking speed based on text flow.
      - **Confidence:** Gauge the confidence level from the language used.

      Transcript: "${transcript}"

      Keep the feedback brief, structured, and easy to read.
    `;

    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    return 'An error occurred while fetching feedback from the AI.';
  }
}

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket.');

  ws.on('message', async (message) => {
    const transcript = message.toString();
    console.log('Received transcript:', transcript);
    
    const feedback = await getAIFeedback(transcript);
    
    ws.send(JSON.stringify({ type: 'feedback', data: feedback }));
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Server with WebSocket running on http://localhost:${port}`);
});