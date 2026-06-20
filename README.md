# 🚀 TaskManager

A modern full-stack Task Management Application built with the MERN Stack. The application allows users to securely manage their daily tasks with authentication, dashboard analytics, task filtering, and a responsive user interface.

---

## 📌 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing using bcrypt

### Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Task Priority Levels
* Task Status Management
* Due Date Support

### Dashboard

* Total Tasks Statistics
* Completed Tasks Count
* Pending Tasks Count
* In Progress Tasks Count
* Task Completion Progress

### User Experience

* Responsive Design
* Search Tasks
* Filter Tasks by Status
* Toast Notifications
* Modern UI using Tailwind CSS
* Smooth Animations with Framer Motion

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Framer Motion
* React Icons
* React Hot Toast
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

task-manager/

├── client/

│ ├── src/

│ ├── components/

│ ├── pages/

│ ├── services/

│ ├── context/

│ └── App.jsx

│

├── server/

│ ├── controllers/

│ ├── routes/

│ ├── middleware/

│ ├── models/

│ ├── config/

│ └── server.js

│

└── README.md

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/task-manager.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---



## API Endpoints

### Authentication

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register User    |
| POST   | /api/auth/login    | Login User       |
| GET    | /api/auth/me       | Get Current User |

### Tasks

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /api/tasks       | Get All Tasks        |
| POST   | /api/tasks       | Create Task          |
| PUT    | /api/tasks/:id   | Update Task          |
| DELETE | /api/tasks/:id   | Delete Task          |
| GET    | /api/tasks/stats | Dashboard Statistics |

---

## Future Improvements

* User Profile Page
* Task Categories
* Task Analytics Charts
* Dark / Light Theme
* Email Notifications
* Drag & Drop Task Board
* Task Reminders

---

## Author

Rohan Pathak

GitHub: https://github.com/Rohanpathak-18

LinkedIn: Add Your LinkedIn Profile

---

⭐ If you like this project, consider giving it a star on GitHub.
