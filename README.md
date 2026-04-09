# 🚌 KIIT SmartBus

**Real-time bus tracking platform for KIIT University** — helping students find buses and drivers share live locations, all from a single modern web application.

---

## 📖 What Is It?

KIIT SmartBus is a full-stack web application that solves a common campus pain point: *"Where is my bus?"*

Students can open the live map and instantly see every active bus on campus — its current GPS location, destination, and seat availability (Empty / Few / Full). Drivers log in, share their GPS location, set their destination and seat tier, and that data streams to all connected students in real time.

---

## ✨ Key Features

| Role | Features |
|---|---|
| 🎓 **Student** | Live map with bus markers, seat tier badges, destination filters, bus detail cards |
| 🚍 **Driver** | One-tap location sharing, destination & seat-tier updates, Driver Mode dashboard |
| 🤖 **All Users** | JoeBot in-app assistant, route schedules, seat availability page, contact page |

- **Real-time updates** via Socket.IO (WebSocket) — no page refresh needed
- **Interactive map** powered by Leaflet + OpenStreetMap
- **Secure auth** with JWT access/refresh tokens, bcrypt hashing, and role-based route guards
- **Email-based password reset** via Nodemailer
- **Rate limiting, CORS, Helmet** for production-ready security

---

## 🏗️ Architecture

```
KIIT_SmartBus_Rough/
├── backend/          # Node.js + Express + TypeScript API server
│   └── src/
│       ├── server.ts         # Entry point — MongoDB connect, HTTP + Socket.IO boot
│       ├── app.ts            # Express app, middleware registration
│       ├── config.ts         # Env-based config (port, DB URI, JWT secrets…)
│       ├── controllers/      # Route handler logic
│       ├── models/           # Mongoose schemas (Bus, User, BusLocation, AuditLog…)
│       ├── routes/           # auth, bus, location, forgotPassword
│       ├── services/         # socket.service.ts — real-time location broadcasting
│       ├── middleware/        # Auth guards, rate limiter, error handler
│       └── utils/            # Shared helpers
│
└── frontend/         # React 19 + Vite + TypeScript SPA
    └── src/
        ├── App.tsx           # Router, layout, role-protected routes
        ├── pages/            # Home, LiveTracker, BusDetail, DriverMode…
        ├── components/       # Navbar, Footer, ProtectedRoute, map components
        ├── context/          # AuthContext (JWT state, login/logout)
        ├── hooks/            # Custom React hooks
        ├── chatbot/          # JoeBot assistant
        └── lib/              # Axios instance, socket client
```

### Data Flow

```
Driver Browser
    │  GPS coords + status (Socket.IO emit)
    ▼
Backend (Express + Socket.IO)  ◄──► MongoDB Atlas
    │  Broadcast location update to all connected clients
    ▼
Student Browsers  →  Leaflet map updates in real time
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v3 |
| **Mapping** | Leaflet.js + React-Leaflet, OpenStreetMap tiles |
| **Real-time** | Socket.IO (client + server) |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT (access + refresh tokens), bcrypt |
| **Validation** | Zod |
| **Logging** | Pino + pino-pretty |
| **Email** | Nodemailer (Ethereal for dev, Gmail/SMTP for prod) |

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher — https://nodejs.org
- **npm** v9 or higher (bundled with Node.js)
- **MongoDB** — either:
  - A local MongoDB instance running on `mongodb://localhost:27017`, **or**
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/KIIT_SmartBus_Rough.git
cd KIIT_SmartBus_Rough
```

---

### 2. Configure the Backend

```bash
cd backend
```

Copy the example environment file and fill in your values:

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Open `backend/.env` and set the following variables:

```env
# Server
NODE_ENV=development
PORT=4000

# Database — replace with your MongoDB Atlas URI or keep local
MONGO_URI=mongodb://localhost:27017/kiit_smartbus

# JWT — change these secrets before deploying!
JWT_ACCESS_SECRET=your_strong_access_secret
JWT_REFRESH_SECRET=your_strong_refresh_secret
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=7d

# CORS — should match your frontend dev URL
CORS_ORIGINS=http://localhost:5173

# Email (for password reset)
# Dev: use Ethereal Email — https://ethereal.email (no real emails sent)
# Prod: use your Gmail App Password
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

> The backend will start at **http://localhost:4000**

---

### 3. Configure the Frontend

Open a new terminal:

```bash
cd frontend
```

The frontend `.env` is already configured for local development (it uses Vite's proxy to forward `/api` and `/socket.io` requests to the backend):

```env
# Leave empty in development — Vite proxy handles it
# Set to your deployed backend URL in production
VITE_API_BASE_URL=
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

> The frontend will start at **http://localhost:5173**

---

### 4. Open the App

Navigate to **http://localhost:5173** in your browser.

| Page | URL | Access |
|---|---|---|
| Home | `/` | Public |
| Live Tracker (map) | `/live-tracker` | Public |
| Bus Detail | `/bus/:busId` | Public |
| Seat Availability | `/seat-availability` | Public |
| Route Schedule | `/route-schedule` | Public |
| Login | `/login` | Public |
| Sign Up | `/signup` | Public |
| Driver Mode | `/driver` or `/driver-mode` | Authenticated (Driver) |
| Profile | `/profile` | Authenticated |
| Contact | `/contact` | Public |

---

## 🧑‍💻 Available Scripts

### Backend (`cd backend`)

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot-reload (`tsx watch`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |
| `npm run lint` | Run ESLint |

### Frontend (`cd frontend`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🗺️ API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | — | Create a new account |
| `POST` | `/api/auth/login` | — | Login, receive JWT tokens |
| `GET` | `/api/auth/me` | ✅ | Get current user profile |
| `POST` | `/api/auth/refresh` | — | Refresh access token |
| `POST` | `/api/auth/logout` | ✅ | Invalidate refresh token |
| `GET` | `/api/buses` | — | List all buses with latest status |
| `GET` | `/api/buses/:id` | — | Get single bus details |
| `POST` | `/api/buses/:id/location` | ✅ Driver | Update bus GPS location |
| `POST` | `/api/buses/:id/status` | ✅ Driver | Update destination & seat tier |
| `POST` | `/api/forgot-password` | — | Send password reset email |

**Real-time**: Socket.IO events are used for live location broadcasting — drivers emit location updates, students receive them instantly.

---

## 🔐 Roles

| Role | Permissions |
|---|---|
| `STUDENT` | View live tracker, bus details, schedules |
| `DRIVER` | All student permissions + update own bus location & status |

---

## 📍 Roadmap

- **Phase 1 (current):** Live tracking, seat tiers, driver dashboard, JWT auth
- **Phase 2:** Geofencing, ETA estimation, stale-bus detection, push notifications
- **Phase 3:** Historical analytics, predictive arrival, SOS/incident workflow, heatmaps

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is for academic and internal university use at KIIT University.