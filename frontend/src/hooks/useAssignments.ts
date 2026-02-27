'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { AssignmentService, type AssignmentFilters, type AssignmentResponse, type BulkAssignmentData, type AssignmentStats } from '@/services/assignmentService';
import type { Assignment, CreateAssignmentData, AssignmentStatus } from '@/types/api';

// Query Keys
const ASSIGNMENT_KEYS = {
  all: ['assignments'] as const,
  lists: () => [...ASSIGNMENT_KEYS.all, 'list'] as const,
  list: (filters?: AssignmentFilters) => [...ASSIGNMENT_KEYS.lists(), filters] as const,
  details: () => [...ASSIGNMENT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ASSIGNMENT_KEYS.details(), id] as const,
  student: (studentId: string) => [...ASSIGNMENT_KEYS.all, 'student', studentId] as const,
  route: (routeId: string) => [...ASSIGNMENT_KEYS.all, 'route', routeId] as const,
  unassigned: () => [...ASSIGNMENT_KEYS.all, 'unassigned'] as const,
  stats: (filters?: { schoolId?: string; routeId?: string }) => [...ASSIGNMENT_KEYS.all, 'stats', filters] as const,
  utilization: (routeId?: string) => [...ASSIGNMENT_KEYS.all, 'utilization', routeId] as const,
  history: (studentId: string) => [...ASSIGNMENT_KEYS.all, 'history', studentId] as const,
  conflicts: () => [...ASSIGNMENT_KEYS.all, 'conflicts'] as const,
};

// Assignment Queries
export const useAssignments = (filters?: AssignmentFilters) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.list(filters),
    queryFn: () => AssignmentService.getAssignments(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refresh every 30 seconds for real-time updates
  });
};

export const useAssignment = (id: string) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.detail(id),
    queryFn: () => AssignmentService.getAssignmentById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useStudentAssignments = (studentId: string) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.student(studentId),
    queryFn: () => AssignmentService.getStudentAssignments(studentId),
    enabled: !!studentId,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 15 * 1000, // More frequent updates for student assignments
  });
};

export const useRouteAssignments = (routeId: string) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.route(routeId),
    queryFn: () => AssignmentService.getRouteAssignments(routeId),
    enabled: !!routeId,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 15 * 1000,
  });
};

export const useUnassignedStudents = (filters?: { schoolId?: string; grade?: string }) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.unassigned(),
    queryFn: () => AssignmentService.getUnassignedStudents(filters),
    staleTime: 1 * 60 * 1000, // 1 minute - more frequent for unassigned students
    refetchInterval: 20 * 1000,
  });
};

export const useAssignmentStats = (filters?: { schoolId?: string; routeId?: string }) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.stats(filters),
    queryFn: () => AssignmentService.getAssignmentStats(filters),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000, // Stats updated every minute
  });
};

export const useRouteUtilization = (routeId?: string) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.utilization(routeId),
    queryFn: () => AssignmentService.getRouteUtilization(routeId),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

export const useAssignmentHistory = (studentId: string) => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.history(studentId),
    queryFn: () => AssignmentService.getAssignmentHistory(studentId),
    enabled: !!studentId,
    staleTime: 10 * 60 * 1000, // 10 minutes for historical data
  });
};

export const useAssignmentConflicts = () => {
  return useQuery({
    queryKey: ASSIGNMENT_KEYS.conflicts(),
    queryFn: () => AssignmentService.getAssignmentConflicts(),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 45 * 1000, // Check conflicts frequently
  });
};

// Assignment Mutations
export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAssignmentData) => AssignmentService.createAssignment(data),
    onSuccess: (newAssignment) => {
      // Invalidate and refetch assignment lists
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
      
      // Update student and route specific queries
      if (newAssignment.studentId) {
        queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.student(newAssignment.studentId) });
      }
      if (newAssignment.routeId) {
        queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.route(newAssignment.routeId) });
      }
      
      // Update stats and utilization
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.stats() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.utilization() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.unassigned() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.conflicts() });
      
      message.success('Assignment created successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create assignment';
      message.error(errorMessage);
    },
  });
};

export const useUpdateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAssignmentData> }) => 
      AssignmentService.updateAssignment(id, data),
    onSuccess: (updatedAssignment, { id }) => {
      // Update the specific assignment
      queryClient.setQueryData(ASSIGNMENT_KEYS.detail(id), updatedAssignment);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
      if (updatedAssignment.studentId) {
        queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.student(updatedAssignment.studentId) });
      }
      if (updatedAssignment.routeId) {
        queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.route(updatedAssignment.routeId) });
      }
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.stats() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.utilization() });
      
      message.success('Assignment updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update assignment';
      message.error(errorMessage);
    },
  });
};

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AssignmentService.deleteAssignment(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ASSIGNMENT_KEYS.detail(id) });
      
      // Invalidate lists and related data
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.student(id) });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.route(id) });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.stats() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.utilization() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.unassigned() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.conflicts() });
      
      message.success('Assignment deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete assignment';
      message.error(errorMessage);
    },
  });
};

// Bulk Operations
export const useCreateBulkAssignments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkAssignmentData) => AssignmentService.createBulkAssignments(data),
    onSuccess: (assignments) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      
      message.success(`${assignments.length} assignments created successfully`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create bulk assignments';
      message.error(errorMessage);
    },
  });
};

export const useUpdateBulkAssignments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentIds, updates }: { assignmentIds: string[]; updates: Partial<CreateAssignmentData> }) => 
      AssignmentService.updateBulkAssignments(assignmentIds, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Assignments updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update assignments';
      message.error(errorMessage);
    },
  });
};

export const useDeleteBulkAssignments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentIds: string[]) => AssignmentService.deleteBulkAssignments(assignmentIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Assignments deleted successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to delete assignments';
      message.error(errorMessage);
    },
  });
};

// Student Operations
export const useAssignStudentToRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, routeId, stopId, assignmentDate }: { 
      studentId: string; 
      routeId: string; 
      stopId: string; 
      assignmentDate: string;
    }) => AssignmentService.assignStudentToRoute(studentId, routeId, stopId, assignmentDate),
    onSuccess: (assignment) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Student assigned to route successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to assign student to route';
      message.error(errorMessage);
    },
  });
};

export const useUnassignStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, assignmentId }: { studentId: string; assignmentId: string }) => 
      AssignmentService.unassignStudent(studentId, assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Student unassigned successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to unassign student';
      message.error(errorMessage);
    },
  });
};

// Transfer Operations
export const useTransferStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, fromRouteId, toRouteId, toStopId }: { 
      studentId: string; 
      fromRouteId: string; 
      toRouteId: string; 
      toStopId: string;
    }) => AssignmentService.transferStudent(studentId, fromRouteId, toRouteId, toStopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Student transferred successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to transfer student';
      message.error(errorMessage);
    },
  });
};

export const useTransferStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transfers: { 
      studentId: string; 
      fromRouteId: string; 
      toRouteId: string; 
      toStopId: string; 
    }[]) => AssignmentService.transferStudents(transfers),
    onSuccess: (assignments) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success(`${assignments.length} students transferred successfully`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to transfer students';
      message.error(errorMessage);
    },
  });
};

// Status Operations
export const useUpdateAssignmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AssignmentStatus }) => 
      AssignmentService.updateAssignmentStatus(id, status),
    onSuccess: (assignment, { id }) => {
      queryClient.setQueryData(ASSIGNMENT_KEYS.detail(id), assignment);
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.stats() });
      
      message.success('Assignment status updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update assignment status';
      message.error(errorMessage);
    },
  });
};

export const useActivateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AssignmentService.activateAssignment(id),
    onSuccess: (assignment) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Assignment activated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to activate assignment';
      message.error(errorMessage);
    },
  });
};

export const useDeactivateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AssignmentService.deactivateAssignment(id),
    onSuccess: (assignment) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Assignment deactivated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to deactivate assignment';
      message.error(errorMessage);
    },
  });
};

// Validation
export const useValidateAssignment = () => {
  return useMutation({
    mutationFn: ({ studentId, routeId, stopId }: { studentId: string; routeId: string; stopId: string }) => 
      AssignmentService.validateAssignment(studentId, routeId, stopId),
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to validate assignment';
      message.error(errorMessage);
    },
  });
};

// Auto Assignment
export const useAutoAssignStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (criteria: {
      schoolId: string;
      grade?: string;
      strategy: 'nearest_route' | 'balanced_load' | 'shortest_distance';
      maxStudentsPerRoute?: number;
    }) => AssignmentService.autoAssignStudents(criteria),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success(`Auto-assignment completed: ${result.assignedCount} students assigned, ${result.unassignedCount} remain unassigned`);
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to auto-assign students';
      message.error(errorMessage);
    },
  });
};

// Import/Export
export const useImportAssignments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => AssignmentService.importAssignments(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all });
      message.success('Assignments imported successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to import assignments';
      message.error(errorMessage);
    },
  });
};

export const useExportAssignments = () => {
  return useMutation({
    mutationFn: (filters?: AssignmentFilters) => AssignmentService.exportAssignments(filters),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `assignments_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      message.success('Assignments exported successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to export assignments';
      message.error(errorMessage);
    },
  });
};