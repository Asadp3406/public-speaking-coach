# AI Presentation & Public Speaking Coach

![AI Coach UI](/ak.png)

A real-time, AI-powered web application designed to help users improve their public speaking and presentation skills. It provides live feedback on speech patterns, clarity, and confidence by leveraging advanced speech-to-text and language model APIs.

---

## 🚀 Key Features

- **Real-time Transcription:** Captures and transcribes your speech as you talk.
- **Live AI Analysis:** Streams the transcript to a Large Language Model (like Google's Gemini) for instant analysis.
- **Constructive Feedback:** Provides feedback on key public speaking metrics:
  - **Filler Words:** Identifies crutch words like "um," "ah," "like," etc.
  - **Pacing & Flow:** Comments on the perceived speed and flow of the speech.
  - **Clarity & Confidence:** Analyzes sentence structure and word choice.
- **Modern UI:** A clean, responsive, and user-friendly interface built with React and Bootstrap.

---

## 🛠️ Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Bootstrap](https://getbootstrap.com/)
  - [Axios](https://axios-http.com/)
  - Web Speech API (for browser-based speech recognition)
- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [WebSockets (ws)](https://github.com/websockets/ws)
- **AI:**
  - [Google Gemini API](https://ai.google.dev/)

---

## 🔧 Getting Started: Local Setup

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/public-speaking-coach.git](https://github.com/your-username/public-speaking-coach.git)
    cd public-speaking-coach
    ```

2.  **Install Backend Dependencies:**
    (In the root `public-speaking-coach` directory)
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

4.  **Set up Environment Variables:**
    - Go back to the root directory.
    - Create a `.env` file by copying the example: `cp .env.example .env` (or create it manually).
    - Open the `.env` file and add your Google Gemini API key:
      ```
      GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```

5.  **Run the Application:**
    - **Run the Backend Server:** (In the root directory)
      ```bash
      node server.js
      ```
    - **Run the Frontend App:** (In the `frontend` directory, in a separate terminal)
      ```bash
      npm start
      ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.