# DigiNest Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (locally or MongoDB Atlas)

## Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory with the following:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/diginest
# For MongoDB Atlas, use: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/diginest

# JWT secret key (change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Server port
PORT=5000

# Environment
NODE_ENV=development
```

### 3. Start MongoDB
**Option A: Local MongoDB**
```bash
# On Windows
mongod

# On macOS (with Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

### 4. Start the Backend Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

#### Verify Token
- **POST** `/api/auth/verify`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "valid": true,
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

## Frontend Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Testing the Authentication Flow

1. Start the backend server
2. Start the frontend development server
3. Navigate to `http://localhost:5173`
4. Click "Create an account" or go to `/register`
5. Fill in the registration form and submit
6. You'll be redirected to the dashboard
7. Access the user menu (top-right) to see logout option

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas, ensure IP whitelist includes your IP

### CORS Errors
- Backend is configured to allow requests from `http://localhost:5173`
- For production, update the CORS origin in `backend/server.js`

### JWT Token Errors
- Change `JWT_SECRET` in `.env` (use a strong random string in production)
- Clear browser localStorage and login again

## Production Deployment

Before deploying to production:

1. Update `JWT_SECRET` to a strong random string
2. Update `NODE_ENV` to `production`
3. Update MongoDB to a production instance (e.g., MongoDB Atlas)
4. Update CORS origin to your production domain
5. Set up environment variables on your hosting platform
6. Use HTTPS for all connections
