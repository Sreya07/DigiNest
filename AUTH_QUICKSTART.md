# DigiNest Authentication System - Quick Start

## What's Been Set Up

✅ **Backend (Node.js + Express + MongoDB)**
- User registration with email validation
- User login with password hashing (bcrypt)
- JWT-based authentication
- Token verification endpoint
- MongoDB user schema with password hashing

✅ **Frontend (React)**
- AuthContext for global authentication state management
- Auth service with API integration
- ProtectedRoute component to guard authenticated pages
- Updated Login page with real authentication
- Updated Register page with real authentication
- User profile menu with logout functionality

✅ **Security Features**
- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Token expiration (7 days)
- Protected routes that redirect to login if not authenticated
- CORS configured for localhost development

## Quick Start Guide

### Step 1: Install MongoDB

**Option A: Local Installation**
- Download from https://www.mongodb.com/try/download/community
- Follow the installer
- Start MongoDB

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a cluster
- Get your connection string
- Update `.env` file in backend with your connection string

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create/update .env file with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/diginest
# JWT_SECRET=your_secret_key
# PORT=5000

# Start the backend server
npm run dev
```

Expected output:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
```

### Step 3: Setup Frontend

```bash
# In the root directory (DigiNest)
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Step 4: Test the Authentication

1. Go to `http://localhost:5173`
2. Click "Create an account" or go to `/register`
3. Fill in: Name, Email, Password (min 6 chars)
4. Click Register
5. You'll be logged in and redirected to Dashboard
6. Click the user avatar (top right) to see logout option

## File Structure

```
DigiNest/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   └── User.js               # User schema
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── routes/
│   │   └── auth.js               # Authentication endpoints
│   ├── server.js                 # Main server file
│   ├── package.json
│   ├── .env                      # Environment variables
│   └── .gitignore
├── src/
│   ├── context/
│   │   └── AuthContext.jsx       # Global auth state management
│   ├── services/
│   │   └── auth.js               # Auth API service
│   ├── components/
│   │   ├── ProtectedRoute.jsx    # Route protection
│   │   └── Topbar.jsx            # Updated with logout
│   ├── pages/
│   │   ├── Login.jsx             # Real login page
│   │   └── Register.jsx          # Real registration page
│   └── App.jsx                   # Updated with AuthProvider & ProtectedRoute
├── BACKEND_SETUP.md              # Detailed backend setup guide
└── README.md
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/diginest
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend (vite.config.js)
No changes needed for local development (CORS is configured)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (requires token) |
| POST | `/api/auth/verify` | Verify token validity |

## Next Steps

1. **Database Schema Expansion**: Add more collections for documents, life events, etc.
2. **API Integration**: Connect other endpoints for documents, family groups, etc.
3. **Email Verification**: Add email confirmation for new registrations
4. **Password Reset**: Implement forgot password functionality
5. **Rate Limiting**: Add rate limiting to prevent brute force attacks
6. **Logging**: Implement proper logging for debugging
7. **Testing**: Add unit tests and integration tests
8. **Deployment**: Deploy backend to a service like Heroku, Railway, or AWS

## Troubleshooting

**Can't connect to MongoDB?**
- Ensure MongoDB is running: `mongod` (Windows) or `brew services start mongodb-community` (Mac)
- Or use MongoDB Atlas and update the connection string

**CORS errors?**
- Ensure backend is running on port 5000
- Check that frontend is on localhost:5173

**Login/Register not working?**
- Check browser console for errors
- Check backend terminal for any error messages
- Ensure both servers are running

**Token errors?**
- Clear browser localStorage and login again
- Restart backend server

## Support

For detailed backend setup instructions, see [BACKEND_SETUP.md](./BACKEND_SETUP.md)
