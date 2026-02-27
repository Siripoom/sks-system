import { ReactNode } from 'react';

// Common UI Types
export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: MenuItem[];
  roles?: string[];
}

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  fixed?: 'left' | 'right';
  sorter?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => ReactNode;
}

// Notification Types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read?: boolean;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'phone';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  validation?: any;
}

// Theme Types
export type ThemeMode = 'light' | 'dark';

// Loading States
export interface LoadingState {
  loading: boolean;
  error?: string | null;
}

// Permission Types
export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  roles: string[];
}

// Layout Types
export interface LayoutState {
  collapsed: boolean;
  isMobile: boolean;
  breadcrumbs: BreadcrumbItem[];
}

// Dashboard Types
export interface DashboardWidget {
  id: string;
  title: string;
  type: 'stat' | 'chart' | 'table' | 'list';
  span: number; // Grid span
  data?: any;
  loading?: boolean;
}

export interface DashboardStat {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

// Filter Types
export interface FilterOption {
  label: string;
  value: string | number;
}

export interface DateRange {
  startDate?: string;
  endDate?: string;
}

// Search Types
export interface SearchResult<T = any> {
  id: string;
  type: string;
  title: string;
  description?: string;
  data: T;
}

// File Upload Types
export interface UploadFile {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  response?: any;
}

// Geolocation Types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  address?: string;
  name?: string;
}

// Real-time Types
export interface WebSocketMessage<T = any> {
  type: string;
  data: T;
  timestamp: string;
}

export interface TripUpdate {
  tripId: string;
  status: string;
  location?: Coordinates;
  timestamp: string;
}

// Error Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Route Protection Types
export interface RouteGuard {
  roles?: string[];
  permissions?: string[];
  redirectTo?: string;
  fallback?: ReactNode;
}

// Export all types from api.ts
export * from './api';