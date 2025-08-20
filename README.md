# 🏋️ Fitness Tracker API

A comprehensive ExpressJS/Mongoose API for tracking workouts and managing user fitness data.

## 📋 Table of Contents
- [Dummy Accounts](#dummy-accounts)
- [User Routes & Controllers](#user-routes--controllers)
- [Workout Routes & Controllers](#workout-routes--controllers)
- [Authentication](#authentication)
- [API Response Format](#api-response-format)

---

## 👤 Dummy Accounts

### Admin Account
```json
{
  "firstName": "Bruce",
  "lastName": "Banger",
  "email": "admin@mail.com",
  "password": "admin123",
  "mobileNo": "09284453421"
}
```

### Regular Users

**User 1:**
```json
{
  "firstName": "James",
  "lastName": "Doe",
  "email": "jamesdoe@mail.com",
  "password": "sample123",
  "mobileNo": "09387723433"
}
```

**User 2:**
```json
{
  "firstName": "John",
  "lastName": "Sinat",
  "email": "js@mail.com",
  "password": "sample123",
  "mobileNo": "09347738934"
}
```

**User 3:**
```json
{
  "firstName": "Da",
  "lastName": "Rak",
  "email": "dr@mail.com",
  "password": "sample123",
  "mobileNo": "09173458733"
}
```

---

## 👥 User Routes & Controllers

### Routes (`/routes/user.js`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/users/register` | Public | User registration |
| `POST` | `/users/login` | Public | User authentication |
| `GET` | `/users/details` | Authenticated | Get user profile |
| `PATCH` | `/users/:id/set-as-admin` | Admin Only | Set user as admin |
| `PATCH` | `/users/update-password` | Authenticated | Update user password |

### Controllers (`/controllers/user.js`)

#### 🔐 `registerUser`
- **Purpose:** Register a new user account
- **Access:** Public
- **Required Fields:** firstName, lastName, email, password, mobileNo
- **Returns:** Success message with user details

#### 🔑 `loginUser`
- **Purpose:** Authenticate user and provide JWT token
- **Access:** Public
- **Required Fields:** email, password
- **Returns:** JWT access token

#### 👤 `getProfile`
- **Purpose:** Retrieve authenticated user's profile information
- **Access:** Authenticated User
- **Returns:** User profile data

#### 🛡️ `setAsAdmin`
- **Purpose:** Promote a user to admin status
- **Access:** Admin Only
- **Returns:** Updated user with admin privileges

#### 🔒 `resetPassword`
- **Purpose:** Allow users to update their password
- **Access:** Authenticated User
- **Required Fields:** newPassword
- **Returns:** Success confirmation

---

## 🏋️ Workout Routes & Controllers

### Routes (`/routes/workout.js`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/workouts/addWorkout` | Authenticated | Add new workout |
| `GET` | `/workouts/getMyWorkouts` | Authenticated | Get user's workouts |
| `PATCH` | `/workouts/updateWorkout/:id` | Authenticated | Update specific workout |
| `DELETE` | `/workouts/deleteWorkout/:id` | Authenticated | Delete specific workout |
| `PATCH` | `/workouts/completeWorkoutStatus/:id` | Authenticated | Mark workout as completed |

### Controllers (`/controllers/workout.js`)

#### ➕ `addWorkout`
- **Purpose:** Create a new workout entry
- **Access:** Authenticated User
- **Required Fields:** name, duration
- **Auto-Generated:** userId, dateAdded, status ("pending")
- **Returns:** Created workout object

#### 📋 `getMyWorkouts`
- **Purpose:** Retrieve all workouts for the authenticated user
- **Access:** Authenticated User
- **Returns:** Array of user's workout objects

#### ✏️ `updateWorkout`
- **Purpose:** Update name and duration of existing workout
- **Access:** Authenticated User (own workouts only)
- **Required Fields:** name, duration
- **Returns:** Updated workout object

#### 🗑️ `deleteWorkout`
- **Purpose:** Remove a workout from the database
- **Access:** Authenticated User (own workouts only)
- **Returns:** Deleted workout confirmation

#### ✅ `completeWorkoutStatus`
- **Purpose:** Change workout status from "pending" to "completed"
- **Access:** Authenticated User (own workouts only)
- **Returns:** Updated workout with completed status

---

## 🔐 Authentication

### Bearer Token Authentication
All authenticated routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### How to Get Token
1. Register a new user with `POST /users/register`
2. Login with `POST /users/login` using email and password
3. Use the returned `accessToken` in subsequent requests

---

## 📊 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { /* relevant data */ }
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## 🏗️ Data Models

### Workout Schema
```javascript
{
  userId: ObjectId,        // Reference to User
  name: String,           // Workout name (required)
  duration: String,       // Duration (required)
  dateAdded: Date,        // Auto-generated timestamp
  status: String          // Default: "pending"
}
```

### User Schema
```javascript
{
  firstName: String,      // Required
  lastName: String,       // Required
  email: String,          // Required, unique
  password: String,       // Required, hashed
  mobileNo: String,       // Required
  isAdmin: Boolean        // Default: false
}
```

---

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Start the server: `node index.js`
4. Use Postman to test the API endpoints
5. Register/login with dummy accounts for testing

---

**Developer:** RexRA  
**Version:** 1.0.0  
**Tech Stack:** ExpressJS, MongoDB, Mongoose, JWT
