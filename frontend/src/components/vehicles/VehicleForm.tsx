'use client';

import { useEffect } from 'react';
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
  InputNumber,
  DatePicker
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined 
} from '@ant-design/icons';
import { useCreateVehicle, useUpdateVehicle } from '@/hooks/useVehicles';
import type { Vehicle, CreateVehicleData, UpdateVehicleData } from '@/types/api';
import { VEHICLE_STATUS, MAINTENANCE_STATUS } from '@/constants/app';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function VehicleForm({ vehicle, onSuccess, onCancel }: VehicleFormProps) {
  const [form] = Form.useForm();
  const isEditing = !!vehicle;

  const createVehicleMutation = useCreateVehicle();
  const updateVehicleMutation = useUpdateVehicle();

  const isLoading = createVehicleMutation.isPending || updateVehicleMutation.isPending;

  useEffect(() => {
    if (vehicle) {
      form.setFieldsValue({
        licensePlate: vehicle.licensePlate,
        model: vehicle.model,
        year: vehicle.year,
        capacity: vehicle.capacity,
        status: vehicle.status,
        maintenanceStatus: vehicle.maintenanceStatus,
        lastMaintenanceDate: vehicle.lastMaintenanceDate ? dayjs(vehicle.lastMaintenanceDate) : null,
        nextMaintenanceDate: vehicle.nextMaintenanceDate ? dayjs(vehicle.nextMaintenanceDate) : null,
        mileage: vehicle.mileage,
        notes: vehicle.notes,
      });
    }
  }, [vehicle, form]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        ...values,
        licensePlate: values.licensePlate.toUpperCase(),
        lastMaintenanceDate: values.lastMaintenanceDate ? values.lastMaintenanceDate.toISOString() : undefined,
        nextMaintenanceDate: values.nextMaintenanceDate ? values.nextMaintenanceDate.toISOString() : undefined,
      };

      if (isEditing && vehicle) {
        const updateData: UpdateVehicleData = formData;
        await updateVehicleMutation.mutateAsync({ id: vehicle.id, data: updateData });
        message.success('Vehicle updated successfully');
      } else {
        const createData: CreateVehicleData = {
          ...formData,
          status: formData.status || VEHICLE_STATUS.ACTIVE,
          maintenanceStatus: formData.maintenanceStatus || MAINTENANCE_STATUS.GOOD,
        };
        await createVehicleMutation.mutateAsync(createData);
        message.success('Vehicle created successfully');
      }
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save vehicle';
      message.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (vehicle) {
      form.setFieldsValue({
        licensePlate: vehicle.licensePlate,
        model: vehicle.model,
        year: vehicle.year,
        capacity: vehicle.capacity,
        status: vehicle.status,
        maintenanceStatus: vehicle.maintenanceStatus,
        lastMaintenanceDate: vehicle.lastMaintenanceDate ? dayjs(vehicle.lastMaintenanceDate) : null,
        nextMaintenanceDate: vehicle.nextMaintenanceDate ? dayjs(vehicle.nextMaintenanceDate) : null,
        mileage: vehicle.mileage,
        notes: vehicle.notes,
      });
    } else {
      form.resetFields();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ 
          status: VEHICLE_STATUS.ACTIVE, 
          maintenanceStatus: MAINTENANCE_STATUS.GOOD,
          year: currentYear 
        }}
        autoComplete="off"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="licensePlate"
              label="License Plate"
              rules={[
                { required: true, message: 'Please enter license plate' },
                { min: 2, message: 'License plate must be at least 2 characters' },
                { max: 20, message: 'License plate must not exceed 20 characters' },
                { pattern: /^[A-Z0-9\s-]+$/i, message: 'License plate can only contain letters, numbers, spaces, and hyphens' }
              ]}
            >
              <Input 
                placeholder="Enter license plate"
                size="large"
                style={{ textTransform: 'uppercase' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="model"
              label="Vehicle Model"
              rules={[
                { required: true, message: 'Please enter vehicle model' },
                { min: 2, message: 'Model must be at least 2 characters' },
                { max: 100, message: 'Model must not exceed 100 characters' }
              ]}
            >
              <Input 
                placeholder="Enter vehicle model"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="year"
              label="Year"
              rules={[
                { required: true, message: 'Please enter year' },
                { type: 'number', min: 1990, message: 'Year must be 1990 or later' },
                { type: 'number', max: currentYear + 1, message: 'Year cannot be more than next year' }
              ]}
            >
              <InputNumber 
                placeholder="Enter year"
                size="large"
                style={{ width: '100%' }}
                min={1990}
                max={currentYear + 1}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="capacity"
              label="Passenger Capacity"
              rules={[
                { required: true, message: 'Please enter capacity' },
                { type: 'number', min: 1, message: 'Capacity must be at least 1' },
                { type: 'number', max: 150, message: 'Capacity cannot exceed 150' }
              ]}
            >
              <InputNumber 
                placeholder="Enter capacity"
                size="large"
                style={{ width: '100%' }}
                min={1}
                max={150}
                addonAfter="passengers"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="mileage"
              label="Current Mileage"
              rules={[
                { type: 'number', min: 0, message: 'Mileage must be 0 or greater' }
              ]}
            >
              <InputNumber 
                placeholder="Enter mileage"
                size="large"
                style={{ width: '100%' }}
                min={0}
                addonAfter="miles"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="status"
              label="Vehicle Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select vehicle status" size="large">
                <Option value={VEHICLE_STATUS.ACTIVE}>Active</Option>
                <Option value={VEHICLE_STATUS.INACTIVE}>Inactive</Option>
                <Option value={VEHICLE_STATUS.MAINTENANCE}>Maintenance</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="maintenanceStatus"
              label="Maintenance Status"
              rules={[{ required: true, message: 'Please select maintenance status' }]}
            >
              <Select placeholder="Select maintenance status" size="large">
                <Option value={MAINTENANCE_STATUS.GOOD}>Good Condition</Option>
                <Option value={MAINTENANCE_STATUS.NEEDS_ATTENTION}>Needs Attention</Option>
                <Option value={MAINTENANCE_STATUS.CRITICAL}>Critical</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastMaintenanceDate"
              label="Last Maintenance Date"
            >
              <DatePicker 
                placeholder="Select last maintenance date"
                size="large"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current > dayjs().endOf('day')}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="nextMaintenanceDate"
              label="Next Maintenance Date"
            >
              <DatePicker 
                placeholder="Select next maintenance date"
                size="large"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              name="notes"
              label="Notes"
              rules={[
                { max: 1000, message: 'Notes must not exceed 1000 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter any additional notes about the vehicle"
                rows={4}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

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
              {isEditing ? 'Update Vehicle' : 'Create Vehicle'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}