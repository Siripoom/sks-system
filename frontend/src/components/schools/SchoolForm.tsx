'use client';

import { useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Switch, 
  Row, 
  Col, 
  message,
  Card,
  Typography
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined 
} from '@ant-design/icons';
import { useCreateSchool, useUpdateSchool } from '@/hooks/useSchools';
import type { School, CreateSchoolData, UpdateSchoolData } from '@/types/api';

const { Title } = Typography;
const { TextArea } = Input;

interface SchoolFormProps {
  school?: School;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SchoolForm({ school, onSuccess, onCancel }: SchoolFormProps) {
  const [form] = Form.useForm();
  const isEditing = !!school;

  const createSchoolMutation = useCreateSchool();
  const updateSchoolMutation = useUpdateSchool();

  const isLoading = createSchoolMutation.isPending || updateSchoolMutation.isPending;

  useEffect(() => {
    if (school) {
      form.setFieldsValue({
        name: school.name,
        code: school.code,
        address: school.address,
        phone: school.phone,
        email: school.email,
        description: school.description,
        isActive: school.isActive,
      });
    }
  }, [school, form]);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing && school) {
        const updateData: UpdateSchoolData = {
          ...values,
        };
        await updateSchoolMutation.mutateAsync({ id: school.id, data: updateData });
        message.success('School updated successfully');
      } else {
        const createData: CreateSchoolData = {
          ...values,
          isActive: values.isActive ?? true,
        };
        await createSchoolMutation.mutateAsync(createData);
        message.success('School created successfully');
      }
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save school';
      message.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (school) {
      form.setFieldsValue({
        name: school.name,
        code: school.code,
        address: school.address,
        phone: school.phone,
        email: school.email,
        description: school.description,
        isActive: school.isActive,
      });
    } else {
      form.resetFields();
    }
  };

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit School' : 'Add New School'}
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ isActive: true }}
        autoComplete="off"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="School Name"
              rules={[
                { required: true, message: 'Please enter school name' },
                { min: 2, message: 'School name must be at least 2 characters' },
                { max: 100, message: 'School name must not exceed 100 characters' }
              ]}
            >
              <Input 
                placeholder="Enter school name"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="code"
              label="School Code"
              rules={[
                { max: 20, message: 'School code must not exceed 20 characters' },
                { pattern: /^[A-Z0-9]*$/, message: 'School code must contain only uppercase letters and numbers' }
              ]}
            >
              <Input 
                placeholder="Enter school code (optional)"
                size="large"
                style={{ textTransform: 'uppercase' }}
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
                { max: 500, message: 'Address must not exceed 500 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter school address"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { pattern: /^[+]?[\d\s\-\(\)]+$/, message: 'Please enter a valid phone number' },
                { max: 20, message: 'Phone number must not exceed 20 characters' }
              ]}
            >
              <Input 
                placeholder="Enter phone number"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: 'email', message: 'Please enter a valid email address' },
                { max: 100, message: 'Email must not exceed 100 characters' }
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
              name="description"
              label="Description"
              rules={[
                { max: 1000, message: 'Description must not exceed 1000 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter school description (optional)"
                rows={4}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              name="isActive"
              label="Status"
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
              {isEditing ? 'Update School' : 'Create School'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}