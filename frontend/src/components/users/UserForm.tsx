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
  Divider
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useCreateUser, useUpdateUser } from '@/hooks/useUsers';
import { useAuthStore } from '@/stores/authStore';
import type { User, CreateUserData, UpdateUserData } from '@/types/api';
import { USER_ROLES } from '@/constants/app';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
  onCancel: () => void;
  defaultRole?: string;
  roleDisabled?: boolean;
}

export default function UserForm({ 
  user, 
  onSuccess, 
  onCancel, 
  defaultRole,
  roleDisabled = false 
}: UserFormProps) {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const isEditing = !!user;

  const { user: currentUser } = useAuthStore();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const isLoading = createUserMutation.isPending || updateUserMutation.isPending;
  const canManageRoles = currentUser?.role === USER_ROLES.ADMIN;

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        isActive: user.isActive,
        emergencyContact: user.emergencyContact ? {
          name: user.emergencyContact.name,
          phone: user.emergencyContact.phone,
          relationship: user.emergencyContact.relationship,
        } : undefined,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : undefined,
        emergencyContact: values.emergencyContactName ? {
          name: values.emergencyContactName,
          phone: values.emergencyContactPhone,
          relationship: values.emergencyContactRelationship,
        } : undefined,
      };

      // Remove emergency contact fields from main object
      const { 
        emergencyContactName, 
        emergencyContactPhone, 
        emergencyContactRelationship,
        ...userData 
      } = formData;

      if (isEditing && user) {
        const updateData: UpdateUserData = userData;
        await updateUserMutation.mutateAsync({ id: user.id, data: updateData });
        message.success('User updated successfully');
      } else {
        const createData: CreateUserData = {
          ...userData,
          role: userData.role || USER_ROLES.PARENT,
        };
        await createUserMutation.mutateAsync(createData);
        message.success('User created successfully');
      }
      
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save user';
      message.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        isActive: user.isActive,
        emergencyContactName: user.emergencyContact?.name,
        emergencyContactPhone: user.emergencyContact?.phone,
        emergencyContactRelationship: user.emergencyContact?.relationship,
      });
    } else {
      form.resetFields();
    }
  };

  const roleOptions = [
    { label: 'Admin', value: USER_ROLES.ADMIN, description: 'Full system access' },
    { label: 'Teacher', value: USER_ROLES.TEACHER, description: 'Manage students and assignments' },
    { label: 'Driver', value: USER_ROLES.DRIVER, description: 'Manage trips and routes' },
    { label: 'Parent', value: USER_ROLES.PARENT, description: 'View child information' },
  ];

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit User' : 'Add New User'}
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ 
          role: defaultRole || USER_ROLES.PARENT,
          isActive: true 
        }}
        autoComplete="off"
      >
        {/* Basic Information */}
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
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
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
                disabled={isEditing} // Email shouldn't be changed after creation
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
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

        {!isEditing && (
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please enter password' },
                  { min: 8, message: 'Password must be at least 8 characters' }
                ]}
              >
                <Input.Password 
                  placeholder="Enter password"
                  size="large"
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="role"
              label="User Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select 
                placeholder="Select user role" 
                size="large"
                disabled={!canManageRoles || roleDisabled}
              >
                {roleOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{option.label}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{option.description}</div>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
            >
              <DatePicker 
                placeholder="Select date of birth"
                size="large"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current > dayjs().endOf('day')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { max: 200, message: 'Address must not exceed 200 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter address"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Emergency Contact Section */}
        <Divider>Emergency Contact</Divider>
        
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="emergencyContactName"
              label="Contact Name"
              rules={[
                { max: 100, message: 'Name must not exceed 100 characters' }
              ]}
            >
              <Input 
                placeholder="Emergency contact name"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="emergencyContactPhone"
              label="Contact Phone"
              rules={[
                { pattern: /^[+]?[\d\s\-\(\)]+$/, message: 'Please enter a valid phone number' }
              ]}
            >
              <Input 
                placeholder="Emergency contact phone"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              name="emergencyContactRelationship"
              label="Relationship"
              rules={[
                { max: 50, message: 'Relationship must not exceed 50 characters' }
              ]}
            >
              <Input 
                placeholder="Relationship (e.g., Spouse, Parent)"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Status */}
        {isEditing && (
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="isActive"
                label="Account Status"
                valuePropName="checked"
              >
                <Switch 
                  checkedChildren="Active" 
                  unCheckedChildren="Inactive"
                  size="default"
                />
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
              {isEditing ? 'Update User' : 'Create User'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}