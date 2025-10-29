# Primetrade.ai Scalable Web App

This project implements a scalable full-stack web application for a Frontend Developer Internship task at Primetrade.ai.

Stack:
- Frontend: Next.js + TailwindCSS
- Backend: Node.js + Express + MongoDB (Mongoose)
- Auth: JWT (httpOnly cookie)

Features
- User signup/login/logout
- Protected routes and dashboard
- Profile fetch from backend
- Notes CRUD with search/filter
- Responsive UI

Getting Started
- Backend env: copy `backend/.env.example` to `backend/.env` and fill values
- Start backend: `npm run dev` in `backend`
- Start frontend: `npm run dev` in `frontend`

Security & Scalability
- Use environment-based configs via `.env`
- CORS: only frontend origin allowed
- Password hashing: bcrypt
- JWT middleware for protected routes
- Error handling and validation on both sides
- Dockerization for reproducible deploys
- Horizontal scaling via load balancer and stateless API
- Managed MongoDB (Atlas) and CDN for frontend assets

Project Structure
```
primetrade-task/
├── frontend/
│   ├── app/ (login, register, dashboard)
│   ├── components/
│   ├── lib/api.js
│   ├── styles/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── controllers/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── logs/
├── postman_collection.json
└── README.md
```
