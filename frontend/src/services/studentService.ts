import apiClient from './apiClient';
import type { Student, CreateStudentData, UpdateStudentData, PaginationParams, PaginatedResponse } from '@/types/api';

export class StudentService {
  private static readonly BASE_PATH = '/students';

  static async getStudents(params?: PaginationParams & { grade?: string; schoolId?: string }): Promise<PaginatedResponse<Student>> {
    const response = await apiClient.get<PaginatedResponse<Student>>(this.BASE_PATH, { params });
    return response.data as PaginatedResponse<Student>;
  }

  static async getStudent(id: string): Promise<Student> {
    const response = await apiClient.get<Student>(`${this.BASE_PATH}/${id}`);
    return response.data as Student;
  }

  static async createStudent(data: CreateStudentData): Promise<Student> {
    const response = await apiClient.post<Student>(this.BASE_PATH, data);
    return response.data as Student;
  }

  static async updateStudent(id: string, data: UpdateStudentData): Promise<Student> {
    const response = await apiClient.put<Student>(`${this.BASE_PATH}/${id}`, data);
    return response.data as Student;
  }

  static async deleteStudent(id: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${id}`);
  }

  static async searchStudents(query: string, params?: PaginationParams): Promise<PaginatedResponse<Student>> {
    const response = await apiClient.get<PaginatedResponse<Student>>(`${this.BASE_PATH}/search`, {
      params: { q: query, ...params }
    });
    return response.data as PaginatedResponse<Student>;
  }

  static async getStudentsBySchool(schoolId: string, params?: PaginationParams): Promise<PaginatedResponse<Student>> {
    const response = await apiClient.get<PaginatedResponse<Student>>(`/schools/${schoolId}/students`, { params });
    return response.data as PaginatedResponse<Student>;
  }

  static async getStudentsByGuardian(guardianId: string, params?: PaginationParams): Promise<PaginatedResponse<Student>> {
    const response = await apiClient.get<PaginatedResponse<Student>>(`/guardians/${guardianId}/students`, { params });
    return response.data as PaginatedResponse<Student>;
  }

  static async assignGuardian(studentId: string, guardianId: string): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/${studentId}/guardians`, { guardianId });
  }

  static async removeGuardian(studentId: string, guardianId: string): Promise<void> {
    await apiClient.delete(`${this.BASE_PATH}/${studentId}/guardians/${guardianId}`);
  }

  static async getStudentStats(id: string) {
    const response = await apiClient.get<any>(`${this.BASE_PATH}/${id}/stats`);
    return response.data;
  }

  static async bulkUpdateStudents(studentIds: string[], updates: Partial<UpdateStudentData>): Promise<void> {
    await apiClient.post(`${this.BASE_PATH}/bulk-update`, {
      studentIds,
      updates
    });
  }

  static async importStudents(file: File, schoolId: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('schoolId', schoolId);
    
    await apiClient.post(`${this.BASE_PATH}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}