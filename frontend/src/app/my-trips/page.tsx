'use client';

import { useState } from 'react';
import { Drawer } from 'antd';
import DriverDashboard from '@/components/driver/DriverDashboard';
import StudentCheckIn from '@/components/driver/StudentCheckIn';
import type { Trip } from '@/types/api';

export default function MyTripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | undefined>(undefined);
  const [isStudentDrawerOpen, setIsStudentDrawerOpen] = useState(false);

  const handleViewTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    // You could open a modal or navigate to a detailed view
    console.log('View trip:', trip);
  };

  const handleManageStudents = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsStudentDrawerOpen(true);
  };

  return (
    <>
      <DriverDashboard
        onViewTrip={handleViewTrip}
        onManageStudents={handleManageStudents}
      />

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
    </>
  );
}