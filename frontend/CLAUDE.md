# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 frontend application for the SKS Transportation System - a school bus management platform. The project is currently in initial setup phase with basic Next.js structure and Tailwind CSS styling.

## Development Commands

### Core Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server

### Currently Missing Commands
Since this is an early-stage project, the following common commands are not yet configured but should be added as the project grows:
- Linting: Consider adding `npm run lint` with ESLint
- Type checking: Consider adding `npm run type-check` with TypeScript
- Testing: Consider adding `npm run test` with Jest or Vitest

## Architecture and Technical Stack

### Framework & Core Technologies
- **Next.js 16.1.6** with App Router (src/app/ structure)
- **React 19.2.3** with React Compiler enabled
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling (configured with PostCSS)

### Key Configuration Files
- `next.config.ts` - Next.js configuration with React Compiler enabled
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `./src/*`)
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `tailwind.config.js` - Tailwind CSS configuration (likely to be added)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx     # Root layout with Geist fonts
│   ├── page.tsx       # Landing page
│   ├── globals.css    # Global Tailwind styles
│   └── favicon.ico
└── (additional folders to be created as project grows)
```

## API Integration Context

The frontend is designed to integrate with a comprehensive SKS Transportation System API that includes:

### Authentication System
- JWT-based authentication with access/refresh tokens
- Role-based access control: ADMIN, TEACHER, DRIVER, PARENT
- Base API URL: `http://localhost:3000/api` (local development)

### Core Resources to Implement
1. **Schools Management** - CRUD operations for school entities
2. **Vehicles Management** - Bus fleet management with status tracking
3. **Users Management** - User accounts with role assignments
4. **Students Management** - Student profiles and school assignments
5. **Drivers Management** - Driver profiles and certifications
6. **Routes Management** - Transportation routes and stops
7. **Trips Management** - Scheduled trips and real-time tracking
8. **Assignments** - Student-to-route assignments

### API Response Format
All API endpoints follow a consistent response structure:
```typescript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}

// Error Response
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": { ... }
  }
}
```

## Implementation Roadmap Context

The project follows a phased development approach:

### Phase 1 (MVP - Weeks 1-4): CRITICAL PRIORITY
- Authentication system implementation
- Basic dashboard with role-specific content
- School management (CRUD operations)
- Vehicle management (CRUD operations)
- Role-based navigation

### Phase 2 (User Management - Weeks 5-8): HIGH PRIORITY
- Complete user CRUD operations
- Profile management functionality
- Advanced role permissions
- User onboarding workflows

### Phase 3 (Transportation Core - Weeks 9-14): HIGH PRIORITY
- Route management with mapping
- Trip scheduling and management
- Student-route assignments
- Driver dashboard and interfaces
- Basic trip tracking

### Phase 4 (Advanced Features - Weeks 15-20): MEDIUM PRIORITY
- Real-time trip tracking with WebSockets
- Guardian/parent portal
- Event logging and audit trails
- Advanced analytics
- Mobile app preparation

## Development Guidelines

### Recommended State Management
- **React Query/TanStack Query** for server state management
- **Zustand** for client-side state management
- Consider implementing optimistic updates for better UX

### UI Component Strategy
- Build responsive components using Tailwind CSS
- Implement role-based component visibility
- Consider using a UI library like Material-UI or Ant Design
- Ensure mobile-first responsive design

### Security Considerations
- Implement secure JWT token storage (avoid localStorage in production)
- Use role-based access control for all protected routes
- Implement proper input validation and sanitization
- Consider implementing CSP headers

### Performance Requirements
- Code splitting by routes for optimal loading
- Lazy loading for non-critical components
- Virtual scrolling for large datasets (vehicle lists, student lists)
- Optimize for mobile performance

### Testing Strategy
- Unit tests for utility functions and hooks
- Integration tests for API interactions
- E2E tests for critical user workflows
- Test role-based access control thoroughly

## Current Status

The project is in the initial setup phase with:
- ✅ Next.js project structure established
- ✅ TypeScript configuration complete
- ✅ Tailwind CSS configured
- ✅ React Compiler enabled
- ❌ Authentication system (needs implementation)
- ❌ API integration layer (needs implementation)
- ❌ UI components library (needs selection/implementation)
- ❌ State management (needs implementation)

## Next Steps

1. **Set up API client** - Implement Axios with interceptors for JWT handling
2. **Implement authentication** - Create login/logout flow with role management
3. **Build core layout** - Navigation, header, and responsive design
4. **Start with schools management** - First CRUD implementation
5. **Add state management** - React Query + Zustand setup

## Notes for Claude Code

- When implementing new features, always consider role-based access control
- Follow the established folder structure and naming conventions
- Prioritize mobile-responsive design from the start
- Implement proper error handling for all API interactions
- Use TypeScript strictly - avoid `any` types
- Follow the phased development approach outlined in the roadmap
- Consider performance implications for large datasets (schools may have thousands of students)