'use client';

import React, { useState } from 'react';
import {
  Badge,
  Button,
  Drawer,
  List,
  Typography,
  Space,
  Tag,
  Empty,
  Spin,
  Divider,
  Tooltip,
  Popconfirm,
  Select,
  Input
} from 'antd';
import {
  BellOutlined,
  CheckOutlined,
  DeleteOutlined,
  SearchOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseOutlined
} from '@ant-design/icons';
import {
  useUserNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification
} from '@/hooks/useNotifications';
import { useAuthStore } from '@/stores/authStore';
import { formatDistanceToNow } from 'date-fns';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

interface NotificationCenterProps {
  className?: string;
}

export default function NotificationCenter({ className }: NotificationCenterProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = useAuthStore();
  
  // Queries
  const { data: unreadCountData } = useUnreadCount(user?.id || '', 30000);
  const { 
    data: notificationsData, 
    isLoading, 
    refetch 
  } = useUserNotifications(user?.id, filters, 30000);

  // Mutations
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const notifications = notificationsData?.data?.items || [];
  const unreadCount = unreadCountData?.count || 0;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'EMERGENCY_ALERT':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'DELAY_ALERT':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'TRIP_UPDATE':
      case 'ARRIVAL_NOTIFICATION':
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
      default:
        return <BellOutlined style={{ color: '#52c41a' }} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'red';
      case 'HIGH': return 'orange';
      case 'MEDIUM': return 'blue';
      case 'LOW': return 'green';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'READ': return 'green';
      case 'delivered': return 'blue';
      case 'sent': return 'orange';
      case 'pending': return 'default';
      case 'failed': return 'red';
      default: return 'default';
    }
  };

  const filteredNotifications = notifications.filter((notification: any) => {
    if (searchTerm) {
      return notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handleMarkAsRead = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    markAsReadMutation.mutate(notificationId);
  };

  const handleDelete = (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    deleteNotificationMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    if (user?.id) {
      markAllAsReadMutation.mutate(user.id);
    }
  };

  return (
    <div className={className}>
      <Badge count={unreadCount} offset={[-5, 5]} size="small">
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: '18px' }} />}
          onClick={() => setDrawerVisible(true)}
        />
      </Badge>

      <Drawer
        title={
          <Space>
            <BellOutlined />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge count={unreadCount} />
            )}
          </Space>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
        extra={
          <Space>
            {unreadCount > 0 && (
              <Button
                type="link"
                onClick={handleMarkAllAsRead}
                loading={markAllAsReadMutation.isPending}
              >
                Mark all read
              </Button>
            )}
            <Button
              type="text"
              icon={<SettingOutlined />}
              title="Notification Settings"
            />
          </Space>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Search and Filters */}
          <Input
            placeholder="Search notifications..."
            prefix={<SearchOutlined />}
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Space>
            <Select
              placeholder="Type"
              allowClear
              style={{ width: 120 }}
              onChange={(value) => setFilters({ ...filters, type: value })}
            >
              <Select.Option value="TRIP_UPDATE">Trip Updates</Select.Option>
              <Select.Option value="DELAY_ALERT">Delays</Select.Option>
              <Select.Option value="ARRIVAL_NOTIFICATION">Arrivals</Select.Option>
              <Select.Option value="EMERGENCY_ALERT">Emergency</Select.Option>
              <Select.Option value="SYSTEM_ANNOUNCEMENT">System</Select.Option>
            </Select>

            <Select
              placeholder="Priority"
              allowClear
              style={{ width: 100 }}
              onChange={(value) => setFilters({ ...filters, priority: value })}
            >
              <Select.Option value="URGENT">Urgent</Select.Option>
              <Select.Option value="HIGH">High</Select.Option>
              <Select.Option value="MEDIUM">Medium</Select.Option>
              <Select.Option value="LOW">Low</Select.Option>
            </Select>

            <Select
              placeholder="Status"
              allowClear
              style={{ width: 100 }}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Select.Option value="PENDING">Pending</Select.Option>
              <Select.Option value="SENT">Sent</Select.Option>
              <Select.Option value="DELIVERED">Delivered</Select.Option>
              <Select.Option value="READ">Read</Select.Option>
            </Select>
          </Space>

          <Divider style={{ margin: '12px 0' }} />

          {/* Notifications List */}
          <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <Spin spinning={isLoading}>
              {filteredNotifications.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No notifications"
                />
              ) : (
                <List
                  dataSource={filteredNotifications}
                  renderItem={(notification: any) => (
                    <List.Item
                      style={{
                        padding: '12px 8px',
                        backgroundColor: notification.status === 'READ' ? 'transparent' : '#f6ffed',
                        borderLeft: notification.status === 'read' ? 'none' : '3px solid #52c41a',
                        cursor: 'pointer',
                        marginBottom: '8px',
                        borderRadius: '6px'
                      }}
                      actions={[
                        notification.status !== 'read' && (
                          <Tooltip title="Mark as read">
                            <Button
                              type="text"
                              icon={<CheckOutlined />}
                              onClick={(e) => handleMarkAsRead(notification.id, e)}
                              loading={markAsReadMutation.isPending}
                            />
                          </Tooltip>
                        ),
                        <Popconfirm
                          title="Delete this notification?"
                          onConfirm={(e) => handleDelete(notification.id, e!)}
                          okText="Delete"
                          cancelText="Cancel"
                        >
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                            onClick={(e) => e.stopPropagation()}
                          />
                        </Popconfirm>
                      ].filter(Boolean)}
                    >
                      <List.Item.Meta
                        avatar={getNotificationIcon(notification.type)}
                        title={
                          <Space>
                            <Text 
                              strong={notification.status !== 'read'}
                              style={{ fontSize: '14px' }}
                            >
                              {notification.title}
                            </Text>
                            <Tag color={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Tag>
                          </Space>
                        }
                        description={
                          <div>
                            <Text 
                              type="secondary" 
                              style={{ 
                                fontSize: '12px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {notification.message}
                            </Text>
                            <div style={{ marginTop: '4px' }}>
                              <Space>
                                <Text type="secondary" style={{ fontSize: '11px' }}>
                                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </Text>
                                <Tag color={getStatusColor(notification.status)}>
                                  {notification.status}
                                </Tag>
                                {notification.channels?.map((channel: string) => (
                                  <Tag key={channel} color="default">
                                    {channel}
                                  </Tag>
                                ))}
                              </Space>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Spin>
          </div>

          {/* Footer Actions */}
          {filteredNotifications.length > 0 && (
            <>
              <Divider style={{ margin: '12px 0' }} />
              <Space style={{ width: '100%', justifyContent: 'center' }}>
                <Button onClick={() => refetch()} loading={isLoading}>
                  Refresh
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({});
                  }}
                >
                  Clear Filters
                </Button>
              </Space>
            </>
          )}
        </Space>
      </Drawer>
    </div>
  );
}