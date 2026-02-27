'use client';

import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Alert,
  Button,
  Progress,
  List,
  Tag,
  Space,
  Switch,
  Select,
  Input,
  Modal,
  Form,
  message,
  Tabs,
  Table,
  Typography,
  Tooltip,
  Badge
} from 'antd';
import {
  DashboardOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  SecurityScanOutlined,
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  StopOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import {
  useSystemStats,
  useSystemHealth,
  useSystemAlerts,
  useActiveSessions,
  useSystemConfig,
  useBackups,
  useDatabaseMetrics,
  usePerformanceMetrics,
  useSystemProcesses,
  useSecurityEvents,
  useSystemUpdates,
  useRestartSystem,
  useTerminateSession,
  useUpdateConfig,
  useAcknowledgeAlert,
  useResolveAlert,
  useCreateBackup,
  useClearCache,
  useOptimizeDatabase,
  useInstallUpdates
} from '@/hooks/useAdmin';
import { formatDistanceToNow, formatDistance } from 'date-fns';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface SystemAdminDashboardProps {
  adminId?: string;
}

export default function SystemAdminDashboard({ adminId }: SystemAdminDashboardProps) {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [configModal, setConfigModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [sessionModal, setSessionModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [alertFilters, setAlertFilters] = useState({});
  const [form] = Form.useForm();

  // Queries
  const { data: stats, isLoading: statsLoading } = useSystemStats(30000);
  const { data: health, isLoading: healthLoading } = useSystemHealth(10000);
  const { data: alertsData } = useSystemAlerts(alertFilters, 15000);
  const { data: sessionsData } = useActiveSessions(60000);
  const { data: configData } = useSystemConfig();
  const { data: backupsData } = useBackups();
  const { data: dbMetrics } = useDatabaseMetrics(60000);
  const { data: perfMetrics } = usePerformanceMetrics('24h');
  const { data: processesData } = useSystemProcesses(30000);
  const { data: securityData } = useSecurityEvents();
  const { data: updatesData } = useSystemUpdates();

  // Mutations
  const restartSystemMutation = useRestartSystem();
  const terminateSessionMutation = useTerminateSession();
  const updateConfigMutation = useUpdateConfig();
  const acknowledgeAlertMutation = useAcknowledgeAlert();
  const resolveAlertMutation = useResolveAlert();
  const createBackupMutation = useCreateBackup();
  const clearCacheMutation = useClearCache();
  const optimizeDatabaseMutation = useOptimizeDatabase();
  const installUpdatesMutation = useInstallUpdates();

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY': return '#52c41a';
      case 'WARNING': return '#faad14';
      case 'CRITICAL': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'blue';
      case 'MEDIUM': return 'orange';
      case 'HIGH': return 'red';
      case 'CRITICAL': return 'purple';
      default: return 'default';
    }
  };

  const handleSystemRestart = (component?: string) => {
    Modal.confirm({
      title: 'Confirm System Restart',
      content: `Are you sure you want to restart ${component || 'the system'}? This will temporarily interrupt service.`,
      okType: 'danger',
      onOk: () => restartSystemMutation.mutate(component),
    });
  };

  const handleTerminateSession = (sessionId: string) => {
    Modal.confirm({
      title: 'Confirm Session Termination',
      content: 'Are you sure you want to terminate this user session?',
      okType: 'danger',
      onOk: () => terminateSessionMutation.mutate(sessionId),
    });
  };

  const handleUpdateConfig = (values: any) => {
    updateConfigMutation.mutate(
      { key: selectedConfig.key, value: values.value },
      {
        onSuccess: () => {
          setConfigModal(false);
          setSelectedConfig(null);
          form.resetFields();
        }
      }
    );
  };

  const handleCreateBackup = (type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL') => {
    Modal.confirm({
      title: 'Create Backup',
      content: `Are you sure you want to create a ${type} backup? This may take several minutes.`,
      onOk: () => createBackupMutation.mutate(type),
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
              <DashboardOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
              System Administration Dashboard
            </Title>
            <Text type="secondary">Comprehensive system monitoring and management</Text>
          </Card>
        </Col>

        {/* System Health Overview */}
        <Col span={24}>
          <Card
            title={
              <Space>
                <CloudServerOutlined />
                System Health
                <Badge 
                  status={health?.status === 'HEALTHY' ? 'success' : health?.status === 'WARNING' ? 'warning' : 'error'} 
                  text={health?.status || 'Loading...'} 
                />
              </Space>
            }
            extra={
              <Button 
                type="primary" 
                danger
                onClick={() => handleSystemRestart()}
                loading={restartSystemMutation.isPending}
              >
                Restart System
              </Button>
            }
            loading={healthLoading}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Uptime"
                  value={health?.uptime || 0}
                  suffix="hours"
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Memory Usage"
                  value={health?.memoryUsage || 0}
                  suffix="%"
                  valueStyle={{ color: (health?.memoryUsage || 0) > 80 ? '#ff4d4f' : '#3f8600' }}
                />
                <Progress percent={health?.memoryUsage || 0} showInfo={false} status={(health?.memoryUsage || 0) > 80 ? 'exception' : 'success'} />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="CPU Usage"
                  value={health?.cpuUsage || 0}
                  suffix="%"
                  valueStyle={{ color: (health?.cpuUsage || 0) > 80 ? '#ff4d4f' : '#3f8600' }}
                />
                <Progress percent={health?.cpuUsage || 0} showInfo={false} status={(health?.cpuUsage || 0) > 80 ? 'exception' : 'success'} />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic
                  title="Disk Usage"
                  value={health?.diskUsage || 0}
                  suffix="%"
                  valueStyle={{ color: (health?.diskUsage || 0) > 90 ? '#ff4d4f' : '#3f8600' }}
                />
                <Progress percent={health?.diskUsage || 0} showInfo={false} status={(health?.diskUsage || 0) > 90 ? 'exception' : 'success'} />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* System Statistics */}
        <Col span={24}>
          <Card title={<><DashboardOutlined /> System Statistics</>} loading={statsLoading}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8} md={6}>
                <Statistic title="Total Users" value={stats?.totalUsers || 0} prefix={<UserOutlined />} />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic title="Active Users" value={stats?.activeUsers || 0} valueStyle={{ color: '#3f8600' }} />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic title="Total Students" value={stats?.totalStudents || 0} />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic title="Active Vehicles" value={stats?.activeVehicles || 0} />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic title="Active Routes" value={stats?.activeRoutes || 0} />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic title="Active Trips" value={stats?.activeTrips || 0} valueStyle={{ color: '#1890ff' }} />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Detailed Management Tabs */}
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="alerts">
              <TabPane tab={<><WarningOutlined />Alerts</>} key="alerts">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space>
                    <Select
                      placeholder="Filter by type"
                      allowClear
                      style={{ width: 150 }}
                      onChange={(value) => setAlertFilters({ ...alertFilters, type: value })}
                    >
                      <Select.Option value="SYSTEM_ERROR">System Error</Select.Option>
                      <Select.Option value="SECURITY">Security</Select.Option>
                      <Select.Option value="PERFORMANCE">Performance</Select.Option>
                      <Select.Option value="MAINTENANCE">Maintenance</Select.Option>
                    </Select>
                    <Select
                      placeholder="Filter by severity"
                      allowClear
                      style={{ width: 150 }}
                      onChange={(value) => setAlertFilters({ ...alertFilters, severity: value })}
                    >
                      <Select.Option value="LOW">Low</Select.Option>
                      <Select.Option value="MEDIUM">Medium</Select.Option>
                      <Select.Option value="HIGH">High</Select.Option>
                      <Select.Option value="CRITICAL">Critical</Select.Option>
                    </Select>
                  </Space>
                  
                  <List
                    dataSource={alertsData?.data?.items || []}
                    renderItem={(alert: any) => (
                      <List.Item
                        actions={[
                          !alert.acknowledged && (
                            <Button onClick={() => acknowledgeAlertMutation.mutate(alert.id)}>
                              Acknowledge
                            </Button>
                          ),
                          !alert.resolved && (
                            <Button type="primary" onClick={() => resolveAlertMutation.mutate({ alertId: alert.id })}>
                              Resolve
                            </Button>
                          ),
                        ].filter(Boolean)}
                      >
                        <List.Item.Meta
                          avatar={
                            <Tag color={getAlertSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Tag>
                          }
                          title={alert.title}
                          description={
                            <div>
                              <Text>{alert.message}</Text>
                              <br />
                              <Text type="secondary">
                                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                              </Text>
                              {alert.acknowledged && (
                                <Tag color="blue" style={{ marginLeft: '8px' }}>Acknowledged</Tag>
                              )}
                              {alert.resolved && (
                                <Tag color="green" style={{ marginLeft: '8px' }}>Resolved</Tag>
                              )}
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Space>
              </TabPane>

              <TabPane tab={<><UserOutlined />Active Sessions</>} key="sessions">
                <List
                  dataSource={sessionsData?.data?.items || []}
                  renderItem={(session: any) => (
                    <List.Item
                      actions={[
                        <Button 
                          danger 
                          onClick={() => handleTerminateSession(session.id)}
                          loading={terminateSessionMutation.isPending}
                        >
                          Terminate
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<UserOutlined />}
                        title={`${session.userName} (${session.userRole})`}
                        description={
                          <div>
                            <Text>IP: {session.ip}</Text><br />
                            <Text>Login: {formatDistanceToNow(new Date(session.loginTime), { addSuffix: true })}</Text><br />
                            <Text>Last Activity: {formatDistanceToNow(new Date(session.lastActivity), { addSuffix: true })}</Text>
                            <Badge 
                              status={session.isActive ? 'success' : 'default'} 
                              text={session.isActive ? 'Active' : 'Inactive'} 
                              style={{ marginLeft: '8px' }}
                            />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>

              <TabPane tab={<><DatabaseOutlined />Database</>} key="database">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Card title="Database Metrics">
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Statistic title="Total Size" value={`${((dbMetrics?.totalSize || 0) / 1024 / 1024).toFixed(2)} MB`} />
                        </Col>
                        <Col span={12}>
                          <Statistic title="Tables" value={dbMetrics?.tableCount || 0} />
                        </Col>
                        <Col span={12}>
                          <Statistic title="Connections" value={dbMetrics?.connectionCount || 0} />
                        </Col>
                        <Col span={12}>
                          <Statistic title="Avg Query Time" value={`${dbMetrics?.averageQueryTime || 0}ms`} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card
                      title="Database Actions"
                      extra={
                        <Space>
                          <Button 
                            type="primary" 
                            onClick={() => optimizeDatabaseMutation.mutate()}
                            loading={optimizeDatabaseMutation.isPending}
                          >
                            Optimize
                          </Button>
                          <Button onClick={() => clearCacheMutation.mutate('DATABASE')}>
                            Clear Cache
                          </Button>
                        </Space>
                      }
                    >
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Alert
                          message="Database Optimization"
                          description="Optimize database performance by rebuilding indexes and updating statistics."
                          type="info"
                        />
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab={<><DownloadOutlined />Backups</>} key="backups">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space>
                    <Button type="primary" onClick={() => handleCreateBackup('FULL')}>
                      <DownloadOutlined /> Full Backup
                    </Button>
                    <Button onClick={() => handleCreateBackup('INCREMENTAL')}>
                      Incremental Backup
                    </Button>
                    <Button onClick={() => handleCreateBackup('DIFFERENTIAL')}>
                      Differential Backup
                    </Button>
                  </Space>
                  
                  <List
                    dataSource={backupsData?.data?.items || []}
                    renderItem={(backup: any) => (
                      <List.Item
                        actions={[
                          <Tag color={backup.status === 'COMPLETED' ? 'green' : backup.status === 'FAILED' ? 'red' : 'blue'}>
                            {backup.status}
                          </Tag>
                        ]}
                      >
                        <List.Item.Meta
                          title={`${backup.type} Backup`}
                          description={
                            <div>
                              <Text>Started: {formatDistanceToNow(new Date(backup.startTime), { addSuffix: true })}</Text><br />
                              {backup.endTime && <Text>Duration: {formatDistance(new Date(backup.startTime), new Date(backup.endTime))}</Text>}<br />
                              {backup.size && <Text>Size: {(backup.size / 1024 / 1024).toFixed(2)} MB</Text>}
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Space>
              </TabPane>

              <TabPane tab={<><UploadOutlined />Updates</>} key="updates">
                <Card
                  title="System Updates"
                  extra={
                    updatesData?.available && (
                      <Button 
                        type="primary" 
                        onClick={() => installUpdatesMutation.mutate()}
                        loading={installUpdatesMutation.isPending}
                      >
                        Install Updates
                      </Button>
                    )
                  }
                >
                  {updatesData?.available ? (
                    <Alert
                      message={`Update Available: v${updatesData.latestVersion}`}
                      description={`Current version: v${updatesData.currentVersion}. ${updatesData.updates?.length} update(s) available.`}
                      type="warning"
                      showIcon
                    />
                  ) : (
                    <Alert
                      message="System Up to Date"
                      description={`Current version: v${updatesData?.currentVersion}. No updates available.`}
                      type="success"
                      showIcon
                    />
                  )}
                </Card>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* Configuration Modal */}
      <Modal
        title="Update Configuration"
        open={configModal}
        onOk={form.submit}
        onCancel={() => {
          setConfigModal(false);
          setSelectedConfig(null);
          form.resetFields();
        }}
        confirmLoading={updateConfigMutation.isPending}
      >
        <Form
          form={form}
          onFinish={handleUpdateConfig}
          layout="vertical"
        >
          <Form.Item label="Key">
            <Input value={selectedConfig?.key} disabled />
          </Form.Item>
          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: 'Please enter a value' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Description">
            <Text type="secondary">{selectedConfig?.description}</Text>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}