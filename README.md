# Zenris - Full-Stack Task and Project Management Dashboard

Zenris is a dynamic project and task management platform built to streamline developer workflows. This full-stack application features a clean, interactive user interface paired with a secure cloud database, allowing users to manage projects and track tasks in real time.

---

## Features

### Secure User Authentication
- Dynamic Sign Up and Login powered by Supabase Auth.
- Custom user registration capturing Full Name saved via User Metadata.
- Protected routes and session management ensuring workspace privacy.
- Profile visibility displaying active user details in Account Settings.

### Robust Project Management
- Full CRUD operations to create, view, and delete projects.
- Instant, non-blocking UI state updates synced directly with the database.

### Interactive Task Board (Kanban)
- Seamlessly create tasks and link them to specific parent projects.
- Categorized multi-column board navigation (To Do, In Progress, Done).
- Cascade delete handling, meaning deleting a project automatically purges all related tasks.

---

## Tech Stack

- Frontend: React.js, React Router V6, Modern CSS
- Backend and Database: Supabase (PostgreSQL), Row Level Security (RLS)
- State Management: React Hooks (useState, useEffect)

---

## Getting Started

### 1. Prerequisites
Make sure you have Node.js installed on your machine.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone [https://github.com/HaifaaGhaleb26/zenris.git](https://github.com/HaifaaGhaleb26/zenris.git)
cd zenris
npm install