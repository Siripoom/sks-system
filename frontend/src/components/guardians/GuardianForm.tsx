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
  Divider,
  Transfer
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined,
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useCreateGuardian, useUpdateGuardian, useAvailableStudents } from '@/hooks/useGuardians';
import type { Guardian, CreateGuardianData, UpdateGuardianData } from '@/types/api';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface GuardianFormProps {
  guardian?: Guardian;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function GuardianForm({ guardian, onSuccess, onCancel }: GuardianFormProps) {
  const [form] = Form.useForm();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const isEditing = !!guardian;

  const createGuardianMutation = useCreateGuardian();
  const updateGuardianMutation = useUpdateGuardian();
  
  const { data: availableStudentsData } = useAvailableStudents(guardian?.id);

  const isLoading = createGuardianMutation.isPending || updateGuardianMutation.isPending;

  useEffect(() => {
    if (guardian) {
      form.setFieldsValue({
        firstName: guardian.firstName,
        lastName: guardian.lastName,
        relationship: guardian.relationship,
        phone: guardian.phone,
        email: guardian.email,
        address: guardian.address,
      });
      // Note: Student assignments would be managed separately
      setSelectedStudents([]);
    }
  }, [guardian, form]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        relationship: values.relationship,
        phone: values.phone,
        email: values.email,
        address: values.address,
      };

      if (isEditing && guardian) {
        const updateData: UpdateGuardianData = formData;
        await updateGuardianMutation.mutateAsync({ id: guardian.id, data: updateData });
        message.success('Guardian updated successfully');
      } else {
        const createData: CreateGuardianData = formData;
        await createGuardianMutation.mutateAsync(createData);
        message.success('Guardian created successfully');
      }
      
      form.resetFields();
      setSelectedStudents([]);
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save guardian';
      message.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (guardian) {
      form.setFieldsValue({
        firstName: guardian.firstName,
        lastName: guardian.lastName,
        relationship: guardian.relationship,
        phone: guardian.phone,
        email: guardian.email,
        address: guardian.address,
      });
      setSelectedStudents([]);
    } else {
      form.resetFields();
      setSelectedStudents([]);
    }
  };

  const handleStudentChange = (targetKeys: React.Key[]) => {
    setSelectedStudents(targetKeys as string[]);
  };

  // Prepare student data for Transfer component
  const studentDataSource = availableStudentsData?.data?.items?.map(student => ({
    key: student.id,
    title: `${student.firstName} ${student.lastName}`,
    description: `Grade ${student.grade} - ${student.school?.name || 'No School'}`,
  })) || [];

  const relationshipOptions = [
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Grandmother', value: 'Grandmother' },
    { label: 'Grandfather', value: 'Grandfather' },
    { label: 'Aunt', value: 'Aunt' },
    { label: 'Uncle', value: 'Uncle' },
    { label: 'Guardian', value: 'Guardian' },
    { label: 'Foster Parent', value: 'Foster Parent' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit Guardian' : 'Add New Guardian'}
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {/* Basic Information */}
        <Divider>Basic Information</Divider>
        
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: 'Please enter first name' },
                { min: 2, message: 'First name must be at least 2 characters' },
                { max: 50, message: 'First name must not exceed 50 characters' }
              ]}
            >
              <Input 
                placeholder="Enter first name"
                size="large"
                prefix={<UserOutlined />}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: 'Please enter last name' },
                { min: 2, message: 'Last name must be at least 2 characters' },
                { max: 50, message: 'Last name must not exceed 50 characters' }
              ]}
            >
              <Input 
                placeholder="Enter last name"
                size="large"
                prefix={<UserOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="relationship"
              label="Relationship"
              rules={[{ required: true, message: 'Please select relationship' }]}
            >
              <Select placeholder="Select relationship" size="large">
                {relationshipOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please enter phone number' },
                { pattern: /^[+]?[\d\s\-\(\)]+$/, message: 'Please enter a valid phone number' }
              ]}
            >
              <Input 
                placeholder="Enter phone number"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Contact Information */}
        <Divider>Contact Information</Divider>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter email address' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input 
                placeholder="Enter email address"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Home Address"
              rules={[
                { required: true, message: 'Please enter address' },
                { max: 200, message: 'Address must not exceed 200 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter complete home address"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Student Assignment - Only shown for new guardians or as info for existing */}
        {!isEditing && (
          <>
            <Divider>Student Assignment</Divider>
            
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item
                  label="Assign Students"
                  tooltip="Select students this guardian will be responsible for"
                >
                  <Transfer
                    dataSource={studentDataSource}
                    targetKeys={selectedStudents}
                    onChange={handleStudentChange}
                    render={item => item.title}
                    titles={['Available Students', 'Assigned Students']}
                    listStyle={{ width: '45%', height: 300 }}
                    showSearch
                    filterOption={(inputValue, item) =>
                      item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
                      item.description.toLowerCase().includes(inputValue.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        {isEditing && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#f0f2f5', 
            borderRadius: '6px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <TeamOutlined />
              <span style={{ fontWeight: 500 }}>Student Management</span>
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Student assignments for existing guardians are managed through the Student Management section 
              or the Guardian Details view.
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
              {isEditing ? 'Update Guardian' : 'Create Guardian'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}