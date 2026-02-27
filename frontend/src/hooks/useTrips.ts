'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TripService, type TripFilters } from '@/services/tripService';
import type { Trip, CreateTripData, UpdateTripData, TripStatus } from '@/types/api';

const QUERY_KEYS = {
  trips: 'trips',
  trip: 'trip',
  driverTrips: 'driverTrips',
  todaysTrips: 'todaysTrips',
  vehicleTrips: 'vehicleTrips',
  routeTrips: 'routeTrips',
  tripStudents: 'tripStudents',
  tripStats: 'tripStats',
  tripPerformance: 'tripPerformance',
} as const;

// Trip Queries
export function useTrips(filters?: TripFilters) {
  return useQuery({
    queryKey: [QUERY_KEYS.trips, filters],
    queryFn: () => TripService.getTrips(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes for frequent updates
  });
}

export function useTrip(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.trip, id],
    queryFn: () => TripService.getTripById(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute for active trips
  });
}

export function useDriverTrips(driverId: string, filters?: Omit<TripFilters, 'driverId'>) {
  return useQuery({
    queryKey: [QUERY_KEYS.driverTrips, driverId, filters],
    queryFn: () => TripService.getDriverTrips(driverId, filters),
    enabled: !!driverId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useTodaysTrips(driverId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.todaysTrips, driverId],
    queryFn: () => TripService.getTodaysTrips(driverId),
    enabled: !!driverId,
    staleTime: 30 * 1000, // 30 seconds for real-time feel
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}

export function useVehicleTrips(vehicleId: string, filters?: Omit<TripFilters, 'vehicleId'>) {
  return useQuery({
    queryKey: [QUERY_KEYS.vehicleTrips, vehicleId, filters],
    queryFn: () => TripService.getVehicleTrips(vehicleId, filters),
    enabled: !!vehicleId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useRouteTrips(routeId: string, filters?: Omit<TripFilters, 'routeId'>) {
  return useQuery({
    queryKey: [QUERY_KEYS.routeTrips, routeId, filters],
    queryFn: () => TripService.getRouteTrips(routeId, filters),
    enabled: !!routeId,
    staleTime: 2 * 60 * 1000,
  });
}

// Trip Mutations
export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTripData) => TripService.createTrip(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.vehicleTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeTrips] });
    },
  });
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTripData }) =>
      TripService.updateTrip(id, data),
    onSuccess: (updatedTrip) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.setQueryData([QUERY_KEYS.trip, updatedTrip.id], updatedTrip);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.vehicleTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeTrips] });
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TripService.deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.vehicleTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeTrips] });
    },
  });
}

// Trip Status Management
export function useUpdateTripStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TripStatus }) =>
      TripService.updateTripStatus(id, status),
    onSuccess: (updatedTrip) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.setQueryData([QUERY_KEYS.trip, updatedTrip.id], updatedTrip);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todaysTrips] });
    },
  });
}

export function useStartTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TripService.startTrip(id),
    onSuccess: (updatedTrip) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.setQueryData([QUERY_KEYS.trip, updatedTrip.id], updatedTrip);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todaysTrips] });
    },
  });
}

export function useCompleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TripService.completeTrip(id),
    onSuccess: (updatedTrip) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.setQueryData([QUERY_KEYS.trip, updatedTrip.id], updatedTrip);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todaysTrips] });
    },
  });
}

export function useCancelTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      TripService.cancelTrip(id, reason),
    onSuccess: (updatedTrip) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.setQueryData([QUERY_KEYS.trip, updatedTrip.id], updatedTrip);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todaysTrips] });
    },
  });
}

// Bulk Operations
export function useBulkUpdateTrips() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripIds, updates }: { tripIds: string[]; updates: Partial<Trip> }) =>
      TripService.bulkUpdateTrips(tripIds, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.vehicleTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeTrips] });
    },
  });
}

export function useBulkCreateTrips() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trips: CreateTripData[]) => TripService.bulkCreateTrips(trips),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.vehicleTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeTrips] });
    },
  });
}

// Scheduling Operations
export function useCreateRecurringTrips() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      routeId: string;
      vehicleId: string;
      driverId: string;
      tripType: 'PICKUP' | 'DROPOFF';
      scheduledTime: string;
      recurringPattern: {
        type: 'daily' | 'weekly' | 'custom';
        daysOfWeek?: number[];
        endDate: string;
        excludeDates?: string[];
      };
    }) => TripService.createRecurringTrips(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.vehicleTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeTrips] });
    },
  });
}

export function useDuplicateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, newDate }: { tripId: string; newDate: string }) =>
      TripService.duplicateTrip(tripId, newDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.driverTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.vehicleTrips] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.routeTrips] });
    },
  });
}

// Student Operations
export function useTripStudents(tripId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.tripStudents, tripId],
    queryFn: () => TripService.getTripStudents(tripId),
    enabled: !!tripId,
    staleTime: 1 * 60 * 1000,
  });
}

export function useUpdateStudentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, studentId, status }: { 
      tripId: string; 
      studentId: string; 
      status: 'present' | 'absent' | 'picked_up' | 'dropped_off' 
    }) => TripService.updateStudentStatus(tripId, studentId, status),
    onSuccess: (_, { tripId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tripStudents, tripId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trip, tripId] });
    },
  });
}

export function useBulkUpdateStudentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, updates }: { 
      tripId: string; 
      updates: { studentId: string; status: string }[] 
    }) => TripService.bulkUpdateStudentStatus(tripId, updates),
    onSuccess: (_, { tripId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tripStudents, tripId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trip, tripId] });
    },
  });
}

// Import/Export
export function useImportTrips() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => TripService.importTrips(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trips] });
    },
  });
}

export function useExportTrips() {
  return useMutation({
    mutationFn: (filters?: TripFilters) => TripService.exportTrips(filters),
  });
}

// Analytics
export function useTripStats(filters?: {
  startDate?: string;
  endDate?: string;
  driverId?: string;
  vehicleId?: string;
  routeId?: string;
}) {
  return useQuery({
    queryKey: [QUERY_KEYS.tripStats, filters],
    queryFn: () => TripService.getTripStats(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTripPerformance(tripId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.tripPerformance, tripId],
    queryFn: () => TripService.getTripPerformance(tripId),
    enabled: !!tripId,
    staleTime: 5 * 60 * 1000,
  });
}

// Real-time features (for future implementation)
export function useUpdateTripLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, location }: { 
      tripId: string; 
      location: { latitude: number; longitude: number } 
    }) => TripService.updateTripLocation(tripId, location),
    onSuccess: (_, { tripId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.trip, tripId] });
    },
  });
}

export function useTripLocation(tripId: string) {
  return useQuery({
    queryKey: ['tripLocation', tripId],
    queryFn: () => TripService.getTripLocation(tripId),
    enabled: !!tripId,
    staleTime: 10 * 1000, // 10 seconds for real-time tracking
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  });
}