# ♟ ChessRivo

Live Demo: https://chessrivo-web.vercel.app

**ChessRivo** is a full-stack real-time chess platform built to provide an interactive online chess experience with secure authentication, multiplayer gameplay, real-time game synchronization, and persistent game state.

The platform uses **Next.js** for the frontend and **Express.js, MongoDB, Socket.IO, and Chess.js** for the backend and real-time chess functionality.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* JWT stored in secure HTTP-only cookies
* Protected authentication routes
* Password verification using bcrypt
* Persistent user authentication
* Logout functionality

### ♟️ Chess Gameplay

* Interactive chess board
* Legal move validation using **Chess.js**
* Complete chess move handling
* FEN-based board state management
* Game state synchronization
* Turn-based gameplay
* Check, checkmate, stalemate and draw detection
* Chess position reconstruction using FEN

### 🌐 Real-Time Multiplayer

* Real-time multiplayer games using **Socket.IO**
* Game rooms for players
* Real-time move synchronization
* Server-side game state management
* Automatic synchronization between connected players
* Real-time game events

### 👤 User Features

* User profiles
* Player statistics
* Games played tracking
* Wins, losses and draws tracking
* Chess rating management
* Player-specific game information

### 🗄️ Data Management

* Persistent user data using MongoDB
* User statistics stored in the database
* Game-related data management
* REST API architecture
* Protected API endpoints

### 📱 Responsive Interface

* Responsive chess interface
* Mobile and desktop support
* Component-based UI architecture
* Tailwind CSS-based styling

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **Tailwind CSS**
* **Axios**
* **Client-Side Rendering**

### Backend

* **Node.js**
* **Express.js**
* **REST APIs**
* **Socket.IO**
* **JWT**
* **bcrypt**
* **cookie-parser**

### Database

* **MongoDB**
* **Mongoose**

### Chess Engine / Logic

* **Chess.js**
* **FEN (Forsyth-Edwards Notation)**

### Development & Deployment

* **Git**
* **GitHub**
* **VS Code**
* **Vercel**
* **Render**

---

## 🏗️ Architecture

ChessRivo follows a client-server architecture.

```text
                         ┌──────────────────────┐
                         │      ChessRivo       │
                         │       Frontend       │
                         │      Next.js         │
                         └──────────┬───────────┘
                                    │
                         REST API / Socket.IO
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Express.js      │
                         │       Backend        │
                         └───────┬───────┬──────┘
                                 │       │
                       ┌─────────┘       └──────────┐
                       ▼                            ▼
              ┌─────────────────┐          ┌─────────────────┐
              │     MongoDB     │          │    Socket.IO    │
              │   User / Data   │          │ Real-time Game  │
              └─────────────────┘          └────────┬────────┘
                                                    │
                                                    ▼
                                             ┌──────────────┐
                                             │   Chess.js   │
                                             │ Chess Logic  │
                                             └──────────────┘
```

---

## 🔄 Authentication Flow

ChessRivo uses JWT authentication with secure HTTP-only cookies.

```text
User
 │
 │ Login
 ▼
Next.js Frontend
 │
 │ POST /api/auth/login
 ▼
Express Backend
 │
 ├── Find User
 ├── Verify Password
 ├── Generate JWT
 │
 ▼
HTTP-only Cookie
 │
 ▼
Browser
 │
 │ Authenticated Request
 ▼
Express Authentication Middleware
 │
 ├── Read JWT from Cookie
 ├── Verify JWT
 └── Attach User Information
```

The authentication token is not directly exposed to client-side JavaScript.

---

## ♟️ Chess State & FEN

ChessRivo uses **Chess.js** to manage chess rules and validate moves.

The board position is represented using **FEN (Forsyth-Edwards Notation)**.

A FEN position contains information such as:

* Piece placement
* Active player
* Castling availability
* En passant target
* Halfmove clock
* Fullmove number

This allows the application to represent and reconstruct a complete chess position from a compact string.

```text
FEN
 │
 ▼
Chess.js
 │
 ├── Reconstruct Position
 ├── Validate Moves
 ├── Determine Game State
 │
 ▼
Updated FEN
 │
 ▼
Socket.IO
 │
 ▼
Opponent's Board
```

Using FEN also makes synchronization of the board state between players more reliable.

---

## 🌐 Real-Time Game Flow

Socket.IO is used for communication between players during an active game.

```text
Player A
   │
   │ Move
   ▼
Socket.IO Server
   │
   ├── Validate / Update Game State
   │
   ▼
Player B
   │
   ▼
Updated Chess Board
```

This avoids relying on repeated HTTP requests for every move and allows both players to receive game updates in real time.

---

## 📁 Project Structure

```text
ChessRivo/
│
├── backend/
│   ├── controllers/
│   │   └── auth.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   │
│   ├── app.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── home/
│   │   ├── play/
│   │   └── room/
│   │
│   ├── components/
│   │
│   ├── lib/
│   │   ├── auth.js
│   │   └── utils.js
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ChessRivo
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

Add any other environment variables required by your deployment configuration.

### Frontend

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

For production, replace the API URL with your deployed backend URL.

---

## ▶️ Running Locally

### Start the backend

```bash
cd backend
npm start
```

or, if a development script is configured:

```bash
npm run dev
```

### Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The Next.js development server will run locally, typically at:

```text
http://localhost:3000
```

---

## 🔒 Security

ChessRivo implements several authentication and security practices:

* JWT authentication
* HTTP-only authentication cookies
* Secure cookies in production
* Password hashing with bcrypt
* Protected backend routes
* Authentication middleware
* CORS configuration
* Environment variables for secrets
* Server-side JWT verification

Sensitive credentials and secrets should never be committed to the repository.

---

## 📡 API & Real-Time Communication

The application uses two primary communication mechanisms.

### REST API

Used for operations such as:

* Authentication
* User information
* Account-related operations
* Persistent data operations

### Socket.IO

Used for:

* Joining game rooms
* Real-time moves
* Game state synchronization
* Player events
* Multiplayer communication

---

## 🧩 Core Technologies

| Technology   | Purpose                          |
| ------------ | -------------------------------- |
| Next.js      | Frontend framework               |
| React        | UI development                   |
| Tailwind CSS | Styling                          |
| Node.js      | Backend runtime                  |
| Express.js   | REST API server                  |
| MongoDB      | Database                         |
| Mongoose     | MongoDB ODM                      |
| Socket.IO    | Real-time communication          |
| Chess.js     | Chess rules and move validation  |
| JWT          | Authentication                   |
| bcrypt       | Password hashing                 |
| Axios        | HTTP communication               |
| FEN          | Chess board state representation |
| Vercel       | Frontend deployment              |
| Render       | Backend deployment               |

---

## 🎯 Project Goals

ChessRivo was developed to combine traditional chess functionality with modern full-stack web technologies.

The primary goals are:

* Build a complete multiplayer chess application
* Implement real-time communication
* Maintain synchronized chess states
* Implement secure authentication
* Use FEN for reliable board-state representation
* Separate frontend, backend and database responsibilities
* Create a scalable foundation for additional chess features

---

## 🔮 Future Improvements

Potential future improvements include:

* Chess game history
* Move history and notation
* Rematch functionality
* Spectator mode
* Advanced player matchmaking
* Chess puzzles
* Opening database
* Game analysis
* ELO/rating improvements
* Notifications
* Tournament functionality
* Improved matchmaking and game discovery

---

## 👨‍💻 Author

**Shahid Ansari**

Full Stack Web Developer focused on building web applications using modern JavaScript technologies.

---

## 📄 License

This project is developed for educational and portfolio purposes.

If you intend to reuse or distribute the project, please check the repository's license and attribution requirements.
