# Frontend Integration Guide - SKS Transportation System

## Table of Contents
1. [Overview](#overview)
2. [Authentication Implementation](#authentication-implementation)
3. [API Client Setup](#api-client-setup)
4. [State Management](#state-management)
5. [Role-Based UI Components](#role-based-ui-components)
6. [Real-time Features](#real-time-features)
7. [Error Handling](#error-handling)
8. [Performance Optimization](#performance-optimization)
9. [Security Considerations](#security-considerations)
10. [Implementation Examples](#implementation-examples)

## Overview

This guide provides practical implementation patterns for integrating frontend applications with the SKS Transportation System API. The examples focus on React but can be adapted for Vue, Angular, or other frameworks.

### Key Features to Implement
- JWT-based authentication with refresh tokens
- Role-based access control (ADMIN, TEACHER, DRIVER, PARENT)
- Real-time trip tracking and notifications
- Responsive data tables with pagination
- Form validation and error handling
- Optimistic UI updates

## Authentication Implementation

### 1. Authentication Service

Create a centralized authentication service to handle login, logout, and token management:

```typescript
// services/authService.ts
import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'TEACHER' | 'DRIVER' | 'PARENT';
  phone?: string;
}

class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private user: User | null = null;

  private constructor() {
    // Load tokens from localStorage on initialization
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>('/api/auth/login', credentials);
      
      if (response.data.success) {
        const { user, tokens } = response.data.data;
        this.setTokens(tokens.accessToken, tokens.refreshToken);
        this.setUser(user);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>('/api/auth/register', userData);
      
      if (response.data.success) {
        const { user, tokens } = response.data.data;
        this.setTokens(tokens.accessToken, tokens.refreshToken);
        this.setUser(user);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.accessToken) {
        await axios.post('/api/auth/logout', {}, {
          headers: { Authorization: `Bearer ${this.accessToken}` }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshToken) return null;

    try {
      const response = await axios.post('/api/auth/refresh', {
        refreshToken: this.refreshToken
      });

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
        this.setTokens(accessToken, refreshToken);
        return accessToken;
      }
    } catch (error) {
      this.clearAuth();
      window.location.href = '/login';
    }
    
    return null;
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearAuth(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.user;
  }

  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.includes(this.user?.role || '');
  }

  private handleError(error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: {
        message: 'Network error occurred',
        code: 'NETWORK_ERROR'
      }
    };
  }
}

export default AuthService;
```

### 2. Authentication Context

Create a React context for authentication state management:

```typescript
// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import AuthService from '../services/authService';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        isAuthenticated: true
      };
    case 'AUTH_FAILURE':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  const authService = AuthService.getInstance();

  useEffect(() => {
    // Initialize authentication state
    const user = authService.getUser();
    if (user && authService.isAuthenticated()) {
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'AUTH_FAILURE' });
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
      } else {
        dispatch({ type: 'AUTH_FAILURE' });
        throw new Error(response.error?.message || 'Login failed');
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authService.register(userData);
      if (response.success) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
      } else {
        dispatch({ type: 'AUTH_FAILURE' });
        throw new Error(response.error?.message || 'Registration failed');
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const hasRole = (role: string) => authService.hasRole(role);
  const hasAnyRole = (roles: string[]) => authService.hasAnyRole(roles);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      register,
      hasRole,
      hasAnyRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

## API Client Setup

### 1. Axios Configuration with Interceptors

Create a configured axios instance with automatic token refresh:

```typescript
// services/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthService from './authService';

class ApiClient {
  private instance: AxiosInstance;
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.authService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const newToken = await this.authService.refreshAccessToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Generic API methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  // Pagination helper
  async getPaginated<T>(url: string, page: number = 1, limit: number = 10, filters?: Record<string, any>) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.get<PaginatedResponse<T>>(`${url}?${params}`);
  }
}

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export default new ApiClient();
```

### 2. API Service Layer

Create service classes for each resource:

```typescript
// services/schoolService.ts
import apiClient from './apiClient';

interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  district: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateSchoolData {
  name: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  district: string;
}

export class SchoolService {
  static async getSchools(page: number = 1, limit: number = 10, search?: string) {
    const filters = search ? { search } : {};
    return apiClient.getPaginated<School>('/schools', page, limit, filters);
  }

  static async getSchool(id: string) {
    return apiClient.get<{ success: boolean; data: { school: School } }>(`/schools/${id}`);
  }

  static async createSchool(data: CreateSchoolData) {
    return apiClient.post<{ success: boolean; data: { school: School } }>('/schools', data);
  }

  static async updateSchool(id: string, data: Partial<CreateSchoolData>) {
    return apiClient.put<{ success: boolean; data: { school: School } }>(`/schools/${id}`, data);
  }

  static async deleteSchool(id: string) {
    return apiClient.delete<{ success: boolean; message: string }>(`/schools/${id}`);
  }
}
```

## State Management

### 1. React Query Setup

Use React Query for server state management:

```typescript
// hooks/useSchools.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SchoolService } from '../services/schoolService';

export function useSchools(page: number = 1, limit: number = 10, search?: string) {
  return useQuery(
    ['schools', page, limit, search],
    () => SchoolService.getSchools(page, limit, search),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

export function useSchool(id: string) {
  return useQuery(
    ['school', id],
    () => SchoolService.getSchool(id),
    {
      enabled: !!id,
    }
  );
}

export function useCreateSchool() {
  const queryClient = useQueryClient();

  return useMutation(SchoolService.createSchool, {
    onSuccess: () => {
      queryClient.invalidateQueries(['schools']);
    },
  });
}

export function useUpdateSchool() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: any }) => SchoolService.updateSchool(id, data),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries(['schools']);
        queryClient.invalidateQueries(['school', id]);
      },
    }
  );
}

export function useDeleteSchool() {
  const queryClient = useQueryClient();

  return useMutation(SchoolService.deleteSchool, {
    onSuccess: () => {
      queryClient.invalidateQueries(['schools']);
    },
  });
}
```

### 2. Global State with Zustand (Alternative to Context)

```typescript
// stores/appStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // Application State
  selectedSchool: string | null;
  notifications: Notification[];
  
  // Actions
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSelectedSchool: (schoolId: string | null) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        sidebarOpen: true,
        theme: 'light',
        selectedSchool: null,
        notifications: [],

        // Actions
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),

        setTheme: (theme) => set({ theme }),

        setSelectedSchool: (schoolId) => set({ selectedSchool: schoolId }),

        addNotification: (notification) =>
          set((state) => ({
            notifications: [...state.notifications, notification],
          })),

        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          theme: state.theme,
          selectedSchool: state.selectedSchool,
        }),
      }
    )
  )
);
```

## Role-Based UI Components

### 1. Permission-based Component Wrapper

```typescript
// components/auth/ProtectedComponent.tsx
import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedComponentProps {
  children: ReactNode;
  roles?: string[];
  fallback?: ReactNode;
  requireAll?: boolean; // If true, user must have ALL roles, otherwise ANY role
}

export function ProtectedComponent({
  children,
  roles = [],
  fallback = null,
  requireAll = false
}: ProtectedComponentProps) {
  const { user, hasAnyRole, hasRole } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  if (roles.length === 0) {
    return <>{children}</>;
  }

  const hasPermission = requireAll
    ? roles.every(role => hasRole(role))
    : hasAnyRole(roles);

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}

// Usage example:
// <ProtectedComponent roles={['ADMIN']} fallback={<div>Access Denied</div>}>
//   <AdminPanel />
// </ProtectedComponent>
```

### 2. Role-based Navigation Menu

```typescript
// components/navigation/NavigationMenu.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ProtectedComponent } from '../auth/ProtectedComponent';

interface MenuItem {
  label: string;
  path: string;
  icon: string;
  roles?: string[];
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Schools', path: '/schools', icon: 'school', roles: ['ADMIN', 'TEACHER'] },
  { label: 'Vehicles', path: '/vehicles', icon: 'directions_bus', roles: ['ADMIN', 'TEACHER'] },
  { label: 'Students', path: '/students', icon: 'group', roles: ['ADMIN', 'TEACHER'] },
  { label: 'Drivers', path: '/drivers', icon: 'person', roles: ['ADMIN'] },
  { label: 'Routes', path: '/routes', icon: 'route' },
  { label: 'Trips', path: '/trips', icon: 'trip_origin' },
  { label: 'My Trips', path: '/my-trips', icon: 'my_location', roles: ['DRIVER'] },
  { label: 'My Children', path: '/my-children', icon: 'child_care', roles: ['PARENT'] },
  { label: 'Event Logs', path: '/logs', icon: 'history', roles: ['ADMIN'] },
];

export function NavigationMenu() {
  const { user } = useAuth();

  return (
    <nav className="navigation-menu">
      {menuItems.map((item) => (
        <ProtectedComponent key={item.path} roles={item.roles}>
          <a
            href={item.path}
            className="nav-item"
            aria-label={item.label}
          >
            <span className="material-icons">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </a>
        </ProtectedComponent>
      ))}
    </nav>
  );
}
```

### 3. Dynamic Action Buttons

```typescript
// components/common/ActionButtons.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  editRoles?: string[];
  deleteRoles?: string[];
  viewRoles?: string[];
}

export function ActionButtons({
  onEdit,
  onDelete,
  onView,
  editRoles = ['ADMIN', 'TEACHER'],
  deleteRoles = ['ADMIN'],
  viewRoles = []
}: ActionButtonsProps) {
  const { hasAnyRole } = useAuth();

  return (
    <div className="action-buttons">
      {onView && (viewRoles.length === 0 || hasAnyRole(viewRoles)) && (
        <button
          onClick={onView}
          className="btn btn-secondary"
          title="View Details"
        >
          View
        </button>
      )}
      
      {onEdit && hasAnyRole(editRoles) && (
        <button
          onClick={onEdit}
          className="btn btn-primary"
          title="Edit"
        >
          Edit
        </button>
      )}
      
      {onDelete && hasAnyRole(deleteRoles) && (
        <button
          onClick={onDelete}
          className="btn btn-danger"
          title="Delete"
        >
          Delete
        </button>
      )}
    </div>
  );
}
```

## Real-time Features

### 1. WebSocket Setup for Trip Tracking

```typescript
// services/websocketService.ts
import io, { Socket } from 'socket.io-client';
import AuthService from './authService';

interface TripUpdate {
  tripId: string;
  status: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
}

class WebSocketService {
  private socket: Socket | null = null;
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  connect(): void {
    const token = this.authService.getAccessToken();
    if (!token) return;

    this.socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:3000', {
      auth: {
        token
      },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Subscribe to trip updates
  subscribeToTrip(tripId: string, callback: (update: TripUpdate) => void): void {
    if (!this.socket) return;

    this.socket.emit('subscribe_trip', tripId);
    this.socket.on(`trip_${tripId}_update`, callback);
  }

  unsubscribeFromTrip(tripId: string): void {
    if (!this.socket) return;

    this.socket.emit('unsubscribe_trip', tripId);
    this.socket.off(`trip_${tripId}_update`);
  }

  // Send trip status update (for drivers)
  updateTripStatus(tripId: string, status: string, location?: { lat: number; lng: number }): void {
    if (!this.socket) return;

    this.socket.emit('update_trip_status', {
      tripId,
      status,
      location,
      timestamp: new Date().toISOString()
    });
  }
}

export default new WebSocketService();
```

### 2. Real-time Trip Component

```typescript
// components/trips/LiveTripTracker.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import WebSocketService from '../../services/websocketService';

interface LiveTripTrackerProps {
  tripId: string;
}

interface TripStatus {
  status: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  lastUpdate: string;
}

export function LiveTripTracker({ tripId }: LiveTripTrackerProps) {
  const { user } = useAuth();
  const [tripStatus, setTripStatus] = useState<TripStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    WebSocketService.connect();
    setIsConnected(true);

    WebSocketService.subscribeToTrip(tripId, (update) => {
      setTripStatus({
        status: update.status,
        location: update.location,
        lastUpdate: update.timestamp
      });
    });

    return () => {
      WebSocketService.unsubscribeFromTrip(tripId);
      setIsConnected(false);
    };
  }, [tripId]);

  const handleStatusUpdate = (newStatus: string) => {
    if (user?.role === 'DRIVER') {
      WebSocketService.updateTripStatus(tripId, newStatus);
    }
  };

  if (!isConnected) {
    return <div className="loading">Connecting to live updates...</div>;
  }

  return (
    <div className="live-trip-tracker">
      <div className="connection-status">
        <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? 'Live' : 'Offline'}
        </span>
      </div>

      {tripStatus && (
        <div className="trip-status">
          <h3>Trip Status: {tripStatus.status}</h3>
          <p>Last Updated: {new Date(tripStatus.lastUpdate).toLocaleTimeString()}</p>
          
          {tripStatus.location && (
            <div className="location">
              <p>Current Location:</p>
              <p>Lat: {tripStatus.location.latitude}</p>
              <p>Lng: {tripStatus.location.longitude}</p>
            </div>
          )}

          {user?.role === 'DRIVER' && (
            <div className="driver-controls">
              <button onClick={() => handleStatusUpdate('IN_PROGRESS')}>
                Start Trip
              </button>
              <button onClick={() => handleStatusUpdate('AT_STOP')}>
                At Stop
              </button>
              <button onClick={() => handleStatusUpdate('COMPLETED')}>
                Complete Trip
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

## Error Handling

### 1. Global Error Boundary

```typescript
// components/error/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You could send error to logging service here
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>We're sorry, but something went wrong. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 2. API Error Handler Hook

```typescript
// hooks/useErrorHandler.ts
import { useCallback } from 'react';
import { useAppStore } from '../stores/appStore';

interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
    details?: Record<string, string>;
  };
}

export function useErrorHandler() {
  const addNotification = useAppStore((state) => state.addNotification);

  const handleError = useCallback((error: any) => {
    let errorMessage = 'An unexpected error occurred';
    let errorCode = 'UNKNOWN_ERROR';

    if (error?.error) {
      // API error format
      errorMessage = error.error.message || errorMessage;
      errorCode = error.error.code || errorCode;
    } else if (error?.message) {
      // JavaScript Error object
      errorMessage = error.message;
    }

    addNotification({
      id: Date.now().toString(),
      type: 'error',
      title: 'Error',
      message: errorMessage,
      timestamp: new Date()
    });

    // Log error for debugging
    console.error('Error handled:', { error, code: errorCode });

    // Send to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // reportError({ error, code: errorCode, timestamp: new Date() });
    }
  }, [addNotification]);

  return { handleError };
}
```

## Performance Optimization

### 1. Virtualized Data Table

```typescript
// components/common/VirtualizedTable.tsx
import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

interface VirtualizedTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  height: number;
  itemHeight: number;
  onRowClick?: (item: T) => void;
}

interface TableColumn<T> {
  key: keyof T;
  label: string;
  width?: number;
  render?: (value: any, item: T) => React.ReactNode;
}

export function VirtualizedTable<T>({
  data,
  columns,
  height,
  itemHeight,
  onRowClick
}: VirtualizedTableProps<T>) {
  const Row = useMemo(() => {
    return ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const item = data[index];

      return (
        <div
          style={style}
          className="table-row"
          onClick={() => onRowClick?.(item)}
        >
          {columns.map((column) => (
            <div
              key={String(column.key)}
              className="table-cell"
              style={{ width: column.width || 'auto' }}
            >
              {column.render
                ? column.render(item[column.key], item)
                : String(item[column.key] || '')
              }
            </div>
          ))}
        </div>
      );
    };
  }, [data, columns, onRowClick]);

  return (
    <div className="virtualized-table">
      <div className="table-header">
        {columns.map((column) => (
          <div
            key={String(column.key)}
            className="table-header-cell"
            style={{ width: column.width || 'auto' }}
          >
            {column.label}
          </div>
        ))}
      </div>
      
      <List
        height={height}
        itemCount={data.length}
        itemSize={itemHeight}
      >
        {Row}
      </List>
    </div>
  );
}
```

### 2. Optimistic Updates

```typescript
// hooks/useOptimisticMutation.ts
import { useMutation, useQueryClient } from 'react-query';

interface OptimisticMutationOptions<T> {
  mutationFn: (data: any) => Promise<any>;
  queryKey: string[];
  updateFn: (oldData: T[], newItem: any) => T[];
  onError?: (error: any, newItem: any, context: any) => void;
}

export function useOptimisticMutation<T>({
  mutationFn,
  queryKey,
  updateFn,
  onError
}: OptimisticMutationOptions<T>) {
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onMutate: async (newItem) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(queryKey);

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<{ data: { items: T[] } }>(queryKey);

      // Optimistically update
      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          data: {
            ...previousData.data,
            items: updateFn(previousData.data.items, newItem)
          }
        });
      }

      return { previousData };
    },

    onError: (error, newItem, context: any) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      onError?.(error, newItem, context);
    },

    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
}
```

## Security Considerations

### 1. Secure Token Storage

```typescript
// utils/tokenStorage.ts
class SecureTokenStorage {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';

  static setTokens(accessToken: string, refreshToken: string): void {
    // In production, consider using httpOnly cookies instead
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    
    // Set token expiration check
    this.scheduleTokenRefresh(accessToken);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private static scheduleTokenRefresh(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;
      
      // Refresh 5 minutes before expiry
      const refreshTime = Math.max(0, timeUntilExpiry - 5 * 60 * 1000);
      
      setTimeout(() => {
        // Trigger token refresh
        window.dispatchEvent(new CustomEvent('tokenRefreshNeeded'));
      }, refreshTime);
    } catch (error) {
      console.error('Failed to schedule token refresh:', error);
    }
  }
}

export default SecureTokenStorage;
```

### 2. Content Security Policy Header

```typescript
// utils/security.ts
export const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // Be more restrictive in production
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' ws: wss:",
    "font-src 'self'",
    "object-src 'none'",
    "media-src 'self'",
    "frame-src 'none'",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
};

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Validate file uploads
export function validateFileUpload(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return allowedTypes.includes(file.type) && file.size <= maxSize;
}
```

## Implementation Examples

### 1. Complete School Management Component

```typescript
// components/schools/SchoolManagement.tsx
import React, { useState } from 'react';
import { useSchools, useCreateSchool, useUpdateSchool, useDeleteSchool } from '../../hooks/useSchools';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { ProtectedComponent } from '../auth/ProtectedComponent';
import { VirtualizedTable } from '../common/VirtualizedTable';

export function SchoolManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useSchools(page, 10, search);
  const createSchool = useCreateSchool();
  const updateSchool = useUpdateSchool();
  const deleteSchool = useDeleteSchool();
  const { handleError } = useErrorHandler();

  const handleCreate = async (schoolData: CreateSchoolData) => {
    try {
      await createSchool.mutateAsync(schoolData);
      setIsModalOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdate = async (id: string, schoolData: Partial<CreateSchoolData>) => {
    try {
      await updateSchool.mutateAsync({ id, data: schoolData });
      setSelectedSchool(null);
      setIsModalOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      try {
        await deleteSchool.mutateAsync(id);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const columns = [
    { key: 'name' as keyof School, label: 'Name', width: 200 },
    { key: 'district' as keyof School, label: 'District', width: 150 },
    { key: 'principalName' as keyof School, label: 'Principal', width: 150 },
    { key: 'phone' as keyof School, label: 'Phone', width: 120 },
    {
      key: 'id' as keyof School,
      label: 'Actions',
      width: 150,
      render: (id: string, school: School) => (
        <div className="action-buttons">
          <button onClick={() => {
            setSelectedSchool(school);
            setIsModalOpen(true);
          }}>
            Edit
          </button>
          
          <ProtectedComponent roles={['ADMIN']}>
            <button
              onClick={() => handleDelete(id)}
              className="btn-danger"
            >
              Delete
            </button>
          </ProtectedComponent>
        </div>
      )
    }
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schools</div>;

  return (
    <div className="school-management">
      <div className="header">
        <h1>School Management</h1>
        <ProtectedComponent roles={['ADMIN']}>
          <button
            onClick={() => {
              setSelectedSchool(null);
              setIsModalOpen(true);
            }}
            className="btn-primary"
          >
            Add School
          </button>
        </ProtectedComponent>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search schools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {data && (
        <VirtualizedTable
          data={data.data.items}
          columns={columns}
          height={500}
          itemHeight={60}
          onRowClick={(school) => {
            setSelectedSchool(school);
            setIsModalOpen(true);
          }}
        />
      )}

      {data?.data.pagination && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {data.data.pagination.pages}
          </span>
          <button
            disabled={page === data.data.pagination.pages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && (
        <SchoolModal
          school={selectedSchool}
          onClose={() => setIsModalOpen(false)}
          onSave={selectedSchool ? 
            (data) => handleUpdate(selectedSchool.id, data) :
            handleCreate
          }
        />
      )}
    </div>
  );
}
```

This comprehensive guide provides all the necessary patterns and examples for integrating a frontend application with the SKS Transportation System API. The implementation focuses on security, performance, and maintainability while providing a great user experience across all user roles.