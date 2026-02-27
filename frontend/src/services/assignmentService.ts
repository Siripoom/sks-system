'use client';

import apiClient from './apiClient';
import type { Assignment, CreateAssignmentData, AssignmentStatus } from '@/types/api';

export interface AssignmentFilters {
  page?: number;
  limit?: number;
  search?: string;
  studentId?: string;
  routeId?: string;
  stopId?: string;
  status?: AssignmentStatus;
  schoolId?: string;
  assignmentDate?: string;
}

export interface AssignmentResponse {
  data: {
    items: Assignment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface BulkAssignmentData {
  studentIds: string[];
  routeId: string;
  stopId: string;
  assignmentDate: string;
  status?: AssignmentStatus;
}

export interface AssignmentStats {
  totalAssignments: number;
  activeAssignments: number;
  inactiveAssignments: number;
  studentsAssigned: number;
  studentsUnassigned: number;
  routeUtilization: {
    routeId: string;
    routeName: string;
    assignedStudents: number;
    capacity: number;
    utilizationRate: number;
  }[];
}

export class AssignmentService {
  private static readonly BASE_PATH = '/assignments';

  // Assignment CRUD Operations
  static async getAssignments(filters?: AssignmentFilters): Promise<AssignmentResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.studentId) params.append('studentId', filters.studentId);
    if (filters?.routeId) params.append('routeId', filters.routeId);
    if (filters?.stopId) params.append('stopId', filters.stopId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.assignmentDate) params.append('assignmentDate', filters.assignmentDate);

    const response = await apiClient.get<AssignmentResponse>(
      `${this.BASE_PATH}?${params.toString()}`
    );
    return response.data as AssignmentResponse;
  }

  static async getAssignmentById(id: string): Promise<Assignment> {
    const response = await apiClient.get<Assignment>(`${this.BASE_PATH}/${id}`);
    return response.data as Assignment;
  }

  static async createAssignment(data: CreateAssignmentData): Promise<Assignment> {
    const response = await apiClient.post<Assignment>(this.BASE_PATH, data);
    return response.data as Assignment;
  }

  static async updateAssignment(id: string, data: Partial<CreateAssignmentData>): Promise<Assignment> {
    const response = await apiClient.put<Assignment>(`${this.BASE_PATH}/${id}`, data);
    return response.data as Assignment;
  }

  static async deleteAssignment(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  // Bulk Assignment Operations
  static async createBulkAssignments(data: BulkAssignmentData): Promise<Assignment[]> {
    const response = await apiClient.post<Assignment[]>(`${this.BASE_PATH}/bulk`, data);
    return response.data as Assignment[];
  }

  static async updateBulkAssignments(assignmentIds: string[], updates: Partial<CreateAssignmentData>): Promise<void> {
    await apiClient.patch(`${this.BASE_PATH}/bulk`, {
      assignmentIds,
      updates
    });
  }

  static async deleteBulkAssignments(assignmentIds: string[]): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/bulk`, {
      data: { assignmentIds }
    });
  }

  // Student Assignment Operations
  static async getStudentAssignments(studentId: string): Promise<{ data: { items: Assignment[] } }> {
    const response = await apiClient.get(`/students/${studentId}/assignments`);
    return response.data as { data: { items: Assignment[] } };
  }

  static async assignStudentToRoute(studentId: string, routeId: string, stopId: string, assignmentDate: string): Promise<Assignment> {
    const response = await apiClient.post<Assignment>(`/students/${studentId}/assign`, {
      routeId,
      stopId,
      assignmentDate,
      status: 'ACTIVE'
    });
    return response.data as Assignment;
  }

  static async unassignStudent(studentId: string, assignmentId: string): Promise<void> {
    await apiClient.delete(`/students/${studentId}/assignments/${assignmentId}`);
  }

  // Route Assignment Operations
  static async getRouteAssignments(routeId: string): Promise<{ data: { items: Assignment[] } }> {
    const response = await apiClient.get(`/routes/${routeId}/assignments`);
    return response.data as { data: { items: Assignment[] } };
  }

  static async getUnassignedStudents(filters?: { schoolId?: string; grade?: string }): Promise<{ data: { items: any[] } }> {
    const params = new URLSearchParams();
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.grade) params.append('grade', filters.grade);

    const response = await apiClient.get(`/students/unassigned?${params.toString()}`);
    return response.data as { data: { items: any[] } };
  }

  // Assignment Status Management
  static async updateAssignmentStatus(id: string, status: AssignmentStatus): Promise<Assignment> {
    const response = await apiClient.patch<Assignment>(`${this.BASE_PATH}/${id}/status`, { status });
    return response.data as Assignment;
  }

  static async activateAssignment(id: string): Promise<Assignment> {
    return this.updateAssignmentStatus(id, 'ACTIVE');
  }

  static async deactivateAssignment(id: string): Promise<Assignment> {
    return this.updateAssignmentStatus(id, 'INACTIVE');
  }

  // Transfer Operations
  static async transferStudent(studentId: string, fromRouteId: string, toRouteId: string, toStopId: string): Promise<Assignment> {
    const response = await apiClient.post<Assignment>(`/students/${studentId}/transfer`, {
      fromRouteId,
      toRouteId,
      toStopId,
      transferDate: new Date().toISOString()
    });
    return response.data as Assignment;
  }

  static async transferStudents(transfers: { 
    studentId: string; 
    fromRouteId: string; 
    toRouteId: string; 
    toStopId: string; 
  }[]): Promise<Assignment[]> {
    const response = await apiClient.post<Assignment[]>(`${this.BASE_PATH}/bulk-transfer`, {
      transfers,
      transferDate: new Date().toISOString()
    });
    return response.data as Assignment[];
  }

  // Analytics and Reporting
  static async getAssignmentStats(filters?: { schoolId?: string; routeId?: string }): Promise<AssignmentStats> {
    const params = new URLSearchParams();
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.routeId) params.append('routeId', filters.routeId);

    const response = await apiClient.get(`${this.BASE_PATH}/stats?${params.toString()}`);
    return response.data as AssignmentStats;
  }

  static async getRouteUtilization(routeId?: string): Promise<any> {
    const params = routeId ? `?routeId=${routeId}` : '';
    const response = await apiClient.get(`${this.BASE_PATH}/utilization${params}`);
    return response.data;
  }

  static async getAssignmentHistory(studentId: string): Promise<{ data: { items: Assignment[] } }> {
    const response = await apiClient.get(`/students/${studentId}/assignment-history`);
    return response.data as { data: { items: Assignment[] } };
  }

  // Validation and Conflicts
  static async validateAssignment(studentId: string, routeId: string, stopId: string): Promise<{
    valid: boolean;
    conflicts: string[];
    warnings: string[];
  }> {
    const response = await apiClient.post(`${this.BASE_PATH}/validate`, {
      studentId,
      routeId,
      stopId
    });
    return response.data as {
      valid: boolean;
      conflicts: string[];
      warnings: string[];
    };
  }

  static async getAssignmentConflicts(): Promise<{ data: { items: any[] } }> {
    const response = await apiClient.get(`${this.BASE_PATH}/conflicts`);
    return response.data as { data: { items: any[] } };
  }

  // Import/Export
  static async importAssignments(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post(`${this.BASE_PATH}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  static async exportAssignments(filters?: AssignmentFilters): Promise<Blob> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.studentId) params.append('studentId', filters.studentId);
    if (filters?.routeId) params.append('routeId', filters.routeId);
    if (filters?.stopId) params.append('stopId', filters.stopId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.assignmentDate) params.append('assignmentDate', filters.assignmentDate);

    const response = await apiClient.get(`${this.BASE_PATH}/export?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data as Blob;
  }

  // Auto-Assignment
  static async autoAssignStudents(criteria: {
    schoolId: string;
    grade?: string;
    strategy: 'nearest_route' | 'balanced_load' | 'shortest_distance';
    maxStudentsPerRoute?: number;
  }): Promise<{ 
    assignedCount: number; 
    unassignedCount: number; 
    assignments: Assignment[];
    conflicts: any[];
  }> {
    const response = await apiClient.post(`${this.BASE_PATH}/auto-assign`, criteria);
    return response.data as { 
      assignedCount: number; 
      unassignedCount: number; 
      assignments: Assignment[];
      conflicts: any[];
    };
  }
}