'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RouteService, type RouteFilters } from '@/services/routeService';
import type { Route, CreateRouteData, UpdateRouteData, Stop, CreateStopData, UpdateStopData } from '@/types/api';

const QUERY_KEYS = {
  routes: 'routes',
  route: 'route',
  routeStops: 'routeStops',
  routeAssignments: 'routeAssignments',
  routeStats: 'routeStats',
  schoolRoutes: 'schoolRoutes',
} as const;

// Route Queries
export function useRoutes(filters?: RouteFilters) {
  return useQuery({
    queryKey: [QUERY_KEYS.routes, filters],
    queryFn: () => RouteService.getRoutes(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRoute(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.route, id],
    queryFn: () => RouteService.getRouteById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSchoolRoutes(schoolId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.schoolRoutes, schoolId],
    queryFn: () => RouteService.getSchoolRoutes(schoolId),
    enabled: !!schoolId,
    staleTime: 5 * 60 * 1000,
  });
}

// Route Mutations
export function useCreateRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRouteData) => RouteService.createRoute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.schoolRoutes] });
    },
  });
}

export function useUpdateRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRouteData }) =>
      RouteService.updateRoute(id, data),
    onSuccess: (updatedRoute) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.setQueryData([QUERY_KEYS.route, updatedRoute.id], updatedRoute);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.schoolRoutes] });
    },
  });
}

export function useDeleteRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RouteService.deleteRoute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.schoolRoutes] });
    },
  });
}

export function useToggleRouteStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RouteService.toggleRouteStatus(id),
    onSuccess: (updatedRoute) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.setQueryData([QUERY_KEYS.route, updatedRoute.id], updatedRoute);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.schoolRoutes] });
    },
  });
}

// Stop Queries and Mutations
export function useRouteStops(routeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.routeStops, routeId],
    queryFn: () => RouteService.getRouteStops(routeId),
    enabled: !!routeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateStop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStopData) => RouteService.createStop(data),
    onSuccess: (newStop) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeStops, newStop.routeId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.route, newStop.routeId] });
    },
  });
}

export function useUpdateStop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStopData }) =>
      RouteService.updateStop(id, data),
    onSuccess: (updatedStop) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeStops, updatedStop.routeId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.route, updatedStop.routeId] });
    },
  });
}

export function useDeleteStop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stopId, routeId }: { stopId: string; routeId: string }) =>
      RouteService.deleteStop(stopId),
    onSuccess: (_, { routeId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeStops, routeId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.route, routeId] });
    },
  });
}

export function useReorderStops() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeId, stopOrders }: { routeId: string; stopOrders: { stopId: string; order: number }[] }) =>
      RouteService.reorderStops(routeId, stopOrders),
    onSuccess: (_, { routeId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeStops, routeId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.route, routeId] });
    },
  });
}

// Route Optimization
export function useOptimizeRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (routeId: string) => RouteService.optimizeRoute(routeId),
    onSuccess: (optimizedRoute) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.setQueryData([QUERY_KEYS.route, optimizedRoute.id], optimizedRoute);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeStops, optimizedRoute.id] });
    },
  });
}

export function useCalculateDistance() {
  return useMutation({
    mutationFn: (routeId: string) => RouteService.calculateDistance(routeId),
  });
}

// Bulk Operations
export function useBulkUpdateRoutes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeIds, updates }: { routeIds: string[]; updates: Partial<Route> }) =>
      RouteService.bulkUpdateRoutes(routeIds, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.schoolRoutes] });
    },
  });
}

export function useDuplicateRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeId, newName }: { routeId: string; newName: string }) =>
      RouteService.duplicateRoute(routeId, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.schoolRoutes] });
    },
  });
}

// Student Assignments
export function useRouteAssignments(routeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.routeAssignments, routeId],
    queryFn: () => RouteService.getRouteAssignments(routeId),
    enabled: !!routeId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAssignStudentsToRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeId, assignments }: { routeId: string; assignments: { studentId: string; stopId: string }[] }) =>
      RouteService.assignStudentsToRoute(routeId, assignments),
    onSuccess: (_, { routeId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeAssignments, routeId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.route, routeId] });
      // Also invalidate students since they might be affected
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

export function useRemoveStudentFromRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ routeId, studentId }: { routeId: string; studentId: string }) =>
      RouteService.removeStudentFromRoute(routeId, studentId),
    onSuccess: (_, { routeId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeAssignments, routeId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.route, routeId] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

// Import/Export
export function useImportRoutes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, schoolId }: { file: File; schoolId: string }) => 
      RouteService.importRoutes(file, schoolId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routes] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.schoolRoutes] });
    },
  });
}

export function useExportRoutes() {
  return useMutation({
    mutationFn: (filters?: RouteFilters) => RouteService.exportRoutes(filters),
  });
}

// Analytics
export function useRouteStats(routeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.routeStats, routeId],
    queryFn: () => RouteService.getRouteStats(routeId),
    enabled: !!routeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useRouteUtilization() {
  return useMutation({
    mutationFn: ({ routeId, dateRange }: { 
      routeId: string; 
      dateRange?: { startDate: string; endDate: string } 
    }) => RouteService.getRouteUtilization(routeId, dateRange),
  });
}