'use client';

import { useState } from 'react';
import { Modal, Drawer } from 'antd';
import RouteList from '@/components/routes/RouteList';
import RouteForm from '@/components/routes/RouteForm';
import type { Route } from '@/types/api';

export default function RoutesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isStopsDrawerOpen, setIsStopsDrawerOpen] = useState(false);
  const [isAssignmentsDrawerOpen, setIsAssignmentsDrawerOpen] = useState(false);

  const handleAdd = () => {
    setSelectedRoute(undefined);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (route: Route) => {
    setSelectedRoute(route);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleViewDetails = (route: Route) => {
    setSelectedRoute(route);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleManageStops = (route: Route) => {
    setSelectedRoute(route);
    setIsStopsDrawerOpen(true);
  };

  const handleManageAssignments = (route: Route) => {
    setSelectedRoute(route);
    setIsAssignmentsDrawerOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoute(undefined);
    setIsViewMode(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
  };

  return (
    <div style={{ padding: '24px' }}>
      <RouteList 
        onAdd={handleAdd}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
        onManageStops={handleManageStops}
        onManageAssignments={handleManageAssignments}
      />

      <Modal
        title={
          isViewMode 
            ? `Route Details - ${selectedRoute ? selectedRoute.routeName : ''}`
            : selectedRoute 
              ? 'Edit Route' 
              : 'Add New Route'
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {isViewMode ? (
          <div>
            {/* Route details view would go here */}
            <p>Route details view component coming soon...</p>
            {selectedRoute && (
              <div>
                <h3>{selectedRoute.routeName}</h3>
                <p>{selectedRoute.description}</p>
                <p>School: {selectedRoute.school?.name}</p>
                <p>Stops: {selectedRoute.stops?.length || 0}</p>
                <p>Distance: {selectedRoute.distance} km</p>
                <p>Duration: {selectedRoute.estimatedDuration && Math.round(selectedRoute.estimatedDuration / 60)} minutes</p>
                <p>Status: {selectedRoute.isActive ? 'Active' : 'Inactive'}</p>
              </div>
            )}
          </div>
        ) : (
          <RouteForm
            route={selectedRoute}
            onSuccess={handleSuccess}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>

      {/* Stops Management Drawer */}
      <Drawer
        title={`Manage Stops - ${selectedRoute?.routeName || ''}`}
        placement="right"
        onClose={() => setIsStopsDrawerOpen(false)}
        open={isStopsDrawerOpen}
        width={600}
      >
        <div>
          <p>Stop management interface coming soon...</p>
          {selectedRoute && (
            <div>
              <h4>Current Stops:</h4>
              {selectedRoute.stops?.map((stop, index) => (
                <div key={stop.id} style={{ padding: '8px', border: '1px solid #d9d9d9', marginBottom: '8px' }}>
                  <div><strong>{index + 1}. {stop.name}</strong></div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{stop.address}</div>
                  {stop.estimatedArrival && (
                    <div style={{ fontSize: '12px', color: '#999' }}>ETA: {stop.estimatedArrival}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Drawer>

      {/* Student Assignments Drawer */}
      <Drawer
        title={`Student Assignments - ${selectedRoute?.routeName || ''}`}
        placement="right"
        onClose={() => setIsAssignmentsDrawerOpen(false)}
        open={isAssignmentsDrawerOpen}
        width={800}
      >
        <div>
          <p>Student assignment interface coming soon...</p>
          {selectedRoute && (
            <div>
              <h4>Assigned Students:</h4>
              {selectedRoute.assignments?.map((assignment) => (
                <div key={assignment.id} style={{ padding: '8px', border: '1px solid #d9d9d9', marginBottom: '8px' }}>
                  <div><strong>Student ID: {assignment.studentId}</strong></div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Stop: {assignment.stopId}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Status: {assignment.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}