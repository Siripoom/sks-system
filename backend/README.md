# School Transportation System (SKS) Backend

A comprehensive backend API for managing school transportation systems with features for tracking students, drivers, vehicles, routes, and trips.

## 🚀 Features

### Core Features
- **Authentication & Authorization**: JWT-based auth with Role-Based Access Control (RBAC)
- **User Management**: Support for Admin, Teacher, Driver, and Parent roles
- **School Management**: Complete CRUD operations for schools
- **Vehicle Management**: Vehicle registration and tracking
- **Driver Management**: Driver profiles with license validation
- **Student Management**: Student profiles with guardian relationships
- **Route Management**: Route planning with stops
- **Trip Management**: Real-time trip tracking and management
- **Assignment System**: Link drivers, vehicles, and students
- **Event Logging**: Comprehensive audit trail
- **Real-time Updates**: Socket.io integration for live tracking

### Technical Features
- **TypeScript**: Fully typed for better development experience
- **Prisma ORM**: Type-safe database operations with PostgreSQL
- **Express.js**: RESTful API with comprehensive middleware
- **Socket.io**: Real-time communication
- **Security**: Helmet, CORS, rate limiting, input validation
- **Validation**: Zod schemas for request validation
- **Error Handling**: Centralized error handling with detailed logging

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Docker (optional, for PostgreSQL)

## 🛠 Installation

1. **Clone the repository and navigate to the backend directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/sks_db"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_EXPIRES_IN="24h"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
   JWT_REFRESH_EXPIRES_IN="7d"
   
   # Server
   PORT=3000
   NODE_ENV="development"
   
   # CORS
   ALLOWED_ORIGINS="http://localhost:3001,http://localhost:3000"
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ```

4. **Database Setup**

   **Option A: Using Docker (Recommended)**
   ```bash
   docker-compose up -d
   ```
   
   **Option B: Local PostgreSQL**
   - Install PostgreSQL locally
   - Create a database named `sks_db`
   - Update the `DATABASE_URL` in your `.env` file

5. **Database Migration**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Build the project**
   ```bash
   npm run build
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

All endpoints except `/auth/login` and `/auth/register` require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Core Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user profile

#### Users
- `GET /users` - List all users (Admin/Teacher only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Admin only)

#### Schools
- `POST /schools` - Create school (Admin only)
- `GET /schools` - List schools
- `GET /schools/:id` - Get school details
- `PUT /schools/:id` - Update school (Admin only)
- `DELETE /schools/:id` - Delete school (Admin only)

#### Vehicles
- `POST /vehicles` - Create vehicle (Admin only)
- `GET /vehicles` - List vehicles
- `GET /vehicles/:id` - Get vehicle details
- `PUT /vehicles/:id` - Update vehicle (Admin only)
- `DELETE /vehicles/:id` - Delete vehicle (Admin only)

#### Routes, Drivers, Students, etc.
Similar RESTful patterns for all entities with appropriate role-based permissions.

### Sample API Requests

#### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "ADMIN"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "password123"
  }'
```

#### Create a school
```bash
curl -X POST http://localhost:3000/api/schools \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Springfield Elementary",
    "address": "123 School St, Springfield",
    "phone": "+1-555-0123",
    "email": "info@springfield.edu"
  }'
```

## 🗄 Database Schema

The system uses a comprehensive relational database schema with the following main entities:

- **Users**: Authentication and user management
- **Schools**: Educational institutions
- **Vehicles**: Transportation vehicles
- **Drivers**: Driver profiles and licenses
- **Students**: Student information
- **Guardians**: Parent/guardian information
- **Routes**: Transportation routes
- **Stops**: Route stops with GPS coordinates
- **Trips**: Trip instances with real-time tracking
- **Assignments**: Driver-vehicle-student relationships
- **EventLogs**: Audit trail for all system actions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin, Teacher, Driver, Parent roles
- **Input Validation**: Zod schema validation for all requests
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Password Hashing**: bcrypt for secure password storage

## 🚦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm test` - Run tests

## 🔧 Development

### Project Structure
```
src/
├── controllers/        # Request handlers
├── middleware/        # Express middleware
├── routes/           # API route definitions
├── schemas/          # Zod validation schemas
├── utils/            # Utility functions
├── prisma/           # Database schema and migrations
└── index.ts          # Application entry point
```

### Adding New Features
1. Define Prisma schema in `prisma/schema.prisma`
2. Generate Prisma client: `npm run db:generate`
3. Create validation schemas in `src/schemas/`
4. Implement controllers in `src/controllers/`
5. Define routes in `src/routes/`
6. Add route to main `src/index.ts`

## 📈 Health Check

The API provides a health check endpoint:
```
GET /health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Verify database permissions

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process on port 3000

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration
   - Verify token format in requests

4. **CORS Issues**
   - Update ALLOWED_ORIGINS in .env
   - Check frontend URL configuration

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, email your-email@domain.com or create an issue in the repository.