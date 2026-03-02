import apiClient from './apiClient';
import type { Vehicle, CreateVehicleData, UpdateVehicleData, PaginationParams, PaginatedResponse } from '@/types/api';

export class VehicleService {
  private static readonly BASE_PATH = '/vehicles';

  static async getVehicles(params?: PaginationParams & { status?: string }): Promise<{ items: Vehicle[], pagination: { page: number, limit: number, total: number, pages: number } }> {
    const response = await apiClient.get<{ items: Vehicle[], pagination: { page: number, limit: number, total: number, pages: number } }>(this.BASE_PATH, { params });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to fetch vehicles');
    }
    
    if (!response.data) {
      throw new Error('No data received from vehicles API');
    }
    
    return response.data;
  }

  static async getVehicle(id: string): Promise<Vehicle> {
    const response = await apiClient.get<Vehicle>(`${this.BASE_PATH}/${id}`);
    return response.data as Vehicle;
  }

  static async createVehicle(data: CreateVehicleData): Promise<Vehicle> {
    const response = await apiClient.post<Vehicle>(this.BASE_PATH, data);
    return response.data as Vehicle;
  }

  static async updateVehicle(id: string, data: UpdateVehicleData): Promise<Vehicle> {
    const response = await apiClient.put<Vehicle>(`${this.BASE_PATH}/${id}`, data);
    return response.data as Vehicle;
  }

  static async deleteVehicle(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  static async searchVehicles(query: string, params?: PaginationParams): Promise<{ items: Vehicle[], pagination: { page: number, limit: number, total: number, pages: number } }> {
    const response = await apiClient.get<{ items: Vehicle[], pagination: { page: number, limit: number, total: number, pages: number } }>(`${this.BASE_PATH}/search`, {
      params: { q: query, ...params }
    });
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to search vehicles');
    }
    
    if (!response.data) {
      throw new Error('No data received from vehicle search API');
    }
    
    return response.data;
  }

  static async getVehicleStats(id: string) {
    const response = await apiClient.get<any>(`${this.BASE_PATH}/${id}/stats`);
    return response.data;
  }

  static async updateVehicleStatus(id: string, status: string): Promise<Vehicle> {
    const response = await apiClient.patch<Vehicle>(`${this.BASE_PATH}/${id}/status`, { status });
    return response.data as Vehicle;
  }

  static async updateMaintenanceStatus(id: string, maintenanceStatus: string, notes?: string): Promise<Vehicle> {
    const response = await apiClient.patch<Vehicle>(`${this.BASE_PATH}/${id}/maintenance`, { 
      maintenanceStatus, 
      notes 
    });
    return response.data as Vehicle;
  }
}