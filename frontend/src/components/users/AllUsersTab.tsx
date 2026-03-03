'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import UserList from './UserList';
import UserForm from './UserForm';
import { USER_ROLES } from '@/constants/app';
import type { User } from '@/types/api';

export default function AllUsersTab() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

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