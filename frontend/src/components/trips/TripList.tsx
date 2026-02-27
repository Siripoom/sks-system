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
  DatePicker,
  Dropdown,
  Badge,
  Upload,
  Progress,
  Avatar
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  ScheduleOutlined,
  CarOutlined,
  UserOutlined,
  MoreOutlined,
  GroupOutlined,
  UploadOutlined,
  DownloadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  CopyOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { 
  useTrips, 
  useDeleteTrip, 
  useUpdateTripStatus,
  useStartTrip,
  useCompleteTrip,
  useCancelTrip,
  useBulkUpdateTrips, 
  useImportTrips,
  useExportTrips,
  useDuplicateTrip
} from '@/hooks/useTrips';
import { useRoutes } from '@/hooks/useRoutes';
import { useVehicles } from '@/hooks/useVehicles';
import { useUsers } from '@/hooks/useUsers';
import type { Trip, TripStatus, TripType } from '@/types/api';
import { formatDate } from '@/utils/format';
import { PAGINATION, USER_ROLES } from '@/constants/app';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface TripListProps {
  onAdd: () => void;
  onEdit: (trip: Trip) => void;
  onViewDetails: (trip: Trip) => void;
  onManageStudents: (trip: Trip) => void;
}

export default function TripList({ 
  onAdd, 
  onEdit, 
  onViewDetails, 
  onManageStudents 
}: TripListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [routeFilter, setRouteFilter] = useState<string>('');
  const [vehicleFilter, setVehicleFilter] = useState<string>('');
  const [driverFilter, setDriverFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TripStatus | ''>('');
  const [typeFilter, setTypeFilter] = useState<TripType | ''>('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const { 
    data: tripsData, 
    isLoading, 
    error 
  } = useTrips({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchQuery || undefined,
    routeId: routeFilter || undefined,
    vehicleId: vehicleFilter || undefined,
    driverId: driverFilter || undefined,
    status: statusFilter || undefined,
    tripType: typeFilter || undefined,
    startDate: dateRange?.[0]?.toISOString(),
    endDate: dateRange?.[1]?.toISOString(),
  });

  const { data: routesData } = useRoutes({ limit: 100 });
  const { data: vehiclesData } = useVehicles({ limit: 100 });
  const { data: driversData } = useUsers({ role: USER_ROLES.DRIVER, limit: 100 });

  const deleteTripmutation = useDeleteTrip();
  const updateStatusMutation = useUpdateTripStatus();
  const startTripMutation = useStartTrip();
  const completeTripMutation = useCompleteTrip();
  const cancelTripMutation = useCancelTrip();
  const bulkUpdateMutation = useBulkUpdateTrips();
  const importMutation = useImportTrips();
  const exportMutation = useExportTrips();
  const duplicateMutation = useDuplicateTrip();

  const handleDelete = async (id: string, tripInfo: string) => {
    try {
      await deleteTripmutation.mutateAsync(id);
      message.success(`Trip "${tripInfo}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete trip');
    }
  };

  const handleStartTrip = async (id: string, tripInfo: string) => {
    try {
      await startTripMutation.mutateAsync(id);
      message.success(`Trip "${tripInfo}" started successfully`);
    } catch (error) {
      message.error('Failed to start trip');
    }
  };

  const handleCompleteTrip = async (id: string, tripInfo: string) => {
    try {
      await completeTripMutation.mutateAsync(id);
      message.success(`Trip "${tripInfo}" completed successfully`);
    } catch (error) {
      message.error('Failed to complete trip');
    }
  };

  const handleCancelTrip = async (id: string, tripInfo: string) => {
    try {
      await cancelTripMutation.mutateAsync({ id, reason: 'Cancelled by admin' });
      message.success(`Trip "${tripInfo}" cancelled successfully`);
    } catch (error) {
      message.error('Failed to cancel trip');
    }
  };

  const handleBulkUpdate = async (updates: any) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select trips to update');
      return;
    }

    try {
      await bulkUpdateMutation.mutateAsync({ 
        tripIds: selectedRowKeys, 
        updates 
      });
      message.success(`Updated ${selectedRowKeys.length} trips successfully`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('Failed to update trips');
    }
  };

  const handleImport = async (file: File) => {
    try {
      await importMutation.mutateAsync(file);
      message.success('Trips imported successfully');
    } catch (error) {
      message.error('Failed to import trips');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportMutation.mutateAsync({
        search: searchQuery,
        routeId: routeFilter,
        vehicleId: vehicleFilter,
        driverId: driverFilter,
        status: statusFilter || undefined,
        tripType: typeFilter || undefined,
        startDate: dateRange?.[0]?.toISOString(),
        endDate: dateRange?.[1]?.toISOString(),
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `trips-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      message.success('Trips exported successfully');
    } catch (error) {
      message.error('Failed to export trips');
    }
  };

  const handleDuplicate = async (trip: Trip) => {
    const newDate = dayjs().add(1, 'day').toISOString();
    try {
      await duplicateMutation.mutateAsync({ tripId: trip.id, newDate });
      message.success('Trip duplicated successfully');
    } catch (error) {
      message.error('Failed to duplicate trip');
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

  const getTripTypeColor = (type: TripType) => {
    return type === 'PICKUP' ? 'purple' : 'cyan';
  };

  const getTripActions = (trip: Trip): MenuProps['items'] => {
    const canStart = trip.status === 'SCHEDULED';
    const canComplete = trip.status === 'IN_PROGRESS';
    const canCancel = trip.status === 'SCHEDULED' || trip.status === 'IN_PROGRESS';

    return [
      {
        key: 'view',
        icon: <ScheduleOutlined />,
        label: 'View Details',
        onClick: () => onViewDetails(trip),
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit Trip',
        onClick: () => onEdit(trip),
        disabled: trip.status === 'COMPLETED',
      },
      {
        type: 'divider',
      },
      {
        key: 'students',
        icon: <TeamOutlined />,
        label: 'Manage Students',
        onClick: () => onManageStudents(trip),
      },
      {
        type: 'divider',
      },
      {
        key: 'start',
        icon: <PlayCircleOutlined />,
        label: 'Start Trip',
        onClick: () => handleStartTrip(trip.id, `${trip.route?.routeName} - ${trip.tripType}`),
        disabled: !canStart,
      },
      {
        key: 'complete',
        icon: <CheckCircleOutlined />,
        label: 'Complete Trip',
        onClick: () => handleCompleteTrip(trip.id, `${trip.route?.routeName} - ${trip.tripType}`),
        disabled: !canComplete,
      },
      {
        key: 'cancel',
        icon: <CloseCircleOutlined />,
        label: 'Cancel Trip',
        onClick: () => handleCancelTrip(trip.id, `${trip.route?.routeName} - ${trip.tripType}`),
        disabled: !canCancel,
        danger: true,
      },
      {
        type: 'divider',
      },
      {
        key: 'duplicate',
        icon: <CopyOutlined />,
        label: 'Duplicate Trip',
        onClick: () => handleDuplicate(trip),
      },
    ];
  };

  const bulkActions: MenuProps['items'] = [
    {
      key: 'cancel-bulk',
      icon: <CloseCircleOutlined />,
      label: 'Cancel Selected',
      onClick: () => handleBulkUpdate({ status: 'CANCELLED' }),
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

  const columns: ColumnsType<Trip> = [
    {
      title: 'Trip Info',
      key: 'tripInfo',
      width: '25%',
      render: (_, record: Trip) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: getTripStatusColor(record.status),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <ScheduleOutlined style={{ fontSize: '18px' }} />
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>
              {record.route?.routeName || 'Unknown Route'}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
              <Tag color={getTripTypeColor(record.tripType)}>
                {record.tripType}
              </Tag>
              {formatDate(record.scheduledTime)}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {dayjs(record.scheduledTime).format('HH:mm A')}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Driver & Vehicle',
      key: 'assignment',
      width: '20%',
      render: (_, record: Trip) => (
        <Space direction="vertical" size={2}>
          {record.driver && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Avatar size={20} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              <span>{`${record.driver.firstName} ${record.driver.lastName}`}</span>
            </div>
          )}
          {record.vehicle && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CarOutlined style={{ color: '#52c41a' }} />
              <span>{record.vehicle.licensePlate} - {record.vehicle.model}</span>
            </div>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status: TripStatus) => (
        <Tag color={getTripStatusColor(status)}>
          {status.replace('_', ' ')}
        </Tag>
      ),
      filters: [
        { text: 'Scheduled', value: 'SCHEDULED' },
        { text: 'In Progress', value: 'IN_PROGRESS' },
        { text: 'Completed', value: 'COMPLETED' },
        { text: 'Cancelled', value: 'CANCELLED' },
      ],
    },
    {
      title: 'Timing',
      key: 'timing',
      width: '15%',
      render: (_, record: Trip) => (
        <Space direction="vertical" size={2}>
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ClockCircleOutlined style={{ color: '#722ed1' }} />
            <span>Scheduled: {dayjs(record.scheduledTime).format('HH:mm')}</span>
          </div>
          {record.actualStartTime && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <PlayCircleOutlined style={{ color: '#fa8c16' }} />
              <span>Started: {dayjs(record.actualStartTime).format('HH:mm')}</span>
            </div>
          )}
          {record.actualEndTime && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <span>Ended: {dayjs(record.actualEndTime).format('HH:mm')}</span>
            </div>
          )}
        </Space>
      ),
    },
    {
      title: 'Progress',
      key: 'progress',
      width: '10%',
      align: 'center',
      render: (_, record: Trip) => {
        let percent = 0;
        let status: 'normal' | 'success' | 'exception' = 'normal';

        switch (record.status) {
          case 'SCHEDULED':
            percent = 25;
            break;
          case 'IN_PROGRESS':
            percent = 75;
            status = 'normal';
            break;
          case 'COMPLETED':
            percent = 100;
            status = 'success';
            break;
          case 'CANCELLED':
            percent = 0;
            status = 'exception';
            break;
        }

        return (
          <Progress 
            type="circle" 
            percent={percent} 
            size={40}
            status={status}
            strokeWidth={8}
          />
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      align: 'center',
      render: (_, record: Trip) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<ScheduleOutlined />}
              onClick={() => onViewDetails(record)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Edit Trip">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
              disabled={record.status === 'COMPLETED'}
            />
          </Tooltip>
          
          <Dropdown 
            menu={{ items: getTripActions(record) }} 
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
            title="Delete Trip"
            description={`Are you sure you want to delete this trip?`}
            onConfirm={() => handleDelete(record.id, `${record.route?.routeName} - ${record.tripType}`)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Trip">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
                loading={deleteTripmutation.isPending}
                disabled={record.status === 'IN_PROGRESS'}
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
    message.error('Failed to load trips');
  }

  return (
    <Card>
      <div style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            <Title level={4} style={{ margin: 0 }}>
              Trip Management
            </Title>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Space>
              <Upload
                beforeUpload={(file) => {
                  handleImport(file);
                  return false;
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
                Schedule Trip
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={6}>
            <Search
              placeholder="Search trips..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Select route"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={routeFilter || undefined}
              onChange={setRouteFilter}
            >
              {routesData?.data?.items?.map((route) => (
                <Option key={route.id} value={route.id}>
                  {route.routeName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Select status"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="SCHEDULED">Scheduled</Option>
              <Option value="IN_PROGRESS">In Progress</Option>
              <Option value="COMPLETED">Completed</Option>
              <Option value="CANCELLED">Cancelled</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Trip type"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={typeFilter}
              onChange={setTypeFilter}
            >
              <Option value="PICKUP">Pickup</Option>
              <Option value="DROPOFF">Dropoff</Option>
            </Select>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} sm={8} md={6}>
            <RangePicker
              placeholder={['Start date', 'End date']}
              size="large"
              style={{ width: '100%' }}
              value={dateRange}
              onChange={setDateRange}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Select driver"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={driverFilter || undefined}
              onChange={setDriverFilter}
            >
              {driversData?.data?.items?.map((driver) => (
                <Option key={driver.id} value={driver.id}>
                  {`${driver.firstName} ${driver.lastName}`}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Select vehicle"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={vehicleFilter || undefined}
              onChange={setVehicleFilter}
            >
              {vehiclesData?.data?.items?.map((vehicle) => (
                <Option key={vehicle.id} value={vehicle.id}>
                  {`${vehicle.licensePlate} - ${vehicle.model}`}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {selectedRowKeys.length > 0 && (
        <div style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <span style={{ fontWeight: 500 }}>{selectedRowKeys.length} trips selected</span>
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
        dataSource={tripsData?.data?.items || []}
        rowKey="id"
        loading={isLoading}
        rowSelection={rowSelection}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: tripsData?.data?.pagination.total || 0,
          showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
          showQuickJumper: PAGINATION.SHOW_QUICK_JUMPER,
          pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} trips`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1400 }}
        size="small"
      />
    </Card>
  );
}