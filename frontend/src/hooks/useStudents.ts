import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StudentService } from '@/services/studentService';
import { QUERY_KEYS } from '@/constants/app';
import type { CreateStudentData, UpdateStudentData, PaginationParams } from '@/types/api';

export function useStudents(params?: PaginationParams & { grade?: string; schoolId?: string }) {
  return useQuery({
    queryKey: [...QUERY_KEYS.STUDENTS, params],
    queryFn: () => StudentService.getStudents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.STUDENT(id),
    queryFn: () => StudentService.getStudent(id),
    enabled: !!id,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateStudentData) => StudentService.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENTS });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentData }) => 
      StudentService.updateStudent(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENT(id) });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => StudentService.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENTS });
    },
  });
}

export function useStudentsBySchool(schoolId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SCHOOL(schoolId), 'students', params],
    queryFn: () => StudentService.getStudentsBySchool(schoolId, params),
    enabled: !!schoolId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useStudentsByGuardian(guardianId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.GUARDIAN(guardianId), 'students', params],
    queryFn: () => StudentService.getStudentsByGuardian(guardianId, params),
    enabled: !!guardianId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAssignGuardian() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ studentId, guardianId }: { studentId: string; guardianId: string }) => 
      StudentService.assignGuardian(studentId, guardianId),
    onSuccess: (_, { studentId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENT(studentId) });
    },
  });
}

export function useRemoveGuardian() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ studentId, guardianId }: { studentId: string; guardianId: string }) => 
      StudentService.removeGuardian(studentId, guardianId),
    onSuccess: (_, { studentId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENT(studentId) });
    },
  });
}

export function useBulkUpdateStudents() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ studentIds, updates }: { studentIds: string[]; updates: Partial<UpdateStudentData> }) => 
      StudentService.bulkUpdateStudents(studentIds, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENTS });
    },
  });
}

export function useSearchStudents(query: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.STUDENTS, 'search', query, params],
    queryFn: () => StudentService.searchStudents(query, params),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useStudentStats(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.STUDENT(id), 'stats'],
    queryFn: () => StudentService.getStudentStats(id),
    enabled: !!id,
  });
}

export function useImportStudents() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ file, schoolId }: { file: File; schoolId: string }) => 
      StudentService.importStudents(file, schoolId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STUDENTS });
    },
  });
}