# Sprint Manager - Authentication & Dashboard Setup

## What Was Set Up

### 1. **User Model** (`src/lib/models/User.js`)
- MongoDB schema with name, email, password, and role fields
- Password hashing with bcrypt
- Password comparison method for authentication
- Automatic password hashing before save
- Password excluded from JSON responses

### 2. **Authentication Routes**
- **Register** (`src/app/api/auth/register/route.js`) - Creates new users with validation
- **Login** (`src/app/api/auth/login/route.js`) - Validates credentials
- **NextAuth** (`src/app/api/auth/[...nextauth]/route.js`) - Credentials provider with JWT callbacks

### 3. **Pages**
- **Home** (`src/app/page.js`) - Landing page with login/register links
- **Register** (`src/app/register/page.js`) - User registration form
- **Login** (`src/app/login/page.js`) - User login form
- **Dashboard** (`src/app/dashboard/page.js`) - Protected dashboard with user info

### 4. **Route Protection**
- **Middleware** (`middleware.js`) - Protects `/dashboard` routes
- **Client-side Protection** - Dashboard checks session and redirects to login if not authenticated

### 5. **Session Management**
- **SessionProvider** (`src/lib/SessionProvider.js`) - Wraps app with NextAuth SessionProvider

## Setup Instructions

### 1. Configure Environment Variables
Edit `.env.local` with your MongoDB and NextAuth credentials:

```bash
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sprint-manager

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Generate NEXTAUTH_SECRET with:
# openssl rand -base64 32
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access the Application
- Open http://localhost:3000
- Click "Create Account" to register
- Use your credentials to sign in
- You'll be redirected to `/dashboard`

## User Flow

```
/ (Home)
├── /register (Create Account)
│   └── POST /api/auth/register
│       └── /login?registered=true
└── /login (Sign In)
    └── POST /api/auth/login (via NextAuth)
        └── /dashboard (Protected)
```

## Key Features

✅ User Registration with validation
✅ Secure Password Hashing (bcrypt)
✅ NextAuth Credentials Provider
✅ Protected Dashboard Route
✅ Middleware-based Route Protection
✅ Session-based Authentication
✅ User Information Display
✅ Sign Out Functionality
✅ Error Handling & Feedback

## Next Steps

- Add more protected routes for sprints and tasks
- Implement role-based access control (admin vs. user)
- Add email verification for registration
- Implement password reset functionality
- Add JWT refresh token rotation
- Implement activity logging
