```# REST Countries API System

This project is developed as part of the Advanced Server-Side coursework. It is a full-stack application consisting of a Node.js backend and a React.js frontend. Both components are containerized using Docker and orchestrated via Docker Compose. The backend provides a RESTful API with API key-based access control and request logging, while the frontend interacts with the API and provides a user interface.

## Technologies Used

- Node.js (Express)
- React.js
- SQLite
- Docker & Docker Compose

## Features

- RESTful API endpoints to retrieve country data
- API key authentication
- Usage logging for API requests
- Dockerized backend and frontend
- React-based user interface
- SQLite for data persistence

## Project Structure

```
project-root/
│
├── restcountries/        # Backend (Node.js + Express)
├── frontend/             # Frontend (React)
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # Project documentation
```

## Prerequisites

Ensure the following are installed:

- Docker Desktop
- Git

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/advanced-server-side-_cw_w1898910.git
cd advanced-server-side-_cw_w1898910
```

2. **Build and run the application using Docker Compose**

```bash
docker-compose up --build
```

3. **Access the application**

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Authentication

The backend requires an API key to be included in the request headers:

```
x-api-key: YOUR_API_KEY_HERE
```

If the API key is missing or invalid, a 401 Unauthorized response will be returned.

## Database

- The backend uses SQLite.
- The database file is stored at `restcountries/src/config/db.sqlite`.
- The file is mounted via Docker volumes and persists across container restarts.

## Docker Commands

To stop all running services:

```bash
docker-compose down
```

To rebuild only the backend or frontend services:

```bash
docker-compose build backend
docker-compose build frontend
```

## Notes

- Ensure Docker Desktop is running before executing any Docker commands.
- If Docker services fail to start, check WSL 2 and virtualization settings on your system.
- This project does not currently include a hosted or deployed version.

## Author

Tashini Maleesha
University of Westminster
w
```
