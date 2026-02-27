'use client';

import apiClient from './apiClient';
import type { Trip } from '@/types/api';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
  altitude?: number;
  timestamp: string;
}

export interface TripTracking {
  id: string;
  tripId: string;
  vehicleId: string;
  driverId: string;
  routeId: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';
  currentLocation: LocationData;
  currentStopId?: string;
  nextStopId?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  studentsOnBoard: {
    studentId: string;
    status: 'PICKED_UP' | 'DROPPED_OFF' | 'ABSENT' | 'NO_SHOW';
    timestamp: string;
  }[];
  route: {
    id: string;
    routeName: string;
    stops: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      estimatedArrival: string;
      actualArrival?: string;
      status: 'PENDING' | 'ARRIVED' | 'DEPARTED' | 'SKIPPED';
    }[];
  };
  alerts: {
    id: string;
    type: 'DELAY' | 'BREAKDOWN' | 'EMERGENCY' | 'ROUTE_DEVIATION' | 'WEATHER';
    message: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    timestamp: string;
    acknowledged: boolean;
  }[];
  performance: {
    distanceTraveled: number;
    averageSpeed: number;
    fuelConsumption?: number;
    delayMinutes: number;
    onTimePercentage: number;
  };
  weather?: {
    condition: string;
    temperature: number;
    visibility: number;
    precipitation: number;
  };
  lastUpdated: string;
}

export interface TripTrackingFilters {
  status?: string;
  driverId?: string;
  vehicleId?: string;
  routeId?: string;
  date?: string;
  schoolId?: string;
}

export interface TrackingAlert {
  id: string;
  tripId: string;
  type: 'DELAY' | 'BREAKDOWN' | 'EMERGENCY' | 'ROUTE_DEVIATION' | 'WEATHER' | 'STUDENT_ALERT';
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  metadata?: Record<string, any>;
}

export interface TrackingStats {
  totalActiveTrips: number;
  onTimeTrips: number;
  delayedTrips: number;
  alertsCount: number;
  averageDelay: number;
  fuelEfficiency: number;
  studentsOnBoard: number;
  routeCompletion: number;
}

export class TrackingService {
  private static readonly BASE_PATH = '/tracking';

  // Real-time Trip Tracking
  static async getActiveTrips(filters?: TripTrackingFilters): Promise<{ data: { items: TripTracking[] } }> {
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.driverId) params.append('driverId', filters.driverId);
    if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
    if (filters?.routeId) params.append('routeId', filters.routeId);
    if (filters?.date) params.append('date', filters.date);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);

    const response = await apiClient.get(`${this.BASE_PATH}/active?${params.toString()}`);
    return response.data as { data: { items: TripTracking[] } };
  }

  static async getTripTracking(tripId: string): Promise<TripTracking> {
    const response = await apiClient.get(`${this.BASE_PATH}/trips/${tripId}`);
    return response.data as TripTracking;
  }

  static async updateTripLocation(tripId: string, location: LocationData): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/location`, location);
  }

  static async updateTripStatus(tripId: string, status: string, metadata?: Record<string, any>): Promise<TripTracking> {
    const response = await apiClient.patch(`${this.BASE_PATH}/trips/${tripId}/status`, { 
      status, 
      metadata 
    });
    return response.data as TripTracking;
  }

  // Stop Management
  static async arriveAtStop(tripId: string, stopId: string, location: LocationData): Promise<TripTracking> {
    const response = await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/arrive`, {
      location,
      timestamp: new Date().toISOString()
    });
    return response.data as TripTracking;
  }

  static async departFromStop(tripId: string, stopId: string): Promise<TripTracking> {
    const response = await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/depart`, {
      timestamp: new Date().toISOString()
    });
    return response.data as TripTracking;
  }

  static async skipStop(tripId: string, stopId: string, reason: string): Promise<TripTracking> {
    const response = await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/skip`, {
      reason,
      timestamp: new Date().toISOString()
    });
    return response.data as TripTracking;
  }

  // Student Management
  static async updateStudentStatus(
    tripId: string, 
    studentId: string, 
    status: 'PICKED_UP' | 'DROPPED_OFF' | 'ABSENT' | 'NO_SHOW',
    stopId?: string
  ): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/trips/${tripId}/students/${studentId}`, {
      status,
      stopId,
      timestamp: new Date().toISOString()
    });
  }

  static async bulkUpdateStudentStatus(
    tripId: string,
    updates: {
      studentId: string;
      status: string;
      stopId?: string;
    }[]
  ): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/trips/${tripId}/students/bulk`, {
      updates: updates.map(update => ({
        ...update,
        timestamp: new Date().toISOString()
      }))
    });
  }

  // Alerts and Notifications
  static async createAlert(tripId: string, alert: {
    type: string;
    message: string;
    severity: string;
    metadata?: Record<string, any>;
  }): Promise<TrackingAlert> {
    const response = await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/alerts`, {
      ...alert,
      timestamp: new Date().toISOString()
    });
    return response.data as TrackingAlert;
  }

  static async getActiveAlerts(): Promise<{ data: { items: TrackingAlert[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/alerts/active`);
    return response.data as { data: { items: TrackingAlert[] } };
  }

  static async acknowledgeAlert(alertId: string): Promise<TrackingAlert> {
    const response = await apiClient.patch(`${this.BASE_PATH}/alerts/${alertId}/acknowledge`, {
      acknowledgedAt: new Date().toISOString()
    });
    return response.data as TrackingAlert;
  }

  static async resolveAlert(alertId: string, resolution?: string): Promise<TrackingAlert> {
    const response = await apiClient.patch(`${this.BASE_PATH}/alerts/${alertId}/resolve`, {
      resolution,
      resolvedAt: new Date().toISOString()
    });
    return response.data as TrackingAlert;
  }

  // Route Optimization
  static async getRouteOptimization(routeId: string, date: string): Promise<any> {
    const response = await apiClient.get(`${this.BASE_PATH}/routes/${routeId}/optimize?date=${date}`);
    return response.data;
  }

  static async applyRouteOptimization(routeId: string, optimizationId: string): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/routes/${routeId}/apply-optimization`, {
      optimizationId
    });
  }

  // ETA and Predictions
  static async getETAForStop(tripId: string, stopId: string): Promise<{
    estimatedArrival: string;
    confidence: number;
    delayMinutes: number;
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/eta`);
    return response.data as {
      estimatedArrival: string;
      confidence: number;
      delayMinutes: number;
    };
  }

  static async getETAForStudent(studentId: string, date?: string): Promise<{
    pickup?: {
      estimatedArrival: string;
      confidence: number;
      delayMinutes: number;
    };
    dropoff?: {
      estimatedArrival: string;
      confidence: number;
      delayMinutes: number;
    };
  }> {
    const params = date ? `?date=${date}` : '';
    const response = await apiClient.get(`${this.BASE_PATH}/students/${studentId}/eta${params}`);
    return response.data as {
      pickup?: {
        estimatedArrival: string;
        confidence: number;
        delayMinutes: number;
      };
      dropoff?: {
        estimatedArrival: string;
        confidence: number;
        delayMinutes: number;
      };
    };
  }

  // Geofencing
  static async checkGeofence(tripId: string, location: LocationData): Promise<{
    withinRoute: boolean;
    nearestStop?: string;
    distanceFromRoute: number;
    alerts: string[];
  }> {
    const response = await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/geofence`, location);
    return response.data as {
      withinRoute: boolean;
      nearestStop?: string;
      distanceFromRoute: number;
      alerts: string[];
    };
  }

  // Emergency and Incident Management
  static async reportEmergency(tripId: string, emergency: {
    type: 'ACCIDENT' | 'BREAKDOWN' | 'MEDICAL' | 'SECURITY' | 'WEATHER' | 'OTHER';
    description: string;
    location: LocationData;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    contactAuthorities?: boolean;
  }): Promise<string> {
    const response = await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/emergency`, {
      ...emergency,
      timestamp: new Date().toISOString()
    });
    return (response.data as any).emergencyId;
  }

  static async updateEmergencyStatus(emergencyId: string, status: string, notes?: string): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/emergencies/${emergencyId}`, {
      status,
      notes,
      updatedAt: new Date().toISOString()
    });
  }

  // Driver Communication
  static async sendMessageToDriver(driverId: string, message: {
    type: 'INSTRUCTION' | 'ALERT' | 'UPDATE' | 'EMERGENCY';
    content: string;
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
    requireAcknowledgment?: boolean;
  }): Promise<string> {
    const response = await apiClient.post(`${this.BASE_PATH}/drivers/${driverId}/messages`, {
      ...message,
      timestamp: new Date().toISOString()
    });
    return (response.data as any).messageId;
  }

  static async getDriverMessages(driverId: string, unreadOnly?: boolean): Promise<any[]> {
    const params = unreadOnly ? '?unreadOnly=true' : '';
    const response = await apiClient.get(`${this.BASE_PATH}/drivers/${driverId}/messages${params}`);
    return response.data as any[];
  }

  // Analytics and Reporting
  static async getTrackingStats(filters?: {
    date?: string;
    schoolId?: string;
    routeId?: string;
  }): Promise<TrackingStats> {
    const params = new URLSearchParams();
    
    if (filters?.date) params.append('date', filters.date);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.routeId) params.append('routeId', filters.routeId);

    const response = await apiClient.get(`${this.BASE_PATH}/stats?${params.toString()}`);
    return response.data as TrackingStats;
  }

  static async getTripHistory(tripId: string): Promise<{
    events: {
      type: string;
      timestamp: string;
      location?: LocationData;
      description: string;
      metadata?: Record<string, any>;
    }[];
    route: any[];
    performance: any;
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/trips/${tripId}/history`);
    return response.data as {
      events: {
        type: string;
        timestamp: string;
        location?: LocationData;
        description: string;
        metadata?: Record<string, any>;
      }[];
      route: any[];
      performance: any;
    };
  }

  static async exportTrackingData(filters: {
    startDate: string;
    endDate: string;
    format?: 'CSV' | 'JSON' | 'PDF';
    includeRoutes?: boolean;
    includeStudents?: boolean;
    includePerformance?: boolean;
  }): Promise<Blob> {
    const response = await apiClient.post(`${this.BASE_PATH}/export`, filters, {
      responseType: 'blob'
    });
    return response.data as Blob;
  }

  // Parent/Guardian Access
  static async getStudentTripTracking(studentId: string): Promise<{
    currentTrip?: TripTracking;
    todaysSchedule: {
      pickup?: {
        routeName: string;
        stopName: string;
        estimatedTime: string;
        status: string;
      };
      dropoff?: {
        routeName: string;
        stopName: string;
        estimatedTime: string;
        status: string;
      };
    };
    recentHistory: any[];
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/students/${studentId}/tracking`);
    return response.data as {
      currentTrip?: TripTracking;
      todaysSchedule: {
        pickup?: {
          routeName: string;
          stopName: string;
          estimatedTime: string;
          status: string;
        };
        dropoff?: {
          routeName: string;
          stopName: string;
          estimatedTime: string;
          status: string;
        };
      };
      recentHistory: any[];
    };
  }

  // Maintenance Integration
  static async reportVehicleIssue(tripId: string, issue: {
    type: 'MECHANICAL' | 'SAFETY' | 'COMFORT' | 'CLEANLINESS' | 'OTHER';
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    canContinueTrip: boolean;
  }): Promise<string> {
    const response = await apiClient.post(`${this.BASE_PATH}/trips/${tripId}/vehicle-issue`, {
      ...issue,
      timestamp: new Date().toISOString()
    });
    return (response.data as any).issueId;
  }

  // Weather Integration
  static async getWeatherForRoute(routeId: string, date: string): Promise<{
    current: any;
    forecast: any[];
    alerts: any[];
    recommendations: string[];
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/routes/${routeId}/weather?date=${date}`);
    return response.data as {
      current: any;
      forecast: any[];
      alerts: any[];
      recommendations: string[];
    };
  }

  // Performance Monitoring
  static async getDriverPerformance(driverId: string, period: string): Promise<{
    onTimePerformance: number;
    safetyScore: number;
    fuelEfficiency: number;
    studentSatisfaction: number;
    incidentCount: number;
    recommendations: string[];
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/drivers/${driverId}/performance?period=${period}`);
    return response.data as {
      onTimePerformance: number;
      safetyScore: number;
      fuelEfficiency: number;
      studentSatisfaction: number;
      incidentCount: number;
      recommendations: string[];
    };
  }

  static async getVehiclePerformance(vehicleId: string, period: string): Promise<{
    utilizationRate: number;
    fuelConsumption: number;
    maintenanceScore: number;
    breakdownCount: number;
    costPerMile: number;
    recommendations: string[];
  }> {
    const response = await apiClient.get(`${this.BASE_PATH}/vehicles/${vehicleId}/performance?period=${period}`);
    return response.data as {
      utilizationRate: number;
      fuelConsumption: number;
      maintenanceScore: number;
      breakdownCount: number;
      costPerMile: number;
      recommendations: string[];
    };
  }
}