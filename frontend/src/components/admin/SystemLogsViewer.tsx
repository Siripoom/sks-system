'use client';

import React, { useState } from 'react';
import {
  Card,
  Table,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
  Tag,
  Typography,
  Row,
  Col,
  Statistic,
  Alert,
  Modal,
  Tooltip,
  Badge
} from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  StopOutlined
} from '@ant-design/icons';
import { useSystemLogs, useAuditLogs, useExportLogs } from '@/hooks/useAdmin';
import { formatDistanceToNow } from 'date-fns';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Text } = Typography;

export default function SystemLogsViewer() {
  const [activeTab, setActiveTab] = useState<'system' | 'audit'>('system');
  const [systemFilters, setSystemFilters] = useState({});
  const [auditFilters, setAuditFilters] = useState({});
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [logModal, setLogModal] = useState(false);

  // Queries
  const { 
    data: systemLogsData, 
    isLoading: systemLogsLoading,
    refetch: refetchSystemLogs 
  } = useSystemLogs(systemFilters);
  
  const { 
    data: auditLogsData, 
    isLoading: auditLogsLoading,
    refetch: refetchAuditLogs 
  } = useAuditLogs(auditFilters);

  // Mutations
  const exportLogsMutation = useExportLogs();

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'INFO': return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
      case 'WARN': return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'ERROR': return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'CRITICAL': return <StopOutlined style={{ color: '#722ed1' }} />;
      default: return <FileTextOutlined />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'blue';
      case 'WARN': return 'orange';
      case 'ERROR': return 'red';
      case 'CRITICAL': return 'purple';
      default: return 'default';
    }
  };

  const handleExportLogs = () => {
    const filters = activeTab === 'system' ? systemFilters : auditFilters;
    exportLogsMutation.mutate({ type: activeTab, filters });
  };

  const systemColumns = [
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: string) => (
        <Space>
          {getLevelIcon(level)}
          <Tag color={getLevelColor(level)}>{level}</Tag>
        </Space>
      ),
      filters: [
        { text: 'INFO', value: 'INFO' },
        { text: 'WARN', value: 'WARN' },
        { text: 'ERROR', value: 'ERROR' },
        { text: 'CRITICAL', value: 'CRITICAL' },
      ],
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
      width: 120,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text: string, record: any) => (
        <Tooltip title="Click to view details">
          <Text 
            ellipsis 
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedLog(record);
              setLogModal(true);
            }}
          >
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
      render: (userId: string) => userId ? <Tag>{userId}</Tag> : '-',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      width: 130,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 160,
      render: (timestamp: string) => (
        <Tooltip title={dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </Tooltip>
      ),
      sorter: true,
    },
  ];

  const auditColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (action: string) => <Tag color="blue">{action}</Tag>,
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
      width: 120,
      render: (resource: string, record: any) => (
        <Space direction="vertical">
          <Text strong>{resource}</Text>
          <Text type="secondary">{record.resourceId}</Text>
        </Space>
      ),
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      render: (userName: string, record: any) => (
        <Space direction="vertical">
          <Text>{userName}</Text>
          <Text type="secondary">{record.userId}</Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'success',
      key: 'success',
      width: 100,
      render: (success: boolean) => (
        <Badge 
          status={success ? 'success' : 'error'} 
          text={success ? 'Success' : 'Failed'} 
        />
      ),
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      width: 130,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 160,
      render: (timestamp: string) => (
        <Tooltip title={dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </Tooltip>
      ),
      sorter: true,
    },
    {
      title: 'Details',
      key: 'details',
      width: 80,
      render: (_: any, record: any) => (
        <Button 
          type="link" 
          onClick={() => {
            setSelectedLog(record);
            setLogModal(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const handleSystemFiltersChange = (key: string, value: any) => {
    setSystemFilters({ ...systemFilters, [key]: value });
  };

  const handleAuditFiltersChange = (key: string, value: any) => {
    setAuditFilters({ ...auditFilters, [key]: value });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Statistics */}
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total System Logs"
                  value={systemLogsData?.data?.pagination?.total || 0}
                  prefix={<FileTextOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Audit Logs"
                  value={auditLogsData?.data?.pagination?.total || 0}
                  prefix={<FileTextOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Error Rate (24h)"
                  value="2.4%"
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<ExclamationCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* System Logs */}
        <Col span={24}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                System Logs
              </Space>
            }
            extra={
              <Space>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => refetchSystemLogs()}
                  loading={systemLogsLoading}
                >
                  Refresh
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleExportLogs}
                  loading={exportLogsMutation.isPending}
                >
                  Export
                </Button>
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: '100%', marginBottom: '16px' }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8} md={6}>
                  <Input
                    placeholder="Search messages..."
                    prefix={<SearchOutlined />}
                    allowClear
                    onChange={(e) => handleSystemFiltersChange('search', e.target.value)}
                  />
                </Col>
                <Col xs={24} sm={8} md={4}>
                  <Select
                    placeholder="Level"
                    allowClear
                    style={{ width: '100%' }}
                    onChange={(value) => handleSystemFiltersChange('level', value)}
                  >
                    <Select.Option value="INFO">INFO</Select.Option>
                    <Select.Option value="WARN">WARN</Select.Option>
                    <Select.Option value="ERROR">ERROR</Select.Option>
                    <Select.Option value="CRITICAL">CRITICAL</Select.Option>
                  </Select>
                </Col>
                <Col xs={24} sm={8} md={4}>
                  <Select
                    placeholder="Module"
                    allowClear
                    style={{ width: '100%' }}
                    onChange={(value) => handleSystemFiltersChange('module', value)}
                  >
                    <Select.Option value="AUTH">Auth</Select.Option>
                    <Select.Option value="API">API</Select.Option>
                    <Select.Option value="DATABASE">Database</Select.Option>
                    <Select.Option value="TRACKING">Tracking</Select.Option>
                    <Select.Option value="NOTIFICATIONS">Notifications</Select.Option>
                  </Select>
                </Col>
                <Col xs={24} md={10}>
                  <RangePicker
                    style={{ width: '100%' }}
                    onChange={(dates) => {
                      if (dates) {
                        handleSystemFiltersChange('startDate', dates[0]?.format('YYYY-MM-DD'));
                        handleSystemFiltersChange('endDate', dates[1]?.format('YYYY-MM-DD'));
                      } else {
                        handleSystemFiltersChange('startDate', undefined);
                        handleSystemFiltersChange('endDate', undefined);
                      }
                    }}
                  />
                </Col>
              </Row>
            </Space>

            <Table
              columns={systemColumns}
              dataSource={systemLogsData?.data?.items || []}
              loading={systemLogsLoading}
              pagination={{
                current: systemLogsData?.data?.pagination?.page,
                pageSize: systemLogsData?.data?.pagination?.limit,
                total: systemLogsData?.data?.pagination?.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: 1000 }}
              rowKey="id"
            />
          </Card>
        </Col>

        {/* Audit Logs */}
        <Col span={24}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                Audit Logs
              </Space>
            }
            extra={
              <Space>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => refetchAuditLogs()}
                  loading={auditLogsLoading}
                >
                  Refresh
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    setActiveTab('audit');
                    handleExportLogs();
                  }}
                  loading={exportLogsMutation.isPending}
                >
                  Export
                </Button>
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: '100%', marginBottom: '16px' }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={6}>
                  <Select
                    placeholder="Action"
                    allowClear
                    style={{ width: '100%' }}
                    onChange={(value) => handleAuditFiltersChange('action', value)}
                  >
                    <Select.Option value="CREATE">CREATE</Select.Option>
                    <Select.Option value="UPDATE">UPDATE</Select.Option>
                    <Select.Option value="DELETE">DELETE</Select.Option>
                    <Select.Option value="LOGIN">LOGIN</Select.Option>
                    <Select.Option value="LOGOUT">LOGOUT</Select.Option>
                  </Select>
                </Col>
                <Col xs={24} sm={6}>
                  <Select
                    placeholder="Resource"
                    allowClear
                    style={{ width: '100%' }}
                    onChange={(value) => handleAuditFiltersChange('resource', value)}
                  >
                    <Select.Option value="USER">User</Select.Option>
                    <Select.Option value="STUDENT">Student</Select.Option>
                    <Select.Option value="DRIVER">Driver</Select.Option>
                    <Select.Option value="VEHICLE">Vehicle</Select.Option>
                    <Select.Option value="ROUTE">Route</Select.Option>
                    <Select.Option value="TRIP">Trip</Select.Option>
                  </Select>
                </Col>
                <Col xs={24} sm={12}>
                  <RangePicker
                    style={{ width: '100%' }}
                    onChange={(dates) => {
                      if (dates) {
                        handleAuditFiltersChange('startDate', dates[0]?.format('YYYY-MM-DD'));
                        handleAuditFiltersChange('endDate', dates[1]?.format('YYYY-MM-DD'));
                      } else {
                        handleAuditFiltersChange('startDate', undefined);
                        handleAuditFiltersChange('endDate', undefined);
                      }
                    }}
                  />
                </Col>
              </Row>
            </Space>

            <Table
              columns={auditColumns}
              dataSource={auditLogsData?.data?.items || []}
              loading={auditLogsLoading}
              pagination={{
                current: auditLogsData?.data?.pagination?.page,
                pageSize: auditLogsData?.data?.pagination?.limit,
                total: auditLogsData?.data?.pagination?.total,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
              scroll={{ x: 1000 }}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* Log Details Modal */}
      <Modal
        title={activeTab === 'system' ? 'System Log Details' : 'Audit Log Details'}
        open={logModal}
        onCancel={() => {
          setLogModal(false);
          setSelectedLog(null);
        }}
        footer={null}
        width={700}
      >
        {selectedLog && (
          <div>
            {activeTab === 'system' ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Level:</Text></Col>
                  <Col span={16}>
                    <Space>
                      {getLevelIcon(selectedLog.level)}
                      <Tag color={getLevelColor(selectedLog.level)}>{selectedLog.level}</Tag>
                    </Space>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Module:</Text></Col>
                  <Col span={16}><Text>{selectedLog.module}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Message:</Text></Col>
                  <Col span={16}><Text>{selectedLog.message}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>User ID:</Text></Col>
                  <Col span={16}><Text>{selectedLog.userId || 'N/A'}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>IP Address:</Text></Col>
                  <Col span={16}><Text>{selectedLog.ip || 'N/A'}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>User Agent:</Text></Col>
                  <Col span={16}><Text ellipsis>{selectedLog.userAgent || 'N/A'}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Timestamp:</Text></Col>
                  <Col span={16}><Text>{dayjs(selectedLog.timestamp).format('YYYY-MM-DD HH:mm:ss')}</Text></Col>
                </Row>
                {selectedLog.metadata && (
                  <Row gutter={[16, 16]}>
                    <Col span={8}><Text strong>Metadata:</Text></Col>
                    <Col span={16}>
                      <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                        {JSON.stringify(selectedLog.metadata, null, 2)}
                      </pre>
                    </Col>
                  </Row>
                )}
              </Space>
            ) : (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Action:</Text></Col>
                  <Col span={16}><Tag color="blue">{selectedLog.action}</Tag></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Resource:</Text></Col>
                  <Col span={16}><Text>{selectedLog.resource}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Resource ID:</Text></Col>
                  <Col span={16}><Text>{selectedLog.resourceId}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>User:</Text></Col>
                  <Col span={16}><Text>{selectedLog.userName} ({selectedLog.userId})</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Status:</Text></Col>
                  <Col span={16}>
                    <Badge 
                      status={selectedLog.success ? 'success' : 'error'} 
                      text={selectedLog.success ? 'Success' : 'Failed'} 
                    />
                  </Col>
                </Row>
                {!selectedLog.success && selectedLog.errorMessage && (
                  <Row gutter={[16, 16]}>
                    <Col span={8}><Text strong>Error:</Text></Col>
                    <Col span={16}><Text type="danger">{selectedLog.errorMessage}</Text></Col>
                  </Row>
                )}
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>IP Address:</Text></Col>
                  <Col span={16}><Text>{selectedLog.ip}</Text></Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={8}><Text strong>Timestamp:</Text></Col>
                  <Col span={16}><Text>{dayjs(selectedLog.timestamp).format('YYYY-MM-DD HH:mm:ss')}</Text></Col>
                </Row>
                {selectedLog.changes && selectedLog.changes.length > 0 && (
                  <Row gutter={[16, 16]}>
                    <Col span={8}><Text strong>Changes:</Text></Col>
                    <Col span={16}>
                      <Table
                        size="small"
                        columns={[
                          { title: 'Field', dataIndex: 'field', key: 'field' },
                          { title: 'Old Value', dataIndex: 'oldValue', key: 'oldValue' },
                          { title: 'New Value', dataIndex: 'newValue', key: 'newValue' },
                        ]}
                        dataSource={selectedLog.changes}
                        pagination={false}
                      />
                    </Col>
                  </Row>
                )}
              </Space>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}