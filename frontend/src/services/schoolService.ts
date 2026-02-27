import apiClient from './apiClient';
import type {
  School,
  CreateSchoolData,
  UpdateSchoolData,
  PaginationParams,
  PaginatedResponse,
} from '@/types/api';

export class SchoolService {
  private static readonly BASE_PATH = '/schools';

  static async getSchools(
    params?: PaginationParams
  ): Promise<PaginatedResponse<School>> {
    console.log('SchoolService.getSchools called with params:', params);
    
    const response = await apiClient.get<PaginatedResponse<School>>(
      this.BASE_PATH,
      { params }
    );
    
    console.log('SchoolService.getSchools raw response:', response);
    console.log('SchoolService.getSchools response type:', typeof response);
    console.log('SchoolService.getSchools response keys:', Object.keys(response));
    
    // Check if response has the expected structure
    if (response && typeof response === 'object') {
      console.log('SchoolService.getSchools response.success:', response.success);
      console.log('SchoolService.getSchools response.data:', response.data);
      console.log('SchoolService.getSchools response.error:', response.error);
    }
    
    // Handle different response structures
    if (!response.success) {
      console.error('SchoolService.getSchools API error:', response.error);
      throw new Error(response.error?.message || 'Failed to fetch schools');
    }
    
    // Check if we have the expected data structure
    if (!response.data) {
      console.error('SchoolService.getSchools no data in response');
      throw new Error('No data received from schools API');
    }
    
    console.log('SchoolService.getSchools returning data:', response.data);
    return response.data as PaginatedResponse<School>;
  }

  static async getSchool(id: string): Promise<School> {
    const response = await apiClient.get<School>(`${this.BASE_PATH}/${id}`);
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to fetch school');
    }
    
    return response.data as School;
  }

  static async createSchool(data: CreateSchoolData): Promise<School> {
    const response = await apiClient.post<School>(this.BASE_PATH, data);
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to create school');
    }
    
    return response.data as School;
  }

  static async updateSchool(
    id: string,
    data: UpdateSchoolData
  ): Promise<School> {
    const response = await apiClient.put<School>(
      `${this.BASE_PATH}/${id}`,
      data
    );
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to update school');
    }
    
    return response.data as School;
  }

  static async deleteSchool(id: string): Promise<void> {
    const response = await apiClient.delete(`${this.BASE_PATH}/${id}`);
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to delete school');
    }
  }

  static async searchSchools(
    query: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<School>> {
    const response = await apiClient.get<PaginatedResponse<School>>(
      `${this.BASE_PATH}/search`,
      {
        params: { q: query, ...params },
      }
    );
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to search schools');
    }
    
    return response.data as PaginatedResponse<School>;
  }

  static async getSchoolStats(id: string) {
    const response = await apiClient.get<any>(`${this.BASE_PATH}/${id}/stats`);
    
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to get school stats');
    }
    
    return response.data;
  }
}
