'use client';

import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useAppStore } from '@/stores/appStore';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import VehicleList from '@/components/vehicles/VehicleList';
import VehicleForm from '@/components/vehicles/VehicleForm';
import { USER_ROLES } from '@/constants/app';
import type { Vehicle } from '@/types/api';

function VehiclesContent() {
  const { setBreadcrumbs } = useAppStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>(undefined);

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', path: '/dashboard' },
      { title: 'Vehicles', path: '/vehicles' }
    ]);
  }, [setBreadcrumbs]);

  const handleAdd = () => {
    setEditingVehicle(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingVehicle(undefined);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setEditingVehicle(undefined);
  };

  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]}>
      <VehicleList onAdd={handleAdd} onEdit={handleEdit} />
      
      <Modal
        title={editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={900}
        destroyOnClose
      >
        <VehicleForm 
          vehicle={editingVehicle}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </ProtectedComponent>
  );
}

export default function VehiclesPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <VehiclesContent />
      </AppLayout>
    </ProtectedRoute>
  );
}