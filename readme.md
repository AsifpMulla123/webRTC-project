WebRTC Video Call App

A simple peer-to-peer (P2P) video calling application using WebRTC, React (Vite), TailwindCSS, Node.js, Express, and Socket.io.

This project enables two users to connect and have a real-time video call without requiring an external media server.

---

✨ Features

✅ Peer-to-peer (P2P) video calling using WebRTC
✅ Socket.io for real-time signaling
✅ Uses Google STUN servers for NAT traversal
✅ Built with React (Vite) + TailwindCSS for frontend
✅ Uses Express.js + Socket.io for backend

---

📁 Project Structure

webrtc-app/
│── client/ # Frontend (React + Vite + TailwindCSS)
│── server/ # Backend (Node.js + Express + Socket.io)
│── README.md # Documentation
│── package.json # Root package file

---

🚀 Installation and Setup

1️⃣ Clone the Repository

git clone https://github.com/AsifpMulla123/webRTC-project.git
cd webrtc-app

2️⃣ Set Up the Backend (Server)

cd server
npm install
node index.js

Server will start on: http://localhost:5000

---

3️⃣ Set Up the Frontend (Client)

cd ../client
npm install
npm run dev

Frontend will start on: http://localhost:5173

---

🛠️ Usage

1. Open two different devices or browsers.

2. Go to http://localhost:5173 on both.

3. Click "Start Call" on both devices.

4. The video should start streaming between the two devices.

---

🔗 Technologies Used

React (Vite) - Frontend UI

TailwindCSS - Styling

Node.js + Express.js - Backend server

Socket.io - WebRTC signaling

WebRTC API - Peer-to-peer video communication

Google STUN Servers - NAT traversal

---

🛠️ Troubleshooting

❌ Remote video is not appearing?

✅ Open Developer Console (F12 → Console) and check if ICE candidates are exchanged.
✅ Ensure both users click "Start Call".

❌ App is not accessible on another device?

✅ Replace localhost with your local network IP (e.g., 192.168.x.x:5000) in server/index.js and WebRTC.jsx.
✅ Open your firewall settings and allow connections on port 5000 and 5173.

---

📜 License

This project is MIT Licensed. Feel free to use and modify it. 🚀

---

👨‍💻 Author

Developed by Asif Mulla
