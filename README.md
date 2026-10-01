# CRUD Demo — React + Node.js + MySQL (phpMyAdmin)

A full-stack CRUD application for managing users.

---

## Project Structure

```
fullstackdemo/
├── backend/
│   ├── routes/
│   │   └── users.js      ← All CRUD route handlers
│   ├── db.js             ← MySQL connection pool
│   ├── server.js         ← Express app entry point
│   ├── database.sql      ← SQL to create DB & table in phpMyAdmin
│   ├── .env              ← DB credentials (edit this)
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── userApi.js       ← Axios API calls
    │   ├── components/
    │   │   ├── UserForm.jsx     ← Create / Edit form
    │   │   └── UserTable.jsx    ← Users list table
    │   ├── App.jsx              ← Main component + state
    │   ├── App.css              ← Styles
    │   └── index.js             ← React entry point
    └── package.json
```

---

## Setup Steps

### 1 — Database (phpMyAdmin)

1. Open **phpMyAdmin** (usually `http://localhost/phpmyadmin`)
2. Click **SQL** tab
3. Paste and run the contents of `backend/database.sql`
4. This creates the `crud_demo` database and `users` table

### 2 — Backend (Node.js)

```bash
cd backend

# Install dependencies
npm install

# Edit .env if your MySQL password is not empty
# DB_PASSWORD=yourpassword

# Start the server
npm run dev        # with auto-reload (nodemon)
# or
npm start          # production
```

Server runs at **http://localhost:5000**

### 3 — Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm start
```

App opens at **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint         | Description       |
|--------|-----------------|-------------------|
| GET    | /api/users       | Get all users     |
| GET    | /api/users/:id   | Get one user      |
| POST   | /api/users       | Create user       |
| PUT    | /api/users/:id   | Update user       |
| DELETE | /api/users/:id   | Delete user       |

### Request Body (POST / PUT)
```json
{
  "name":  "Alice Johnson",
  "email": "alice@example.com",
  "phone": "555-0101"
}
```

---

## Tech Stack

- **Frontend**: React 18, Axios
- **Backend**: Node.js, Express 4
- **Database**: MySQL 5.7+ / MariaDB (managed via phpMyAdmin)
- **Driver**: mysql2 (promise-based)
