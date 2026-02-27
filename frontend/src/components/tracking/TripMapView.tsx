'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Typography, 
  Tag, 
  Timeline, 
  Progress, 
  Alert, 
  Tooltip, 
  Badge, 
  List, 
  Avatar, 
  Drawer, 
  Divider,
  Statistic,
  Empty
} from 'antd';
import { 
  EnvironmentOutlined,
  CarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  AimOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  AlertOutlined,
  PhoneOutlined,
  MessageOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { 
  useTripTracking,
  useUpdateTripLocation,
  useArriveAtStop,
  useDepartFromStop,
  useUpdateStudentStatus
} from '@/hooks/useTracking';
import type { TripTracking, LocationData } from '@/services/trackingService';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface TripMapViewProps {
  tripId: string;
  onClose?: () => void;
}

// Mock map component since we don't have a map library installed
const MapContainer = ({ 
  trip, 
  onLocationUpdate 
}: { 
  trip: TripTracking; 
  onLocationUpdate: (location: LocationData) => void;
}) => {
  const [simulatedLocation, setSimulatedLocation] = useState(trip.currentLocation);

  // Simulate location updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newLocation = {
        ...simulatedLocation,
        latitude: simulatedLocation.latitude + (Math.random() - 0.5) * 0.001,
        longitude: simulatedLocation.longitude + (Math.random() - 0.5) * 0.001,
        timestamp: new Date().toISOString(),
        speed: Math.random() * 50, // km/h
        heading: Math.random() * 360,
      };
      setSimulatedLocation(newLocation);
      onLocationUpdate(newLocation);
    }, 10000);

    return () => clearInterval(interval);
  }, [simulatedLocation, onLocationUpdate]);

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '400px', 
        backgroundColor: '#f0f2f5', 
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      <AimOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
      <div style={{ textAlign: 'center' }}>
        <Title level={4}>Interactive Map View</Title>
        <Text type="secondary">
          Real-time trip tracking map would be displayed here
        </Text>
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fff', borderRadius: '4px' }}>
          <Text strong>Current Location:</Text>
          <br />
          <Text style={{ fontSize: '12px', fontFamily: 'monospace' }}>
            {simulatedLocation.latitude.toFixed(6)}, {simulatedLocation.longitude.toFixed(6)}
          </Text>
          <br />
          <Text style={{ fontSize: '12px', color: '#666' }}>
            Speed: {simulatedLocation.speed?.toFixed(1) || 0} km/h | 
            Heading: {simulatedLocation.heading?.toFixed(0) || 0}°
          </Text>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Tag color="blue">Route: {trip.route.routeName}</Tag>
        <Tag color="green">Vehicle: {trip.vehicleId}</Tag>
        <Tag color="purple">Driver: {trip.driverId}</Tag>
      </div>
    </div>
  );
};

export default function TripMapView({ tripId, onClose }: TripMapViewProps) {
  const [studentsDrawerVisible, setStudentsDrawerVisible] = useState(false);
  const [routeDetailsVisible, setRouteDetailsVisible] = useState(false);
  
  // Queries
  const { data: trip, isLoading } = useTripTracking(tripId, 5000); // 5 second refresh

  // Mutations
  const updateLocationMutation = useUpdateTripLocation();
  const arriveAtStopMutation = useArriveAtStop();
  const departFromStopMutation = useDepartFromStop();
  const updateStudentStatusMutation = useUpdateStudentStatus();

  if (isLoading || !trip) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <AimOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={4}>Loading Trip Data...</Title>
      </Card>
    );
  }

  const handleLocationUpdate = async (location: LocationData) => {
    try {
      await updateLocationMutation.mutateAsync({ tripId: trip.id, location });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleArriveAtStop = async (stopId: string) => {
    try {
      await arriveAtStopMutation.mutateAsync({
        tripId: trip.id,
        stopId,
        location: trip.currentLocation
      });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDepartFromStop = async (stopId: string) => {
    try {
      await departFromStopMutation.mutateAsync({ tripId: trip.id, stopId });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleStudentStatusUpdate = async (studentId: string, status: 'PICKED_UP' | 'DROPPED_OFF' | 'ABSENT' | 'NO_SHOW') => {
    try {
      await updateStudentStatusMutation.mutateAsync({
        tripId: trip.id,
        studentId,
        status,
        stopId: trip.currentStopId
      });
    } catch (error) {
      // Error handled by hook
    }
  };

  const getStopStatus = (stop: any) => {
    if (stop.actualArrival) return 'COMPLETED';
    if (stop.id === trip.currentStopId) return 'CURRENT';
    return 'PENDING';
  };

  const getStopStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'green';
      case 'CURRENT': return 'blue';
      case 'PENDING': return 'orange';
      default: return 'default';
    }
  };

  const getProgressPercentage = () => {
    const totalStops = trip.route.stops.length;
    const completedStops = trip.route.stops.filter(stop => stop.status === 'ARRIVED' || stop.status === 'DEPARTED').length;
    return totalStops > 0 ? Math.round((completedStops / totalStops) * 100) : 0;
  };

  const currentStop = trip.route.stops.find(stop => stop.id === trip.currentStopId);
  const nextStop = trip.route.stops.find(stop => stop.id === trip.nextStopId);

  return (
    <div>
      {/* Header */}
      <Card style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {trip.route.routeName}
                </Title>
                <Text type="secondary">
                  Real-time trip monitoring • Last updated: {dayjs(trip.lastUpdated).format('h:mm:ss A')}
                </Text>
              </div>
              <Tag color={trip.status === 'IN_PROGRESS' ? 'green' : 'blue'}>
                {trip.status}
              </Tag>
              {trip.alerts.length > 0 && (
                <Badge count={trip.alerts.length}>
                  <AlertOutlined style={{ color: '#fa541c', fontSize: '18px' }} />
                </Badge>
              )}
            </div>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<TeamOutlined />}
                onClick={() => setStudentsDrawerVisible(true)}
              >
                Students ({trip.studentsOnBoard.length})
              </Button>
              <Button
                icon={<EnvironmentOutlined />}
                onClick={() => setRouteDetailsVisible(true)}
              >
                Route Details
              </Button>
              <Button icon={<ReloadOutlined />}>
                Refresh
              </Button>
              {onClose && (
                <Button onClick={onClose}>
                  Close
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Trip Progress */}
      <Card style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Statistic
              title="Trip Progress"
              value={getProgressPercentage()}
              suffix="%"
              prefix={<Progress type="circle" size={60} percent={getProgressPercentage()} />}
            />
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Current Stop</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {currentStop ? currentStop.name : 'In Transit'}
              </div>
              {trip.estimatedArrival && (
                <div style={{ fontSize: '12px', color: '#1890ff' }}>
                  ETA: {dayjs(trip.estimatedArrival).format('h:mm A')}
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Next Stop</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {nextStop ? nextStop.name : 'Route Complete'}
              </div>
              {nextStop && (
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {nextStop.estimatedArrival}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {/* Map View */}
        <Col xs={24} lg={16}>
          <Card 
            title="Live Map Tracking" 
            extra={
              <Space>
                <Button icon={<FullscreenOutlined />} size="small">
                  Fullscreen
                </Button>
                <Button icon={<ReloadOutlined />} size="small">
                  Center
                </Button>
              </Space>
            }
          >
            <MapContainer trip={trip} onLocationUpdate={handleLocationUpdate} />
          </Card>
        </Col>

        {/* Route Timeline */}
        <Col xs={24} lg={8}>
          <Card 
            title="Route Timeline" 
            style={{ height: '500px' }}
            bodyStyle={{ height: 'calc(100% - 57px)', overflowY: 'auto' }}
          >
            <Timeline>
              {trip.route.stops.map((stop, index) => {
                const status = getStopStatus(stop);
                const isCompleted = status === 'COMPLETED';
                const isCurrent = status === 'CURRENT';
                
                return (
                  <Timeline.Item
                    key={stop.id}
                    color={getStopStatusColor(status)}
                    dot={
                      isCompleted ? <CheckCircleOutlined /> :
                      isCurrent ? <EnvironmentOutlined /> :
                      <ClockCircleOutlined />
                    }
                  >
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <Text strong>{stop.name}</Text>
                        <Tag color={getStopStatusColor(status)}>
                          {status}
                        </Tag>
                      </div>
                      
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        Scheduled: {stop.estimatedArrival}
                      </div>
                      
                      {stop.actualArrival && (
                        <div style={{ fontSize: '12px', color: '#52c41a', marginBottom: '8px' }}>
                          Actual: {dayjs(stop.actualArrival).format('h:mm A')}
                        </div>
                      )}
                      
                      {isCurrent && (
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <Button
                            type="primary"
                            size="small"
                            block
                            icon={<PlayCircleOutlined />}
                            onClick={() => handleArriveAtStop(stop.id)}
                            loading={arriveAtStopMutation.isPending}
                          >
                            Arrive at Stop
                          </Button>
                          <Button
                            size="small"
                            block
                            icon={<StopOutlined />}
                            onClick={() => handleDepartFromStop(stop.id)}
                            loading={departFromStopMutation.isPending}
                          >
                            Depart from Stop
                          </Button>
                        </Space>
                      )}
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      {trip.performance && (
        <Card title="Trip Performance" style={{ marginTop: '16px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Statistic
                title="Distance Traveled"
                value={trip.performance.distanceTraveled}
                suffix="km"
                precision={1}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="Average Speed"
                value={trip.performance.averageSpeed}
                suffix="km/h"
                precision={1}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="Delay"
                value={trip.performance.delayMinutes}
                suffix="min"
                valueStyle={{ color: trip.performance.delayMinutes > 5 ? '#f5222d' : '#52c41a' }}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic
                title="On-Time Rate"
                value={trip.performance.onTimePercentage}
                suffix="%"
                valueStyle={{ color: trip.performance.onTimePercentage >= 90 ? '#52c41a' : '#fa8c16' }}
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* Active Alerts */}
      {trip.alerts.length > 0 && (
        <Card title="Active Alerts" style={{ marginTop: '16px' }}>
          <List
            dataSource={trip.alerts}
            renderItem={(alert) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <AlertOutlined
                      style={{
                        color: alert.severity === 'CRITICAL' ? '#f5222d' : 
                               alert.severity === 'HIGH' ? '#fa541c' : '#fa8c16'
                      }}
                    />
                  }
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{alert.type}</span>
                      <Tag color={alert.severity === 'CRITICAL' ? 'red' : 'orange'}>
                        {alert.severity}
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <div>{alert.message}</div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        {dayjs(alert.timestamp).format('h:mm A')}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      {/* Students Drawer */}
      <Drawer
        title={`Students on Board (${trip.studentsOnBoard.length})`}
        open={studentsDrawerVisible}
        onClose={() => setStudentsDrawerVisible(false)}
        width={400}
      >
        <List
          dataSource={trip.studentsOnBoard}
          renderItem={(student) => (
            <List.Item
              actions={[
                <Button
                  size="small"
                  type={student.status === 'PICKED_UP' ? 'primary' : 'default'}
                  onClick={() => handleStudentStatusUpdate(student.studentId, 'PICKED_UP')}
                  loading={updateStudentStatusMutation.isPending}
                >
                  Pick Up
                </Button>,
                <Button
                  size="small"
                  type={student.status === 'DROPPED_OFF' ? 'primary' : 'default'}
                  onClick={() => handleStudentStatusUpdate(student.studentId, 'DROPPED_OFF')}
                  loading={updateStudentStatusMutation.isPending}
                >
                  Drop Off
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={`Student ${student.studentId}`}
                description={
                  <div>
                    <Tag color={
                      student.status === 'PICKED_UP' ? 'blue' :
                      student.status === 'DROPPED_OFF' ? 'green' :
                      student.status === 'ABSENT' ? 'red' : 'orange'
                    }>
                      {student.status}
                    </Tag>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Updated: {dayjs(student.timestamp).format('h:mm A')}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        
        {trip.studentsOnBoard.length === 0 && (
          <Empty description="No students currently on board" />
        )}
      </Drawer>

      {/* Route Details Drawer */}
      <Drawer
        title="Route Details"
        open={routeDetailsVisible}
        onClose={() => setRouteDetailsVisible(false)}
        width={500}
      >
        <div style={{ marginBottom: '24px' }}>
          <Title level={5}>Route Information</Title>
          <div style={{ marginBottom: '8px' }}>
            <Text strong>Route Name: </Text>
            <Text>{trip.route.routeName}</Text>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <Text strong>Total Stops: </Text>
            <Text>{trip.route.stops.length}</Text>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <Text strong>Trip Status: </Text>
            <Tag color={trip.status === 'IN_PROGRESS' ? 'green' : 'blue'}>
              {trip.status}
            </Tag>
          </div>
        </div>

        <Divider />

        <div>
          <Title level={5}>All Stops</Title>
          <List
            dataSource={trip.route.stops}
            renderItem={(stop, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: getStopStatusColor(getStopStatus(stop)),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      {index + 1}
                    </div>
                  }
                  title={stop.name}
                  description={
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Scheduled: {stop.estimatedArrival}
                      </div>
                      {stop.actualArrival && (
                        <div style={{ fontSize: '12px', color: '#52c41a' }}>
                          Actual: {dayjs(stop.actualArrival).format('h:mm A')}
                        </div>
                      )}
                      <Tag color={getStopStatusColor(getStopStatus(stop))} style={{ marginTop: '4px' }}>
                        {getStopStatus(stop)}
                      </Tag>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Drawer>
    </div>
  );
}