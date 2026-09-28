# 🔗 LinkShrink

A full-stack URL management application built with **React**, **Node.js**, **Express**, **MongoDB**, **Redis**, and **BullMQ**.

It supports secure authentication, anonymous and authenticated URL shortening, Redis-powered caching, asynchronous click analytics, and a modern dashboard for managing shortened URLs. It is designed with scalability, performance, and clean architecture in mind.

---

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-FF6B00?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF6B6B?style=for-the-badge)

## ✨ Features

 🔐 JWT Authentication using HttpOnly Cookies
 🔗 Anonymous URL Shortening
 👤 User Registration & Login
 ✏️ Custom Short URLs
 ⚡ Redis Caching for Fast Redirects
 🚀 BullMQ Background Worker
 🗑️ Delete URLs
 📝 Edit Custom Slug
 📋 User Dashboard
 🛡️ Rate Limiting
 📄 Request Logging


---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Cache | Redis Cloud |
| Queue | BullMQ |
| Authentication | JWT + HttpOnly Cookies |
| Routing | TanStack Router |
| Data Fetching | TanStack Query |
| State Management | Redux Toolkit |
| Local runtime | Node.js, Docker Compose |

---

### Performance Optimizations

- ⚡ Redis caching reduces repeated MongoDB lookups.
- 🚀 BullMQ processes click analytics asynchronously.
- 📈 Stateless backend designed for horizontal scaling.
- 🛡️ Rate limiting protects the API from abuse.
  
## 📂 Project Structure

```
url-shortener/
│
├── FRONTEND/
│
├── BACKEND/
│
├── package.json
├── loadtest.js
└── README.md
```

---



## 🏗️ System Architecture
![Home Page](docs/screenshots/system-architecture.png)

## 🔄 URL Redirection Flow
![Home Page](docs/screenshots/url-redirection-flow.png)

## 🔐 Authentication Flow

![Home Page](docs/screenshots/authentication-flow.png)

## 💻 Local Runtime

![Home Page](docs/screenshots/local-runtime.png)




## 📸 Screenshots

### 🏠 Home Page

The landing page allows users to shorten URLs instantly without requiring authentication.

![Home Page](docs/screenshots/home.png)

---

### 🔐 User Authentication

Secure user registration and login using JWT authentication with HttpOnly cookies.

![Login](docs/screenshots/login.png)

---

### 📋 User Dashboard

A centralized dashboard where authenticated users can manage all their shortened URLs.

![Dashboard](docs/screenshots/dashboard.png)

---

### 🔗 Create Custom Short URL

Create branded short links with custom slugs and instant validation.

![Create URL](docs/screenshots/create-url.png)

---

### ✏️ Edit & Delete URLs

Update custom slugs or remove URLs directly from the dashboard.

![Edit URL](docs/screenshots/edit-url.png)

---

### 📊 Click Analytics

Track URL performance with click analytics and usage statistics.

![Analytics](docs/screenshots/analytics.png)

---

## 🏛️ System Design Decisions

### Redis Caching
- Frequently accessed short URLs are cached in Redis to minimize MongoDB queries and improve redirect performance.

### Asynchronous Click Analytics
- Click events are processed using BullMQ background workers, ensuring that analytics updates do not delay user redirects.

### Stateless Backend
- The backend is stateless, allowing multiple application instances to run behind a load balancer for horizontal scaling.

### Secure Authentication
- JWT tokens are stored in HttpOnly cookies to reduce exposure to client-side scripts.

### Database
- MongoDB Atlas is used as the primary persistent data store for users, URLs, and analytics.

# Response Status Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 302 | Redirect |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Duplicate Resource |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# Security Features

- JWT Authentication
- Input Validation
- Password Hashing
- Protected Routes
- HttpOnly Cookies
- Rate Limiting
- Redis Caching
- Request Logging

---

## 🚀 Future Improvements

- QR Code Generation
- URL Expiration
- Password Protected Links
- Custom Domains
- Advanced Analytics

---

## 👨‍💻 Author

**Shreya Sharma**


