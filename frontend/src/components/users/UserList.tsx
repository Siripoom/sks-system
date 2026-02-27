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
  Avatar,
  Dropdown
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
  UserSwitchOutlined,
  StopOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useUsers, useDeleteUser, useUpdateUserRole } from '@/hooks/useUsers';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/types/api';
import { formatDate, formatFullName } from '@/utils/format';
import { PAGINATION, USER_ROLES } from '@/constants/app';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface UserListProps {
  onAdd: () => void;
  onEdit: (user: User) => void;
}

export default function UserList({ onAdd, onEdit }: UserListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const { user: currentUser } = useAuthStore();

  const { 
    data: usersData, 
    isLoading, 
    error 
  } = useUsers({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchQuery || undefined,
    role: roleFilter || undefined
  });

  const deleteUserMutation = useDeleteUser();
  const updateRoleMutation = useUpdateUserRole();

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      message.success(`User "${name}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleRoleChange = async (id: string, role: string, userName: string) => {
    try {
      await updateRoleMutation.mutateAsync({ id, role });
      message.success(`Role updated for ${userName}`);
    } catch (error) {
      message.error('Failed to update user role');
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return '#722ed1';
      case USER_ROLES.TEACHER:
        return '#1890ff';
      case USER_ROLES.DRIVER:
        return '#52c41a';
      case USER_ROLES.PARENT:
        return '#fa8c16';
      default:
        return '#d9d9d9';
    }
  };

  const getUserActions = (user: User): MenuProps['items'] => {
    const canManageRoles = currentUser?.role === USER_ROLES.ADMIN;
    const isCurrentUser = currentUser?.id === user.id;
    
    const actions: MenuProps['items'] = [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit User',
        onClick: () => onEdit(user),
      }
    ];

    if (canManageRoles && !isCurrentUser) {
      actions.push(
        { type: 'divider' },
        {
          key: 'role-submenu',
          icon: <UserSwitchOutlined />,
          label: 'Change Role',
          children: [
            {
              key: 'role-admin',
              label: 'Admin',
              disabled: user.role === USER_ROLES.ADMIN,
              onClick: () => handleRoleChange(user.id, USER_ROLES.ADMIN, formatFullName(user.firstName, user.lastName)),
            },
            {
              key: 'role-teacher',
              label: 'Teacher',
              disabled: user.role === USER_ROLES.TEACHER,
              onClick: () => handleRoleChange(user.id, USER_ROLES.TEACHER, formatFullName(user.firstName, user.lastName)),
            },
            {
              key: 'role-driver',
              label: 'Driver',
              disabled: user.role === USER_ROLES.DRIVER,
              onClick: () => handleRoleChange(user.id, USER_ROLES.DRIVER, formatFullName(user.firstName, user.lastName)),
            },
            {
              key: 'role-parent',
              label: 'Parent',
              disabled: user.role === USER_ROLES.PARENT,
              onClick: () => handleRoleChange(user.id, USER_ROLES.PARENT, formatFullName(user.firstName, user.lastName)),
            },
          ],
        }
      );
    }

    return actions;
  };

  const columns: ColumnsType<User> = [
    {
      title: 'User',
      key: 'user',
      width: '25%',
      render: (_, record: User) => {
        const isCurrentUser = currentUser?.id === record.id;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar 
              size={40} 
              icon={<UserOutlined />}
              style={{ backgroundColor: getRoleColor(record.role) }}
            >
              {record.firstName.charAt(0)}{record.lastName.charAt(0)}
            </Avatar>
            <div>
              <div style={{ 
                fontWeight: 500, 
                fontSize: '14px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                {formatFullName(record.firstName, record.lastName)}
                {isCurrentUser && (
                  <Tag color="blue">You</Tag>
                )}
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
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '15%',
      align: 'center',
      render: (role: string) => (
        <Tag color={getRoleColor(role)} style={{ minWidth: '70px', textAlign: 'center' }}>
          {role}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: USER_ROLES.ADMIN },
        { text: 'Teacher', value: USER_ROLES.TEACHER },
        { text: 'Driver', value: USER_ROLES.DRIVER },
        { text: 'Parent', value: USER_ROLES.PARENT },
      ],
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (isActive: boolean) => (
        <Tag 
          color={isActive ? 'success' : 'default'} 
          icon={isActive ? <CheckCircleOutlined /> : <StopOutlined />}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Details',
      key: 'details',
      width: '25%',
      render: (_, record: User) => (
        <Space direction="vertical" size={2}>
          {record.address && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              Address: {record.address}
            </div>
          )}
          {record.dateOfBirth && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              DOB: {formatDate(record.dateOfBirth)}
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#999' }}>
            Joined: {formatDate(record.createdAt)}
          </div>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      align: 'center',
      render: (_, record: User) => {
        const isCurrentUser = currentUser?.id === record.id;
        
        return (
          <Space>
            <Tooltip title="Edit User">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
                size="small"
              />
            </Tooltip>
            
            <Dropdown 
              menu={{ items: getUserActions(record) }} 
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<MoreOutlined />}
                size="small"
              />
            </Dropdown>

            {!isCurrentUser && (
              <Popconfirm
                title="Delete User"
                description={`Are you sure you want to delete "${formatFullName(record.firstName, record.lastName)}"?`}
                onConfirm={() => handleDelete(record.id, formatFullName(record.firstName, record.lastName))}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ danger: true }}
              >
                <Tooltip title="Delete User">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    size="small"
                    loading={deleteUserMutation.isPending}
                  />
                </Tooltip>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  if (error) {
    message.error('Failed to load users');
  }

  return (
    <Card>
      <div style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            <Title level={4} style={{ margin: 0 }}>
              User Management
            </Title>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={onAdd}
              block
            >
              Add User
            </Button>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search users..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Filter by role"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={roleFilter || undefined}
              onChange={setRoleFilter}
            >
              <Option value={USER_ROLES.ADMIN}>Admin</Option>
              <Option value={USER_ROLES.TEACHER}>Teacher</Option>
              <Option value={USER_ROLES.DRIVER}>Driver</Option>
              <Option value={USER_ROLES.PARENT}>Parent</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={usersData?.data?.items || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: usersData?.data?.pagination.total || 0,
          showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
          showQuickJumper: PAGINATION.SHOW_QUICK_JUMPER,
          pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} users`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
        size="small"
      />
    </Card>
  );
}