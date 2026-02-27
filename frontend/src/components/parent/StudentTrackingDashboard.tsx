'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Timeline, 
  Tag, 
  Button, 
  Space, 
  Alert, 
  Spin, 
  Empty, 
  Progress, 
  Statistic, 
  Badge, 
  Avatar, 
  Tooltip, 
  List,
  Divider,
  Modal,
  notification
} from 'antd';
import { 
  EnvironmentOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CarOutlined,
  HomeOutlined,
  BookOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  AlertOutlined,
  PhoneOutlined,
  MessageOutlined,
  ReloadOutlined,
  AimOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { 
  useStudentTracking,
  useStudentETA,
  useActiveAlerts
} from '@/hooks/useTracking';
import { useWebSocket } from '@/services/websocketService';
import { useAuthStore } from '@/stores/authStore';
import type { TripTracking } from '@/services/trackingService';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface StudentTrackingDashboardProps {
  studentId?: string;
}

export default function StudentTrackingDashboard({ studentId }: StudentTrackingDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [emergencyContactVisible, setEmergencyContactVisible] = useState(false);
  const [busLocation, setBusLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const { user } = useAuthStore();
  const ws = useWebSocket(user?.id);
  
  // Use student ID from props or get from user's children
  const trackingStudentId = studentId || user?.children?.[0]?.id || '';
  
  // Queries
  const { data: studentTrackingData, isLoading } = useStudentTracking(trackingStudentId, 10000);
  const { data: etaData } = useStudentETA(trackingStudentId, selectedDate, 30000);
  const { data: alertsData } = useActiveAlerts();

  // WebSocket subscriptions
  useEffect(() => {
    if (trackingStudentId && ws) {
      // Subscribe to student-specific updates
      ws.subscribe(`student:${trackingStudentId}`);
      
      // Listen for real-time updates
      const unsubscribeTripUpdate = ws.on('TRIP_LOCATION_UPDATE', (data) => {
        setBusLocation(data.location);
      });
      
      const unsubscribeStudentUpdate = ws.on('STUDENT_STATUS_UPDATE', (data) => {
        if (data.studentId === trackingStudentId) {
          notification.success({
            message: 'Student Status Updated',
            description: `Your child's status has been updated to: ${data.status}`,
            placement: 'topRight'
          });
        }
      });
      
      const unsubscribeAlert = ws.on('ALERT_CREATED', (data) => {
        if (data.tripId && studentTrackingData?.currentTrip?.id === data.tripId) {
          notification.warning({
            message: 'Trip Alert',
            description: data.message,
            placement: 'topRight'
          });
        }
      });
      
      return () => {
        unsubscribeTripUpdate();
        unsubscribeStudentUpdate();
        unsubscribeAlert();
        ws.unsubscribe(`student:${trackingStudentId}`);
      };
    }
  }, [trackingStudentId, ws, studentTrackingData?.currentTrip?.id]);

  if (!trackingStudentId) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <UserOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={4}>No Student Information</Title>
        <Text type="secondary">
          No student information found in your account. Please contact the school administration.
        </Text>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>Loading student tracking information...</div>
      </Card>
    );
  }

  const studentData = studentTrackingData;
  const currentTrip = studentData?.currentTrip;
  const todaysSchedule = studentData?.todaysSchedule;
  const recentHistory = studentData?.recentHistory || [];
  
  // Get relevant alerts for this student's trip
  const relevantAlerts = alertsData?.data?.items?.filter(alert => 
    alert.tripId === currentTrip?.id
  ) || [];

  const getTripStatusColor = (status?: string) => {
    switch (status) {
      case 'SCHEDULED': return 'blue';
      case 'IN_PROGRESS': return 'green';
      case 'DELAYED': return 'orange';
      case 'COMPLETED': return 'success';
      case 'CANCELLED': return 'red';
      default: return 'default';
    }
  };

  const getStudentStatusColor = (status: string) => {
    switch (status) {
      case 'PICKED_UP': return 'blue';
      case 'DROPPED_OFF': return 'green';
      case 'ABSENT': return 'red';
      case 'NO_SHOW': return 'orange';
      default: return 'default';
    }
  };

  const renderCurrentTripInfo = () => {
    if (!currentTrip) return null;

    const studentStatus = currentTrip.studentsOnBoard.find(s => s.studentId === trackingStudentId);
    
    return (
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CarOutlined />
            Current Trip
            <Tag color={getTripStatusColor(currentTrip.status)}>
              {currentTrip.status}
            </Tag>
            {currentTrip.status === 'IN_PROGRESS' && (
              <Badge status="processing" text="Live" />
            )}
          </div>
        }
        extra={
          <Space>
            <Button
              icon={<ReloadOutlined />}
              size="small"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Route Information</Text>
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <EnvironmentOutlined style={{ color: '#1890ff' }} />
                  <Text>{currentTrip.route.routeName}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <CarOutlined style={{ color: '#52c41a' }} />
                  <Text>Vehicle: {currentTrip.vehicleId}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserOutlined style={{ color: '#722ed1' }} />
                  <Text>Driver: {currentTrip.driverId}</Text>
                </div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Student Status</Text>
              <div style={{ marginTop: '8px' }}>
                {studentStatus ? (
                  <div>
                    <Tag color={getStudentStatusColor(studentStatus.status)} style={{ marginBottom: '8px' }}>
                      {studentStatus.status.replace('_', ' ')}
                    </Tag>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      Last updated: {dayjs(studentStatus.timestamp).format('h:mm A')}
                    </div>
                  </div>
                ) : (
                  <Tag color="default">Status Unknown</Tag>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Current Location */}
        {currentTrip.currentLocation && (
          <Alert
            message="Bus Location"
            description={
              <div>
                <div style={{ marginBottom: '8px' }}>
                  Current stop: {currentTrip.currentStopId ? 
                    currentTrip.route.stops.find(s => s.id === currentTrip.currentStopId)?.name || 'Unknown Stop' : 
                    'In Transit'
                  }
                </div>
                {currentTrip.estimatedArrival && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ClockCircleOutlined />
                    <Text>
                      Estimated arrival at next stop: {dayjs(currentTrip.estimatedArrival).format('h:mm A')}
                    </Text>
                  </div>
                )}
              </div>
            }
            type="info"
            style={{ marginTop: '16px' }}
            action={
              <Button size="small" icon={<AimOutlined />}>
                View Map
              </Button>
            }
          />
        )}

        {/* Active Alerts */}
        {relevantAlerts.length > 0 && (
          <Alert
            message={`${relevantAlerts.length} Active Alert${relevantAlerts.length > 1 ? 's' : ''}`}
            description={relevantAlerts.map(alert => alert.message).join(', ')}
            type="warning"
            style={{ marginTop: '16px' }}
            showIcon
          />
        )}
      </Card>
    );
  };

  const renderSchedule = () => {
    if (!todaysSchedule) return null;

    return (
      <Card title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarOutlined />
          Today's Schedule
        </div>
      }>
        <Row gutter={[16, 16]}>
          {todaysSchedule.pickup && (
            <Col xs={24} md={12}>
              <Card size="small" title="Morning Pickup">
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>Route: </Text>
                  <Text>{todaysSchedule.pickup.routeName}</Text>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>Stop: </Text>
                  <Text>{todaysSchedule.pickup.stopName}</Text>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>Scheduled Time: </Text>
                  <Text>{todaysSchedule.pickup.estimatedTime}</Text>
                </div>
                <Tag color={getTripStatusColor(todaysSchedule.pickup.status)}>
                  {todaysSchedule.pickup.status}
                </Tag>
                
                {etaData?.pickup && (
                  <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f0f2ff', borderRadius: '4px' }}>
                    <Text strong style={{ color: '#1890ff' }}>Live ETA: </Text>
                    <Text style={{ color: '#1890ff' }}>
                      {dayjs(etaData.pickup.estimatedArrival).format('h:mm A')}
                    </Text>
                    {etaData.pickup.delayMinutes > 0 && (
                      <div style={{ fontSize: '12px', color: '#fa8c16' }}>
                        Delayed by {etaData.pickup.delayMinutes} minutes
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </Col>
          )}
          
          {todaysSchedule.dropoff && (
            <Col xs={24} md={12}>
              <Card size="small" title="Afternoon Dropoff">
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>Route: </Text>
                  <Text>{todaysSchedule.dropoff.routeName}</Text>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>Stop: </Text>
                  <Text>{todaysSchedule.dropoff.stopName}</Text>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>Scheduled Time: </Text>
                  <Text>{todaysSchedule.dropoff.estimatedTime}</Text>
                </div>
                <Tag color={getTripStatusColor(todaysSchedule.dropoff.status)}>
                  {todaysSchedule.dropoff.status}
                </Tag>
                
                {etaData?.dropoff && (
                  <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f0f2ff', borderRadius: '4px' }}>
                    <Text strong style={{ color: '#1890ff' }}>Live ETA: </Text>
                    <Text style={{ color: '#1890ff' }}>
                      {dayjs(etaData.dropoff.estimatedArrival).format('h:mm A')}
                    </Text>
                    {etaData.dropoff.delayMinutes > 0 && (
                      <div style={{ fontSize: '12px', color: '#fa8c16' }}>
                        Delayed by {etaData.dropoff.delayMinutes} minutes
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </Col>
          )}
        </Row>
        
        {!todaysSchedule.pickup && !todaysSchedule.dropoff && (
          <Empty 
            description="No trips scheduled for today"
            style={{ padding: '20px' }}
          />
        )}
      </Card>
    );
  };

  const renderRecentHistory = () => {
    if (recentHistory.length === 0) return null;

    return (
      <Card title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ClockCircleOutlined />
          Recent Trip History
        </div>
      }>
        <Timeline>
          {recentHistory.slice(0, 5).map((trip: any, index: number) => (
            <Timeline.Item
              key={index}
              color={trip.status === 'COMPLETED' ? 'green' : 
                     trip.status === 'CANCELLED' ? 'red' : 'blue'}
            >
              <div>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                  {trip.routeName} - {trip.tripType}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {dayjs(trip.date).format('MMM DD, YYYY')} • {trip.scheduledTime}
                </div>
                <Tag color={getTripStatusColor(trip.status)}>
                  {trip.status}
                </Tag>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={3} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserOutlined />
            Student Transportation
          </Title>
          <Text type="secondary">
            Real-time tracking and schedule information for your child
          </Text>
        </Col>
        <Col>
          <Space>
            <Button
              icon={<PhoneOutlined />}
              onClick={() => setEmergencyContactVisible(true)}
              type="primary"
              danger
            >
              Emergency Contact
            </Button>
            <Button
              icon={<MessageOutlined />}
            >
              Contact School
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Quick Status Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Current Status"
              value={currentTrip ? currentTrip.status : 'No Active Trip'}
              valueStyle={{ 
                color: currentTrip?.status === 'IN_PROGRESS' ? '#52c41a' : '#666',
                fontSize: '16px'
              }}
              prefix={currentTrip?.status === 'IN_PROGRESS' ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Next Pickup/Dropoff"
              value={
                etaData?.pickup ? dayjs(etaData.pickup.estimatedArrival).format('h:mm A') :
                etaData?.dropoff ? dayjs(etaData.dropoff.estimatedArrival).format('h:mm A') :
                'No scheduled trips'
              }
              valueStyle={{ fontSize: '16px' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Active Alerts"
              value={relevantAlerts.length}
              valueStyle={{ 
                color: relevantAlerts.length > 0 ? '#f5222d' : '#52c41a',
                fontSize: '16px'
              }}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Current Trip Information */}
      {currentTrip && (
        <div style={{ marginBottom: '24px' }}>
          {renderCurrentTripInfo()}
        </div>
      )}

      {/* Schedule and History */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          {renderSchedule()}
        </Col>
        <Col xs={24} lg={12}>
          {renderRecentHistory()}
        </Col>
      </Row>

      {/* No Active Trip State */}
      {!currentTrip && !todaysSchedule?.pickup && !todaysSchedule?.dropoff && (
        <Card style={{ textAlign: 'center', padding: '50px', marginTop: '24px' }}>
          <BookOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <Title level={4}>No Trips Scheduled Today</Title>
          <Text type="secondary">
            There are no transportation schedules for today. Please check with the school if you believe this is an error.
          </Text>
        </Card>
      )}

      {/* Emergency Contact Modal */}
      <Modal
        title="Emergency Contacts"
        open={emergencyContactVisible}
        onCancel={() => setEmergencyContactVisible(false)}
        footer={null}
        width={500}
      >
        <List
          dataSource={[
            { name: 'School Transportation Office', phone: '(555) 123-4567', type: 'Transportation' },
            { name: 'School Main Office', phone: '(555) 123-4568', type: 'School' },
            { name: 'Emergency Services', phone: '911', type: 'Emergency' }
          ]}
          renderItem={(contact) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  icon={<PhoneOutlined />}
                  href={`tel:${contact.phone}`}
                >
                  Call
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<PhoneOutlined />} />}
                title={contact.name}
                description={
                  <div>
                    <div>{contact.phone}</div>
                    <Tag color="blue">{contact.type}</Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}