// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    code: string;
    details?: Record<string, string>;
  };
}

export interface PaginatedResponse<T> {
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

// User and Authentication Types
export type UserRole = 'ADMIN' | 'TEACHER' | 'DRIVER' | 'PARENT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  isActive: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  children?: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  createdAt: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

// School Types
export interface School {
  id: string;
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchoolData {
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  isActive?: boolean;
}

export type UpdateSchoolData = Partial<CreateSchoolData>;

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Vehicle Types
export type VehicleStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
export type MaintenanceStatus = 'GOOD' | 'NEEDS_ATTENTION' | 'CRITICAL';

export interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  year: number;
  capacity: number;
  status: VehicleStatus;
  maintenanceStatus: MaintenanceStatus;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  mileage?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleData {
  licensePlate: string;
  model: string;
  year: number;
  capacity: number;
  status?: VehicleStatus;
  maintenanceStatus?: MaintenanceStatus;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  mileage?: number;
  notes?: string;
}

export type UpdateVehicleData = Partial<CreateVehicleData>;

// Enhanced User Types for Management
export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export type UpdateUserData = Partial<Omit<CreateUserData, 'password'>> & {
  isActive?: boolean;
};

// Student Types
export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  grade: string;
  dateOfBirth?: string;
  schoolId: string;
  guardianIds: string[];
  address?: string;
  medicalInfo?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  pickupAddress?: string;
  dropoffAddress?: string;
  specialNeeds?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  school?: School;
  guardians?: Guardian[];
}

export interface CreateStudentData {
  studentId: string;
  firstName: string;
  lastName: string;
  grade: string;
  dateOfBirth?: string;
  schoolId: string;
  guardianIds: string[];
  address?: string;
  medicalInfo?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  pickupAddress?: string;
  dropoffAddress?: string;
  specialNeeds?: string;
  isActive?: boolean;
}

export type UpdateStudentData = Partial<CreateStudentData>;

export type UpdateGuardianData = Partial<CreateGuardianData>;

// Driver Types
export interface Driver {
  id: string;
  driverId: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateDriverData {
  driverId: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  phone: string;
  email: string;
}

// Route Types
export interface Route {
  id: string;
  routeName: string;
  description?: string;
  schoolId: string;
  distance?: number;
  estimatedDuration?: number;
  capacity?: number;
  isActive: boolean;
  stops: Stop[];
  createdAt: string;
  updatedAt?: string;
  school?: School;
  assignments?: Assignment[];
}

export interface CreateRouteData {
  routeName: string;
  description?: string;
  schoolId: string;
  distance?: number;
  estimatedDuration?: number;
  isActive?: boolean;
}

export type UpdateRouteData = Partial<CreateRouteData>;

// Trip Types
export type TripStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TripType = 'PICKUP' | 'DROPOFF';

export interface Trip {
  id: string;
  routeId: string;
  vehicleId: string;
  driverId: string;
  tripType: TripType;
  scheduledTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  status: TripStatus;
  createdAt: string;
  updatedAt?: string;
  route?: Route;
  vehicle?: Vehicle;
  driver?: Driver;
}

export interface CreateTripData {
  routeId: string;
  vehicleId: string;
  driverId: string;
  tripType: TripType;
  scheduledTime: string;
  status?: TripStatus;
}

export type UpdateTripData = Partial<CreateTripData> & {
  actualStartTime?: string;
  actualEndTime?: string;
  status?: TripStatus;
};

// Guardian Types
export interface Guardian {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateGuardianData {
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

// Assignment Types
export type AssignmentStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED';

export interface Assignment {
  id: string;
  studentId: string;
  routeId: string;
  stopId: string;
  assignmentDate: string;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt?: string;
  student?: Student;
  route?: Route;
  stop?: Stop;
}

export interface CreateAssignmentData {
  studentId: string;
  routeId: string;
  stopId: string;
  assignmentDate: string;
  status: AssignmentStatus;
}

// Stop Types
export interface Stop {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  routeId: string;
  stopOrder: number;
  estimatedArrival?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  route?: Route;
  assignments?: Assignment[];
}

export interface CreateStopData {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  routeId: string;
  stopOrder: number;
  estimatedArrival?: string;
  isActive?: boolean;
}

export type UpdateStopData = Partial<CreateStopData>;

// Event Log Types
export interface EventLog {
  id: string;
  eventType: string;
  userId: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
  user?: User;
}

// Filter and Query Types
export interface BaseQuery {
  page?: number;
  limit?: number;
}

export interface SchoolQuery extends BaseQuery {
  search?: string;
}

export interface VehicleQuery extends BaseQuery {
  status?: VehicleStatus;
}

export interface UserQuery extends BaseQuery {
  role?: UserRole;
}

export interface StudentQuery extends BaseQuery {
  schoolId?: string;
  grade?: string;
}

export interface TripQuery extends BaseQuery {
  status?: TripStatus;
  date?: string;
  driverId?: string;
}

export interface EventLogQuery extends BaseQuery {
  eventType?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}