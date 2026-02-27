'use client';

import apiClient from './apiClient';
import type { Trip, CreateTripData, UpdateTripData, TripStatus, TripType } from '@/types/api';

export interface TripFilters {
  page?: number;
  limit?: number;
  search?: string;
  routeId?: string;
  vehicleId?: string;
  driverId?: string;
  status?: TripStatus;
  tripType?: TripType;
  startDate?: string;
  endDate?: string;
}

export interface TripResponse {
  data: {
    items: Trip[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export class TripService {
  private static readonly BASE_PATH = '/trips';

  // Trip CRUD Operations
  static async getTrips(filters?: TripFilters): Promise<TripResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.routeId) params.append('routeId', filters.routeId);
    if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
    if (filters?.driverId) params.append('driverId', filters.driverId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.tripType) params.append('tripType', filters.tripType);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get<TripResponse>(
      `${this.BASE_PATH}?${params.toString()}`
    );
    return response.data as TripResponse;
  }

  static async getTripById(id: string): Promise<Trip> {
    const response = await apiClient.get<Trip>(`${this.BASE_PATH}/${id}`);
    return response.data as Trip;
  }

  static async createTrip(data: CreateTripData): Promise<Trip> {
    const response = await apiClient.post<Trip>(this.BASE_PATH, data);
    return response.data as Trip;
  }

  static async updateTrip(id: string, data: UpdateTripData): Promise<Trip> {
    const response = await apiClient.put<Trip>(`${this.BASE_PATH}/${id}`, data);
    return response.data as Trip;
  }

  static async deleteTrip(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  // Trip Status Management
  static async updateTripStatus(id: string, status: TripStatus): Promise<Trip> {
    const response = await apiClient.patch<Trip>(`${this.BASE_PATH}/${id}/status`, { status });
    return response.data as Trip;
  }

  static async startTrip(id: string): Promise<Trip> {
    const response = await apiClient.patch<Trip>(`${this.BASE_PATH}/${id}/start`);
    return response.data as Trip;
  }

  static async completeTrip(id: string): Promise<Trip> {
    const response = await apiClient.patch<Trip>(`${this.BASE_PATH}/${id}/complete`);
    return response.data as Trip;
  }

  static async cancelTrip(id: string, reason?: string): Promise<Trip> {
    const response = await apiClient.patch<Trip>(`${this.BASE_PATH}/${id}/cancel`, { reason });
    return response.data as Trip;
  }

  // Bulk Operations
  static async bulkUpdateTrips(tripIds: string[], updates: Partial<Trip>): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/bulk`, {
      tripIds,
      updates
    });
  }

  static async bulkCreateTrips(trips: CreateTripData[]): Promise<Trip[]> {
    const response = await apiClient.post<Trip[]>(`${this.BASE_PATH}/bulk-create`, { trips });
    return response.data as Trip[];
  }

  // Scheduling Operations
  static async createRecurringTrips(data: {
    routeId: string;
    vehicleId: string;
    driverId: string;
    tripType: TripType;
    scheduledTime: string;
    recurringPattern: {
      type: 'daily' | 'weekly' | 'custom';
      daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
      endDate: string;
      excludeDates?: string[];
    };
  }): Promise<Trip[]> {
    const response = await apiClient.post<Trip[]>(`${this.BASE_PATH}/recurring`, data);
    return response.data as Trip[];
  }

  static async duplicateTrip(tripId: string, newDate: string): Promise<Trip> {
    const response = await apiClient.post<Trip>(`${this.BASE_PATH}/${tripId}/duplicate`, {
      scheduledTime: newDate
    });
    return response.data as Trip;
  }

  // Driver-specific operations
  static async getDriverTrips(driverId: string, filters?: Omit<TripFilters, 'driverId'>): Promise<TripResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.tripType) params.append('tripType', filters.tripType);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get<TripResponse>(
      `/drivers/${driverId}/trips?${params.toString()}`
    );
    return response.data as TripResponse;
  }

  static async getTodaysTrips(driverId: string): Promise<{ data: { items: Trip[] } }> {
    const response = await apiClient.get(`/drivers/${driverId}/trips/today`);
    return response.data as { data: { items: Trip[] } };
  }

  // Vehicle-specific operations
  static async getVehicleTrips(vehicleId: string, filters?: Omit<TripFilters, 'vehicleId'>): Promise<TripResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get<TripResponse>(
      `/vehicles/${vehicleId}/trips?${params.toString()}`
    );
    return response.data as TripResponse;
  }

  // Route-specific operations
  static async getRouteTrips(routeId: string, filters?: Omit<TripFilters, 'routeId'>): Promise<TripResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get<TripResponse>(
      `/routes/${routeId}/trips?${params.toString()}`
    );
    return response.data as TripResponse;
  }

  // Student Operations
  static async getTripStudents(tripId: string): Promise<any> {
    const response = await apiClient.get(`${this.BASE_PATH}/${tripId}/students`);
    return response.data;
  }

  static async updateStudentStatus(tripId: string, studentId: string, status: 'present' | 'absent' | 'picked_up' | 'dropped_off'): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/${tripId}/students/${studentId}/status`, { status });
  }

  static async bulkUpdateStudentStatus(tripId: string, updates: { studentId: string; status: string }[]): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/${tripId}/students/bulk-status`, { updates });
  }

  // Analytics and Reporting
  static async getTripStats(filters?: {
    startDate?: string;
    endDate?: string;
    driverId?: string;
    vehicleId?: string;
    routeId?: string;
  }): Promise<any> {
    const params = new URLSearchParams();
    
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.driverId) params.append('driverId', filters.driverId);
    if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
    if (filters?.routeId) params.append('routeId', filters.routeId);

    const response = await apiClient.get(`${this.BASE_PATH}/stats?${params.toString()}`);
    return response.data;
  }

  static async getTripPerformance(tripId: string): Promise<any> {
    const response = await apiClient.get(`${this.BASE_PATH}/${tripId}/performance`);
    return response.data;
  }

  // Import/Export
  static async importTrips(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post(`${this.BASE_PATH}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async exportTrips(filters?: TripFilters): Promise<Blob> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.routeId) params.append('routeId', filters.routeId);
    if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
    if (filters?.driverId) params.append('driverId', filters.driverId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.tripType) params.append('tripType', filters.tripType);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get(`${this.BASE_PATH}/export?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  }

  // Real-time tracking (for future implementation)
  static async updateTripLocation(tripId: string, location: { latitude: number; longitude: number }): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/${tripId}/location`, location);
  }

  static async getTripLocation(tripId: string): Promise<{ latitude: number; longitude: number; timestamp: string }> {
    const response = await apiClient.get(`${this.BASE_PATH}/${tripId}/location`);
    return response.data as { latitude: number; longitude: number; timestamp: string };
  }
}