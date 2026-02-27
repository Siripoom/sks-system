'use client';

import { useEffect, useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  Row, 
  Col, 
  message,
  Card,
  Typography,
  DatePicker,
  Switch,
  Divider,
  TimePicker,
  Checkbox,
  InputNumber,
  Space,
  Alert
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined,
  ScheduleOutlined,
  CarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useCreateTrip, useUpdateTrip, useCreateRecurringTrips } from '@/hooks/useTrips';
import { useRoutes } from '@/hooks/useRoutes';
import { useVehicles } from '@/hooks/useVehicles';
import { useUsers } from '@/hooks/useUsers';
import type { Trip, CreateTripData, UpdateTripData, TripType } from '@/types/api';
import { USER_ROLES } from '@/constants/app';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface TripFormProps {
  trip?: Trip;
  onSuccess: () => void;
  onCancel: () => void;
}

interface RecurringPattern {
  type: 'daily' | 'weekly' | 'custom';
  daysOfWeek: number[];
  endDate: dayjs.Dayjs | null;
  excludeDates: dayjs.Dayjs[];
}

export default function TripForm({ trip, onSuccess, onCancel }: TripFormProps) {
  const [form] = Form.useForm();
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPattern, setRecurringPattern] = useState<RecurringPattern>({
    type: 'weekly',
    daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
    endDate: null,
    excludeDates: [],
  });
  const isEditing = !!trip;

  const createTripMutation = useCreateTrip();
  const updateTripMutation = useUpdateTrip();
  const createRecurringMutation = useCreateRecurringTrips();
  
  const { data: routesData } = useRoutes({ limit: 100, isActive: true });
  const { data: vehiclesData } = useVehicles({ status: 'ACTIVE', limit: 100 });
  const { data: driversData } = useUsers({ role: USER_ROLES.DRIVER, limit: 100 });

  const isLoading = createTripMutation.isPending || updateTripMutation.isPending || createRecurringMutation.isPending;

  useEffect(() => {
    if (trip) {
      form.setFieldsValue({
        routeId: trip.routeId,
        vehicleId: trip.vehicleId,
        driverId: trip.driverId,
        tripType: trip.tripType,
        scheduledDate: dayjs(trip.scheduledTime),
        scheduledTime: dayjs(trip.scheduledTime),
        status: trip.status,
      });
    }
  }, [trip, form]);

  const handleSubmit = async (values: any) => {
    try {
      const scheduledDateTime = values.scheduledDate
        .hour(values.scheduledTime.hour())
        .minute(values.scheduledTime.minute())
        .second(0)
        .millisecond(0);

      if (isRecurring && !isEditing) {
        // Create recurring trips
        const recurringData = {
          routeId: values.routeId,
          vehicleId: values.vehicleId,
          driverId: values.driverId,
          tripType: values.tripType as TripType,
          scheduledTime: scheduledDateTime.toISOString(),
          recurringPattern: {
            type: recurringPattern.type,
            daysOfWeek: recurringPattern.daysOfWeek,
            endDate: recurringPattern.endDate?.toISOString() || '',
            excludeDates: recurringPattern.excludeDates.map(date => date.toISOString()),
          },
        };

        await createRecurringMutation.mutateAsync(recurringData);
        message.success('Recurring trips created successfully');
      } else {
        const formData = {
          routeId: values.routeId,
          vehicleId: values.vehicleId,
          driverId: values.driverId,
          tripType: values.tripType,
          scheduledTime: scheduledDateTime.toISOString(),
          status: values.status,
        };

        if (isEditing && trip) {
          const updateData: UpdateTripData = formData;
          await updateTripMutation.mutateAsync({ id: trip.id, data: updateData });
          message.success('Trip updated successfully');
        } else {
          const createData: CreateTripData = {
            ...formData,
            status: 'SCHEDULED',
          };
          await createTripMutation.mutateAsync(createData);
          message.success('Trip scheduled successfully');
        }
      }
      
      form.resetFields();
      setIsRecurring(false);
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save trip';
      message.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (trip) {
      form.setFieldsValue({
        routeId: trip.routeId,
        vehicleId: trip.vehicleId,
        driverId: trip.driverId,
        tripType: trip.tripType,
        scheduledDate: dayjs(trip.scheduledTime),
        scheduledTime: dayjs(trip.scheduledTime),
        status: trip.status,
      });
    } else {
      form.resetFields();
    }
    setIsRecurring(false);
  };

  const handleRecurringChange = (checked: boolean) => {
    setIsRecurring(checked);
    if (checked) {
      // Set default end date to 3 months from now
      setRecurringPattern(prev => ({
        ...prev,
        endDate: dayjs().add(3, 'month'),
      }));
    }
  };

  const weekdays = [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
    { label: 'Sunday', value: 0 },
  ];

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit Trip' : 'Schedule New Trip'}
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ 
          tripType: 'PICKUP',
          scheduledDate: dayjs(),
          scheduledTime: dayjs().hour(8).minute(0),
          status: 'SCHEDULED',
        }}
        autoComplete="off"
      >
        {/* Basic Trip Information */}
        <Divider>Trip Information</Divider>
        
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="routeId"
              label="Route"
              rules={[{ required: true, message: 'Please select route' }]}
            >
              <Select 
                placeholder="Select route"
                size="large"
                suffixIcon={<EnvironmentOutlined />}
              >
                {routesData?.data?.items?.map(route => (
                  <Option key={route.id} value={route.id}>
                    <Space>
                      <EnvironmentOutlined />
                      {route.routeName}
                      {route.school && <span style={{ color: '#666' }}>- {route.school.name}</span>}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="tripType"
              label="Trip Type"
              rules={[{ required: true, message: 'Please select trip type' }]}
            >
              <Select placeholder="Select trip type" size="large">
                <Option value="PICKUP">
                  <Space>
                    <CarOutlined style={{ color: '#52c41a' }} />
                    Pickup
                  </Space>
                </Option>
                <Option value="DROPOFF">
                  <Space>
                    <CarOutlined style={{ color: '#1890ff' }} />
                    Drop-off
                  </Space>
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Assignment Information */}
        <Divider>Assignment</Divider>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="vehicleId"
              label="Vehicle"
              rules={[{ required: true, message: 'Please select vehicle' }]}
            >
              <Select 
                placeholder="Select vehicle"
                size="large"
                suffixIcon={<CarOutlined />}
              >
                {vehiclesData?.data?.items?.map(vehicle => (
                  <Option key={vehicle.id} value={vehicle.id}>
                    <Space>
                      <CarOutlined />
                      {vehicle.licensePlate} - {vehicle.model}
                      <span style={{ color: '#666' }}>({vehicle.capacity} seats)</span>
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="driverId"
              label="Driver"
              rules={[{ required: true, message: 'Please select driver' }]}
            >
              <Select 
                placeholder="Select driver"
                size="large"
                suffixIcon={<UserOutlined />}
              >
                {driversData?.data?.items?.map(driver => (
                  <Option key={driver.id} value={driver.id}>
                    <Space>
                      <UserOutlined />
                      {`${driver.firstName} ${driver.lastName}`}
                      {driver.phone && <span style={{ color: '#666' }}>- {driver.phone}</span>}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Scheduling Information */}
        <Divider>Scheduling</Divider>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="scheduledDate"
              label="Scheduled Date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker 
                placeholder="Select date"
                size="large"
                style={{ width: '100%' }}
                suffixIcon={<CalendarOutlined />}
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="scheduledTime"
              label="Scheduled Time"
              rules={[{ required: true, message: 'Please select time' }]}
            >
              <TimePicker 
                placeholder="Select time"
                size="large"
                style={{ width: '100%' }}
                suffixIcon={<ClockCircleOutlined />}
                format="HH:mm"
                minuteStep={15}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Recurring Trips - Only for new trips */}
        {!isEditing && (
          <>
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item>
                  <Checkbox 
                    checked={isRecurring}
                    onChange={(e) => handleRecurringChange(e.target.checked)}
                  >
                    <Space>
                      <ReloadOutlined />
                      Create recurring trips
                    </Space>
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>

            {isRecurring && (
              <Card size="small" style={{ backgroundColor: '#f8f9fa', marginBottom: '16px' }}>
                <Title level={5}>Recurring Pattern</Title>
                
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={8}>
                    <Form.Item label="Repeat Type">
                      <Select
                        value={recurringPattern.type}
                        onChange={(value) => setRecurringPattern(prev => ({ ...prev, type: value }))}
                        size="large"
                      >
                        <Option value="daily">Daily</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="custom">Custom</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item label="End Date">
                      <DatePicker
                        value={recurringPattern.endDate}
                        onChange={(date) => setRecurringPattern(prev => ({ ...prev, endDate: date }))}
                        size="large"
                        style={{ width: '100%' }}
                        disabledDate={(current) => current && current <= dayjs()}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {(recurringPattern.type === 'weekly' || recurringPattern.type === 'custom') && (
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Days of Week">
                        <Checkbox.Group
                          options={weekdays}
                          value={recurringPattern.daysOfWeek}
                          onChange={(values) => setRecurringPattern(prev => ({ 
                            ...prev, 
                            daysOfWeek: values as number[] 
                          }))}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                <Alert
                  message="Recurring Trip Preview"
                  description={`This will create ${
                    recurringPattern.type === 'daily' ? 'daily' : 
                    recurringPattern.type === 'weekly' ? 'weekly' : 'custom'
                  } trips from ${form.getFieldValue('scheduledDate')?.format('MMM DD, YYYY') || 'selected date'} to ${
                    recurringPattern.endDate?.format('MMM DD, YYYY') || 'end date'
                  }${
                    recurringPattern.daysOfWeek.length > 0 && recurringPattern.type !== 'daily' 
                      ? ` on ${recurringPattern.daysOfWeek.map(day => weekdays.find(w => w.value === day)?.label).join(', ')}`
                      : ''
                  }.`}
                  type="info"
                  showIcon
                />
              </Card>
            )}
          </>
        )}

        {/* Trip Status - Only for editing */}
        {isEditing && (
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="status"
                label="Trip Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status" size="large">
                  <Option value="SCHEDULED">Scheduled</Option>
                  <Option value="IN_PROGRESS">In Progress</Option>
                  <Option value="COMPLETED">Completed</Option>
                  <Option value="CANCELLED">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={[16, 16]} justify="end" style={{ marginTop: '32px' }}>
          <Col>
            <Button 
              onClick={onCancel}
              size="large"
            >
              <CloseOutlined />
              Cancel
            </Button>
          </Col>
          <Col>
            <Button 
              onClick={handleReset}
              size="large"
            >
              Reset
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={isLoading}
              size="large"
            >
              <SaveOutlined />
              {isRecurring && !isEditing 
                ? 'Create Recurring Trips' 
                : isEditing 
                  ? 'Update Trip' 
                  : 'Schedule Trip'
              }
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}