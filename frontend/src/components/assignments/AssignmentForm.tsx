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
  DatePicker,
  Alert,
  Steps,
  Space,
  List,
  Avatar,
  Tag,
  Tooltip,
  AutoComplete,
  Spin,
  Empty
} from 'antd';
import { 
  SaveOutlined, 
  CloseOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  SwapOutlined
} from '@ant-design/icons';
import { 
  useCreateAssignment, 
  useUpdateAssignment,
  useValidateAssignment,
  useAssignStudentToRoute
} from '@/hooks/useAssignments';
import { useStudents } from '@/hooks/useStudents';
import { useRoutes, useRouteStops } from '@/hooks/useRoutes';
import { useSchools } from '@/hooks/useSchools';
import type { Assignment, CreateAssignmentData, Student, Route, Stop } from '@/types/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface AssignmentFormProps {
  assignment?: Assignment;
  onSuccess: () => void;
  onCancel: () => void;
  preselectedStudent?: Student;
  preselectedRoute?: Route;
}

export default function AssignmentForm({ 
  assignment, 
  onSuccess, 
  onCancel, 
  preselectedStudent,
  preselectedRoute 
}: AssignmentFormProps) {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(preselectedStudent || null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(preselectedRoute || null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [schoolFilter, setSchoolFilter] = useState('');
  
  const isEditing = !!assignment;

  // Queries
  const { data: studentsData, isLoading: studentsLoading } = useStudents({ 
    limit: 100,
    schoolId: schoolFilter 
  });
  const { data: routesData, isLoading: routesLoading } = useRoutes({ 
    limit: 100,
    schoolId: schoolFilter 
  });
  const { data: schoolsData } = useSchools({ limit: 100 });
  const { data: stopsData } = useRouteStops(selectedRoute?.id || '');

  // Mutations
  const createMutation = useCreateAssignment();
  const updateMutation = useUpdateAssignment();
  const validateMutation = useValidateAssignment();
  const assignStudentMutation = useAssignStudentToRoute();

  const students = studentsData?.data?.items || [];
  const routes = routesData?.data?.items || [];
  const schools = schoolsData?.data?.items || [];
  const stops = stopsData?.data?.items || [];
  
  const isLoading = createMutation.isPending || updateMutation.isPending || assignStudentMutation.isPending;

  useEffect(() => {
    if (assignment) {
      setSelectedStudent(assignment.student || null);
      setSelectedRoute(assignment.route || null);
      setSelectedStop(assignment.stop || null);
      setCurrentStep(2); // Go directly to confirmation for editing
      
      form.setFieldsValue({
        studentId: assignment.studentId,
        routeId: assignment.routeId,
        stopId: assignment.stopId,
        assignmentDate: assignment.assignmentDate ? dayjs(assignment.assignmentDate) : null,
        status: assignment.status,
      });
    }
  }, [assignment, form]);

  useEffect(() => {
    if (preselectedStudent) {
      setSelectedStudent(preselectedStudent);
      form.setFieldValue('studentId', preselectedStudent.id);
      if (preselectedStudent.school?.id) {
        setSchoolFilter(preselectedStudent.school.id);
      }
    }
  }, [preselectedStudent, form]);

  useEffect(() => {
    if (preselectedRoute) {
      setSelectedRoute(preselectedRoute);
      form.setFieldValue('routeId', preselectedRoute.id);
    }
  }, [preselectedRoute, form]);

  const handleStudentSelect = (value: string) => {
    const student = students.find(s => s.id === value);
    setSelectedStudent(student || null);
    
    // Auto-set school filter based on selected student
    if (student?.school?.id && student.school.id !== schoolFilter) {
      setSchoolFilter(student.school.id);
    }
    
    // Reset route and stop when student changes
    if (!preselectedRoute) {
      setSelectedRoute(null);
      setSelectedStop(null);
      form.setFieldValue('routeId', undefined);
      form.setFieldValue('stopId', undefined);
    }
  };

  const handleRouteSelect = (value: string) => {
    const route = routes.find(r => r.id === value);
    setSelectedRoute(route || null);
    
    // Reset stop when route changes
    setSelectedStop(null);
    form.setFieldValue('stopId', undefined);
  };

  const handleStopSelect = (value: string) => {
    const stop = stops.find(s => s.id === value);
    setSelectedStop(stop || null);
  };

  const validateAssignment = async () => {
    if (!selectedStudent || !selectedRoute || !selectedStop) return;

    try {
      const result = await validateMutation.mutateAsync({
        studentId: selectedStudent.id,
        routeId: selectedRoute.id,
        stopId: selectedStop.id,
      });
      setValidationResult(result);
      return result.valid;
    } catch (error) {
      return false;
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      
      if (currentStep === 1) {
        // Validate assignment before proceeding to confirmation
        const isValid = await validateAssignment();
        if (!isValid && validationResult?.conflicts?.length > 0) {
          message.warning('Assignment has conflicts but can still be created');
        }
      }
      
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      // Form validation failed
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (values: any) => {
    try {
      const assignmentData = {
        studentId: values.studentId,
        routeId: values.routeId,
        stopId: values.stopId,
        assignmentDate: values.assignmentDate?.format('YYYY-MM-DD'),
        status: values.status || 'ACTIVE',
      };

      if (isEditing && assignment) {
        await updateMutation.mutateAsync({ 
          id: assignment.id, 
          data: assignmentData 
        });
        message.success('Assignment updated successfully');
      } else {
        // Use the specific assign student endpoint for better handling
        await assignStudentMutation.mutateAsync({
          studentId: assignmentData.studentId,
          routeId: assignmentData.routeId,
          stopId: assignmentData.stopId,
          assignmentDate: assignmentData.assignmentDate,
        });
        message.success('Student assigned to route successfully');
      }
      
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to save assignment';
      message.error(errorMessage);
    }
  };

  const steps = [
    {
      title: 'Select Student',
      content: (
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="studentId"
                label="Student"
                rules={[{ required: true, message: 'Please select a student' }]}
              >
                <Select
                  placeholder="Search and select student"
                  showSearch
                  loading={studentsLoading}
                  optionFilterProp="children"
                  onChange={handleStudentSelect}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={students.map(student => ({
                    value: student.id,
                    label: `${student.firstName} ${student.lastName} - Grade ${student.grade}`,
                  }))}
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item label="Filter by School">
                <Select
                  placeholder="All schools"
                  value={schoolFilter || undefined}
                  onChange={setSchoolFilter}
                  allowClear
                >
                  {schools.map(school => (
                    <Option key={school.id} value={school.id}>
                      {school.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {selectedStudent && (
            <Card size="small" style={{ marginTop: '16px', backgroundColor: '#f6ffed' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar icon={<UserOutlined />} />
                <div>
                  <div style={{ fontWeight: 500 }}>
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Grade {selectedStudent.grade} • {selectedStudent.school?.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {selectedStudent.address}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      ),
    },
    {
      title: 'Select Route & Stop',
      content: (
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="routeId"
                label="Route"
                rules={[{ required: true, message: 'Please select a route' }]}
              >
                <Select
                  placeholder="Select route"
                  loading={routesLoading}
                  onChange={handleRouteSelect}
                >
                  {routes.map(route => (
                    <Option key={route.id} value={route.id}>
                      <div>
                        <div style={{ fontWeight: 500 }}>{route.routeName}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {route.description} • {route.distance}km
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="stopId"
                label="Stop"
                rules={[{ required: true, message: 'Please select a stop' }]}
              >
                <Select
                  placeholder="Select stop"
                  disabled={!selectedRoute}
                  onChange={handleStopSelect}
                >
                  {stops.map(stop => (
                    <Option key={stop.id} value={stop.id}>
                      <div>
                        <div style={{ fontWeight: 500 }}>{stop.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {stop.address}
                          {stop.estimatedArrival && ` • ${stop.estimatedArrival}`}
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="assignmentDate"
                label="Assignment Date"
                rules={[{ required: true, message: 'Please select assignment date' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
              </Form.Item>
            </Col>

            {isEditing && (
              <Col xs={24} md={12}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <Select placeholder="Select status">
                    <Option value="ACTIVE">Active</Option>
                    <Option value="INACTIVE">Inactive</Option>
                    <Option value="PENDING">Pending</Option>
                    <Option value="COMPLETED">Completed</Option>
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>

          {selectedRoute && (
            <Card size="small" style={{ marginTop: '16px', backgroundColor: '#f0f2ff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <EnvironmentOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                <div>
                  <div style={{ fontWeight: 500 }}>{selectedRoute.routeName}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {selectedRoute.description} • Distance: {selectedRoute.distance}km
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Estimated Duration: {selectedRoute.estimatedDuration ? Math.round(selectedRoute.estimatedDuration / 60) : 'N/A'} minutes
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      ),
    },
    {
      title: 'Confirmation',
      content: (
        <Card>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
            <Title level={4}>Confirm Assignment</Title>
            <Text type="secondary">
              Please review the assignment details before confirming.
            </Text>
          </div>

          {/* Validation Results */}
          {validationResult && (
            <div style={{ marginBottom: '24px' }}>
              {validationResult.valid ? (
                <Alert
                  message="Assignment Validated Successfully"
                  description="No conflicts detected for this assignment."
                  type="success"
                  showIcon
                />
              ) : (
                <Alert
                  message="Assignment Conflicts Detected"
                  description={
                    <div>
                      <div style={{ marginBottom: '8px' }}>The following issues were found:</div>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {validationResult.conflicts?.map((conflict: string, index: number) => (
                          <li key={index}>{conflict}</li>
                        ))}
                      </ul>
                      {validationResult.warnings?.length > 0 && (
                        <div style={{ marginTop: '8px' }}>
                          <strong>Warnings:</strong>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {validationResult.warnings.map((warning: string, index: number) => (
                              <li key={index}>{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  }
                  type="warning"
                  showIcon
                />
              )}
            </div>
          )}

          {/* Assignment Summary */}
          <Card title="Assignment Summary" size="small">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '6px', marginBottom: '12px' }}>
                  <UserOutlined style={{ color: '#1890ff' }} />
                  <div>
                    <div style={{ fontWeight: 500 }}>Student</div>
                    <div style={{ fontSize: '14px' }}>
                      {selectedStudent?.firstName} {selectedStudent?.lastName} - Grade {selectedStudent?.grade}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {selectedStudent?.school?.name}
                    </div>
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '6px', marginBottom: '12px' }}>
                  <EnvironmentOutlined style={{ color: '#52c41a' }} />
                  <div>
                    <div style={{ fontWeight: 500 }}>Route</div>
                    <div style={{ fontSize: '14px' }}>
                      {selectedRoute?.routeName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {selectedRoute?.description}
                    </div>
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '6px', marginBottom: '12px' }}>
                  <TeamOutlined style={{ color: '#722ed1' }} />
                  <div>
                    <div style={{ fontWeight: 500 }}>Stop</div>
                    <div style={{ fontSize: '14px' }}>
                      {selectedStop?.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {selectedStop?.address}
                      {selectedStop?.estimatedArrival && ` • Arrival: ${selectedStop.estimatedArrival}`}
                    </div>
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
                  <CalendarOutlined style={{ color: '#fa8c16' }} />
                  <div>
                    <div style={{ fontWeight: 500 }}>Assignment Date</div>
                    <div style={{ fontSize: '14px' }}>
                      {form.getFieldValue('assignmentDate')?.format('MMMM DD, YYYY')}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Card>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          {isEditing ? 'Edit Assignment' : 'Create New Assignment'}
        </Title>
      </div>

      <Steps 
        current={currentStep} 
        style={{ marginBottom: '32px' }}
        items={steps.map((step, index) => ({
          key: index,
          title: step.title,
          icon: index === 0 ? <UserOutlined /> :
                index === 1 ? <EnvironmentOutlined /> :
                <CheckCircleOutlined />
        }))}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ 
          assignmentDate: dayjs(),
          status: 'ACTIVE'
        }}
        autoComplete="off"
      >
        <div style={{ minHeight: '400px' }}>
          {steps[currentStep].content}
        </div>

        <Divider />

        <Row justify="end" style={{ marginTop: '24px' }}>
          <Space>
            <Button 
              onClick={onCancel}
              size="large"
            >
              <CloseOutlined />
              Cancel
            </Button>
            
            {currentStep > 0 && (
              <Button 
                onClick={handlePrevious}
                size="large"
              >
                Previous
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button 
                type="primary"
                onClick={handleNext}
                size="large"
                disabled={
                  (currentStep === 0 && !selectedStudent) ||
                  (currentStep === 1 && (!selectedRoute || !selectedStop))
                }
              >
                Next
              </Button>
            ) : (
              <Button 
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
              >
                <SaveOutlined />
                {isEditing ? 'Update Assignment' : 'Create Assignment'}
              </Button>
            )}
          </Space>
        </Row>
      </Form>
    </Card>
  );
}