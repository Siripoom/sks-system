'use client';

import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useAppStore } from '@/stores/appStore';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import SchoolList from '@/components/schools/SchoolList';
import SchoolForm from '@/components/schools/SchoolForm';
import { USER_ROLES } from '@/constants/app';
import type { School } from '@/types/api';

function SchoolsContent() {
  const { setBreadcrumbs } = useAppStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | undefined>(undefined);

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', path: '/dashboard' },
      { title: 'Schools', path: '/schools' }
    ]);
  }, [setBreadcrumbs]);

  const handleAdd = () => {
    setEditingSchool(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (school: School) => {
    setEditingSchool(school);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingSchool(undefined);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setEditingSchool(undefined);
  };

  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]}>
      <SchoolList onAdd={handleAdd} onEdit={handleEdit} />
      
      <Modal
        title={editingSchool ? 'Edit School' : 'Add New School'}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        destroyOnClose
      >
        <SchoolForm 
          school={editingSchool}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </ProtectedComponent>
  );
}

export default function SchoolsPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <SchoolsContent />
      </AppLayout>
    </ProtectedRoute>
  );
}