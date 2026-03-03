'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import StudentList from '@/components/students/StudentList';
import StudentForm from '@/components/students/StudentForm';
import { USER_ROLES } from '@/constants/app';
import type { Student } from '@/types/api';

export default function StudentsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleAdd = () => {
    setSelectedStudent(undefined);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(undefined);
    setIsViewMode(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
  };

  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]}>
      <StudentList 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
      />

      <Modal
        title={
          isViewMode 
            ? `Student Details - ${selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : ''}`
            : selectedStudent 
              ? 'Edit Student' 
              : 'Add New Student'
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {isViewMode ? (
          <div>
            {/* Student details view would go here */}
            <p>Student details view component coming soon...</p>
          </div>
        ) : (
          <StudentForm
            student={selectedStudent}
            onSuccess={handleSuccess}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </ProtectedComponent>
  );
}