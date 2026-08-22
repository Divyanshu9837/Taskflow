# TaskFlow Frontend

A React + TypeScript + Tailwind CSS frontend for TaskFlow, a task management app with a drag-and-drop Kanban board. Connects to the [TaskFlow Spring Boot backend](../taskflow-backend).

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router (client-side routing)
- Native HTML5 drag-and-drop for the Kanban board (no extra library)

## Design
- **Colors**: deep flow-blue (`#2952E3`) primary, near-black ink (`#101828`) text, soft white/blue-grey surfaces. Priority accents: slate (low), amber (medium), red (high). Status accents: slate/blue/emerald for To Do / In Progress / Done.
- **Type**: Space Grotesk for headings and the logo, Inter for body/UI text.
- **Signature details**: each task card carries a colored left stripe for its priority, and each Kanban column header has an animated gradient "flow line" underline — a nod to the product name.

## Prerequisites
- Node.js 18+ and npm
- The [TaskFlow backend](../taskflow-backend) running on `http://localhost:8080`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The app will start on `http://localhost:5173`.

By default it talks to the backend at `http://localhost:8080/api`. Change `VITE_API_BASE_URL` in `.env` if your backend runs elsewhere.

## Project Structure
```
src/
├── api/            # fetch wrapper + auth/task API calls
├── components/     # Sidebar, KanbanBoard, KanbanColumn, TaskCard, TaskModal, FilterBar
├── context/         # AuthContext (login state, JWT storage)
├── pages/           # LoginPage, SignupPage, DashboardPage, ProfilePage
├── types/           # shared TypeScript types matching backend DTOs
├── App.tsx          # routes
└── main.tsx          # entry point
```

## Features
- Sign up / log in / log out with JWT stored in `localStorage`
- Protected routes — dashboard and profile require login
- Kanban board: drag task cards between To Do / In Progress / Done columns
- Click a card to edit or delete a task
- Filter by status or priority, and search by keyword
- Fully responsive (columns stack vertically on mobile, sidebar collapses)

## Build for production
```bash
npm run build
```
Output goes to `dist/` — deploy it to any static host (Vercel, Netlify, etc.) and set `VITE_API_BASE_URL` to your deployed backend's URL.

## Connecting to the backend
Make sure the Spring Boot backend's CORS config (`SecurityConfig.java`) includes this frontend's origin (`http://localhost:5173` is already allowed by default).
