'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import RealTimeTrackingDashboard from '@/components/tracking/RealTimeTrackingDashboard';
import TripMapView from '@/components/tracking/TripMapView';
import type { TripTracking } from '@/services/trackingService';

export default function TrackingPage() {
  const [selectedTrip, setSelectedTrip] = useState<TripTracking | null>(null);
  const [mapViewVisible, setMapViewVisible] = useState(false);
  const [tripDetailsVisible, setTripDetailsVisible] = useState(false);

  const handleViewTrip = (trip: TripTracking) => {
    setSelectedTrip(trip);
    setTripDetailsVisible(true);
  };

  const handleViewMap = (trip: TripTracking) => {
    setSelectedTrip(trip);
    setMapViewVisible(true);
  };

  const handleCloseMap = () => {
    setMapViewVisible(false);
    setSelectedTrip(null);
  };

  const handleCloseTripDetails = () => {
    setTripDetailsVisible(false);
    setSelectedTrip(null);
  };

  return (
    <>
      <RealTimeTrackingDashboard
        onViewTrip={handleViewTrip}
        onViewMap={handleViewMap}
      />

      {/* Trip Map Modal */}
      <Modal
        title="Trip Map View"
        open={mapViewVisible}
        onCancel={handleCloseMap}
        footer={null}
        width="95vw"
        style={{ top: 20 }}
        bodyStyle={{ padding: '16px' }}
      >
        {selectedTrip && (
          <TripMapView
            tripId={selectedTrip.id}
            onClose={handleCloseMap}
          />
        )}
      </Modal>

      {/* Trip Details Modal */}
      <Modal
        title="Trip Details"
        open={tripDetailsVisible}
        onCancel={handleCloseTripDetails}
        footer={null}
        width={800}
      >
        {selectedTrip && (
          <div style={{ padding: '16px' }}>
            <TripMapView
              tripId={selectedTrip.id}
              onClose={handleCloseTripDetails}
            />
          </div>
        )}
      </Modal>
    </>
  );
}