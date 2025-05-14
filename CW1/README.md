# REST Countries API System

This project is developed as part of the Advanced Server-Side coursework. It is a full-stack application consisting of a Node.js backend and a React.js frontend. Both components are containerized using Docker and orchestrated via Docker Compose. The backend provides a RESTful API with API key-based access control and request logging, while the frontend interacts with the API and provides a user interface.

## Technologies Used

- Node.js (Express)
- React.js
- SQLite
- Docker & Docker Compose

## Features

-  User registration & login with JWT authentication
-  API key generation for secure access to endpoints
-  Search any country using [https://restcountries.com](https://restcountries.com)
-  Usage logs and API key tracking (admin-only)
-  Input validation with express-validator
-  Admin panel (view users, keys, logs)
-  Dockerized full-stack setup
-  JWT expiry + session auto logout

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

- Docker Desktop - https://www.docker.com/products/docker-desktop/ 
- Git - https://git-scm.com/downloads/win

## Setup Instructions

1. **Clone the repository**

```bash
https://github.com/Tash2001/Advanced-Server-Side-CW-w1898910.git
```
```bash
cd Advanced-Server-Side-CW-w1898910
```

2. **Build and run the application using Docker Compose**

```bash
docker-compose up --build

```

3. **Access the application**
- Frontend: [http://localhost:3000](http://localhost:3000/)
- Backend: [http://localhost:5000](http://localhost:5000/)

## API Authentication

This application uses two levels of authentication to ensure secure access:

1. **JWT-Based Authentication**

Upon successful login, users receive a JWT token.
```
Authorization: Bearer <your_token_here>
```
2. **API Key-Based Access**
   
After logging in, users can generate an API key using the endpoint:

```
x-api-key: YOUR_API_KEY_HERE
```
- JWT ensures only authenticated users can act on behalf of their session.
- API Key allows controlled, trackable access to external API routes.


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
##  Admin Access

To access the admin panel, log in with:

- **Email**: `admin@gmail.com`
- **Password**: `admin123`

Ensure that this user has `"role": "admin"` in the `users` table.

The admin panel allows:
- Viewing API usage logs
- Viewing API keys
- Viewing all registered users

## Notes

- Ensure Docker Desktop is running before executing any Docker commands.
- If Docker services fail to start, check WSL 2 and virtualization settings on your system.

## Author

Tashini Maleesha

University of Westminster

w1898910
