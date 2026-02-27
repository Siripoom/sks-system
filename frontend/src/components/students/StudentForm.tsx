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
  Transfer
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined 
} from '@ant-design/icons';
import { useCreateStudent, useUpdateStudent } from '@/hooks/useStudents';
import { useSchools } from '@/hooks/useSchools';
import { useUsers } from '@/hooks/useUsers';
import type { Student, CreateStudentData, UpdateStudentData } from '@/types/api';
import { USER_ROLES } from '@/constants/app';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface StudentFormProps {
  student?: Student;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function StudentForm({ student, onSuccess, onCancel }: StudentFormProps) {
  const [form] = Form.useForm();
  const [selectedGuardians, setSelectedGuardians] = useState<string[]>([]);
  const isEditing = !!student;

  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  
  const { data: schoolsData } = useSchools({ limit: 100 });
  const { data: parentsData } = useUsers({ role: USER_ROLES.PARENT, limit: 100 });

  const isLoading = createStudentMutation.isPending || updateStudentMutation.isPending;

  useEffect(() => {
    if (student) {
      form.setFieldsValue({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        grade: student.grade,
        dateOfBirth: student.dateOfBirth ? dayjs(student.dateOfBirth) : null,
        schoolId: student.schoolId,
        address: student.address,
        pickupAddress: student.pickupAddress,
        dropoffAddress: student.dropoffAddress,
        medicalInfo: student.medicalInfo,
        specialNeeds: student.specialNeeds,
        isActive: student.isActive,
        emergencyContactName: student.emergencyContact?.name,
        emergencyContactPhone: student.emergencyContact?.phone,
        emergencyContactRelationship: student.emergencyContact?.relationship,
      });
      setSelectedGuardians(student.guardianIds || []);
    }
  }, [student, form]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : undefined,
        guardianIds: selectedGuardians,
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
        ...studentData 
      } = formData;

      if (isEditing && student) {
        const updateData: UpdateStudentData = studentData;
        await updateStudentMutation.mutateAsync({ id: student.id, data: updateData });
        message.success('Student updated successfully');
      } else {
        const createData: CreateStudentData = {
          ...studentData,
          isActive: studentData.isActive ?? true,
        };
        await createStudentMutation.mutateAsync(createData);
        message.success('Student created successfully');
      }
      
      form.resetFields();
      setSelectedGuardians([]);
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save student';
      message.error(errorMessage);
    }
  };

  const handleReset = () => {
    if (student) {
      form.setFieldsValue({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        grade: student.grade,
        dateOfBirth: student.dateOfBirth ? dayjs(student.dateOfBirth) : null,
        schoolId: student.schoolId,
        address: student.address,
        pickupAddress: student.pickupAddress,
        dropoffAddress: student.dropoffAddress,
        medicalInfo: student.medicalInfo,
        specialNeeds: student.specialNeeds,
        isActive: student.isActive,
        emergencyContactName: student.emergencyContact?.name,
        emergencyContactPhone: student.emergencyContact?.phone,
        emergencyContactRelationship: student.emergencyContact?.relationship,
      });
      setSelectedGuardians(student.guardianIds || []);
    } else {
      form.resetFields();
      setSelectedGuardians([]);
    }
  };

  const handleGuardianChange = (targetKeys: React.Key[]) => {
    setSelectedGuardians(targetKeys as string[]);
  };

  // Prepare guardian data for Transfer component
  const guardianDataSource = parentsData?.data?.items?.map(parent => ({
    key: parent.id,
    title: `${parent.firstName} ${parent.lastName}`,
    description: parent.email,
  })) || [];

  const gradeOptions = [
    { label: 'Kindergarten', value: 'K' },
    ...Array.from({ length: 12 }, (_, i) => ({
      label: `Grade ${i + 1}`,
      value: `${i + 1}`,
    })),
  ];

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ 
          isActive: true,
          grade: 'K'
        }}
        autoComplete="off"
      >
        {/* Basic Information */}
        <Divider>Basic Information</Divider>
        
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="studentId"
              label="Student ID"
              rules={[
                { required: true, message: 'Please enter student ID' },
                { pattern: /^[A-Z0-9]+$/i, message: 'Student ID can only contain letters and numbers' },
                { min: 3, message: 'Student ID must be at least 3 characters' },
                { max: 20, message: 'Student ID must not exceed 20 characters' }
              ]}
            >
              <Input 
                placeholder="Enter student ID"
                size="large"
                style={{ textTransform: 'uppercase' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
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

          <Col xs={24} sm={8}>
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
          <Col xs={24} sm={8}>
            <Form.Item
              name="grade"
              label="Grade"
              rules={[{ required: true, message: 'Please select grade' }]}
            >
              <Select placeholder="Select grade" size="large">
                {gradeOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
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

          <Col xs={24} sm={8}>
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

        {/* Address Information */}
        <Divider>Address Information</Divider>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              name="address"
              label="Home Address"
              rules={[
                { max: 200, message: 'Address must not exceed 200 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter home address"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="pickupAddress"
              label="Pickup Address"
              rules={[
                { max: 200, message: 'Pickup address must not exceed 200 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter pickup address (if different from home)"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="dropoffAddress"
              label="Drop-off Address"
              rules={[
                { max: 200, message: 'Drop-off address must not exceed 200 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter drop-off address (if different from home)"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Guardian Assignment */}
        <Divider>Guardian Assignment</Divider>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item
              label="Assigned Guardians"
              tooltip="Select parents/guardians who are authorized to make decisions for this student"
            >
              <Transfer
                dataSource={guardianDataSource}
                targetKeys={selectedGuardians}
                onChange={handleGuardianChange}
                render={item => item.title}
                titles={['Available Parents', 'Assigned Guardians']}
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

        {/* Emergency Contact */}
        <Divider>Emergency Contact</Divider>
        
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="emergencyContactName"
              label="Emergency Contact Name"
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
              label="Emergency Contact Phone"
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
                placeholder="Relationship (e.g., Grandmother, Family Friend)"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Medical & Special Information */}
        <Divider>Medical & Special Information</Divider>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="medicalInfo"
              label="Medical Information"
              rules={[
                { max: 1000, message: 'Medical info must not exceed 1000 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter any medical conditions, allergies, or important health information"
                rows={4}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="specialNeeds"
              label="Special Needs"
              rules={[
                { max: 1000, message: 'Special needs info must not exceed 1000 characters' }
              ]}
            >
              <TextArea 
                placeholder="Enter any special needs, accommodations, or learning requirements"
                rows={4}
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
                label="Student Status"
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
              {isEditing ? 'Update Student' : 'Create Student'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}