'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Space, 
  Select, 
  Tag, 
  Badge, 
  Alert, 
  Spin, 
  Statistic, 
  Timeline, 
  Progress, 
  Drawer, 
  Modal, 
  List, 
  Avatar, 
  Tooltip, 
  Divider,
  Empty,
  Input,
  Switch,
  Tabs
} from 'antd';
import { 
  CarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  AlertOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  SettingOutlined,
  PhoneOutlined,
  MessageOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  UserOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  AimOutlined,
  TruckOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { 
  useActiveTrips,
  useActiveAlerts,
  useTrackingStats,
  useUpdateTripStatus,
  useAcknowledgeAlert,
  useResolveAlert,
  useCreateAlert,
  useSendMessageToDriver
} from '@/hooks/useTracking';
import { useAuthStore } from '@/stores/authStore';
import { formatDate } from '@/utils/format';
import type { TripTracking, TrackingAlert } from '@/services/trackingService';
import { useWebSocket } from '@/services/websocketService';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface RealTimeTrackingDashboardProps {
  onViewTrip?: (trip: TripTracking) => void;
  onViewMap?: (trip: TripTracking) => void;
}

export default function RealTimeTrackingDashboard({ onViewTrip, onViewMap }: RealTimeTrackingDashboardProps) {
  const [filters, setFilters] = useState({
    status: '',
    driverId: '',
    vehicleId: '',
    routeId: '',
    schoolId: '',
  });
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds default
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alertsVisible, setAlertsVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripTracking | null>(null);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');
  const [messageForm, setMessageForm] = useState({
    type: 'INSTRUCTION' as 'INSTRUCTION' | 'ALERT' | 'UPDATE' | 'EMERGENCY',
    content: '',
    priority: 'NORMAL' as 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT',
  });

  const { user } = useAuthStore();

  // Queries
  const { data: tripsData, isLoading: tripsLoading, refetch: refetchTrips } = useActiveTrips(
    filters, 
    autoRefresh ? refreshInterval : false
  );
  const { data: alertsData, isLoading: alertsLoading } = useActiveAlerts(
    autoRefresh ? 15000 : false
  );
  const { data: statsData } = useTrackingStats(
    { schoolId: filters.schoolId },
    autoRefresh ? 60000 : false
  );

  // Mutations
  const updateTripStatusMutation = useUpdateTripStatus();
  const acknowledgeAlertMutation = useAcknowledgeAlert();
  const resolveAlertMutation = useResolveAlert();
  const createAlertMutation = useCreateAlert();
  const sendMessageMutation = useSendMessageToDriver();

  const trips = tripsData?.data?.items || [];
  const alerts = alertsData?.data?.items || [];
  const stats = statsData || {};

  // WebSocket Integration
  const ws = useWebSocket(user?.id);
  
  // Setup real-time subscriptions
  useEffect(() => {
    if (ws && user) {
      // Subscribe to system alerts and trip updates
      ws.subscribeAlerts();
      ws.subscribeSystemNotifications();
      
      // Listen for trip location updates
      const unsubscribeLocation = ws.on('TRIP_LOCATION_UPDATE', (data) => {
        refetchTrips();
      });
      
      // Listen for trip status changes
      const unsubscribeStatus = ws.on('TRIP_STATUS_CHANGE', (data) => {
        refetchTrips();
      });
      
      // Listen for new alerts
      const unsubscribeAlerts = ws.on('ALERT_CREATED', (data) => {
        if (data.severity === 'CRITICAL' || data.severity === 'HIGH') {
          Modal.confirm({
            title: 'New Alert',
            content: data.message,
            okText: 'Acknowledge',
            onOk: () => handleAcknowledgeAlert(data.id)
          });
        }
      });
      
      // Listen for emergency reports
      const unsubscribeEmergency = ws.on('EMERGENCY_REPORTED', (data) => {
        Modal.error({
          title: 'EMERGENCY ALERT',
          content: `Emergency reported: ${data.message}. Location: ${data.location}`,
          okText: 'View Details'
        });
      });
      
      return () => {
        unsubscribeLocation();
        unsubscribeStatus();
        unsubscribeAlerts();
        unsubscribeEmergency();
      };
    }
  }, [ws, user]);

  // Filter trips by status for quick overview
  const scheduledTrips = trips.filter(trip => trip.status === 'SCHEDULED');
  const inProgressTrips = trips.filter(trip => trip.status === 'IN_PROGRESS');
  const delayedTrips = trips.filter(trip => trip.status === 'DELAYED');
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');

  // Get high priority alerts
  const highPriorityAlerts = alerts.filter(alert => 
    ['HIGH', 'CRITICAL'].includes(alert.severity) && !alert.acknowledged
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRefreshIntervalChange = (interval: number) => {
    setRefreshInterval(interval);
  };

  const handleTripStatusUpdate = async (tripId: string, status: string) => {
    try {
      await updateTripStatusMutation.mutateAsync({ tripId, status });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    try {
      await acknowledgeAlertMutation.mutateAsync(alertId);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleResolveAlert = async (alertId: string, resolution?: string) => {
    try {
      await resolveAlertMutation.mutateAsync({ alertId, resolution });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleSendMessage = async () => {
    if (!selectedDriverId || !messageForm.content.trim()) return;

    try {
      await sendMessageMutation.mutateAsync({
        driverId: selectedDriverId,
        message: messageForm
      });
      setMessageModalVisible(false);
      setMessageForm({
        type: 'INSTRUCTION',
        content: '',
        priority: 'NORMAL',
      });
      setSelectedDriverId('');
    } catch (error) {
      // Error handled by hook
    }
  };

  const getTripStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'blue';
      case 'IN_PROGRESS': return 'green';
      case 'DELAYED': return 'orange';
      case 'COMPLETED': return 'success';
      case 'CANCELLED': return 'red';
      default: return 'default';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return '#52c41a';
      case 'MEDIUM': return '#fa8c16';
      case 'HIGH': return '#fa541c';
      case 'CRITICAL': return '#f5222d';
      default: return '#666';
    }
  };

  const renderTripCard = (trip: TripTracking) => (
    <Card
      key={trip.id}
      size="small"
      style={{ marginBottom: '12px' }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CarOutlined />
            <span>{trip.route.routeName}</span>
            <Tag color={getTripStatusColor(trip.status)}>{trip.status}</Tag>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => onViewTrip?.(trip)}
            />
            <Button
              type="text"
              icon={<EnvironmentOutlined />}
              size="small"
              onClick={() => onViewMap?.(trip)}
            />
            <Button
              type="text"
              icon={<MessageOutlined />}
              size="small"
              onClick={() => {
                setSelectedDriverId(trip.driverId);
                setMessageModalVisible(true);
              }}
            />
          </div>
        </div>
      }
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <div style={{ fontSize: '12px', color: '#666' }}>Driver</div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>{trip.driverId}</div>
        </Col>
        <Col span={12}>
          <div style={{ fontSize: '12px', color: '#666' }}>Vehicle</div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>{trip.vehicleId}</div>
        </Col>
        <Col span={12}>
          <div style={{ fontSize: '12px', color: '#666' }}>Students</div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>
            {trip.studentsOnBoard.length} on board
          </div>
        </Col>
        <Col span={12}>
          <div style={{ fontSize: '12px', color: '#666' }}>Current Stop</div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>
            {trip.currentStopId || 'In transit'}
          </div>
        </Col>
        {trip.estimatedArrival && (
          <Col span={24}>
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ClockCircleOutlined />
              Next stop ETA: {dayjs(trip.estimatedArrival).format('h:mm A')}
            </div>
          </Col>
        )}
        {trip.alerts.length > 0 && (
          <Col span={24}>
            <Alert
              message={`${trip.alerts.length} active alert${trip.alerts.length > 1 ? 's' : ''}`}
              type="warning"
              style={{ marginTop: '8px' }}
            />
          </Col>
        )}
      </Row>

      <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {trip.status === 'SCHEDULED' && (
          <Button
            size="small"
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => handleTripStatusUpdate(trip.id, 'IN_PROGRESS')}
            loading={updateTripStatusMutation.isPending}
          >
            Start
          </Button>
        )}
        {trip.status === 'IN_PROGRESS' && (
          <>
            <Button
              size="small"
              icon={<PauseCircleOutlined />}
              onClick={() => handleTripStatusUpdate(trip.id, 'DELAYED')}
              loading={updateTripStatusMutation.isPending}
            >
              Mark Delayed
            </Button>
            <Button
              size="small"
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleTripStatusUpdate(trip.id, 'COMPLETED')}
              loading={updateTripStatusMutation.isPending}
            >
              Complete
            </Button>
          </>
        )}
        {trip.status === 'DELAYED' && (
          <Button
            size="small"
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => handleTripStatusUpdate(trip.id, 'IN_PROGRESS')}
            loading={updateTripStatusMutation.isPending}
          >
            Resume
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={3} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DashboardOutlined />
            Real-Time Trip Tracking
            {autoRefresh && (
              <Badge status="processing" text="Live" style={{ marginLeft: '8px' }} />
            )}
          </Title>
          <Text type="secondary">
            Monitor active trips, track progress, and manage alerts in real-time
          </Text>
        </Col>
        <Col>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetchTrips()}
              loading={tripsLoading}
            >
              Refresh
            </Button>
            <Button
              icon={<AlertOutlined />}
              onClick={() => setAlertsVisible(true)}
              type={highPriorityAlerts.length > 0 ? 'primary' : 'default'}
              danger={highPriorityAlerts.length > 0}
            >
              Alerts {highPriorityAlerts.length > 0 && `(${highPriorityAlerts.length})`}
            </Button>
            <Button
              icon={<SettingOutlined />}
              onClick={() => setSettingsVisible(true)}
            >
              Settings
            </Button>
          </Space>
        </Col>
      </Row>

      {/* High Priority Alerts Bar */}
      {highPriorityAlerts.length > 0 && (
        <Alert
          message={`${highPriorityAlerts.length} Critical Alert${highPriorityAlerts.length > 1 ? 's' : ''} Require Immediate Attention`}
          description={highPriorityAlerts.map(alert => alert.message).join(', ')}
          type="error"
          showIcon
          style={{ marginBottom: '24px' }}
          action={
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => setAlertsVisible(true)}
            >
              View All
            </Button>
          }
        />
      )}

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Active Trips"
              value={inProgressTrips.length}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix={`/ ${trips.length}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="On Time"
              value={(stats as any).onTimeTrips || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={`/ ${(stats as any).totalActiveTrips || 0}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Delayed"
              value={delayedTrips.length}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: delayedTrips.length > 0 ? '#fa8c16' : '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Students on Board"
              value={(stats as any).studentsOnBoard || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6} md={4}>
            <Select
              placeholder="All Status"
              value={filters.status || undefined}
              onChange={(value) => handleFilterChange('status', value)}
              allowClear
              style={{ width: '100%' }}
            >
              <Option value="SCHEDULED">Scheduled</Option>
              <Option value="IN_PROGRESS">In Progress</Option>
              <Option value="DELAYED">Delayed</Option>
              <Option value="COMPLETED">Completed</Option>
            </Select>
          </Col>
          <Col xs={24} sm={6} md={4}>
            <Input
              placeholder="Driver ID"
              value={filters.driverId}
              onChange={(e) => handleFilterChange('driverId', e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={6} md={4}>
            <Input
              placeholder="Vehicle ID"
              value={filters.vehicleId}
              onChange={(e) => handleFilterChange('vehicleId', e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={6} md={4}>
            <Input
              placeholder="Route ID"
              value={filters.routeId}
              onChange={(e) => handleFilterChange('routeId', e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={12} md={4}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>Auto Refresh</Text>
              <Switch
                checked={autoRefresh}
                onChange={setAutoRefresh}
                size="small"
              />
            </div>
          </Col>
          <Col xs={12} md={4}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Last updated: {dayjs().format('h:mm:ss A')}
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Trip Categories */}
      {tripsLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>Loading trips...</div>
        </div>
      ) : trips.length > 0 ? (
        <Tabs defaultActiveKey="all" type="card">
          <TabPane
            tab={
              <span>
                All Trips
                <Badge count={trips.length} style={{ marginLeft: '8px', backgroundColor: '#1890ff' }} />
              </span>
            }
            key="all"
          >
            <Row gutter={[16, 16]}>
              {trips.map(trip => (
                <Col xs={24} lg={12} xl={8} key={trip.id}>
                  {renderTripCard(trip)}
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span>
                In Progress
                <Badge count={inProgressTrips.length} style={{ marginLeft: '8px', backgroundColor: '#52c41a' }} />
              </span>
            }
            key="in_progress"
          >
            <Row gutter={[16, 16]}>
              {inProgressTrips.length > 0 ? (
                inProgressTrips.map(trip => (
                  <Col xs={24} lg={12} xl={8} key={trip.id}>
                    {renderTripCard(trip)}
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Empty description="No trips currently in progress" />
                </Col>
              )}
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span>
                Scheduled
                <Badge count={scheduledTrips.length} style={{ marginLeft: '8px', backgroundColor: '#1890ff' }} />
              </span>
            }
            key="scheduled"
          >
            <Row gutter={[16, 16]}>
              {scheduledTrips.length > 0 ? (
                scheduledTrips.map(trip => (
                  <Col xs={24} lg={12} xl={8} key={trip.id}>
                    {renderTripCard(trip)}
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Empty description="No scheduled trips" />
                </Col>
              )}
            </Row>
          </TabPane>

          {delayedTrips.length > 0 && (
            <TabPane
              tab={
                <span>
                  Delayed
                  <Badge count={delayedTrips.length} style={{ marginLeft: '8px', backgroundColor: '#fa8c16' }} />
                </span>
              }
              key="delayed"
            >
              <Row gutter={[16, 16]}>
                {delayedTrips.map(trip => (
                  <Col xs={24} lg={12} xl={8} key={trip.id}>
                    {renderTripCard(trip)}
                  </Col>
                ))}
              </Row>
            </TabPane>
          )}
        </Tabs>
      ) : (
        <Empty 
          description="No active trips found"
          style={{ padding: '50px' }}
        />
      )}

      {/* Alerts Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOutlined />
            Active Alerts
            <Badge count={alerts.length} />
          </div>
        }
        open={alertsVisible}
        onClose={() => setAlertsVisible(false)}
        width={600}
      >
        {alertsLoading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : alerts.length > 0 ? (
          <List
            dataSource={alerts}
            renderItem={(alert) => (
              <List.Item
                actions={[
                  !alert.acknowledged && (
                    <Button
                      size="small"
                      onClick={() => handleAcknowledgeAlert(alert.id)}
                      loading={acknowledgeAlertMutation.isPending}
                    >
                      Acknowledge
                    </Button>
                  ),
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleResolveAlert(alert.id)}
                    loading={resolveAlertMutation.isPending}
                  >
                    Resolve
                  </Button>
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  avatar={
                    <AlertOutlined
                      style={{
                        color: getAlertSeverityColor(alert.severity),
                        fontSize: '20px'
                      }}
                    />
                  }
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{alert.type}</span>
                      <Tag color={getAlertSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Tag>
                      {alert.acknowledged && (
                        <Tag color="green">ACKNOWLEDGED</Tag>
                      )}
                    </div>
                  }
                  description={
                    <div>
                      <div style={{ marginBottom: '4px' }}>{alert.message}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {dayjs(alert.timestamp).format('MMM DD, h:mm A')}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description="No active alerts" />
        )}
      </Drawer>

      {/* Settings Drawer */}
      <Drawer
        title="Dashboard Settings"
        open={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        width={400}
      >
        <div style={{ marginBottom: '24px' }}>
          <Title level={5}>Auto Refresh</Title>
          <div style={{ marginBottom: '16px' }}>
            <Switch
              checked={autoRefresh}
              onChange={setAutoRefresh}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
            <Text style={{ marginLeft: '12px' }}>
              {autoRefresh ? 'Auto refresh enabled' : 'Auto refresh disabled'}
            </Text>
          </div>
          
          {autoRefresh && (
            <div>
              <Text strong>Refresh Interval</Text>
              <Select
                value={refreshInterval}
                onChange={handleRefreshIntervalChange}
                style={{ width: '100%', marginTop: '8px' }}
              >
                <Option value={3000}>3 seconds</Option>
                <Option value={5000}>5 seconds</Option>
                <Option value={10000}>10 seconds</Option>
                <Option value={30000}>30 seconds</Option>
                <Option value={60000}>1 minute</Option>
              </Select>
            </div>
          )}
        </div>

        <Divider />

        <div>
          <Title level={5}>Notifications</Title>
          <div style={{ marginBottom: '12px' }}>
            <Switch defaultChecked size="small" />
            <Text style={{ marginLeft: '12px' }}>Critical alerts</Text>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <Switch defaultChecked size="small" />
            <Text style={{ marginLeft: '12px' }}>Trip status changes</Text>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <Switch size="small" />
            <Text style={{ marginLeft: '12px' }}>Delay notifications</Text>
          </div>
        </div>
      </Drawer>

      {/* Message to Driver Modal */}
      <Modal
        title="Send Message to Driver"
        open={messageModalVisible}
        onCancel={() => setMessageModalVisible(false)}
        onOk={handleSendMessage}
        confirmLoading={sendMessageMutation.isPending}
        okText="Send Message"
      >
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px' }}>Message Type</div>
          <Select
            value={messageForm.type}
            onChange={(value) => setMessageForm(prev => ({ ...prev, type: value }))}
            style={{ width: '100%' }}
          >
            <Option value="INSTRUCTION">Instruction</Option>
            <Option value="ALERT">Alert</Option>
            <Option value="UPDATE">Update</Option>
            <Option value="EMERGENCY">Emergency</Option>
          </Select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px' }}>Priority</div>
          <Select
            value={messageForm.priority}
            onChange={(value) => setMessageForm(prev => ({ ...prev, priority: value }))}
            style={{ width: '100%' }}
          >
            <Option value="LOW">Low</Option>
            <Option value="NORMAL">Normal</Option>
            <Option value="HIGH">High</Option>
            <Option value="URGENT">Urgent</Option>
          </Select>
        </div>

        <div>
          <div style={{ marginBottom: '8px' }}>Message Content</div>
          <Input.TextArea
            value={messageForm.content}
            onChange={(e) => setMessageForm(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            placeholder="Enter your message to the driver..."
          />
        </div>
      </Modal>
    </div>
  );
}