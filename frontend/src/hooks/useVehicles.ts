import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { VehicleService } from '@/services/vehicleService';
import { QUERY_KEYS } from '@/constants/app';
import type { CreateVehicleData, UpdateVehicleData, PaginationParams } from '@/types/api';

export function useVehicles(params?: PaginationParams & { status?: string }) {
  return useQuery({
    queryKey: [...QUERY_KEYS.VEHICLES, params],
    queryFn: () => VehicleService.getVehicles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.VEHICLE(id),
    queryFn: () => VehicleService.getVehicle(id),
    enabled: !!id,
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateVehicleData) => VehicleService.createVehicle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLES });
    },
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVehicleData }) => 
      VehicleService.updateVehicle(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLE(id) });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => VehicleService.deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLES });
    },
  });
}

export function useUpdateVehicleStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      VehicleService.updateVehicleStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLE(id) });
    },
  });
}

export function useUpdateMaintenanceStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, maintenanceStatus, notes }: { id: string; maintenanceStatus: string; notes?: string }) => 
      VehicleService.updateMaintenanceStatus(id, maintenanceStatus, notes),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.VEHICLE(id) });
    },
  });
}

export function useSearchVehicles(query: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.VEHICLES, 'search', query, params],
    queryFn: () => VehicleService.searchVehicles(query, params),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useVehicleStats(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.VEHICLE(id), 'stats'],
    queryFn: () => VehicleService.getVehicleStats(id),
    enabled: !!id,
  });
}