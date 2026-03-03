// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Authentication Constants
export const AUTH_CONFIG = {
  ACCESS_TOKEN_KEY: "sks_access_token",
  REFRESH_TOKEN_KEY: "sks_refresh_token",
  USER_DATA_KEY: "sks_user_data",
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  DRIVER: "DRIVER",
  PARENT: "PARENT",
} as const;

// Vehicle Statuses
export const VEHICLE_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  MAINTENANCE: "MAINTENANCE",
} as const;

// Maintenance Statuses
export const MAINTENANCE_STATUS = {
  GOOD: "GOOD",
  NEEDS_ATTENTION: "NEEDS_ATTENTION",
  CRITICAL: "CRITICAL",
} as const;

// Trip Statuses
export const TRIP_STATUS = {
  SCHEDULED: "SCHEDULED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

// Trip Types
export const TRIP_TYPE = {
  PICKUP: "PICKUP",
  DROPOFF: "DROPOFF",
} as const;

// Assignment Statuses
export const ASSIGNMENT_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

// Notification Types
export const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

// Theme Modes
export const THEME_MODE = {
  LIGHT: "light",
  DARK: "dark",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ["10", "20", "50", "100"],
  SHOW_QUICK_JUMPER: true,
  SHOW_SIZE_CHANGER: true,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "DD/MM/YYYY",
  DISPLAY_WITH_TIME: "DD/MM/YYYY HH:mm",
  API: "YYYY-MM-DD",
  API_WITH_TIME: "YYYY-MM-DDTHH:mm:ss.SSSZ",
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "application/pdf"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".pdf"],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: "sks_theme",
  LANGUAGE: "sks_language",
  SIDEBAR_COLLAPSED: "sks_sidebar_collapsed",
  TABLE_SETTINGS: "sks_table_settings",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error occurred. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied. Insufficient permissions.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "An unexpected server error occurred.",
  VALIDATION_ERROR: "Please check your input and try again.",
  TOKEN_EXPIRED: "Your session has expired. Please login again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Successfully logged in!",
  LOGOUT: "Successfully logged out!",
  CREATED: "Record created successfully!",
  UPDATED: "Record updated successfully!",
  DELETED: "Record deleted successfully!",
  SAVED: "Changes saved successfully!",
} as const;

// Navigation Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  DASHBOARD: "/dashboard",
  SCHOOLS: "/schools",
  VEHICLES: "/vehicles",
  USERS: "/users",
  STUDENTS: "/users",
  DRIVERS: "/users", 
  ROUTES: "/routes",
  TRIPS: "/trips",
  ASSIGNMENTS: "/assignments",
  STOPS: "/stops",
  GUARDIANS: "/users",
  EVENT_LOGS: "/logs",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  TRIP_UPDATE: "trip_update",
  NOTIFICATION: "notification",
  LOCATION_UPDATE: "location_update",
  SUBSCRIBE_TRIP: "subscribe_trip",
  UNSUBSCRIBE_TRIP: "unsubscribe_trip",
} as const;

// Query Keys for React Query
export const QUERY_KEYS = {
  USERS: ["users"],
  USER: (id: string) => ["users", id],
  SCHOOLS: ["schools"],
  SCHOOL: (id: string) => ["schools", id],
  VEHICLES: ["vehicles"],
  VEHICLE: (id: string) => ["vehicles", id],
  STUDENTS: ["students"],
  STUDENT: (id: string) => ["students", id],
  DRIVERS: ["drivers"],
  DRIVER: (id: string) => ["drivers", id],
  ROUTES: ["routes"],
  ROUTE: (id: string) => ["routes", id],
  TRIPS: ["trips"],
  TRIP: (id: string) => ["trips", id],
  ASSIGNMENTS: ["assignments"],
  ASSIGNMENT: (id: string) => ["assignments", id],
  STOPS: ["stops"],
  STOP: (id: string) => ["stops", id],
  GUARDIANS: ["guardians"],
  GUARDIAN: (id: string) => ["guardians", id],
  EVENT_LOGS: ["event_logs"],
  EVENT_LOG: (id: string) => ["event_logs", id],
  CURRENT_USER: ["current_user"],
} as const;

// Ant Design Theme Colors
export const THEME_COLORS = {
  PRIMARY: "#1890ff",
  SUCCESS: "#52c41a",
  WARNING: "#faad14",
  ERROR: "#f5222d",
  INFO: "#1890ff",
  TEXT_PRIMARY: "rgba(0, 0, 0, 0.85)",
  TEXT_SECONDARY: "rgba(0, 0, 0, 0.65)",
  TEXT_DISABLED: "rgba(0, 0, 0, 0.25)",
} as const;

// Breakpoints (matching Ant Design)
export const BREAKPOINTS = {
  XS: 480,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1600,
} as const;
