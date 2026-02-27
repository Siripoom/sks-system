'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import GuardianList from '@/components/guardians/GuardianList';
import GuardianForm from '@/components/guardians/GuardianForm';
import type { Guardian } from '@/types/api';

export default function GuardiansPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState<Guardian | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleAdd = () => {
    setSelectedGuardian(undefined);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (guardian: Guardian) => {
    setSelectedGuardian(guardian);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleViewDetails = (guardian: Guardian) => {
    setSelectedGuardian(guardian);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuardian(undefined);
    setIsViewMode(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
  };

  return (
    <div style={{ padding: '24px' }}>
      <GuardianList 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
      />

      <Modal
        title={
          isViewMode 
            ? `Guardian Details - ${selectedGuardian ? `${selectedGuardian.firstName} ${selectedGuardian.lastName}` : ''}`
            : selectedGuardian 
              ? 'Edit Guardian' 
              : 'Add New Guardian'
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        destroyOnClose
      >
        {isViewMode ? (
          <div>
            {/* Guardian details view would go here */}
            <p>Guardian details view component coming soon...</p>
          </div>
        ) : (
          <GuardianForm
            guardian={selectedGuardian}
            onSuccess={handleSuccess}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}