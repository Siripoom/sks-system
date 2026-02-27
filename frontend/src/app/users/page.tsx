'use client';

import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useAppStore } from '@/stores/appStore';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import UserList from '@/components/users/UserList';
import UserForm from '@/components/users/UserForm';
import { USER_ROLES } from '@/constants/app';
import type { User } from '@/types/api';

function UsersContent() {
  const { setBreadcrumbs } = useAppStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', path: '/dashboard' },
      { title: 'Users', path: '/users' }
    ]);
  }, [setBreadcrumbs]);

  const handleAdd = () => {
    setEditingUser(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingUser(undefined);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setEditingUser(undefined);
  };

  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]}>
      <UserList onAdd={handleAdd} onEdit={handleEdit} />
      
      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={900}
        destroyOnClose
      >
        <UserForm 
          user={editingUser}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </ProtectedComponent>
  );
}

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <UsersContent />
      </AppLayout>
    </ProtectedRoute>
  );
}