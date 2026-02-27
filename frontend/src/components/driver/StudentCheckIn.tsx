'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  List, 
  Button, 
  Space, 
  Typography, 
  Tag, 
  Avatar, 
  Checkbox, 
  Row, 
  Col, 
  Input, 
  Alert, 
  Badge,
  Divider,
  Progress,
  message,
  Modal,
  Form,
  Select
} from 'antd';
import { 
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  TeamOutlined,
  PhoneOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  AlertOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useTripStudents, useUpdateStudentStatus, useBulkUpdateStudentStatus } from '@/hooks/useTrips';
import type { Trip } from '@/types/api';
import { formatFullName } from '@/utils/format';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface StudentCheckInProps {
  trip: Trip;
  onBack: () => void;
}

interface StudentStatus {
  studentId: string;
  status: 'present' | 'absent' | 'picked_up' | 'dropped_off';
  timestamp?: string;
  notes?: string;
}

export default function StudentCheckIn({ trip, onBack }: StudentCheckInProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [studentStatuses, setStudentStatuses] = useState<Map<string, StudentStatus>>(new Map());
  const [bulkStatusModal, setBulkStatusModal] = useState(false);
  const [form] = Form.useForm();

  const { data: tripStudentsData, isLoading } = useTripStudents(trip.id);
  const updateStatusMutation = useUpdateStudentStatus();
  const bulkUpdateMutation = useBulkUpdateStudentStatus();

  const students = tripStudentsData?.data?.students || [];

  useEffect(() => {
    // Initialize student statuses
    const initialStatuses = new Map<string, StudentStatus>();
    students.forEach((student: any) => {
      initialStatuses.set(student.id, {
        studentId: student.id,
        status: student.status || 'absent',
        timestamp: student.statusTimestamp,
        notes: student.notes,
      });
    });
    setStudentStatuses(initialStatuses);
  }, [students]);

  const handleStatusChange = async (studentId: string, status: 'present' | 'absent' | 'picked_up' | 'dropped_off') => {
    try {
      await updateStatusMutation.mutateAsync({
        tripId: trip.id,
        studentId,
        status,
      });

      // Update local state
      setStudentStatuses(prev => {
        const newMap = new Map(prev);
        newMap.set(studentId, {
          ...newMap.get(studentId)!,
          status,
          timestamp: new Date().toISOString(),
        });
        return newMap;
      });

      message.success('Student status updated successfully');
    } catch (error) {
      message.error('Failed to update student status');
    }
  };

  const handleBulkStatusUpdate = async (values: any) => {
    if (selectedStudents.length === 0) {
      message.warning('Please select students to update');
      return;
    }

    try {
      const updates = selectedStudents.map(studentId => ({
        studentId,
        status: values.status,
      }));

      await bulkUpdateMutation.mutateAsync({
        tripId: trip.id,
        updates,
      });

      // Update local state
      setStudentStatuses(prev => {
        const newMap = new Map(prev);
        selectedStudents.forEach(studentId => {
          newMap.set(studentId, {
            ...newMap.get(studentId)!,
            status: values.status,
            timestamp: new Date().toISOString(),
          });
        });
        return newMap;
      });

      setSelectedStudents([]);
      setBulkStatusModal(false);
      form.resetFields();
      message.success(`Updated ${selectedStudents.length} students successfully`);
    } catch (error) {
      message.error('Failed to update student statuses');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'blue';
      case 'picked_up':
        return 'green';
      case 'dropped_off':
        return 'purple';
      case 'absent':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircleOutlined />;
      case 'picked_up':
        return <UserOutlined />;
      case 'dropped_off':
        return <HomeOutlined />;
      case 'absent':
        return <CloseCircleOutlined />;
      default:
        return <UserOutlined />;
    }
  };

  const getFilteredStudents = () => {
    let filtered = students;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((student: any) =>
        formatFullName(student.firstName, student.lastName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((student: any) => {
        const status = studentStatuses.get(student.id)?.status || 'absent';
        return status === statusFilter;
      });
    }

    return filtered;
  };

  const getStatusCounts = () => {
    const counts = {
      present: 0,
      picked_up: 0,
      dropped_off: 0,
      absent: 0,
    };

    students.forEach((student: any) => {
      const status = studentStatuses.get(student.id)?.status || 'absent';
      counts[status as keyof typeof counts]++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();
  const filteredStudents = getFilteredStudents();
  const completionRate = students.length > 0 ? 
    Math.round(((statusCounts.picked_up + statusCounts.dropped_off) / students.length) * 100) : 0;

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Space direction="vertical" size={0}>
            <Title level={3} style={{ margin: 0 }}>
              Student Check-In/Out
            </Title>
            <Text type="secondary">
              {trip.route?.routeName} • {trip.tripType} • {trip.vehicle?.licensePlate}
            </Text>
          </Space>
        </Col>
        <Col>
          <Button onClick={onBack}>
            Back to Dashboard
          </Button>
        </Col>
      </Row>

      {/* Trip Status Alert */}
      <Row style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <Alert
            message={`Trip Status: ${trip.status}`}
            description={
              trip.status === 'IN_PROGRESS' 
                ? 'You can check students in/out during the trip'
                : trip.status === 'SCHEDULED'
                  ? 'Trip is scheduled. Start the trip to begin student check-in'
                  : 'Trip is completed. View-only mode.'
            }
            type={trip.status === 'IN_PROGRESS' ? 'info' : trip.status === 'SCHEDULED' ? 'warning' : 'success'}
            showIcon
          />
        </Col>
      </Row>

      {/* Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card>
            <Badge count={statusCounts.present} overflowCount={99} color="blue">
              <div style={{ textAlign: 'center' }}>
                <CheckCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <div style={{ marginTop: '8px' }}>Present</div>
              </div>
            </Badge>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Badge count={statusCounts.picked_up} overflowCount={99} color="green">
              <div style={{ textAlign: 'center' }}>
                <UserOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                <div style={{ marginTop: '8px' }}>Picked Up</div>
              </div>
            </Badge>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Badge count={statusCounts.dropped_off} overflowCount={99} color="purple">
              <div style={{ textAlign: 'center' }}>
                <HomeOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
                <div style={{ marginTop: '8px' }}>Dropped Off</div>
              </div>
            </Badge>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Progress type="circle" percent={completionRate} size={60} />
              <div style={{ marginTop: '8px' }}>Completion</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Controls */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Search students..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={setSearchQuery}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: '100%' }}
          >
            <Option value="all">All Students</Option>
            <Option value="present">Present</Option>
            <Option value="picked_up">Picked Up</Option>
            <Option value="dropped_off">Dropped Off</Option>
            <Option value="absent">Absent</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Button
            type="primary"
            icon={<TeamOutlined />}
            disabled={selectedStudents.length === 0 || trip.status === 'COMPLETED'}
            onClick={() => setBulkStatusModal(true)}
            block
          >
            Bulk Update ({selectedStudents.length})
          </Button>
        </Col>
      </Row>

      {/* Student List */}
      <Card>
        <List
          loading={isLoading}
          dataSource={filteredStudents}
          renderItem={(student: any) => {
            const status = studentStatuses.get(student.id);
            const isSelected = selectedStudents.includes(student.id);

            return (
              <List.Item
                style={{ 
                  backgroundColor: isSelected ? '#f0f2f5' : 'transparent',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}
                actions={[
                  trip.status === 'IN_PROGRESS' && (
                    <Space>
                      <Button
                        size="small"
                        type={status?.status === 'present' ? 'primary' : 'default'}
                        icon={<CheckCircleOutlined />}
                        onClick={() => handleStatusChange(student.id, 'present')}
                        loading={updateStatusMutation.isPending}
                      >
                        Present
                      </Button>
                      {trip.tripType === 'PICKUP' ? (
                        <Button
                          size="small"
                          type={status?.status === 'picked_up' ? 'primary' : 'default'}
                          icon={<UserOutlined />}
                          onClick={() => handleStatusChange(student.id, 'picked_up')}
                          loading={updateStatusMutation.isPending}
                        >
                          Pick Up
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          type={status?.status === 'dropped_off' ? 'primary' : 'default'}
                          icon={<HomeOutlined />}
                          onClick={() => handleStatusChange(student.id, 'dropped_off')}
                          loading={updateStatusMutation.isPending}
                        >
                          Drop Off
                        </Button>
                      )}
                      <Button
                        size="small"
                        type={status?.status === 'absent' ? 'primary' : 'default'}
                        icon={<CloseCircleOutlined />}
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        loading={updateStatusMutation.isPending}
                        danger={status?.status === 'absent'}
                      >
                        Absent
                      </Button>
                    </Space>
                  )
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Space>
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([...selectedStudents, student.id]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                          }
                        }}
                      />
                      <Avatar 
                        size={40} 
                        icon={<UserOutlined />}
                        style={{ backgroundColor: getStatusColor(status?.status || 'absent') }}
                      >
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </Avatar>
                    </Space>
                  }
                  title={
                    <Space>
                      <span>{formatFullName(student.firstName, student.lastName)}</span>
                      <Tag color={getStatusColor(status?.status || 'absent')} icon={getStatusIcon(status?.status || 'absent')}>
                        {status?.status?.replace('_', ' ').toUpperCase() || 'ABSENT'}
                      </Tag>
                      {student.medicalInfo && (
                        <Tag color="orange" icon={<MedicineBoxOutlined />}>
                          Medical
                        </Tag>
                      )}
                      {student.specialNeeds && (
                        <Tag color="purple" icon={<AlertOutlined />}>
                          Special Needs
                        </Tag>
                      )}
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size={2}>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Grade {student.grade} • Student ID: {student.studentId}
                      </div>
                      {student.pickupAddress && trip.tripType === 'PICKUP' && (
                        <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <EnvironmentOutlined />
                          Pickup: {student.pickupAddress}
                        </div>
                      )}
                      {student.dropoffAddress && trip.tripType === 'DROPOFF' && (
                        <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <EnvironmentOutlined />
                          Drop-off: {student.dropoffAddress}
                        </div>
                      )}
                      {student.guardians && student.guardians.length > 0 && (
                        <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <PhoneOutlined />
                          Guardian: {formatFullName(student.guardians[0].firstName, student.guardians[0].lastName)}
                          {student.guardians[0].phone && ` - ${student.guardians[0].phone}`}
                        </div>
                      )}
                      {status?.timestamp && (
                        <div style={{ fontSize: '12px', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ClockCircleOutlined />
                          Last updated: {new Date(status.timestamp).toLocaleTimeString()}
                        </div>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Card>

      {/* Bulk Status Update Modal */}
      <Modal
        title="Bulk Update Student Status"
        open={bulkStatusModal}
        onCancel={() => setBulkStatusModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleBulkStatusUpdate} layout="vertical">
          <Alert
            message={`Update status for ${selectedStudents.length} selected students`}
            type="info"
            style={{ marginBottom: '16px' }}
          />

          <Form.Item
            name="status"
            label="New Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Select status">
              <Option value="present">Present</Option>
              {trip.tripType === 'PICKUP' ? (
                <Option value="picked_up">Picked Up</Option>
              ) : (
                <Option value="dropped_off">Dropped Off</Option>
              )}
              <Option value="absent">Absent</Option>
            </Select>
          </Form.Item>

          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => setBulkStatusModal(false)}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={bulkUpdateMutation.isPending}
            >
              Update Status
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}