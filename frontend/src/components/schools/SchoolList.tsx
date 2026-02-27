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
  Tooltip
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useSchools, useDeleteSchool } from '@/hooks/useSchools';
import type { School } from '@/types/api';
import { formatDate } from '@/utils/format';
import { PAGINATION } from '@/constants/app';

const { Title } = Typography;
const { Search } = Input;

interface SchoolListProps {
  onAdd: () => void;
  onEdit: (school: School) => void;
}

export default function SchoolList({ onAdd, onEdit }: SchoolListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const { 
    data: schoolsData, 
    isLoading, 
    error,
    isError 
  } = useSchools({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchQuery || undefined
  });

  console.log('SchoolList: Query state:', {
    isLoading,
    isError,
    error,
    schoolsData,
    dataAvailable: !!schoolsData,
    itemsCount: schoolsData?.data?.items?.length || 0
  });

  const deleteSchoolMutation = useDeleteSchool();

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteSchoolMutation.mutateAsync(id);
      message.success(`School "${name}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete school');
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

  const columns: ColumnsType<School> = [
    {
      title: 'School Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (name: string, record: School) => (
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px' }}>{name}</div>
          {record.code && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              Code: {record.code}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Contact Info',
      key: 'contact',
      width: '30%',
      render: (_, record: School) => (
        <Space direction="vertical" size={2}>
          {record.address && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <EnvironmentOutlined style={{ color: '#666' }} />
              <span>{record.address}</span>
            </div>
          )}
          {record.phone && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <PhoneOutlined style={{ color: '#666' }} />
              <span>{record.phone}</span>
            </div>
          )}
          {record.email && (
            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MailOutlined style={{ color: '#666' }} />
              <span>{record.email}</span>
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
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'default'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      render: (date: string) => formatDate(date),
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      align: 'center',
      render: (_, record: School) => (
        <Space>
          <Tooltip title="Edit School">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          <Popconfirm
            title="Delete School"
            description={`Are you sure you want to delete "${record.name}"?`}
            onConfirm={() => handleDelete(record.id, record.name)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete School">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
                loading={deleteSchoolMutation.isPending}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error || isError) {
    console.error('SchoolList: Error loading schools:', error);
    message.error(`Failed to load schools: ${error?.message || 'Unknown error'}`);
  }

  return (
    <Card>
      <div style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            <Title level={4} style={{ margin: 0 }}>
              Schools Management
            </Title>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={onAdd}
              block
            >
              Add School
            </Button>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search schools..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </div>

      {isError && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          background: '#fff2f0', 
          border: '1px solid #ffccc7',
          borderRadius: '6px',
          marginBottom: '16px'
        }}>
          <h4 style={{ color: '#cf1322', margin: '0 0 8px 0' }}>
            Failed to load schools
          </h4>
          <p style={{ margin: 0, color: '#8c8c8c' }}>
            {error?.message || 'An error occurred while loading schools. Please try again.'}
          </p>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={schoolsData?.data?.items || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: schoolsData?.data?.pagination?.total || 0,
          showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
          showQuickJumper: PAGINATION.SHOW_QUICK_JUMPER,
          pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} schools`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
        size="small"
      />
    </Card>
  );
}