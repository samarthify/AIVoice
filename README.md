# Real-Time Voice Communication Platform

A basic real-time voice calling platform built with React, Next.js, Node.js, WebRTC, and Docker. This project demonstrates peer-to-peer audio calls with a minimal UI, real-time signaling, and persistent session data storage using MongoDB and PostgreSQL.

---

## Features

- **Real-Time Voice Calls:** Peer-to-peer audio communication using WebRTC.
- **Minimal UI:** Simple React/Next.js interface for initiating and managing calls.
- **Real-Time Signaling:** Socket.io-based signaling server for call setup.
- **Database Storage:** MongoDB for call/session data and PostgreSQL for analytics.
- **Containerized Deployment:** Docker and Docker Compose for easy setup and orchestration.

---

## Tech Stack

- **Frontend:** React, Next.js, TypeScript, Material-UI
- **Backend:** Node.js, Express, Socket.io
- **Databases:** MongoDB, PostgreSQL
- **DevOps:** Docker, Docker Compose

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose
- [npm](https://www.npmjs.com/)

### Environment Variables

#### Backend (`server/.env`)
```
PORT=3001
MONGODB_URI=mongodb://mongo:27017/voiceplatform
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=voiceplatform
POSTGRES_PORT=5432
JWT_SECRET=your-jwt-secret
```

#### Frontend (`client/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Installation & Running (Docker Recommended)

1. **Clone the repository:**
    ```
    git clone 
    cd voice-platform
    ```

2. **Start all services with Docker Compose:**
    ```
    docker compose up -d
    ```

3. **Access the application:**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:3001](http://localhost:3001)

---

## Project Structure

```
voice-platform/
├── client/      # React/Next.js frontend
│   └── src/
│       ├── components/
│       ├── services/
│       ├── ...
├── server/      # Node.js/Express backend
│   └── src/
│       ├── routes/
│       ├── models/
│       ├── ...
├── docker-compose.yml
```

---

## Usage

- Open the app in your browser.
- Enter a user ID and start a voice call.
- Allow microphone access when prompted.
- Use two browser windows or devices to test real-time calling.

---

## Notes

- This is a quick-start, minimal implementation for demonstration and learning purposes.
- For production use, add authentication, error handling, security enhancements, and production-grade deployment settings.

---

## License

[MIT](LICENSE)
```

---
