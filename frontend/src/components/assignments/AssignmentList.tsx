'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Row, 
  Col, 
  Tooltip,
  Modal,
  message,
  Typography,
  Statistic,
  Progress,
  Alert,
  Divider,
  DatePicker,
  Popconfirm,
  Drawer,
  Badge,
  Avatar
} from 'antd';
import type { TableColumnsType, MenuProps } from 'antd';
import { 
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SwapOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ExportOutlined,
  ImportOutlined,
  ReloadOutlined,
  UserOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RobotOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { 
  useAssignments, 
  useDeleteAssignment,
  useUpdateAssignmentStatus,
  useActivateAssignment,
  useDeactivateAssignment,
  useDeleteBulkAssignments,
  useUpdateBulkAssignments,
  useAutoAssignStudents,
  useAssignmentStats,
  useAssignmentConflicts,
  useExportAssignments,
  useImportAssignments
} from '@/hooks/useAssignments';
import { useStudents } from '@/hooks/useStudents';
import { useRoutes } from '@/hooks/useRoutes';
import { useSchools } from '@/hooks/useSchools';
import type { Assignment, AssignmentStatus } from '@/types/api';
import { formatDate } from '@/utils/format';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface AssignmentListProps {
  onEdit: (assignment: Assignment) => void;
  onView: (assignment: Assignment) => void;
  onCreate: () => void;
  onTransfer: (assignment: Assignment) => void;
}

export default function AssignmentList({ onEdit, onView, onCreate, onTransfer }: AssignmentListProps) {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    studentId: '',
    routeId: '',
    stopId: '',
    status: undefined as AssignmentStatus | undefined,
    schoolId: '',
    assignmentDate: '',
  });
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [statsVisible, setStatsVisible] = useState(true);
  const [conflictsVisible, setConflictsVisible] = useState(false);
  const [autoAssignModal, setAutoAssignModal] = useState(false);
  const [autoAssignCriteria, setAutoAssignCriteria] = useState({
    schoolId: '',
    grade: '',
    strategy: 'nearest_route' as 'nearest_route' | 'balanced_load' | 'shortest_distance',
    maxStudentsPerRoute: 50,
  });
  const [importModalVisible, setImportModalVisible] = useState(false);

  // Queries
  const { data: assignmentsData, isLoading, refetch } = useAssignments(filters);
  const { data: statsData } = useAssignmentStats({ schoolId: filters.schoolId });
  const { data: conflictsData } = useAssignmentConflicts();
  const { data: studentsData } = useStudents({ limit: 100 });
  const { data: routesData } = useRoutes({ limit: 100 });
  const { data: schoolsData } = useSchools({ limit: 100 });

  // Mutations
  const deleteMutation = useDeleteAssignment();
  const updateStatusMutation = useUpdateAssignmentStatus();
  const activateMutation = useActivateAssignment();
  const deactivateMutation = useDeactivateAssignment();
  const bulkDeleteMutation = useDeleteBulkAssignments();
  const bulkUpdateMutation = useUpdateBulkAssignments();
  const autoAssignMutation = useAutoAssignStudents();
  const exportMutation = useExportAssignments();
  const importMutation = useImportAssignments();

  const assignments = assignmentsData?.data?.items || [];
  const pagination = assignmentsData?.data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 };
  const stats = statsData || {};
  const conflicts = conflictsData?.data?.items || [];
  const students = studentsData?.data?.items || [];
  const routes = routesData?.data?.items || [];
  const schools = schoolsData?.data?.items || [];

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value, page: 1 }));
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleTableChange = (page: number, pageSize: number) => {
    setFilters(prev => ({ ...prev, page, limit: pageSize }));
  };

  const handleDelete = async (id: string, studentName: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      setSelectedRowKeys(prev => prev.filter(key => key !== id));
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleStatusUpdate = async (id: string, status: AssignmentStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRowKeys.length === 0) return;

    Modal.confirm({
      title: 'Delete Assignments',
      content: `Are you sure you want to delete ${selectedRowKeys.length} assignment(s)?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await bulkDeleteMutation.mutateAsync(selectedRowKeys);
          setSelectedRowKeys([]);
        } catch (error) {
          // Error handled by hook
        }
      },
    });
  };

  const handleBulkStatusUpdate = (status: AssignmentStatus) => {
    if (selectedRowKeys.length === 0) return;

    Modal.confirm({
      title: 'Update Assignment Status',
      content: `Are you sure you want to change the status of ${selectedRowKeys.length} assignment(s) to ${status}?`,
      onOk: async () => {
        try {
          await bulkUpdateMutation.mutateAsync({
            assignmentIds: selectedRowKeys,
            updates: { status }
          });
          setSelectedRowKeys([]);
        } catch (error) {
          // Error handled by hook
        }
      },
    });
  };

  const handleAutoAssign = async () => {
    if (!autoAssignCriteria.schoolId) {
      message.error('Please select a school');
      return;
    }

    try {
      const result = await autoAssignMutation.mutateAsync(autoAssignCriteria);
      setAutoAssignModal(false);
      
      if (result.conflicts && result.conflicts.length > 0) {
        Modal.warning({
          title: 'Auto-assignment Completed with Conflicts',
          content: (
            <div>
              <p>Assigned: {result.assignedCount} students</p>
              <p>Unassigned: {result.unassignedCount} students</p>
              <p style={{ color: '#fa8c16' }}>Conflicts detected: {result.conflicts.length}</p>
            </div>
          ),
        });
      }
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleExport = async () => {
    try {
      await exportMutation.mutateAsync(filters);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleImport = (file: File) => {
    importMutation.mutate(file, {
      onSuccess: () => {
        setImportModalVisible(false);
      }
    });
  };

  const getStatusColor = (status: AssignmentStatus) => {
    switch (status) {
      case 'ACTIVE': return 'green';
      case 'INACTIVE': return 'red';
      case 'PENDING': return 'orange';
      case 'COMPLETED': return 'blue';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: AssignmentStatus) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircleOutlined />;
      case 'INACTIVE': return <ExclamationCircleOutlined />;
      case 'PENDING': return <ClockCircleOutlined />;
      case 'COMPLETED': return <CheckCircleOutlined />;
      default: return null;
    }
  };

  const columns: TableColumnsType<Assignment> = [
    {
      title: 'Student',
      key: 'student',
      width: 200,
      render: (record: Assignment) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.student?.firstName} {record.student?.lastName}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Grade {record.student?.grade}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Route',
      key: 'route',
      width: 180,
      render: (record: Assignment) => (
        <div>
          <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <EnvironmentOutlined style={{ color: '#1890ff' }} />
            {record.route?.routeName}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.route?.description}</div>
        </div>
      ),
    },
    {
      title: 'Stop',
      dataIndex: ['stop', 'name'],
      width: 120,
      render: (stopName: string, record: Assignment) => (
        <div>
          <div style={{ fontWeight: 500 }}>{stopName}</div>
          {record.stop?.estimatedArrival && (
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ClockCircleOutlined />
              {record.stop.estimatedArrival}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      render: (status: AssignmentStatus) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Assignment Date',
      dataIndex: 'assignmentDate',
      width: 120,
      render: (date: string) => (
        <div style={{ fontSize: '12px' }}>
          <CalendarOutlined style={{ marginRight: '4px' }} />
          {dayjs(date).format('MMM DD, YYYY')}
        </div>
      ),
    },
    {
      title: 'School',
      key: 'school',
      width: 120,
      render: (record: Assignment) => (
        <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <HomeOutlined />
          {record.student?.school?.name}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (record: Assignment) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<UserOutlined />}
              onClick={() => onView(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Edit Assignment">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Transfer Student">
            <Button
              type="text"
              icon={<SwapOutlined />}
              onClick={() => onTransfer(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title={record.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}>
            <Button
              type="text"
              icon={record.status === 'ACTIVE' ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
              onClick={() => record.status === 'ACTIVE' ? 
                deactivateMutation.mutate(record.id) : 
                activateMutation.mutate(record.id)
              }
              loading={activateMutation.isPending || deactivateMutation.isPending}
              size="small"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Assignment"
            description="Are you sure you want to delete this assignment?"
            onConfirm={() => handleDelete(record.id, `${record.student?.firstName} ${record.student?.lastName}`)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              size="small"
              loading={deleteMutation.isPending}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const bulkActions: MenuProps['items'] = [
    {
      key: 'activate',
      label: 'Activate Selected',
      icon: <CheckCircleOutlined />,
      onClick: () => handleBulkStatusUpdate('ACTIVE'),
    },
    {
      key: 'deactivate',
      label: 'Deactivate Selected',
      icon: <ExclamationCircleOutlined />,
      onClick: () => handleBulkStatusUpdate('INACTIVE'),
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Delete Selected',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: handleBulkDelete,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Stats Cards */}
      {statsVisible && stats && Object.keys(stats).length > 0 && (
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Total Assignments"
                value={(stats as any).totalAssignments || 0}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Active Assignments"
                value={(stats as any).activeAssignments || 0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Students Assigned"
                value={(stats as any).studentsAssigned || 0}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="Students Unassigned"
                value={(stats as any).studentsUnassigned || 0}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: (stats as any).studentsUnassigned > 0 ? '#f5222d' : '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <Alert
          message={`${conflicts.length} Assignment Conflicts Detected`}
          description="Some assignments may have scheduling conflicts or capacity issues."
          type="warning"
          showIcon
          action={
            <Button size="small" onClick={() => setConflictsVisible(true)}>
              View Conflicts
            </Button>
          }
          style={{ marginBottom: '16px' }}
          closable
        />
      )}

      {/* Main Content */}
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4} style={{ margin: 0 }}>
                Assignment Management
                <Badge count={assignments.length} style={{ marginLeft: '8px' }} />
              </Title>
            </Col>
            <Col>
              <Space>
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={() => refetch()}
                  loading={isLoading}
                >
                  Refresh
                </Button>
                <Button 
                  icon={<RobotOutlined />}
                  onClick={() => setAutoAssignModal(true)}
                  type="dashed"
                >
                  Auto Assign
                </Button>
                <Button 
                  icon={<ImportOutlined />}
                  onClick={() => setImportModalVisible(true)}
                >
                  Import
                </Button>
                <Button 
                  icon={<ExportOutlined />}
                  onClick={handleExport}
                  loading={exportMutation.isPending}
                >
                  Export
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={onCreate}
                >
                  New Assignment
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '16px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8} md={6}>
              <Input
                placeholder="Search students, routes..."
                prefix={<SearchOutlined />}
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={8} md={4}>
              <Select
                placeholder="School"
                value={filters.schoolId || undefined}
                onChange={(value) => handleFilterChange('schoolId', value)}
                allowClear
                style={{ width: '100%' }}
              >
                {schools.map(school => (
                  <Option key={school.id} value={school.id}>
                    {school.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={8} md={4}>
              <Select
                placeholder="Route"
                value={filters.routeId || undefined}
                onChange={(value) => handleFilterChange('routeId', value)}
                allowClear
                style={{ width: '100%' }}
              >
                {routes.map(route => (
                  <Option key={route.id} value={route.id}>
                    {route.routeName}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={8} md={4}>
              <Select
                placeholder="Status"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                allowClear
                style={{ width: '100%' }}
              >
                <Option value="ACTIVE">Active</Option>
                <Option value="INACTIVE">Inactive</Option>
                <Option value="PENDING">Pending</Option>
                <Option value="COMPLETED">Completed</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <DatePicker
                placeholder="Assignment Date"
                value={filters.assignmentDate ? dayjs(filters.assignmentDate) : null}
                onChange={(date) => handleFilterChange('assignmentDate', date?.format('YYYY-MM-DD') || '')}
                style={{ width: '100%' }}
                allowClear
              />
            </Col>
          </Row>
        </div>

        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <Alert
              message={`${selectedRowKeys.length} assignment(s) selected`}
              type="info"
              action={
                <Space>
                  <Button size="small" onClick={() => setSelectedRowKeys([])}>
                    Clear Selection
                  </Button>
                  <Button 
                    size="small" 
                    type="primary" 
                    danger
                    onClick={handleBulkDelete}
                    loading={bulkDeleteMutation.isPending}
                  >
                    Delete Selected
                  </Button>
                </Space>
              }
            />
          </div>
        )}

        {/* Table */}
        <Table
          columns={columns}
          dataSource={assignments}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} assignments`,
            onChange: handleTableChange,
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys as string[]),
            preserveSelectedRowKeys: true,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Auto Assignment Modal */}
      <Modal
        title="Auto Assign Students"
        open={autoAssignModal}
        onCancel={() => setAutoAssignModal(false)}
        onOk={handleAutoAssign}
        okText="Start Auto Assignment"
        confirmLoading={autoAssignMutation.isPending}
        width={600}
      >
        <div style={{ marginBottom: '16px' }}>
          <Text type="secondary">
            Automatically assign unassigned students to routes based on your selected criteria.
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div style={{ marginBottom: '8px' }}>School *</div>
            <Select
              placeholder="Select school"
              value={autoAssignCriteria.schoolId}
              onChange={(value) => setAutoAssignCriteria(prev => ({ ...prev, schoolId: value }))}
              style={{ width: '100%' }}
            >
              {schools.map(school => (
                <Option key={school.id} value={school.id}>
                  {school.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: '8px' }}>Grade (Optional)</div>
            <Select
              placeholder="All grades"
              value={autoAssignCriteria.grade}
              onChange={(value) => setAutoAssignCriteria(prev => ({ ...prev, grade: value }))}
              style={{ width: '100%' }}
              allowClear
            >
              {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(grade => (
                <Option key={grade} value={grade}>
                  Grade {grade}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: '8px' }}>Assignment Strategy</div>
            <Select
              value={autoAssignCriteria.strategy}
              onChange={(value) => setAutoAssignCriteria(prev => ({ ...prev, strategy: value }))}
              style={{ width: '100%' }}
            >
              <Option value="nearest_route">Nearest Route</Option>
              <Option value="balanced_load">Balanced Load</Option>
              <Option value="shortest_distance">Shortest Distance</Option>
            </Select>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: '8px' }}>Max Students per Route</div>
            <Select
              value={autoAssignCriteria.maxStudentsPerRoute}
              onChange={(value) => setAutoAssignCriteria(prev => ({ ...prev, maxStudentsPerRoute: value }))}
              style={{ width: '100%' }}
            >
              <Option value={30}>30 Students</Option>
              <Option value={40}>40 Students</Option>
              <Option value={50}>50 Students</Option>
              <Option value={60}>60 Students</Option>
            </Select>
          </Col>
        </Row>
      </Modal>

      {/* Import Modal */}
      <Modal
        title="Import Assignments"
        open={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        footer={null}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <DownloadOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <div style={{ marginBottom: '16px' }}>
            <Text strong>Upload CSV File</Text>
          </div>
          <Text type="secondary">
            Select a CSV file containing assignment data to import.
          </Text>
          <div style={{ marginTop: '20px' }}>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImport(file);
                }
              }}
            />
          </div>
        </div>
      </Modal>

      {/* Conflicts Drawer */}
      <Drawer
        title="Assignment Conflicts"
        open={conflictsVisible}
        onClose={() => setConflictsVisible(false)}
        width={600}
      >
        {conflicts.map((conflict, index) => (
          <Card key={index} style={{ marginBottom: '16px' }} size="small">
            <div style={{ marginBottom: '8px' }}>
              <Text strong>{conflict.type}</Text>
              <Tag color="red" style={{ marginLeft: '8px' }}>High Priority</Tag>
            </div>
            <div>{conflict.description}</div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              Student: {conflict.studentName} • Route: {conflict.routeName}
            </div>
          </Card>
        ))}
      </Drawer>
    </div>
  );
}