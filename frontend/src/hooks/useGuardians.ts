'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GuardianService, type GuardianFilters } from '@/services/guardianService';
import type { Guardian, CreateGuardianData, UpdateGuardianData } from '@/types/api';

const QUERY_KEYS = {
  guardians: 'guardians',
  guardian: 'guardian',
  availableStudents: 'availableStudents',
} as const;

export function useGuardians(filters?: GuardianFilters) {
  return useQuery({
    queryKey: [QUERY_KEYS.guardians, filters],
    queryFn: () => GuardianService.getGuardians(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGuardian(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.guardian, id],
    queryFn: () => GuardianService.getGuardianById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGuardianData) => GuardianService.createGuardian(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.guardians] });
    },
  });
}

export function useUpdateGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGuardianData }) =>
      GuardianService.updateGuardian(id, data),
    onSuccess: (updatedGuardian) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.guardians] });
      queryClient.setQueryData([QUERY_KEYS.guardian, updatedGuardian.id], updatedGuardian);
    },
  });
}

export function useDeleteGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => GuardianService.deleteGuardian(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.guardians] });
    },
  });
}

export function useAssignStudentsToGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guardianId, studentIds }: { guardianId: string; studentIds: string[] }) =>
      GuardianService.assignStudents(guardianId, studentIds),
    onSuccess: (updatedGuardian) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.guardians] });
      queryClient.setQueryData([QUERY_KEYS.guardian, updatedGuardian.id], updatedGuardian);
      // Also invalidate students since they might be affected
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

export function useRemoveStudentsFromGuardian() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guardianId, studentIds }: { guardianId: string; studentIds: string[] }) =>
      GuardianService.removeStudents(guardianId, studentIds),
    onSuccess: (updatedGuardian) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.guardians] });
      queryClient.setQueryData([QUERY_KEYS.guardian, updatedGuardian.id], updatedGuardian);
      // Also invalidate students since they might be affected
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

export function useAvailableStudents(guardianId?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.availableStudents, guardianId],
    queryFn: () => GuardianService.getAvailableStudents(guardianId),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useBulkUpdateGuardians() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guardianIds, updates }: { guardianIds: string[]; updates: Partial<Guardian> }) =>
      GuardianService.bulkUpdateGuardians(guardianIds, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.guardians] });
    },
  });
}

export function useImportGuardians() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => GuardianService.importGuardians(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.guardians] });
    },
  });
}

export function useExportGuardians() {
  return useMutation({
    mutationFn: (filters?: GuardianFilters) => GuardianService.exportGuardians(filters),
  });
}