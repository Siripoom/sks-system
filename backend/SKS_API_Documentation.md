# SKS Transportation System API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Security](#security)

## Overview

The SKS Transportation System API is a RESTful service for managing school transportation operations including students, drivers, vehicles, routes, and trips. The API supports role-based access control with four user roles: ADMIN, TEACHER, DRIVER, and PARENT.

### Base URL
```
http://localhost:3000/api
```

### Response Format
All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": { ... }
  }
}
```

**Paginated Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

## Authentication

### JWT Token System
The API uses JSON Web Tokens (JWT) for authentication with access and refresh token pattern.

#### Token Structure
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens

#### Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Authentication Endpoints

#### POST `/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ADMIN",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "ADMIN",
      "phone": "+1234567890",
      "createdAt": "2024-02-23T10:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

#### POST `/auth/login`
Authenticate user and receive tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "ADMIN"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

#### POST `/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST `/auth/logout`
Invalidate current session tokens.

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET `/auth/me`
Get current user profile information.

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "ADMIN",
      "phone": "+1234567890",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  }
}
```

## API Endpoints

### Schools Management

#### POST `/schools`
Create a new school. **Requires ADMIN role.**

**Request Body:**
```json
{
  "name": "Central High School",
  "address": "123 Education Street",
  "phone": "+1234567890",
  "email": "admin@centralhigh.edu",
  "principalName": "Dr. Smith",
  "district": "Metropolitan School District"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "school": {
      "id": "school_id",
      "name": "Central High School",
      "address": "123 Education Street",
      "phone": "+1234567890",
      "email": "admin@centralhigh.edu",
      "principalName": "Dr. Smith",
      "district": "Metropolitan School District",
      "createdAt": "2024-02-23T10:00:00Z",
      "updatedAt": "2024-02-23T10:00:00Z"
    }
  }
}
```

#### GET `/schools`
Retrieve all schools with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by name or district

**Response (200):**
```json
{
  "success": true,
  "data": {
    "schools": [
      {
        "id": "school_id",
        "name": "Central High School",
        "address": "123 Education Street",
        "phone": "+1234567890",
        "email": "admin@centralhigh.edu",
        "principalName": "Dr. Smith",
        "district": "Metropolitan School District",
        "createdAt": "2024-02-23T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### GET `/schools/:id`
Retrieve a specific school by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "school": {
      "id": "school_id",
      "name": "Central High School",
      "address": "123 Education Street",
      "phone": "+1234567890",
      "email": "admin@centralhigh.edu",
      "principalName": "Dr. Smith",
      "district": "Metropolitan School District",
      "createdAt": "2024-02-23T10:00:00Z",
      "updatedAt": "2024-02-23T10:00:00Z"
    }
  }
}
```

#### PUT `/schools/:id`
Update a school. **Requires ADMIN role.**

**Request Body:**
```json
{
  "name": "Central High School - Updated",
  "phone": "+1234567891"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "school": {
      "id": "school_id",
      "name": "Central High School - Updated",
      "address": "123 Education Street",
      "phone": "+1234567891",
      "email": "admin@centralhigh.edu",
      "principalName": "Dr. Smith",
      "district": "Metropolitan School District",
      "updatedAt": "2024-02-23T10:30:00Z"
    }
  }
}
```

#### DELETE `/schools/:id`
Delete a school. **Requires ADMIN role.**

**Response (200):**
```json
{
  "success": true,
  "message": "School deleted successfully"
}
```

### Vehicles Management

#### POST `/vehicles`
Create a new vehicle. **Requires ADMIN role.**

**Request Body:**
```json
{
  "licensePlate": "ABC123",
  "model": "Blue Bird Vision",
  "year": 2022,
  "capacity": 72,
  "status": "ACTIVE",
  "maintenanceStatus": "GOOD"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "vehicle": {
      "id": "vehicle_id",
      "licensePlate": "ABC123",
      "model": "Blue Bird Vision",
      "year": 2022,
      "capacity": 72,
      "status": "ACTIVE",
      "maintenanceStatus": "GOOD",
      "createdAt": "2024-02-23T10:00:00Z"
    }
  }
}
```

#### GET `/vehicles`
Retrieve all vehicles with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (ACTIVE, INACTIVE, MAINTENANCE)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": "vehicle_id",
        "licensePlate": "ABC123",
        "model": "Blue Bird Vision",
        "year": 2022,
        "capacity": 72,
        "status": "ACTIVE",
        "maintenanceStatus": "GOOD",
        "createdAt": "2024-02-23T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### GET `/vehicles/:id`
Retrieve a specific vehicle by ID.

#### PUT `/vehicles/:id`
Update a vehicle. **Requires ADMIN role.**

#### DELETE `/vehicles/:id`
Delete a vehicle. **Requires ADMIN role.**

### Users Management

#### GET `/users`
Retrieve all users with pagination. **Requires ADMIN or TEACHER role.**

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `role` (optional): Filter by role

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_id",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "ADMIN",
        "phone": "+1234567890",
        "createdAt": "2024-02-23T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### GET `/users/:id`
Retrieve a specific user by ID.

#### PUT `/users/:id`
Update user information.

**Request Body:**
```json
{
  "firstName": "Updated",
  "lastName": "User",
  "phone": "+1234567899"
}
```

#### DELETE `/users/:id`
Delete a user. **Requires ADMIN role.**

### Students Management

#### GET `/students`
Retrieve all students. **Requires ADMIN or TEACHER role.**

**Query Parameters:**
- `page`, `limit`: Pagination
- `schoolId`: Filter by school
- `grade`: Filter by grade

#### GET `/students/:id`
Retrieve a specific student by ID.

#### POST `/students`
Create a new student. **Requires ADMIN or TEACHER role.**

**Request Body:**
```json
{
  "studentId": "STU001",
  "firstName": "John",
  "lastName": "Doe",
  "grade": "10",
  "schoolId": "school_id",
  "guardianId": "guardian_id",
  "address": "123 Student Street"
}
```

#### PUT `/students/:id`
Update student information. **Requires ADMIN or TEACHER role.**

#### DELETE `/students/:id`
Delete a student. **Requires ADMIN role.**

### Drivers Management

#### GET `/drivers`
Retrieve all drivers. **Requires ADMIN or TEACHER role.**

#### GET `/drivers/:id`
Retrieve a specific driver by ID.

#### POST `/drivers`
Create a new driver. **Requires ADMIN role.**

**Request Body:**
```json
{
  "driverId": "DRV001",
  "firstName": "Mike",
  "lastName": "Driver",
  "licenseNumber": "DL123456789",
  "phone": "+1234567890",
  "email": "mike@example.com"
}
```

#### PUT `/drivers/:id`
Update driver information. **Requires ADMIN role.**

#### DELETE `/drivers/:id`
Delete a driver. **Requires ADMIN role.**

### Routes Management

#### GET `/routes`
Retrieve all routes.

#### GET `/routes/:id`
Retrieve a specific route by ID.

#### POST `/routes`
Create a new route. **Requires ADMIN or TEACHER role.**

**Request Body:**
```json
{
  "routeName": "Route 101",
  "description": "Downtown to Central High School",
  "schoolId": "school_id",
  "stops": ["Stop A", "Stop B", "Central High"]
}
```

#### PUT `/routes/:id`
Update route information. **Requires ADMIN or TEACHER role.**

#### DELETE `/routes/:id`
Delete a route. **Requires ADMIN role.**

### Trips Management

#### GET `/trips`
Retrieve all trips.

**Query Parameters:**
- `page`, `limit`: Pagination
- `status`: Filter by trip status
- `date`: Filter by date range
- `driverId`: Filter by driver

#### GET `/trips/:id`
Retrieve a specific trip by ID.

#### POST `/trips`
Create a new trip. **Requires ADMIN or TEACHER role.**

**Request Body:**
```json
{
  "routeId": "route_id",
  "vehicleId": "vehicle_id",
  "driverId": "driver_id",
  "tripType": "PICKUP",
  "scheduledTime": "2024-02-23T07:30:00Z",
  "status": "SCHEDULED"
}
```

#### PUT `/trips/:id`
Update trip information. **DRIVER can update trip status.**

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "actualStartTime": "2024-02-23T07:32:00Z"
}
```

#### DELETE `/trips/:id`
Delete a trip. **Requires ADMIN role.**

### Guardians Management

#### GET `/guardians`
Retrieve all guardians. **Requires ADMIN or TEACHER role.**

#### GET `/guardians/:id`
Retrieve a specific guardian by ID.

#### POST `/guardians`
Create a new guardian. **Requires ADMIN or TEACHER role.**

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Parent",
  "relationship": "Mother",
  "phone": "+1234567890",
  "email": "jane.parent@example.com",
  "address": "456 Parent Avenue"
}
```

#### PUT `/guardians/:id`
Update guardian information. **Requires ADMIN or TEACHER role.**

#### DELETE `/guardians/:id`
Delete a guardian. **Requires ADMIN role.**

### Assignments Management

#### GET `/assignments`
Retrieve all student-route assignments. **Requires ADMIN or TEACHER role.**

#### GET `/assignments/:id`
Retrieve a specific assignment by ID.

#### POST `/assignments`
Create a new assignment. **Requires ADMIN or TEACHER role.**

**Request Body:**
```json
{
  "studentId": "student_id",
  "routeId": "route_id",
  "stopId": "stop_id",
  "assignmentDate": "2024-02-23",
  "status": "ACTIVE"
}
```

#### PUT `/assignments/:id`
Update assignment. **Requires ADMIN or TEACHER role.**

#### DELETE `/assignments/:id`
Delete assignment. **Requires ADMIN role.**

### Stops Management

#### GET `/stops`
Retrieve all stops.

#### GET `/stops/:id`
Retrieve a specific stop by ID.

#### POST `/stops`
Create a new stop. **Requires ADMIN or TEACHER role.**

**Request Body:**
```json
{
  "name": "Main Street Stop",
  "address": "123 Main Street",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "routeId": "route_id",
  "stopOrder": 1
}
```

#### PUT `/stops/:id`
Update stop information. **Requires ADMIN or TEACHER role.**

#### DELETE `/stops/:id`
Delete a stop. **Requires ADMIN role.**

### Event Logs

#### GET `/eventLogs`
Retrieve system event logs. **Requires ADMIN role.**

**Query Parameters:**
- `page`, `limit`: Pagination
- `eventType`: Filter by event type
- `userId`: Filter by user
- `startDate`, `endDate`: Filter by date range

#### GET `/eventLogs/:id`
Retrieve a specific event log by ID. **Requires ADMIN role.**

## Data Models

### User Roles
- **ADMIN**: Full system access
- **TEACHER**: Limited management access
- **DRIVER**: Trip updates only
- **PARENT**: View-only access to related data

### Common Status Values
- **Vehicle Status**: ACTIVE, INACTIVE, MAINTENANCE
- **Trip Status**: SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
- **Assignment Status**: ACTIVE, INACTIVE

## Error Handling

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Validation Error
- `429`: Rate Limit Exceeded
- `500`: Internal Server Error

### Common Error Responses

#### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "message": "Access token is required",
    "code": "UNAUTHORIZED"
  }
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "message": "Insufficient permissions",
    "code": "FORBIDDEN"
  }
}
```

#### 422 Validation Error
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per authenticated user
- **Bulk operations**: 10 requests per minute per authenticated user

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1708688400
```

## Security

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Granular permission system
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Parameterized queries with Prisma ORM
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet.js**: Security headers
- **Rate Limiting**: Prevents abuse and brute force attacks

### Security Headers
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Best Practices
1. Always use HTTPS in production
2. Store JWT tokens securely (httpOnly cookies recommended)
3. Implement proper CORS policies
4. Log security events
5. Regular security audits
6. Keep dependencies updated

## API Versioning

The API follows semantic versioning. Current version is v1.
Future versions will be available at `/api/v2/...`

Version information is included in response headers:
```
API-Version: 1.0.0
```

---

For support or questions, please contact the development team or refer to the frontend integration guide for implementation examples.