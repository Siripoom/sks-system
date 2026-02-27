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
  InputNumber,
  Switch,
  Divider,
  List,
  Modal,
  Space,
  Table
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DragOutlined,
  AimOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useCreateRoute, useUpdateRoute, useRouteStops, useCreateStop, useUpdateStop, useDeleteStop, useReorderStops } from '@/hooks/useRoutes';
import { useSchools } from '@/hooks/useSchools';
import type { Route, CreateRouteData, UpdateRouteData, Stop, CreateStopData, UpdateStopData } from '@/types/api';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface RouteFormProps {
  route?: Route;
  onSuccess: () => void;
  onCancel: () => void;
}

interface StopFormData {
  name: string;
  address: string;
  estimatedArrival?: string;
}

export default function RouteForm({ route, onSuccess, onCancel }: RouteFormProps) {
  const [form] = Form.useForm();
  const [stopModalVisible, setStopModalVisible] = useState(false);
  const [editingStop, setEditingStop] = useState<Stop | null>(null);
  const [stopForm] = Form.useForm();
  const isEditing = !!route;

  const createRouteMutation = useCreateRoute();
  const updateRouteMutation = useUpdateRoute();
  const { data: stopsData } = useRouteStops(route?.id || '');
  const createStopMutation = useCreateStop();
  const updateStopMutation = useUpdateStop();
  const deleteStopMutation = useDeleteStop();
  const reorderStopsMutation = useReorderStops();
  
  const { data: schoolsData } = useSchools({ limit: 100 });

  const isLoading = createRouteMutation.isPending || updateRouteMutation.isPending;
  const stops = stopsData?.data?.items || [];

  useEffect(() => {
    if (route) {
      form.setFieldsValue({
        routeName: route.routeName,
        description: route.description,
        schoolId: route.schoolId,
        distance: route.distance,
        estimatedDuration: route.estimatedDuration ? Math.round(route.estimatedDuration / 60) : undefined,
        isActive: route.isActive,
      });
    }
  }, [route, form]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        routeName: values.routeName,
        description: values.description,
        schoolId: values.schoolId,
        distance: values.distance,
        estimatedDuration: values.estimatedDuration ? values.estimatedDuration * 60 : undefined,
        isActive: values.isActive,
      };

      if (isEditing && route) {
        const updateData: UpdateRouteData = formData;
        await updateRouteMutation.mutateAsync({ id: route.id, data: updateData });
        message.success('Route updated successfully');
      } else {
        const createData: CreateRouteData = {
          ...formData,
          isActive: formData.isActive ?? true,
        };
        await createRouteMutation.mutateAsync(createData);
        message.success('Route created successfully');
      }
      
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save route';
      message.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (route) {
      form.setFieldsValue({
        routeName: route.routeName,
        description: route.description,
        schoolId: route.schoolId,
        distance: route.distance,
        estimatedDuration: route.estimatedDuration ? Math.round(route.estimatedDuration / 60) : undefined,
        isActive: route.isActive,
      });
    } else {
      form.resetFields();
    }
  };

  const handleAddStop = () => {
    setEditingStop(null);
    stopForm.resetFields();
    setStopModalVisible(true);
  };

  const handleEditStop = (stop: Stop) => {
    setEditingStop(stop);
    stopForm.setFieldsValue({
      name: stop.name,
      address: stop.address,
      estimatedArrival: stop.estimatedArrival,
    });
    setStopModalVisible(true);
  };

  const handleDeleteStop = async (stopId: string, stopName: string) => {
    if (!route) return;
    
    try {
      await deleteStopMutation.mutateAsync({ stopId, routeId: route.id });
      message.success(`Stop "${stopName}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete stop');
    }
  };

  const handleStopSubmit = async (values: StopFormData) => {
    if (!route) {
      message.error('Please save the route first before adding stops');
      return;
    }

    try {
      const stopData = {
        ...values,
        routeId: route.id,
        stopOrder: editingStop ? editingStop.stopOrder : stops.length + 1,
        isActive: true,
      };

      if (editingStop) {
        await updateStopMutation.mutateAsync({ 
          id: editingStop.id, 
          data: stopData as UpdateStopData 
        });
        message.success('Stop updated successfully');
      } else {
        await createStopMutation.mutateAsync(stopData as CreateStopData);
        message.success('Stop added successfully');
      }

      setStopModalVisible(false);
      stopForm.resetFields();
      setEditingStop(null);
    } catch (error) {
      message.error('Failed to save stop');
    }
  };

  const stopColumns = [
    {
      title: 'Order',
      dataIndex: 'stopOrder',
      width: 80,
      render: (order: number) => (
        <div style={{ 
          width: 24, 
          height: 24, 
          borderRadius: '50%', 
          backgroundColor: '#1890ff', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 500
        }}>
          {order}
        </div>
      ),
    },
    {
      title: 'Stop Name',
      dataIndex: 'name',
      render: (name: string) => (
        <div style={{ fontWeight: 500 }}>{name}</div>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (address: string) => (
        <div style={{ fontSize: '12px', color: '#666' }}>{address}</div>
      ),
    },
    {
      title: 'Estimated Arrival',
      dataIndex: 'estimatedArrival',
      render: (time: string) => (
        time ? (
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ClockCircleOutlined />
            {time}
          </div>
        ) : (
          <span style={{ color: '#999', fontStyle: 'italic' }}>Not set</span>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Stop) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditStop(record)}
            size="small"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteStop(record.id, record.name)}
            danger
            size="small"
            loading={deleteStopMutation.isPending}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ margin: 0 }}>
            {isEditing ? 'Edit Route' : 'Add New Route'}
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ 
            isActive: true,
          }}
          autoComplete="off"
        >
          {/* Basic Information */}
          <Divider>Basic Information</Divider>
          
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="routeName"
                label="Route Name"
                rules={[
                  { required: true, message: 'Please enter route name' },
                  { min: 3, message: 'Route name must be at least 3 characters' },
                  { max: 100, message: 'Route name must not exceed 100 characters' }
                ]}
              >
                <Input 
                  placeholder="Enter route name"
                  size="large"
                  prefix={<EnvironmentOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="schoolId"
                label="School"
                rules={[{ required: true, message: 'Please select school' }]}
              >
                <Select placeholder="Select school" size="large">
                  {schoolsData?.data?.items?.map(school => (
                    <Option key={school.id} value={school.id}>
                      {school.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { max: 500, message: 'Description must not exceed 500 characters' }
                ]}
              >
                <TextArea 
                  placeholder="Enter route description (optional)"
                  rows={3}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Route Details */}
          <Divider>Route Details</Divider>

          <Row gutter={[16, 0]}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="distance"
                label="Distance (km)"
                rules={[
                  { type: 'number', min: 0, message: 'Distance must be positive' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter distance"
                  size="large"
                  style={{ width: '100%' }}
                  precision={2}
                  min={0}
                  addonAfter="km"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="estimatedDuration"
                label="Estimated Duration (minutes)"
                rules={[
                  { type: 'number', min: 1, message: 'Duration must be at least 1 minute' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter duration"
                  size="large"
                  style={{ width: '100%' }}
                  min={1}
                  addonAfter="min"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                name="isActive"
                label="Route Status"
                valuePropName="checked"
              >
                <Switch 
                  checkedChildren="Active" 
                  unCheckedChildren="Inactive"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Stops Management - Only for editing existing routes */}
          {isEditing && route && (
            <>
              <Divider>Route Stops</Divider>
              
              <div style={{ marginBottom: '16px' }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={5} style={{ margin: 0 }}>
                      Stops ({stops.length})
                    </Title>
                  </Col>
                  <Col>
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />} 
                      onClick={handleAddStop}
                    >
                      Add Stop
                    </Button>
                  </Col>
                </Row>
              </div>

              <Table
                dataSource={stops}
                columns={stopColumns}
                rowKey="id"
                pagination={false}
                size="small"
                locale={{ emptyText: 'No stops added yet. Click "Add Stop" to get started.' }}
              />
            </>
          )}

          {!isEditing && (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#f0f2f5', 
              borderRadius: '6px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <AimOutlined />
                <span style={{ fontWeight: 500 }}>Stop Management</span>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                You can add and manage stops after creating the route.
              </div>
            </div>
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
                {isEditing ? 'Update Route' : 'Create Route'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Stop Form Modal */}
      <Modal
        title={editingStop ? 'Edit Stop' : 'Add New Stop'}
        open={stopModalVisible}
        onCancel={() => {
          setStopModalVisible(false);
          setEditingStop(null);
          stopForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={stopForm}
          layout="vertical"
          onFinish={handleStopSubmit}
        >
          <Form.Item
            name="name"
            label="Stop Name"
            rules={[
              { required: true, message: 'Please enter stop name' },
              { max: 100, message: 'Stop name must not exceed 100 characters' }
            ]}
          >
            <Input 
              placeholder="Enter stop name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: 'Please enter address' },
              { max: 200, message: 'Address must not exceed 200 characters' }
            ]}
          >
            <TextArea 
              placeholder="Enter full address"
              rows={3}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="estimatedArrival"
            label="Estimated Arrival Time"
          >
            <Input 
              placeholder="e.g., 08:30 AM"
              size="large"
            />
          </Form.Item>

          <Row gutter={[16, 16]} justify="end" style={{ marginTop: '24px' }}>
            <Col>
              <Button onClick={() => {
                setStopModalVisible(false);
                setEditingStop(null);
                stopForm.resetFields();
              }}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={createStopMutation.isPending || updateStopMutation.isPending}
              >
                {editingStop ? 'Update Stop' : 'Add Stop'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}