'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import AssignmentList from '@/components/assignments/AssignmentList';
import AssignmentForm from '@/components/assignments/AssignmentForm';
import type { Assignment } from '@/types/api';

export default function AssignmentsPage() {
  const [formVisible, setFormVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const handleCreate = () => {
    setSelectedAssignment(null);
    setFormVisible(true);
  };

  const handleEdit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFormVisible(true);
  };

  const handleView = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setViewModalVisible(true);
  };

  const handleTransfer = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setTransferModalVisible(true);
  };

  const handleFormSuccess = () => {
    setFormVisible(false);
    setSelectedAssignment(null);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setSelectedAssignment(null);
  };

  const handleCloseView = () => {
    setViewModalVisible(false);
    setSelectedAssignment(null);
  };

  const handleCloseTransfer = () => {
    setTransferModalVisible(false);
    setSelectedAssignment(null);
  };

  return (
    <>
      {!formVisible ? (
        <AssignmentList
          onCreate={handleCreate}
          onEdit={handleEdit}
          onView={handleView}
          onTransfer={handleTransfer}
        />
      ) : (
        <AssignmentForm
          assignment={selectedAssignment || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {/* Assignment Details Modal */}
      <Modal
        title="Assignment Details"
        open={viewModalVisible}
        onCancel={handleCloseView}
        footer={null}
        width={600}
      >
        {selectedAssignment && (
          <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <strong>Student:</strong> {selectedAssignment.student?.firstName} {selectedAssignment.student?.lastName}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Route:</strong> {selectedAssignment.route?.routeName}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Stop:</strong> {selectedAssignment.stop?.name}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Status:</strong> {selectedAssignment.status}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Assignment Date:</strong> {selectedAssignment.assignmentDate}
            </div>
          </div>
        )}
      </Modal>

      {/* Transfer Modal - Placeholder for future implementation */}
      <Modal
        title="Transfer Student"
        open={transferModalVisible}
        onCancel={handleCloseTransfer}
        footer={null}
        width={800}
      >
        {selectedAssignment && (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <p>Transfer functionality for {selectedAssignment.student?.firstName} {selectedAssignment.student?.lastName} will be implemented in the next phase.</p>
          </div>
        )}
      </Modal>
    </>
  );
}