'use client';

import { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Popconfirm, 
  message, 
  Card,
  Input,
  Row,
  Col,
  Tag,
  Typography,
  Tooltip,
  Select,
  Dropdown,
  Badge,
  Upload,
  Progress,
  Switch
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  EnvironmentOutlined,
  BankOutlined,
  CarOutlined,
  MoreOutlined,
  GroupOutlined,
  UploadOutlined,
  DownloadOutlined,
  CopyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  AimOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { 
  useRoutes, 
  useDeleteRoute, 
  useToggleRouteStatus, 
  useBulkUpdateRoutes, 
  useImportRoutes,
  useExportRoutes,
  useDuplicateRoute,
  useOptimizeRoute
} from '@/hooks/useRoutes';
import { useSchools } from '@/hooks/useSchools';
import type { Route } from '@/types/api';
import { formatDate } from '@/utils/format';
import { PAGINATION } from '@/constants/app';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface RouteListProps {
  onAdd: () => void;
  onEdit: (route: Route) => void;
  onViewDetails: (route: Route) => void;
  onManageStops: (route: Route) => void;
  onManageAssignments: (route: Route) => void;
}

export default function RouteList({ 
  onAdd, 
  onEdit, 
  onViewDetails, 
  onManageStops,
  onManageAssignments 
}: RouteListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const { 
    data: routesData, 
    isLoading, 
    error 
  } = useRoutes({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchQuery || undefined,
    schoolId: schoolFilter || undefined,
    isActive: statusFilter,
  });

  const { data: schoolsData } = useSchools({ limit: 100 });

  const deleteRouteMutation = useDeleteRoute();
  const toggleStatusMutation = useToggleRouteStatus();
  const bulkUpdateMutation = useBulkUpdateRoutes();
  const importMutation = useImportRoutes();
  const exportMutation = useExportRoutes();
  const duplicateMutation = useDuplicateRoute();
  const optimizeMutation = useOptimizeRoute();

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteRouteMutation.mutateAsync(id);
      message.success(`Route "${name}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete route');
    }
  };

  const handleToggleStatus = async (id: string, name: string) => {
    try {
      await toggleStatusMutation.mutateAsync(id);
      message.success(`Route "${name}" status updated successfully`);
    } catch (error) {
      message.error('Failed to update route status');
    }
  };

  const handleBulkUpdate = async (updates: any) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select routes to update');
      return;
    }

    try {
      await bulkUpdateMutation.mutateAsync({ 
        routeIds: selectedRowKeys, 
        updates 
      });
      message.success(`Updated ${selectedRowKeys.length} routes successfully`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('Failed to update routes');
    }
  };

  const handleImport = async (file: File) => {
    if (!schoolFilter) {
      message.error('Please select a school filter before importing');
      return;
    }

    try {
      await importMutation.mutateAsync({ file, schoolId: schoolFilter });
      message.success('Routes imported successfully');
    } catch (error) {
      message.error('Failed to import routes');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportMutation.mutateAsync({ 
        search: searchQuery, 
        schoolId: schoolFilter,
        isActive: statusFilter 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `routes-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      message.success('Routes exported successfully');
    } catch (error) {
      message.error('Failed to export routes');
    }
  };

  const handleDuplicate = async (routeId: string, routeName: string) => {
    const newName = `${routeName} (Copy)`;
    try {
      await duplicateMutation.mutateAsync({ routeId, newName });
      message.success('Route duplicated successfully');
    } catch (error) {
      message.error('Failed to duplicate route');
    }
  };

  const handleOptimize = async (routeId: string, routeName: string) => {
    try {
      await optimizeMutation.mutateAsync(routeId);
      message.success(`Route "${routeName}" optimized successfully`);
    } catch (error) {
      message.error('Failed to optimize route');
    }
  };

  const handleTableChange = (paginationConfig: any) => {
    setPagination({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const getRouteStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'default';
  };

  const getRouteActions = (route: Route): MenuProps['items'] => [
    {
      key: 'view',
      icon: <EnvironmentOutlined />,
      label: 'View Details',
      onClick: () => onViewDetails(route),
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Route',
      onClick: () => onEdit(route),
    },
    {
      type: 'divider',
    },
    {
      key: 'stops',
      icon: <AimOutlined />,
      label: 'Manage Stops',
      onClick: () => onManageStops(route),
    },
    {
      key: 'assignments',
      icon: <TeamOutlined />,
      label: 'Student Assignments',
      onClick: () => onManageAssignments(route),
    },
    {
      type: 'divider',
    },
    {
      key: 'duplicate',
      icon: <CopyOutlined />,
      label: 'Duplicate Route',
      onClick: () => handleDuplicate(route.id, route.routeName),
    },
    {
      key: 'optimize',
      icon: <ThunderboltOutlined />,
      label: 'Optimize Route',
      onClick: () => handleOptimize(route.id, route.routeName),
      disabled: !route.isActive,
    },
  ];

  const bulkActions: MenuProps['items'] = [
    {
      key: 'activate',
      icon: <CarOutlined />,
      label: 'Activate Routes',
      onClick: () => handleBulkUpdate({ isActive: true }),
    },
    {
      key: 'deactivate',
      icon: <CarOutlined />,
      label: 'Deactivate Routes',
      onClick: () => handleBulkUpdate({ isActive: false }),
    },
    {
      type: 'divider',
    },
    {
      key: 'export-selected',
      icon: <DownloadOutlined />,
      label: 'Export Selected',
      onClick: () => {
        message.info('Export selected feature coming soon');
      },
    },
  ];

  const columns: ColumnsType<Route> = [
    {
      title: 'Route',
      key: 'route',
      width: '25%',
      render: (_, record: Route) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: getRouteStatusColor(record.isActive) === 'success' ? '#52c41a' : '#d9d9d9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <EnvironmentOutlined style={{ fontSize: '18px' }} />
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>
              {record.routeName}
            </div>
            {record.description && (
              <div style={{ fontSize: '12px', color: '#666' }}>
                {record.description}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#999' }}>
              Created: {formatDate(record.createdAt)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'School',
      key: 'school',
      width: '15%',
      render: (_, record: Route) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <BankOutlined style={{ color: '#1890ff' }} />
          <span>{record.school?.name || 'No School'}</span>
        </div>
      ),
    },
    {
      title: 'Stops',
      key: 'stops',
      width: '15%',
      align: 'center',
      render: (_, record: Route) => (
        <div>
          <Badge count={record.stops?.length || 0} overflowCount={99} color="blue" />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
            stops
          </div>
        </div>
      ),
    },
    {
      title: 'Route Info',
      key: 'routeInfo',
      width: '20%',
      render: (_, record: Route) => (
        <Space direction="vertical" size={2}>
          {record.distance && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AimOutlined style={{ color: '#722ed1' }} />
              <span>{record.distance} km</span>
            </div>
          )}
          {record.estimatedDuration && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ClockCircleOutlined style={{ color: '#fa8c16' }} />
              <span>{Math.round(record.estimatedDuration / 60)} min</span>
            </div>
          )}
          {record.assignments && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TeamOutlined style={{ color: '#52c41a' }} />
              <span>{record.assignments.length} students</span>
            </div>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      width: '10%',
      align: 'center',
      render: (isActive: boolean, record: Route) => (
        <Tooltip title="Click to toggle status">
          <Switch 
            checked={isActive}
            size="small"
            loading={toggleStatusMutation.isPending}
            onChange={() => handleToggleStatus(record.id, record.routeName)}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      align: 'center',
      render: (_, record: Route) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EnvironmentOutlined />}
              onClick={() => onViewDetails(record)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Edit Route">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          
          <Dropdown 
            menu={{ items: getRouteActions(record) }} 
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              size="small"
            />
          </Dropdown>

          <Popconfirm
            title="Delete Route"
            description={`Are you sure you want to delete "${record.routeName}"?`}
            onConfirm={() => handleDelete(record.id, record.routeName)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Route">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
                loading={deleteRouteMutation.isPending}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys as string[]),
  };

  if (error) {
    message.error('Failed to load routes');
  }

  return (
    <Card>
      <div style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            <Title level={4} style={{ margin: 0 }}>
              Route Management
            </Title>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Space>
              <Upload
                beforeUpload={(file) => {
                  handleImport(file);
                  return false; // Prevent auto upload
                }}
                accept=".csv,.xlsx"
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} loading={importMutation.isPending}>
                  Import
                </Button>
              </Upload>
              
              <Button 
                icon={<DownloadOutlined />} 
                onClick={handleExport}
                loading={exportMutation.isPending}
              >
                Export
              </Button>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={onAdd}
              >
                Add Route
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={6}>
            <Search
              placeholder="Search routes..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Select school"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={schoolFilter || undefined}
              onChange={setSchoolFilter}
            >
              {schoolsData?.data?.items?.map((school) => (
                <Option key={school.id} value={school.id}>
                  {school.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Filter by status"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Col>
        </Row>
      </div>

      {selectedRowKeys.length > 0 && (
        <div style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <span style={{ fontWeight: 500 }}>{selectedRowKeys.length} routes selected</span>
            </Col>
            <Col>
              <Space>
                <Button 
                  size="small" 
                  onClick={() => setSelectedRowKeys([])}
                >
                  Clear Selection
                </Button>
                <Dropdown menu={{ items: bulkActions }} trigger={['click']}>
                  <Button 
                    icon={<GroupOutlined />} 
                    loading={bulkUpdateMutation.isPending}
                  >
                    Bulk Actions
                  </Button>
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={routesData?.data?.items || []}
        rowKey="id"
        loading={isLoading}
        rowSelection={rowSelection}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: routesData?.data?.pagination.total || 0,
          showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
          showQuickJumper: PAGINATION.SHOW_QUICK_JUMPER,
          pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} routes`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
        size="small"
      />
    </Card>
  );
}