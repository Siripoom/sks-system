# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the School Transportation System (SKS) - a comprehensive full-stack application for managing school bus transportation. The system includes role-based access for Admins, Teachers, Drivers, and Parents with real-time tracking capabilities.

**Architecture**: Monorepo structure with separate `frontend/` and `backend/` directories, each with their own package.json and dependencies.

## Development Commands

### Backend Commands (from /backend/)
- `npm run dev` - Start development server with hot reload on port 3000
- `npm run build` - Build TypeScript to JavaScript (dist/)
- `npm start` - Start production server
- `npm test` - Run Jest tests
- `npm run db:generate` - Generate Prisma client after schema changes
- `npm run db:push` - Push schema changes to database (development)
- `npm run db:migrate` - Create and run migrations (production)
- `npm run db:studio` - Open Prisma Studio database GUI
- `npm run db:seed` - Seed database with initial data

### Frontend Commands (from /frontend/)
- `npm run dev` - Start Next.js development server on port 3001
- `npm run build` - Build production Next.js application
- `npm start` - Start production Next.js server
- `npm run lint` - Run ESLint with Next.js rules
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking without emit

### Root Commands
- Always run commands from the appropriate subdirectory (`/backend/` or `/frontend/`)
- No root-level package.json exists

## Core Architecture

### Backend Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with comprehensive middleware stack
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with role-based access control
- **Real-time**: Socket.io for trip tracking and notifications
- **Validation**: Zod schemas for all endpoints
- **Security**: Helmet, CORS, rate limiting, bcrypt password hashing

### Frontend Stack  
- **Framework**: Next.js 16 with App Router (`src/app/` structure)
- **UI Library**: Ant Design components with custom styling
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand for client state, TanStack Query for server state
- **Forms**: React Hook Form with Ant Design integration
- **Charts**: Recharts for analytics dashboards
- **TypeScript**: Strict type checking enabled

### Database Schema (Prisma)
Core entities with relationships:
- **User** → **Driver/Guardian** (1:1 optional)
- **School** → **Vehicles/Students/Routes** (1:many)
- **Route** → **Stops** (1:many)
- **Assignment** → **Driver/Vehicle/Student** (many:many junction)
- **Trip** → **Route/Vehicle/Driver** (many:1)
- **EventLog** → **User** (many:1 optional)

Role hierarchy: `ADMIN > TEACHER > DRIVER > PARENT`

### API Design Patterns
- RESTful endpoints under `/api/` prefix
- Consistent response format:
  ```typescript
  { success: true, data: T, message?: string }
  { success: false, error: { message, code, details } }
  ```
- Role-based middleware protection on all routes
- Comprehensive input validation with Zod
- Real-time updates via Socket.io rooms (trip tracking)

## Development Workflow

### Backend Development
1. **Database Changes**: Edit `prisma/schema.prisma` → `npm run db:generate` → `npm run db:push`
2. **New Endpoint**: Create controller → Add validation schema → Define route → Register in index.ts
3. **Testing**: Use Jest for unit tests, Postman collection available in `/routes/`
4. **Environment**: Copy `.env.example` to `.env` and configure DATABASE_URL, JWT secrets

### Frontend Development  
1. **New Feature**: Create components → Add to pages → Implement API service → Add to routing
2. **State Management**: Server state via TanStack Query, client state via Zustand
3. **Forms**: Use React Hook Form with Ant Design form components
4. **Styling**: Tailwind-first approach with Ant Design theme customization
5. **Role-based UI**: Implement conditional rendering based on user roles

### Environment Setup
- **Backend**: Requires PostgreSQL database (Docker Compose provided)
- **Frontend**: Depends on backend API running on port 3000
- **Development**: Run both servers concurrently (backend on 3000, frontend on 3001)

## Security Considerations

- **Authentication**: JWT access tokens (24h) + refresh tokens (7d)
- **Authorization**: Role-based access control enforced on backend
- **Input Validation**: All API inputs validated with Zod schemas
- **Rate Limiting**: Configurable per-IP limits (default: 100 req/15min)
- **CORS**: Whitelist-based origin control
- **Password Security**: bcrypt hashing with salt rounds
- **Audit Trail**: Comprehensive event logging for security events

## Key Integration Points

### Real-time Features
- Trip tracking via Socket.io with room-based broadcasting
- Live location updates during active trips
- Real-time notifications for pickup/dropoff events

### Role-Specific Features
- **Admin**: Full system management, user management, school configuration
- **Teacher**: Student and route management within assigned schools
- **Driver**: Trip management, student check-in/out, route navigation
- **Parent**: View assigned children, track active trips, receive notifications

### Performance Considerations
- **Database**: Indexed foreign keys, cascade deletes for data integrity
- **Frontend**: Component-based code splitting, lazy loading for large datasets
- **API**: Pagination for list endpoints, efficient queries with Prisma
- **Real-time**: Room-based Socket.io to minimize broadcast overhead

## Current Status & Roadmap

### Frontend Status (as of existing CLAUDE.md)
- ✅ Next.js project structure with TypeScript
- ✅ Ant Design + Tailwind CSS integration
- ✅ Basic component structure created
- ❌ Authentication implementation needed
- ❌ API integration layer needed
- ❌ State management setup needed

### Backend Status (based on analysis)
- ✅ Complete API implementation with all endpoints
- ✅ Database schema with full relationships
- ✅ Authentication and authorization system
- ✅ Real-time Socket.io integration
- ✅ Comprehensive middleware stack
- ✅ Production-ready with Docker support

### Next Development Steps
1. Complete frontend authentication integration with backend JWT
2. Implement API client with axios interceptors for token management
3. Build role-based navigation and route protection
4. Integrate real-time trip tracking with Socket.io
5. Implement comprehensive error handling and loading states

## Testing Strategy

- **Backend**: Jest unit tests for controllers and middleware
- **Frontend**: Component testing with React Testing Library
- **Integration**: API endpoint testing with request/response validation
- **E2E**: Critical user flows for each role type
- **Database**: Test migrations and seed data integrity

## Deployment Notes

- **Backend**: Requires environment variables for DATABASE_URL, JWT secrets, CORS origins
- **Frontend**: Build-time configuration for API endpoints and Socket.io URLs  
- **Database**: PostgreSQL with connection pooling for production
- **Security**: Configure rate limits, CORS origins, and JWT secrets appropriately