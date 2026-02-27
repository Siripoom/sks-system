'use client';

import apiClient from './apiClient';
import type { Route, CreateRouteData, UpdateRouteData, Stop, CreateStopData, UpdateStopData } from '@/types/api';

export interface RouteFilters {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  isActive?: boolean;
}

export interface RouteResponse {
  data: {
    items: Route[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export class RouteService {
  private static readonly BASE_PATH = '/routes';

  // Route CRUD Operations
  static async getRoutes(filters?: RouteFilters): Promise<RouteResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());

    const response = await apiClient.get<RouteResponse>(
      `${this.BASE_PATH}?${params.toString()}`
    );
    return response.data as RouteResponse;
  }

  static async getRouteById(id: string): Promise<Route> {
    const response = await apiClient.get<Route>(`${this.BASE_PATH}/${id}`);
    return response.data as Route;
  }

  static async createRoute(data: CreateRouteData): Promise<Route> {
    const response = await apiClient.post<Route>(this.BASE_PATH, data);
    return response.data as Route;
  }

  static async updateRoute(id: string, data: UpdateRouteData): Promise<Route> {
    const response = await apiClient.put<Route>(`${this.BASE_PATH}/${id}`, data);
    return response.data as Route;
  }

  static async deleteRoute(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  static async toggleRouteStatus(id: string): Promise<Route> {
    const response = await apiClient.patch<Route>(`${this.BASE_PATH}/${id}/toggle-status`);
    return response.data as Route;
  }

  // Stop Management
  static async getRouteStops(routeId: string): Promise<{ data: { items: Stop[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/${routeId}/stops`);
    return response.data as { data: { items: Stop[] } };
  }

  static async createStop(data: CreateStopData): Promise<Stop> {
    const response = await apiClient.post<Stop>('/stops', data);
    return response.data as Stop;
  }

  static async updateStop(id: string, data: UpdateStopData): Promise<Stop> {
    const response = await apiClient.put<Stop>(`/stops/${id}`, data);
    return response.data as Stop;
  }

  static async deleteStop(id: string): Promise<void> {
    await apiClient.delete(`/stops/${id}`);
  }

  static async reorderStops(routeId: string, stopOrders: { stopId: string; order: number }[]): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/${routeId}/stops/reorder`, { stopOrders });
  }

  // Route Optimization
  static async optimizeRoute(routeId: string): Promise<Route> {
    const response = await apiClient.post<Route>(`${this.BASE_PATH}/${routeId}/optimize`);
    return response.data as Route;
  }

  static async calculateDistance(routeId: string): Promise<{ distance: number; duration: number }> {
    const response = await apiClient.get(`${this.BASE_PATH}/${routeId}/distance`);
    return response.data as { distance: number; duration: number };
  }

  // Bulk Operations
  static async bulkUpdateRoutes(routeIds: string[], updates: Partial<Route>): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/bulk`, {
      routeIds,
      updates
    });
  }

  static async duplicateRoute(routeId: string, newName: string): Promise<Route> {
    const response = await apiClient.post<Route>(`${this.BASE_PATH}/${routeId}/duplicate`, {
      routeName: newName
    });
    return response.data as Route;
  }

  // Student Assignments
  static async getRouteAssignments(routeId: string): Promise<any> {
    const response = await apiClient.get(`${this.BASE_PATH}/${routeId}/assignments`);
    return response.data;
  }

  static async assignStudentsToRoute(routeId: string, assignments: { studentId: string; stopId: string }[]): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/${routeId}/assign-students`, { assignments });
  }

  static async removeStudentFromRoute(routeId: string, studentId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${routeId}/students/${studentId}`);
  }

  // Import/Export
  static async importRoutes(file: File, schoolId: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('schoolId', schoolId);

    const response = await apiClient.post(`${this.BASE_PATH}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async exportRoutes(filters?: RouteFilters): Promise<Blob> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());

    const response = await apiClient.get(`${this.BASE_PATH}/export?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  }

  // School-specific routes
  static async getSchoolRoutes(schoolId: string): Promise<{ data: { items: Route[] } }> {
    const response = await apiClient.get(`/schools/${schoolId}/routes`);
    return response.data as { data: { items: Route[] } };
  }

  // Analytics
  static async getRouteStats(routeId: string): Promise<any> {
    const response = await apiClient.get(`${this.BASE_PATH}/${routeId}/stats`);
    return response.data;
  }

  static async getRouteUtilization(routeId: string, dateRange?: { startDate: string; endDate: string }): Promise<any> {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
    if (dateRange?.endDate) params.append('endDate', dateRange.endDate);

    const response = await apiClient.get(`${this.BASE_PATH}/${routeId}/utilization?${params.toString()}`);
    return response.data;
  }
}