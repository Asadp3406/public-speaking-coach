# AI Presentation & Public Speaking Coach

<p align="center">
  <a href="https://public-speaking-coach.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
</p>

This web application acts as a personal AI-powered coach, providing real-time feedback to help users improve their public speaking, presentation, and communication skills. It actively listens, transcribes, and analyzes speech patterns to offer instant, constructive advice.

![Application Screenshot](/ak.png)



## 🚀 Key Features

- **Real-time Transcription:** Utilizes the browser's Web Speech API to capture and display spoken words as they are said.
- **Live AI Analysis:** Securely streams the transcript to a backend server, which queries the Google Gemini API for in-depth analysis.
- **Constructive Feedback:** Delivers actionable advice on key public speaking metrics:
  - **Filler Word Detection:** Identifies and counts crutch words like "um," "ah," "like," and "so."
  - **Pacing and Flow:** Comments on the perceived speaking speed and rhythm.
  - **Clarity and Confidence:** Analyzes sentence structure and word choice to gauge effectiveness.
- **Modern & Responsive UI:** A clean, intuitive, and mobile-friendly interface built with React and Bootstrap.

---

## ⚙️ How It Works

The application follows a real-time, full-stack architecture to provide instantaneous feedback.

`[User Speaks]` → `[Browser Speech API]` → `[React Frontend]` → `[WebSocket]` → `[Node.js Backend]` → `[Gemini API]` → `[AI Feedback]` → `[WebSocket]` → `[React Frontend]` → `[User Sees Feedback]`

---

## 🛠️ Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Bootstrap](https://getbootstrap.com/)
  - [Axios](https://axios-http.com/)
- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [WebSockets (ws)](https://github.com/websockets/ws)
- **AI:**
  - [Google Gemini API](https://ai.google.dev/)
- **Deployment:**
  - Frontend hosted on [Vercel](https://vercel.com/)
  - Backend hosted on [Render](https://render.com/)

---

## 🔧 Getting Started: Local Setup

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Installation Guide

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/public-speaking-coach.git](https://github.com/your-username/public-speaking-coach.git)
    cd public-speaking-coach
    ```

2.  **Install Backend Dependencies:**
    (From the root `public-speaking-coach` directory)
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

4.  **Set Up Environment Variables:**
    - Go back to the root project directory (`cd ..`).
    - Create a file named `.env` in the root.
    - Open the `.env` file and add your Google Gemini API key:
      ```
      GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```

5.  **Run the Application:**
    You will need two separate terminals open to run both the backend and frontend servers.

    - **Terminal 1: Run the Backend Server**
      (From the root `public-speaking-coach` directory)
      ```bash
      node server.js
      ```
      _Your backend will be running at `http://localhost:5000`._

    - **Terminal 2: Run the Frontend App**
      (From the `frontend` directory)
      ```bash
      npm start
      ```
      _Your React application will open automatically at `http://localhost:3000`._

---

## 📜 License

This project is open-source and distributed under the MIT License. See the `LICENSE` file for more information.

---

## 👤 Contact

Asad Pathan - [GitHub @Asadp3406](https://github.com/your-username)

_Project Link: [https://github.com/your-username/public-speaking-coach](https://github.com/your-username/public-speaking-coach)_
