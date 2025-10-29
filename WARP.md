# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Full-stack app split into `backend/` (Node.js + Express + MongoDB) and `frontend/` (Next.js + TailwindCSS).
- Auth via JWT set in an httpOnly cookie; protected API routes enforce auth.

Common commands
- Install dependencies
  - Backend
    ```bash path=null start=null
    cd backend; npm install
    ```
  - Frontend
    ```bash path=null start=null
    cd frontend; npm install
    ```
- Development
  - Start backend (requires `backend/.env`)
    ```bash path=null start=null
    cd backend; npm run dev
    ```
  - Start frontend (defaults to http://localhost:3000)
    ```bash path=null start=null
    cd frontend; npm run dev
    ```
- Build/serve
  - Backend (no build step)
    ```bash path=null start=null
    cd backend; npm start
    ```
  - Frontend
    ```bash path=null start=null
    cd frontend; npm run build && npm start
    ```
- Lint (frontend only)
  - Lint all
    ```bash path=null start=null
    cd frontend; npm run lint
    ```
  - Lint a single file
    ```bash path=null start=null
    cd frontend; npx eslint app/login/page.jsx
    ```
- API health check
  ```bash path=null start=null
  curl -i http://localhost:5000/api/health
  ```
- Tests
  - No test scripts are configured in either package; add them before attempting to run tests.

Environment
- Backend (`backend/.env` based on `.env.example`)
  - `PORT` (default 5000)
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `CORS_ORIGIN` (e.g., http://localhost:3000)
  - `NODE_ENV`
- Frontend
  - `NEXT_PUBLIC_API_BASE` (defaults to `http://localhost:5000` if unset), used by `frontend/lib/api.js` and requests include `withCredentials: true`.

High-level architecture
- Backend
  - Entry: `backend/src/server.js`
    - Middleware: `express.json()`, `cookie-parser`, `morgan`, `cors({ origin: CORS_ORIGIN, credentials: true })`.
    - Routes:
      - `/api/auth` → `controllers/authController.js` (register, login, logout). Sets cookie `token` with JWT.
      - `/api/profile` (GET) → `middleware/auth.js` → `controllers/profileController.js`.
      - `/api/notes` (GET/POST/PUT/DELETE) → `middleware/auth.js` → `controllers/noteController.js`.
    - DB: connects to MongoDB with Mongoose; models in `src/models/{User,Note}.js` with timestamps and owner relations.
  - Auth flow
    - `middleware/auth.js` extracts JWT from `req.cookies.token` or `Authorization: Bearer <token>` and sets `req.userId`.
    - Cookie config in `authController` uses `httpOnly`, `sameSite: 'lax'`, `secure: NODE_ENV==='production'`.
- Frontend
  - App Router (Next 16): pages in `frontend/app/` — `login/`, `register/`, `dashboard/`, and root `page.tsx`; layout in `app/layout.tsx` and styles in `app/globals.css`.
  - API client: `frontend/lib/api.js` wraps Axios with `baseURL=NEXT_PUBLIC_API_BASE` and `withCredentials: true` so cookies are sent.
  - Flows
    - Login/Register: POST to `/api/auth/*`, then client-side navigate to `/dashboard`.
    - Dashboard: on mount, GET `/api/profile`; on 401 redirects to `/login`; CRUD against `/api/notes` with optional `q` search param (regex title/content).

Notes and gotchas
- Cross-site cookies: with different origins (3000 → 5000), `SameSite: 'lax'` cookies are typically not sent on XHR/fetch. If you see unexpected 401s despite successful login, consider adjusting cookie options (e.g., `sameSite: 'none'` and `secure` handling for local dev) and ensure CORS `credentials: true` and `Access-Control-Allow-Credentials` are correct on the API.
- `backend/package.json` appears malformed (duplicate trailing JSON after line 27). If `npm install` fails, inspect and fix that file before proceeding.
- The repo mentions dockerization in README, but no Dockerfile/compose files are present.

Key files
- Backend: `backend/src/server.js`, `backend/src/middleware/auth.js`, `backend/src/controllers/*`, `backend/src/models/*`.
- Frontend: `frontend/app/*`, `frontend/lib/api.js`, `frontend/eslint.config.mjs`, `frontend/tsconfig.json`.
