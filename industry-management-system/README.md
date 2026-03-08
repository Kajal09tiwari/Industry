# Industry Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing industry information.

## Features

### User Authentication
- Login with email and default password (Industry@007)
- JWT-based authentication
- Protected routes

### Industry Management
- Add new industries with comprehensive details
- View all industries in a paginated table
- Search and filter industries by multiple criteria
- View detailed industry information
- Delete industries

### Search & Filtering
- Search by industry name, type, city, email, or contact person
- Filter by specific fields
- Real-time search results

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Bootstrap for UI styling
- Context API for state management

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/industry-management
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

4. Start MongoDB service

5. Seed the database with sample data (optional):
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Login with any email address and password: `Industry@007`
3. Use the dashboard to view, add, search, and manage industries

## API Endpoints

### Authentication
- `POST /api/auth/` - User login

### Industries
- `GET /api/industries` - Get all industries (with pagination, search, sorting)
- `GET /api/industries/:id` - Get industry by ID
- `POST /api/industries` - Create new industry
- `PUT /api/industries/:id` - Update industry
- `DELETE /api/industries/:id` - Delete industry

## Database Schema

### Industry Model
- industryName (String, required)
- industryType (String, required)
- contactPerson (String, required)
- email (String, required, unique)
- phoneNumber (String, required)
- phone2 (String, optional)
- address (String, required)
- city (String, required)
- state (String, required)
- country (String, required)
- website (String, optional)
- industryDescription (String, optional)
- industryLogo (String, optional)
- url (String, optional)
- createdDate (Date, auto-generated)

### User Model
- email (String, required, unique)
- password (String, required, hashed)
- role (String, default: 'industry_user')
- createdDate (Date, auto-generated)

## Project Structure

```
industry-management-system/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── industryController.js
│   ├── models/
│   │   ├── Industry.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── industryRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── AddIndustry.js
    │   │   ├── IndustryDetails.js
    │   │   └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## JWT Authentication

The application uses JWT (JSON Web Tokens) for authentication. After successful login, a JWT token is returned which must be included in the Authorization header for protected API endpoints.

### Sample JWT Token (for testing)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3NzI5Nzk4NDUsImV4cCI6MTc3MzA2NjI0NX0.lhbegxehkHyFhe7TjC0qA83KNwDp7oZr7YX2nYNfPYM
```

### Using JWT Token in API Requests
Include the token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### JWT Utilities
- `generateToken.js` - Generate sample JWT tokens for testing
- `verifyToken.js` - Verify JWT tokens