# TravelTales – Microservices-Based Blogging Platform

TravelTales is a full-stack, microservices-based application built using Node.js, React.js, Docker, and SQLite. The platform allows users to register, write, browse, like/dislike, and follow travel blogs, with real-time search and pagination.

This project was developed as part of the Advanced Server-Side Development coursework.

---

## Technologies Used

- Node.js (Express)
- React.js (with React Router)
- SQLite (per microservice)
- Docker & Docker Compose
- JWT (JSON Web Token) Authentication
- RESTCountries API v3.1

---

## Features

- User Registration & Login  & Reset password
- JWT-secured Routes  
- Blog Post Creation, Editing & Deletion  
- Like/Dislike System (1 vote per post per user)  
- Follow/Unfollow System with Feed Page  
- Search by Country and Username  
- Country Metadata with Flags & Currency  
- Swagger for backend testing 
- Fully Dockerized Setup  
- Auto Logout on JWT Expiry  
- Responsive, Dark-themed Frontend UI

---

## Microservice Architecture

| Service Name      | Port  | Role                                 |
|-------------------|-------|--------------------------------------|
| `auth-service`    | 5001  | User registration, login, JWT auth   |
| `blog-service`    | 5002  | Blog CRUD & search endpoints         |
| `like-service`    | 5003  | Like/dislike tracking per user/post  |
| `follow-service`  | 5004  | Follower system & feed               |
| `country-service` | 5005  | Fetch countries using RESTCountries  |
| `frontend`        | 3001  | React.js-based UI                    |

Each service has its own SQLite database, mounted as a volume and persistent across restarts.

---

## Project Structure

```
project-root/
│
├── auth-service/       # JWT, login, user DB
├── blog-service/       # Blog CRUD operations
├── like-service/       # Post likes/dislikes
├── follow-service/     # Follow/unfollow and feed
├── country-service/    # RESTCountries API integration
├── frontend/           # React.js frontend
├── docker-compose.yml  # Service definitions
└── README.md           # You are here!
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Tash2001/Advanced-Server-Side-CW-w1898910.git
cd Advanced-Server-Side-CW-w1898910
cd CW2
```

### 2. Start the Services

```bash
docker-compose up --build
```

### 3. Access the Application

| Component    | URL                     |
|--------------|--------------------------|
| Frontend     | http://localhost:3001    |
| Auth API     | http://localhost:5001    |
| Blog API     | http://localhost:5002    |
| Like API     | http://localhost:5003    |
| Follow API   | http://localhost:5004    |
| Country API  | http://localhost:5005    |

---

## Authentication

### JWT Token

On login or registration, a JWT token is returned and stored in local storage.

Example header:
```
Authorization: Bearer <your_jwt_token>
```

User actions like posting blogs, liking, or following require a valid JWT. The system also handles auto logout on token expiry.

---

## Country Metadata Integration

Country metadata is pulled from [RESTCountries API](https://restcountries.com/v3.1), including:

- Country name
- Capital
- Currency
- Flag
- Language

---

## Docker Notes

### Rebuild Individual Services

```bash
docker-compose build auth-service
docker-compose build frontend
```

### Stop All Services

```bash
docker-compose down
```

### Mounted Volumes

Each service uses a persistent volume for its database:

```yaml
volumes:
  - ./auth-service/auth.db:/app/auth.db
```

---

## Security Justification

| Feature            | Justification                                                  |
|--------------------|-----------------------------------------------------------------|
| JWT Tokens         | Session-based security with expiry and auto logout             |
| Hashed Passwords   | Passwords hashed using bcrypt before storage                   |
| API Isolation      | Each microservice is isolated and uses internal Docker DNS     |
| Request Headers    | Secure transmission using headers, not query parameters        |
| SQL Safety         | All SQL queries are parameterized to prevent SQL injection     |

---

## Author

**Tashini Maleesha**  
University of Westminster  
Student ID: w1898910  
Module: 6COSC022W – Advanced Server-Side Web Development
