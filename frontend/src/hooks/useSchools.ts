import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SchoolService } from '@/services/schoolService';
import { QUERY_KEYS } from '@/constants/app';
import type { CreateSchoolData, UpdateSchoolData, PaginationParams } from '@/types/api';

export function useSchools(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SCHOOLS, params],
    queryFn: async () => {
      console.log('useSchools: Fetching schools with params:', params);
      try {
        const result = await SchoolService.getSchools(params);
        console.log('useSchools: Success, result:', result);
        return result;
      } catch (error) {
        console.error('useSchools: Error fetching schools:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: (error) => {
      console.error('useSchools: Query error:', error);
    },
    onSuccess: (data) => {
      console.log('useSchools: Query success:', data);
    }
  });
}

export function useSchool(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SCHOOL(id),
    queryFn: () => SchoolService.getSchool(id),
    enabled: !!id,
  });
}

export function useCreateSchool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSchoolData) => SchoolService.createSchool(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHOOLS });
    },
  });
}

export function useUpdateSchool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSchoolData }) => 
      SchoolService.updateSchool(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHOOLS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHOOL(id) });
    },
  });
}

export function useDeleteSchool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => SchoolService.deleteSchool(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SCHOOLS });
    },
  });
}

export function useSearchSchools(query: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SCHOOLS, 'search', query, params],
    queryFn: () => SchoolService.searchSchools(query, params),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useSchoolStats(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SCHOOL(id), 'stats'],
    queryFn: () => SchoolService.getSchoolStats(id),
    enabled: !!id,
  });
}