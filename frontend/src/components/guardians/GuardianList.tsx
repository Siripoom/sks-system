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
  Avatar,
  Dropdown,
  Badge,
  Upload
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MoreOutlined,
  TeamOutlined,
  HomeOutlined,
  UploadOutlined,
  DownloadOutlined,
  GroupOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { 
  useGuardians, 
  useDeleteGuardian, 
  useBulkUpdateGuardians, 
  useImportGuardians,
  useExportGuardians 
} from '@/hooks/useGuardians';
import type { Guardian } from '@/types/api';
import { formatDate, formatFullName } from '@/utils/format';
import { PAGINATION } from '@/constants/app';

const { Title } = Typography;
const { Search } = Input;

interface GuardianListProps {
  onAdd: () => void;
  onEdit: (guardian: Guardian) => void;
  onViewDetails: (guardian: Guardian) => void;
}

export default function GuardianList({ onAdd, onEdit, onViewDetails }: GuardianListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const { 
    data: guardiansData, 
    isLoading, 
    error 
  } = useGuardians({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchQuery || undefined,
  });

  const deleteGuardianMutation = useDeleteGuardian();
  const bulkUpdateMutation = useBulkUpdateGuardians();
  const importMutation = useImportGuardians();
  const exportMutation = useExportGuardians();

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteGuardianMutation.mutateAsync(id);
      message.success(`Guardian "${name}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete guardian');
    }
  };

  const handleBulkUpdate = async (updates: any) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select guardians to update');
      return;
    }

    try {
      await bulkUpdateMutation.mutateAsync({ 
        guardianIds: selectedRowKeys, 
        updates 
      });
      message.success(`Updated ${selectedRowKeys.length} guardians successfully`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('Failed to update guardians');
    }
  };

  const handleImport = async (file: File) => {
    try {
      await importMutation.mutateAsync(file);
      message.success('Guardians imported successfully');
    } catch (error) {
      message.error('Failed to import guardians');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportMutation.mutateAsync({ search: searchQuery });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `guardians-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      message.success('Guardians exported successfully');
    } catch (error) {
      message.error('Failed to export guardians');
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

  const getRelationshipColor = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case 'mother':
        return '#fa8c16';
      case 'father':
        return '#1890ff';
      case 'grandmother':
      case 'grandfather':
        return '#722ed1';
      case 'aunt':
      case 'uncle':
        return '#52c41a';
      case 'guardian':
        return '#13c2c2';
      default:
        return '#d9d9d9';
    }
  };

  const getGuardianActions = (guardian: Guardian): MenuProps['items'] => [
    {
      key: 'view',
      icon: <UserOutlined />,
      label: 'View Details',
      onClick: () => onViewDetails(guardian),
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Guardian',
      onClick: () => onEdit(guardian),
    },
    {
      type: 'divider',
    },
    {
      key: 'students',
      icon: <TeamOutlined />,
      label: 'Manage Students',
      onClick: () => {
        // This would open a modal to manage student assignments
        message.info('Student management feature coming soon');
      },
    },
  ];

  const bulkActions: MenuProps['items'] = [
    {
      key: 'export-selected',
      icon: <DownloadOutlined />,
      label: 'Export Selected',
      onClick: () => {
        // Export only selected guardians
        message.info('Export selected feature coming soon');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'bulk-contact',
      icon: <MailOutlined />,
      label: 'Send Bulk Message',
      onClick: () => {
        message.info('Bulk messaging feature coming soon');
      },
    },
  ];

  const columns: ColumnsType<Guardian> = [
    {
      title: 'Guardian',
      key: 'guardian',
      width: '25%',
      render: (_, record: Guardian) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size={40} 
            icon={<UserOutlined />}
            style={{ backgroundColor: getRelationshipColor(record.relationship) }}
          >
            {record.firstName.charAt(0)}{record.lastName.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>
              {formatFullName(record.firstName, record.lastName)}
            </div>
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MailOutlined />
              {record.email}
            </div>
            {record.phone && (
              <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <PhoneOutlined />
                {record.phone}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
      width: '15%',
      align: 'center',
      render: (relationship: string) => (
        <Tag color={getRelationshipColor(relationship)} style={{ minWidth: '80px', textAlign: 'center' }}>
          {relationship}
        </Tag>
      ),
    },
    {
      title: 'Contact Info',
      key: 'contactInfo',
      width: '20%',
      render: (_, record: Guardian) => (
        <Space direction="vertical" size={2}>
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <PhoneOutlined style={{ color: '#52c41a' }} />
            <span>{record.phone}</span>
          </div>
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MailOutlined style={{ color: '#1890ff' }} />
            <span>{record.email}</span>
          </div>
        </Space>
      ),
    },
    {
      title: 'Address',
      key: 'address',
      width: '25%',
      render: (_, record: Guardian) => (
        <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <HomeOutlined />
          <span>{record.address}</span>
        </div>
      ),
    },
    {
      title: 'Registration',
      key: 'registration',
      width: '15%',
      render: (_, record: Guardian) => (
        <div style={{ fontSize: '12px', color: '#999' }}>
          {formatDate(record.createdAt)}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      align: 'center',
      render: (_, record: Guardian) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<UserOutlined />}
              onClick={() => onViewDetails(record)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Edit Guardian">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          
          <Dropdown 
            menu={{ items: getGuardianActions(record) }} 
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
            title="Delete Guardian"
            description={`Are you sure you want to delete "${formatFullName(record.firstName, record.lastName)}"?`}
            onConfirm={() => handleDelete(record.id, formatFullName(record.firstName, record.lastName))}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Guardian">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
                loading={deleteGuardianMutation.isPending}
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
    message.error('Failed to load guardians');
  }

  return (
    <Card>
      <div style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            <Title level={4} style={{ margin: 0 }}>
              Guardian Management
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
                Add Guardian
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={16} md={12}>
            <Search
              placeholder="Search guardians..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </div>

      {selectedRowKeys.length > 0 && (
        <div style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <span style={{ fontWeight: 500 }}>{selectedRowKeys.length} guardians selected</span>
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
        dataSource={guardiansData?.data?.items || []}
        rowKey="id"
        loading={isLoading}
        rowSelection={rowSelection}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: guardiansData?.data?.pagination.total || 0,
          showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
          showQuickJumper: PAGINATION.SHOW_QUICK_JUMPER,
          pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} guardians`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
        size="small"
      />
    </Card>
  );
}