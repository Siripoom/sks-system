'use client';

import { useState } from 'react';
import { Modal, Drawer } from 'antd';
import TripList from '@/components/trips/TripList';
import TripForm from '@/components/trips/TripForm';
import StudentCheckIn from '@/components/driver/StudentCheckIn';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import type { Trip } from '@/types/api';

function TripsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isStudentDrawerOpen, setIsStudentDrawerOpen] = useState(false);

  const handleAdd = () => {
    setSelectedTrip(undefined);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleManageStudents = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsStudentDrawerOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(undefined);
    setIsViewMode(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
  };

  return (
    <div>
      <TripList 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
        onManageStudents={handleManageStudents}
      />

      <Modal
        title={
          isViewMode 
            ? `Trip Details - ${selectedTrip ? `${selectedTrip.route?.routeName} (${selectedTrip.tripType})` : ''}`
            : selectedTrip 
              ? 'Edit Trip' 
              : 'Schedule New Trip'
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {isViewMode ? (
          <div>
            {/* Trip details view would go here */}
            <p>Trip details view component coming soon...</p>
            {selectedTrip && (
              <div>
                <h3>{selectedTrip.route?.routeName} - {selectedTrip.tripType}</h3>
                <p>Driver: {selectedTrip.driver ? `${selectedTrip.driver.firstName} ${selectedTrip.driver.lastName}` : 'N/A'}</p>
                <p>Vehicle: {selectedTrip.vehicle ? `${selectedTrip.vehicle.licensePlate} - ${selectedTrip.vehicle.model}` : 'N/A'}</p>
                <p>Scheduled Time: {new Date(selectedTrip.scheduledTime).toLocaleString()}</p>
                {selectedTrip.actualStartTime && (
                  <p>Start Time: {new Date(selectedTrip.actualStartTime).toLocaleString()}</p>
                )}
                {selectedTrip.actualEndTime && (
                  <p>End Time: {new Date(selectedTrip.actualEndTime).toLocaleString()}</p>
                )}
                <p>Status: {selectedTrip.status}</p>
              </div>
            )}
          </div>
        ) : (
          <TripForm
            trip={selectedTrip}
            onSuccess={handleSuccess}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>

      {/* Student Management Drawer */}
      <Drawer
        title="Student Check-In/Out"
        placement="right"
        onClose={() => setIsStudentDrawerOpen(false)}
        open={isStudentDrawerOpen}
        width="100%"
        style={{ maxWidth: '1200px' }}
        destroyOnClose
      >
        {selectedTrip && (
          <StudentCheckIn
            trip={selectedTrip}
            onBack={() => setIsStudentDrawerOpen(false)}
          />
        )}
      </Drawer>
    </div>
  );
}

export default function TripsPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <TripsContent />
      </AppLayout>
    </ProtectedRoute>
  );
}