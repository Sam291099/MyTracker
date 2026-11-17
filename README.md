# MyTracker — Daily Activity Tracker

A full-stack Daily Activity Tracker built using the MERN stack, designed to help users organize daily tasks, monitor productivity, and build consistent habits.

This project is also a hands-on learning journey to understand modern web development and DevOps practices.

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Learning](https://img.shields.io/badge/DevOps-Learning-purple)

---

## Features

### Activity Management
- Create new daily activities.
- View all saved activities.
- Edit activity details.
- Mark activities as completed or pending.
- Delete activities.
- Store activities permanently in MongoDB.

### Dashboard
- View total activities.
- Track completed and pending activities.
- Monitor daily productivity percentage.
- View weekly productivity charts.
- Search activities.

### User Interface
- Modern dark-themed dashboard.
- Sidebar navigation.
- Responsive layout.
- Activity categories and status indicators.

---

## Technology Stack

### Frontend
- React
- Vite
- Bootstrap 5
- Axios
- React Router DOM
- Lucide React
- Recharts

### Backend
- Node.js
- Express.js
- Mongoose
- REST API
- CORS
- dotenv

### Database
- MongoDB Community Server
- MongoDB with Mongoose ODM

### Development Tools
- Visual Studio Code
- Git and GitHub
- Thunder Client
- npm

### DevOps — Learning Roadmap
- Git workflows and branching
- Environment configuration
- Docker and Docker Compose
- GitHub Actions
- CI/CD pipelines
- Cloud deployment

---

## Project Structure

```text
MyTracker/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── context/
│   │   │   └── ActivityContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Activities.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Goals.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── Activity.js
│   │
│   ├── routes/
│   │   └── activityRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- MongoDB Community Server
- Git
- Visual Studio Code

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd MyTracker
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mytracker
```

Make sure MongoDB is running locally.

**Important:** Never commit your `.env` file or database credentials to GitHub.

### 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

API health check:

```text
http://localhost:5000/api/health
```

### 6. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

Open the Vite development URL shown in the terminal, usually:

```text
http://localhost:5173
```

---

## REST API Endpoints

Base URL:

```text
http://localhost:5000/api/activities
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/activities` | Get all activities |
| POST | `/api/activities` | Create an activity |
| PATCH | `/api/activities/:id` | Update activity |
| DELETE | `/api/activities/:id` | Delete an activity |

### Example: Create an Activity

**POST** `/api/activities`

```json
{
  "title": "Learn Docker",
  "category": "Learning",
  "time": "08:00 PM",
  "duration": "60 min",
  "color": "blue"
}
```

---

## Current Development Status

| Module | Status |
|---|---|
| React dashboard | Completed |
| Sidebar navigation | Completed |
| Activities page | Completed |
| React Context API | Completed |
| Express backend | Completed |
| MongoDB connection | Completed |
| Activity CRUD APIs | Completed |
| Axios integration | Completed |
| Persistent activity storage | Completed |
| Edit activity | Completed |
| Delete activity | Completed |
| Category-based activity creation | Planned |
| Calendar functionality | Planned |
| Analytics enhancements | Planned |
| User authentication | Planned |
| Docker containerization | Planned |
| CI/CD pipeline | Planned |
| Cloud deployment | Planned |

---

## Learning Objectives

This project is being developed to gain practical experience in:

1. Full-stack MERN application development.
2. React components, hooks, and Context API.
3. REST API development using Express.
4. MongoDB database design and Mongoose.
5. Frontend-backend integration using Axios.
6. Git version control and GitHub workflows.
7. Docker and containerization.
8. CI/CD automation using GitHub Actions.
9. Application deployment and cloud infrastructure.

---

## Future Enhancements

- User registration and login.
- JWT-based authentication.
- Individual user activity management.
- Category and date filters.
- Calendar-based activity tracking.
- Advanced productivity analytics.
- Goal tracking and habit streaks.
- Docker Compose configuration.
- Automated testing and CI/CD.
- Cloud deployment.

---

## Author

**MyTracker Developer**

Built as a practical MERN Stack and DevOps learning project.

---

## License

This project is currently intended for educational and personal portfolio purposes.