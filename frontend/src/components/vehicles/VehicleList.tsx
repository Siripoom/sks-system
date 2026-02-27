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
  Badge,
  Dropdown
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  CarOutlined,
  ToolOutlined,
  SettingOutlined,
  CalendarOutlined,
  MoreOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useVehicles, useDeleteVehicle, useUpdateVehicleStatus, useUpdateMaintenanceStatus } from '@/hooks/useVehicles';
import type { Vehicle } from '@/types/api';
import { formatDate } from '@/utils/format';
import { PAGINATION, VEHICLE_STATUS, MAINTENANCE_STATUS } from '@/constants/app';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface VehicleListProps {
  onAdd: () => void;
  onEdit: (vehicle: Vehicle) => void;
}

export default function VehicleList({ onAdd, onEdit }: VehicleListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const { 
    data: vehiclesData, 
    isLoading, 
    error 
  } = useVehicles({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchQuery || undefined,
    status: statusFilter || undefined
  });

  const deleteVehicleMutation = useDeleteVehicle();
  const updateStatusMutation = useUpdateVehicleStatus();
  const updateMaintenanceMutation = useUpdateMaintenanceStatus();

  const handleDelete = async (id: string, licensePlate: string) => {
    try {
      await deleteVehicleMutation.mutateAsync(id);
      message.success(`Vehicle "${licensePlate}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete vehicle');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
      message.success('Vehicle status updated successfully');
    } catch (error) {
      message.error('Failed to update vehicle status');
    }
  };

  const handleMaintenanceChange = async (id: string, maintenanceStatus: string) => {
    try {
      await updateMaintenanceMutation.mutateAsync({ id, maintenanceStatus });
      message.success('Maintenance status updated successfully');
    } catch (error) {
      message.error('Failed to update maintenance status');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case VEHICLE_STATUS.ACTIVE:
        return 'success';
      case VEHICLE_STATUS.INACTIVE:
        return 'default';
      case VEHICLE_STATUS.MAINTENANCE:
        return 'warning';
      default:
        return 'default';
    }
  };

  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case MAINTENANCE_STATUS.GOOD:
        return 'success';
      case MAINTENANCE_STATUS.NEEDS_ATTENTION:
        return 'warning';
      case MAINTENANCE_STATUS.CRITICAL:
        return 'error';
      default:
        return 'default';
    }
  };

  const getVehicleActions = (vehicle: Vehicle): MenuProps['items'] => [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Vehicle',
      onClick: () => onEdit(vehicle),
    },
    {
      type: 'divider',
    },
    {
      key: 'status-active',
      icon: <CarOutlined />,
      label: 'Mark Active',
      disabled: vehicle.status === VEHICLE_STATUS.ACTIVE,
      onClick: () => handleStatusChange(vehicle.id, VEHICLE_STATUS.ACTIVE),
    },
    {
      key: 'status-inactive',
      icon: <SettingOutlined />,
      label: 'Mark Inactive',
      disabled: vehicle.status === VEHICLE_STATUS.INACTIVE,
      onClick: () => handleStatusChange(vehicle.id, VEHICLE_STATUS.INACTIVE),
    },
    {
      key: 'status-maintenance',
      icon: <ToolOutlined />,
      label: 'Send to Maintenance',
      disabled: vehicle.status === VEHICLE_STATUS.MAINTENANCE,
      onClick: () => handleStatusChange(vehicle.id, VEHICLE_STATUS.MAINTENANCE),
    },
    {
      type: 'divider',
    },
    {
      key: 'maintenance-good',
      icon: <Badge status="success" />,
      label: 'Mark Good Condition',
      disabled: vehicle.maintenanceStatus === MAINTENANCE_STATUS.GOOD,
      onClick: () => handleMaintenanceChange(vehicle.id, MAINTENANCE_STATUS.GOOD),
    },
    {
      key: 'maintenance-attention',
      icon: <Badge status="warning" />,
      label: 'Needs Attention',
      disabled: vehicle.maintenanceStatus === MAINTENANCE_STATUS.NEEDS_ATTENTION,
      onClick: () => handleMaintenanceChange(vehicle.id, MAINTENANCE_STATUS.NEEDS_ATTENTION),
    },
    {
      key: 'maintenance-critical',
      icon: <Badge status="error" />,
      label: 'Mark Critical',
      disabled: vehicle.maintenanceStatus === MAINTENANCE_STATUS.CRITICAL,
      onClick: () => handleMaintenanceChange(vehicle.id, MAINTENANCE_STATUS.CRITICAL),
    },
  ];

  const columns: ColumnsType<Vehicle> = [
    {
      title: 'Vehicle Info',
      key: 'vehicleInfo',
      width: '25%',
      render: (_, record: Vehicle) => (
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>
            {record.licensePlate}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
            {record.model} ({record.year})
          </div>
          <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CarOutlined />
            <span>Capacity: {record.capacity}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (status: string) => (
        <Tag color={getStatusColor(status)} style={{ minWidth: '70px', textAlign: 'center' }}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: VEHICLE_STATUS.ACTIVE },
        { text: 'Inactive', value: VEHICLE_STATUS.INACTIVE },
        { text: 'Maintenance', value: VEHICLE_STATUS.MAINTENANCE },
      ],
    },
    {
      title: 'Maintenance',
      dataIndex: 'maintenanceStatus',
      key: 'maintenanceStatus',
      width: '20%',
      align: 'center',
      render: (maintenanceStatus: string, record: Vehicle) => (
        <Space direction="vertical" size={2} style={{ width: '100%' }}>
          <Tag color={getMaintenanceColor(maintenanceStatus)} style={{ minWidth: '100px', textAlign: 'center' }}>
            {maintenanceStatus.replace('_', ' ')}
          </Tag>
          {record.nextMaintenanceDate && (
            <div style={{ fontSize: '11px', color: '#666', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <CalendarOutlined />
              <span>Next: {formatDate(record.nextMaintenanceDate)}</span>
            </div>
          )}
        </Space>
      ),
    },
    {
      title: 'Details',
      key: 'details',
      width: '25%',
      render: (_, record: Vehicle) => (
        <Space direction="vertical" size={2}>
          {record.mileage && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              Mileage: {record.mileage.toLocaleString()} miles
            </div>
          )}
          {record.lastMaintenanceDate && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              Last Service: {formatDate(record.lastMaintenanceDate)}
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#999' }}>
            Added: {formatDate(record.createdAt)}
          </div>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      align: 'center',
      render: (_, record: Vehicle) => (
        <Space>
          <Tooltip title="Edit Vehicle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          
          <Dropdown 
            menu={{ items: getVehicleActions(record) }} 
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
            title="Delete Vehicle"
            description={`Are you sure you want to delete vehicle "${record.licensePlate}"?`}
            onConfirm={() => handleDelete(record.id, record.licensePlate)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Vehicle">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
                loading={deleteVehicleMutation.isPending}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    message.error('Failed to load vehicles');
  }

  return (
    <Card>
      <div style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            <Title level={4} style={{ margin: 0 }}>
              Vehicle Management
            </Title>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={onAdd}
              block
            >
              Add Vehicle
            </Button>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search vehicles..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Filter by status"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={statusFilter || undefined}
              onChange={setStatusFilter}
            >
              <Option value={VEHICLE_STATUS.ACTIVE}>Active</Option>
              <Option value={VEHICLE_STATUS.INACTIVE}>Inactive</Option>
              <Option value={VEHICLE_STATUS.MAINTENANCE}>Maintenance</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={vehiclesData?.data?.items || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: vehiclesData?.data?.pagination.total || 0,
          showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
          showQuickJumper: PAGINATION.SHOW_QUICK_JUMPER,
          pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} vehicles`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
        size="small"
      />
    </Card>
  );
}