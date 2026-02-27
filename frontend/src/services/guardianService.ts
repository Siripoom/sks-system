'use client';

import apiClient from './apiClient';
import type { Guardian, CreateGuardianData, UpdateGuardianData } from '@/types/api';

export interface GuardianFilters {
  page?: number;
  limit?: number;
  search?: string;
  studentId?: string;
}

export interface GuardianResponse {
  data: {
    items: Guardian[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export class GuardianService {
  private static readonly BASE_PATH = '/guardians';

  static async getGuardians(filters?: GuardianFilters): Promise<GuardianResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.studentId) params.append('studentId', filters.studentId);

    const response = await apiClient.get<GuardianResponse>(
      `${this.BASE_PATH}?${params.toString()}`
    );
    return response.data as GuardianResponse;
  }

  static async getGuardianById(id: string): Promise<Guardian> {
    const response = await apiClient.get<Guardian>(`${this.BASE_PATH}/${id}`);
    return response.data as Guardian;
  }

  static async createGuardian(data: CreateGuardianData): Promise<Guardian> {
    const response = await apiClient.post<Guardian>(this.BASE_PATH, data);
    return response.data as Guardian;
  }

  static async updateGuardian(id: string, data: UpdateGuardianData): Promise<Guardian> {
    const response = await apiClient.put<Guardian>(`${this.BASE_PATH}/${id}`, data);
    return response.data as Guardian;
  }

  static async deleteGuardian(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  static async assignStudents(guardianId: string, studentIds: string[]): Promise<Guardian> {
    const response = await apiClient.post<Guardian>(
      `${this.BASE_PATH}/${guardianId}/students`,
      { studentIds }
    );
    return response.data as Guardian;
  }

  static async removeStudents(guardianId: string, studentIds: string[]): Promise<Guardian> {
    const response = await apiClient.delete<Guardian>(
      `${this.BASE_PATH}/${guardianId}/students`,
      { data: { studentIds } }
    );
    return response.data as Guardian;
  }

  static async getAvailableStudents(guardianId?: string): Promise<{ data: { items: any[] } }> {
    const params = guardianId ? `?excludeGuardian=${guardianId}` : '';
    const response = await apiClient.get(`/students/available${params}`);
    return response.data as { data: { items: any[] } };
  }

  static async bulkUpdateGuardians(guardianIds: string[], updates: Partial<Guardian>): Promise<void> {
    await apiClient.patch('/guardians/bulk', {
      guardianIds,
      updates
    });
  }

  static async importGuardians(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/guardians/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async exportGuardians(filters?: GuardianFilters): Promise<Blob> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.studentId) params.append('studentId', filters.studentId);

    const response = await apiClient.get(`${this.BASE_PATH}/export?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  }
}