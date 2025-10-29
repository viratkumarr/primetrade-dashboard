<p align="left">
  © 2025 Virat Kumar | Built with ❤️ using React.js, Node.js, Express & MongoDB by Virat
</p>

<div align="center">
  <h2>🪙 PrimeTrade-Dashboard</h2>
  <p>
    A fully responsive full-stack web application built for the <strong>Primetrade.ai Frontend Developer Internship</strong> task — featuring authentication, dashboard, CRUD operations, and secure backend integration.
  </p>

  ![image alt](https://github.com/ViratKumarr/PrimeTrade-Dashboard/blob/ed3658856ea687c80d9fe5238218b65fe81136cb/Screenshot%202025-10-30%20000035.png)
</div>

---

## 📌 Project Overview
**PrimeTrade-Dashboard** demonstrates secure, scalable, and production-ready full-stack engineering using **React.js + TailwindCSS** for the frontend and **Node.js + Express + MongoDB** for the backend.

This project was developed as a submission for the **Frontend Developer Intern Assignment** at **Primetrade.ai**, focusing on real-world authentication, data CRUD, and responsive UI/UX design.

---

## ✨ Highlights & Features

### ⚙️ Stack
- **Frontend:** Next.js (App Router) + TailwindCSS, Axios (with credentials)
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Authentication:** JWT via httpOnly cookie
- **Password Encryption:** bcrypt

---

### 🔐 Authentication & Authorization
- Signup, Login, Logout with **bcrypt-hashed passwords**
- **JWT middleware** protects `/profile` and `/notes` routes
- Cookie-based sessions with secure CORS configuration
- **Show/Hide password** toggle in all password fields

---

### 📊 Dashboard
- **CRUD Operations:** Create, read, inline edit, and delete notes  
- **Search & Highlight:** Matching notes bubble to the top and highlight in red; “Clear” restores default view  
- **Pagination:** Efficient listing with `page` and `limit` parameters  
- **Smooth UI:** Skeleton loaders and refined contrast for better readability  
- **Fully responsive:** Optimized for desktop, tablet, and mobile layouts  

---

### 👤 Profile Management
- View and edit **profile details**  
- Change **name/email/password** with intelligent redirect logic:
  - Editing **username only** → stay logged in  
  - Editing **email or password** → auto logout and redirect to login  
- “Back to Dashboard” quick-access button  
- Client + server-side validation for all updates  

---

### 🧩 API Endpoints
| Type | Endpoint | Description |
|------|-----------|-------------|
| **Auth** | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout` | Authentication routes |
| **Profile** | `GET /api/profile`, `PUT /api/profile`, `PUT /api/profile/password` | Fetch & update profile |
| **Notes** | `GET /api/notes?q=&page=&limit=`, `POST /api/notes`, `PUT /api/notes/:id`, `DELETE /api/notes/:id` | Notes CRUD |
| **Health** | `GET /api/health` | API health check |

---

### 🧠 UX & Accessibility
- High-contrast color scheme for readability  
- Password visibility toggles for better usability  
- Toast notifications for all major actions (login, update, delete)  
- Global footer on every page:  
  > © 2025 Virat Kumar. All rights reserved. Made with ❤️ by VIRAT  
- Fully responsive layouts with adaptive stacking for smaller devices  

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)
![Axios](https://img.shields.io/badge/Axios-API--Client-green)
- Next.js (App Router)
- TailwindCSS for styling
- Axios for API integration
- React Router for protected routes

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing

---

## 🚀 Getting Started

### Prerequisites
Ensure you have:
- Node.js v18+
- MongoDB Atlas or Local instance
- npm or yarn

### Steps
```bash
# Clone repository
git clone https://github.com/ViratKumarr/PrimeTrade-Dashboard.git

# Setup Backend
cd server
npm install
npm run dev

# Setup Frontend
cd ../client
npm install
npm run dev
