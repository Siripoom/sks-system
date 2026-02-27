'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Timeline, 
  Button, 
  Space, 
  Typography, 
  Tag, 
  Avatar, 
  Alert, 
  Progress,
  Badge,
  List,
  Empty,
  Spin
} from 'antd';
import { 
  CarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  AlertOutlined,
  PhoneOutlined,
  UserOutlined,
  HomeOutlined,
  AimOutlined
} from '@ant-design/icons';
import { useTodaysTrips, useStartTrip, useCompleteTrip, useTripStudents } from '@/hooks/useTrips';
import { useAuthStore } from '@/stores/authStore';
import type { Trip, TripStatus } from '@/types/api';
import { formatDate } from '@/utils/format';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface DriverDashboardProps {
  onViewTrip: (trip: Trip) => void;
  onManageStudents: (trip: Trip) => void;
}

export default function DriverDashboard({ onViewTrip, onManageStudents }: DriverDashboardProps) {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { user } = useAuthStore();
  
  const { data: todaysTripsData, isLoading } = useTodaysTrips(user?.id || '');
  const startTripMutation = useStartTrip();
  const completeTripMutation = useCompleteTrip();

  const trips = todaysTripsData?.data?.items || [];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleStartTrip = async (trip: Trip) => {
    try {
      await startTripMutation.mutateAsync(trip.id);
    } catch (error) {
      // Error handled by the hook
    }
  };

  const handleCompleteTrip = async (trip: Trip) => {
    try {
      await completeTripMutation.mutateAsync(trip.id);
    } catch (error) {
      // Error handled by the hook
    }
  };

  const getTripStatusColor = (status: TripStatus) => {
    switch (status) {
      case 'SCHEDULED':
        return 'blue';
      case 'IN_PROGRESS':
        return 'orange';
      case 'COMPLETED':
        return 'green';
      case 'CANCELLED':
        return 'red';
      default:
        return 'default';
    }
  };

  const getTimelineColor = (trip: Trip) => {
    const now = dayjs();
    const scheduledTime = dayjs(trip.scheduledTime);
    
    if (trip.status === 'COMPLETED') return 'green';
    if (trip.status === 'IN_PROGRESS') return 'blue';
    if (trip.status === 'CANCELLED') return 'red';
    if (now.isAfter(scheduledTime.add(15, 'minute'))) return 'red'; // Late
    if (now.isAfter(scheduledTime)) return 'orange'; // Overdue
    return 'gray'; // Scheduled
  };

  const getNextTrip = () => {
    const upcomingTrips = trips.filter(trip => 
      trip.status === 'SCHEDULED' && dayjs(trip.scheduledTime).isAfter(currentTime)
    );
    return upcomingTrips.sort((a, b) => 
      dayjs(a.scheduledTime).diff(dayjs(b.scheduledTime))
    )[0];
  };

  const getCurrentTrip = () => {
    return trips.find(trip => trip.status === 'IN_PROGRESS');
  };

  const getCompletedTripsCount = () => {
    return trips.filter(trip => trip.status === 'COMPLETED').length;
  };

  const getTotalTripsCount = () => {
    return trips.length;
  };

  const getOverdueTrips = () => {
    const now = dayjs();
    return trips.filter(trip => 
      trip.status === 'SCHEDULED' && dayjs(trip.scheduledTime).isBefore(now)
    );
  };

  const nextTrip = getNextTrip();
  const currentTrip = getCurrentTrip();
  const completedCount = getCompletedTripsCount();
  const totalCount = getTotalTripsCount();
  const overdueTrips = getOverdueTrips();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Space size="large">
                  <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                  <div>
                    <Title level={3} style={{ margin: 0 }}>
                      Welcome, {user?.firstName}!
                    </Title>
                    <Text type="secondary">
                      Today is {currentTime.format('dddd, MMMM DD, YYYY')} • {currentTime.format('h:mm A')}
                    </Text>
                  </div>
                </Space>
              </Col>
              <Col>
                {currentTrip && (
                  <Badge status="processing" text="Trip in Progress" />
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      {overdueTrips.length > 0 && (
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col span={24}>
            <Alert
              message={`${overdueTrips.length} Overdue Trip${overdueTrips.length > 1 ? 's' : ''}`}
              description="You have trips that were scheduled to start but haven't been started yet."
              type="warning"
              showIcon
              icon={<AlertOutlined />}
              action={
                <Button size="small" onClick={() => onViewTrip(overdueTrips[0])}>
                  View Details
                </Button>
              }
            />
          </Col>
        </Row>
      )}

      {/* Statistics */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Today's Trips"
              value={totalCount}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Completed"
              value={completedCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${totalCount}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Progress"
              value={totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}
              prefix={<Progress type="circle" size={20} percent={totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0} />}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Overdue"
              value={overdueTrips.length}
              prefix={<AlertOutlined />}
              valueStyle={{ color: overdueTrips.length > 0 ? '#f5222d' : '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Current/Next Trip */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title={currentTrip ? "Current Trip" : "Next Trip"} extra={
            currentTrip && (
              <Tag color="orange" icon={<PlayCircleOutlined />}>
                IN PROGRESS
              </Tag>
            )
          }>
            {currentTrip || nextTrip ? (
              <div>
                {(currentTrip || nextTrip) && (
                  <>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <EnvironmentOutlined style={{ color: '#1890ff' }} />
                          <Text strong>{(currentTrip || nextTrip)!.route?.routeName}</Text>
                          <Tag color={getTripStatusColor((currentTrip || nextTrip)!.status)}>
                            {(currentTrip || nextTrip)!.tripType}
                          </Tag>
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginLeft: '24px' }}>
                          {(currentTrip || nextTrip)!.route?.description}
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <ClockCircleOutlined style={{ color: '#52c41a' }} />
                          <Text>Scheduled: {dayjs((currentTrip || nextTrip)!.scheduledTime).format('h:mm A')}</Text>
                        </div>
                        {currentTrip?.actualStartTime && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '24px' }}>
                            <PlayCircleOutlined style={{ color: '#fa8c16' }} />
                            <Text type="secondary">Started: {dayjs(currentTrip.actualStartTime).format('h:mm A')}</Text>
                          </div>
                        )}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CarOutlined style={{ color: '#722ed1' }} />
                          <Text>{(currentTrip || nextTrip)!.vehicle?.licensePlate} - {(currentTrip || nextTrip)!.vehicle?.model}</Text>
                        </div>
                      </div>

                      <Space>
                        <Button 
                          type="primary" 
                          icon={<EnvironmentOutlined />}
                          onClick={() => onViewTrip((currentTrip || nextTrip)!)}
                        >
                          View Details
                        </Button>
                        <Button 
                          icon={<TeamOutlined />}
                          onClick={() => onManageStudents((currentTrip || nextTrip)!)}
                        >
                          Students
                        </Button>
                        {currentTrip ? (
                          <Button 
                            type="primary" 
                            danger
                            icon={<CheckCircleOutlined />}
                            loading={completeTripMutation.isPending}
                            onClick={() => handleCompleteTrip(currentTrip)}
                          >
                            Complete Trip
                          </Button>
                        ) : nextTrip && nextTrip.status === 'SCHEDULED' && (
                          <Button 
                            type="primary"
                            icon={<PlayCircleOutlined />}
                            loading={startTripMutation.isPending}
                            onClick={() => handleStartTrip(nextTrip)}
                          >
                            Start Trip
                          </Button>
                        )}
                      </Space>
                    </Space>
                  </>
                )}
              </div>
            ) : (
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No upcoming trips scheduled for today"
              />
            )}
          </Card>
        </Col>

        {/* Today's Schedule */}
        <Col xs={24} lg={12}>
          <Card title="Today's Schedule" extra={
            <Text type="secondary">{trips.length} trips</Text>
          }>
            {trips.length > 0 ? (
              <Timeline
                items={trips.map(trip => ({
                  color: getTimelineColor(trip),
                  children: (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <Text strong>{dayjs(trip.scheduledTime).format('h:mm A')}</Text>
                        <Tag color={getTripStatusColor(trip.status)}>
                          {trip.status}
                        </Tag>
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <Text>{trip.route?.routeName}</Text>
                        <Tag color={trip.tripType === 'PICKUP' ? 'purple' : 'cyan'} style={{ marginLeft: '8px' }}>
                          {trip.tripType}
                        </Tag>
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {trip.vehicle?.licensePlate} • {trip.route?.stops?.length || 0} stops
                      </div>
                    </div>
                  ),
                }))}
              />
            ) : (
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No trips scheduled for today"
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Quick Actions">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8} md={6}>
                <Button type="dashed" block size="large" style={{ height: '80px' }}>
                  <div>
                    <PhoneOutlined style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }} />
                    Emergency Contact
                  </div>
                </Button>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Button type="dashed" block size="large" style={{ height: '80px' }}>
                  <div>
                    <AimOutlined style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }} />
                    Report Issue
                  </div>
                </Button>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Button type="dashed" block size="large" style={{ height: '80px' }}>
                  <div>
                    <CarOutlined style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }} />
                    Vehicle Check
                  </div>
                </Button>
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Button type="dashed" block size="large" style={{ height: '80px' }}>
                  <div>
                    <CalendarOutlined style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }} />
                    View Schedule
                  </div>
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}