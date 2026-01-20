# Backend Options

This project includes **two backend implementations**:

## 1. Node.js Backend (`backend-nodejs/`)

A complete REST API built with Node.js, Express, and MongoDB.

### Features
- ✅ JWT Authentication
- ✅ User Management (Driver, Provider, Admin)
- ✅ Parking Lot Management
- ✅ Booking System with Wallet Integration
- ✅ EV Charging Station Management
- ✅ Admin Dashboard
- ✅ 36 API Endpoints

### Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Quick Start
```bash
cd backend-nodejs
npm install
npm run dev
```

Server runs on: `http://localhost:5000`

### Documentation
See `backend-nodejs/README.md` for complete API documentation.

---

## 2. Java Spring Boot Backend (`backend/`)

A Spring Boot backend implementation (existing in repository).

### Tech Stack
- Java
- Spring Boot
- Maven

### Quick Start
```bash
cd backend
./mvnw spring-boot:run
```

---

## Which Backend to Use?

### Use Node.js Backend (`backend-nodejs/`) if:
- ✅ You want a complete, ready-to-use API
- ✅ You prefer JavaScript/Node.js ecosystem
- ✅ You want MongoDB as database
- ✅ You need quick setup and deployment

### Use Java Backend (`backend/`) if:
- ✅ You prefer Java and Spring Boot
- ✅ Your team has Java expertise
- ✅ You want to extend the existing Java implementation

---

## Frontend Configuration

The frontend (`frontend/src/services/api.js`) is configured to work with the Node.js backend by default.

**API Base URL:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Node.js backend
```

If using the Java backend, update the URL accordingly.

---

## Recommended Setup

For this project, we recommend using the **Node.js backend** (`backend-nodejs/`) as it:
- Has complete implementation with all features
- Includes comprehensive documentation
- Has 36 ready-to-use API endpoints
- Integrates seamlessly with the frontend

---

## Project Structure

```
ParkEase/
├── frontend/              # React Native (Expo) application
├── backend-nodejs/        # Node.js/Express/MongoDB backend (Recommended)
└── backend/              # Java Spring Boot backend (Alternative)
```

---

For detailed setup instructions, see:
- `QUICK_START.md` - Quick setup guide
- `INTEGRATION_GUIDE.md` - Frontend-backend integration
- `backend-nodejs/README.md` - Node.js API documentation
