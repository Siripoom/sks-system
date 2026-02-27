'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  List, 
  Avatar, 
  Tag, 
  Button, 
  Space, 
  Input, 
  Select, 
  Tooltip,
  Modal,
  message,
  Badge,
  Empty,
  Spin,
  Divider,
  Alert,
  Progress
} from 'antd';
import { 
  UserOutlined,
  EnvironmentOutlined,
  DragOutlined,
  SwapOutlined,
  TeamOutlined,
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
// Note: DnD Kit functionality temporarily disabled - requires package installation
// import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
import { 
  useUnassignedStudents,
  useRouteAssignments,
  useAssignStudentToRoute,
  useTransferStudent,
  useUnassignStudent,
  useRouteUtilization
} from '@/hooks/useAssignments';
import { useRoutes, useRouteStops } from '@/hooks/useRoutes';
import { useSchools } from '@/hooks/useSchools';
import type { Student, Route, Stop, Assignment } from '@/types/api';

const { Title, Text } = Typography;
const { Option } = Select;

interface DraggableStudentProps {
  student: Student;
  isDragging?: boolean;
}

function DraggableStudent({ student, isDragging }: DraggableStudentProps) {
  // Temporarily disabled DnD functionality
  // const {
  //   attributes,
  //   listeners,
  //   setNodeRef,
  //   transform,
  //   transition,
  //   isDragging: isSortableDragging,
  // } = useSortable({ id: student.id });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  //   opacity: isDragging || isSortableDragging ? 0.5 : 1,
  // };

  return (
    <div>
      <List.Item
        actions={[
          <Button 
            type="text" 
            icon={<DragOutlined />} 
            style={{ cursor: 'grab' }}
            size="small"
            disabled
          />
        ]}
        style={{ 
          padding: '8px 12px',
          margin: '4px 0',
          backgroundColor: '#fff',
          border: '1px solid #f0f0f0',
          borderRadius: '6px',
          cursor: 'default'
        }}
      >
        <List.Item.Meta
          avatar={<Avatar size="small" icon={<UserOutlined />} />}
          title={
            <div style={{ fontSize: '14px' }}>
              {student.firstName} {student.lastName}
            </div>
          }
          description={
            <div style={{ fontSize: '12px', color: '#666' }}>
              Grade {student.grade} • {student.school?.name}
            </div>
          }
        />
      </List.Item>
    </div>
  );
}

interface RouteCardProps {
  route: Route;
  assignments: Assignment[];
  utilization: any;
  onAssignStudent: (studentId: string, routeId: string, stopId: string) => void;
  onTransferStudent: (assignment: Assignment) => void;
  onUnassignStudent: (assignment: Assignment) => void;
}

function RouteCard({ route, assignments, utilization, onAssignStudent, onTransferStudent, onUnassignStudent }: RouteCardProps) {
  const [selectedStop, setSelectedStop] = useState<string>('');
  const { data: stopsData } = useRouteStops(route.id);
  
  const stops = stopsData?.data?.items || [];
  const assignedStudents = assignments.length;
  const capacity = route.capacity || 50;
  const utilizationRate = Math.round((assignedStudents / capacity) * 100);

  const getUtilizationColor = () => {
    if (utilizationRate < 50) return '#52c41a';
    if (utilizationRate < 80) return '#fa8c16';
    return '#f5222d';
  };

  return (
    <Card 
      size="small"
      style={{ height: '400px', display: 'flex', flexDirection: 'column' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            {route.routeName}
          </div>
          <Badge count={assignedStudents} style={{ backgroundColor: '#52c41a' }} />
        </div>
      }
      extra={
        <Tag color={route.isActive ? 'green' : 'red'}>
          {route.isActive ? 'Active' : 'Inactive'}
        </Tag>
      }
    >
      {/* Capacity and Utilization */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <Text style={{ fontSize: '12px' }}>Capacity</Text>
          <Text style={{ fontSize: '12px' }}>{assignedStudents}/{capacity}</Text>
        </div>
        <Progress 
          percent={utilizationRate} 
          strokeColor={getUtilizationColor()}
          size="small"
        />
      </div>

      {/* Stop Selection for Drop */}
      <div style={{ marginBottom: '12px' }}>
        <Select
          placeholder="Select stop for assignment"
          value={selectedStop}
          onChange={setSelectedStop}
          size="small"
          style={{ width: '100%' }}
        >
          {stops.map(stop => (
            <Option key={stop.id} value={stop.id}>
              {stop.name}
              {stop.estimatedArrival && ` (${stop.estimatedArrival})`}
            </Option>
          ))}
        </Select>
      </div>

      {/* Assigned Students */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Text strong style={{ fontSize: '12px', color: '#666' }}>
          Assigned Students ({assignedStudents})
        </Text>
        <Divider style={{ margin: '8px 0' }} />
        
        {assignments.length > 0 ? (
          <List
            size="small"
            dataSource={assignments}
            renderItem={(assignment) => (
              <List.Item
                style={{ padding: '6px 0' }}
                actions={[
                  <Tooltip title="Transfer Student">
                    <Button
                      type="text"
                      icon={<SwapOutlined />}
                      size="small"
                      onClick={() => onTransferStudent(assignment)}
                    />
                  </Tooltip>,
                  <Tooltip title="Unassign Student">
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      size="small"
                      onClick={() => onUnassignStudent(assignment)}
                    />
                  </Tooltip>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size="small" icon={<UserOutlined />} />}
                  title={
                    <div style={{ fontSize: '12px' }}>
                      {assignment.student?.firstName} {assignment.student?.lastName}
                    </div>
                  }
                  description={
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      {assignment.stop?.name}
                      <Tag 
                        color={assignment.status === 'ACTIVE' ? 'green' : 'orange'} 
                        style={{ marginLeft: '4px', fontSize: '10px' }}
                      >
                        {assignment.status}
                      </Tag>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            description="No students assigned"
            style={{ padding: '20px 0' }}
          />
        )}
      </div>

      {/* Drop Zone Indicator */}
      <div 
        style={{ 
          marginTop: '8px',
          padding: '8px',
          border: '2px dashed #d9d9d9',
          borderRadius: '4px',
          textAlign: 'center',
          backgroundColor: selectedStop ? '#f6ffed' : '#fafafa'
        }}
      >
        <Text style={{ fontSize: '12px', color: '#666' }}>
          {selectedStop ? 'Drop student here to assign' : 'Select a stop first'}
        </Text>
      </div>
    </Card>
  );
}

export default function StudentRouteAssignment() {
  const [schoolFilter, setSchoolFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedStudent, setDraggedStudent] = useState<Student | null>(null);
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Queries
  const { data: unassignedData, isLoading: unassignedLoading } = useUnassignedStudents({
    schoolId: schoolFilter,
    grade: gradeFilter,
  });
  const { data: routesData, isLoading: routesLoading } = useRoutes({
    limit: 50,
    schoolId: schoolFilter,
    isActive: true,
  });
  const { data: schoolsData } = useSchools({ limit: 100 });
  const { data: utilizationData } = useRouteUtilization();

  // Mutations
  const assignStudentMutation = useAssignStudentToRoute();
  const transferStudentMutation = useTransferStudent();
  const unassignStudentMutation = useUnassignStudent();

  const unassignedStudents = unassignedData?.data?.items || [];
  const routes = routesData?.data?.items || [];
  const schools = schoolsData?.data?.items || [];

  // Filter unassigned students based on search
  const filteredUnassignedStudents = unassignedStudents.filter(student => {
    const searchMatch = !searchTerm || 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    return searchMatch;
  });

  // Temporarily disabled DnD functionality
  // const handleDragStart = (event: DragStartEvent) => {
  //   const student = unassignedStudents.find(s => s.id === event.active.id);
  //   setDraggedStudent(student || null);
  // };

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //   setDraggedStudent(null);

  //   if (!over || !draggedStudent) return;

  //   // Check if dropped on a route card
  //   const routeId = over.id as string;
  //   const route = routes.find(r => r.id === routeId);
    
  //   if (route) {
  //     // For now, assign to first stop - in real implementation, would show stop selection
  //     Modal.confirm({
  //       title: 'Assign Student to Route',
  //       content: `Are you sure you want to assign ${draggedStudent.firstName} ${draggedStudent.lastName} to ${route.routeName}?`,
  //       onOk: () => {
  //         // This would need stop selection in real implementation
  //         message.info('Please implement stop selection for assignment');
  //       },
  //     });
  //   }
  // };

  const handleAssignStudent = async (studentId: string, routeId: string, stopId: string) => {
    try {
      await assignStudentMutation.mutateAsync({
        studentId,
        routeId,
        stopId,
        assignmentDate: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleTransferStudent = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setTransferModalVisible(true);
  };

  const handleUnassignStudent = async (assignment: Assignment) => {
    Modal.confirm({
      title: 'Unassign Student',
      content: `Are you sure you want to unassign ${assignment.student?.firstName} ${assignment.student?.lastName} from ${assignment.route?.routeName}?`,
      onOk: async () => {
        try {
          await unassignStudentMutation.mutateAsync({
            studentId: assignment.studentId,
            assignmentId: assignment.id,
          });
        } catch (error) {
          // Error handled by hook
        }
      },
    });
  };

  // Get route assignments for each route
  const getRouteAssignments = (routeId: string) => {
    // This would use useRouteAssignments hook in real implementation
    // For now, return empty array
    return [];
  };

  const getRouteUtilization = (routeId: string) => {
    return utilizationData?.find((u: any) => u.routeId === routeId) || {};
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Student-Route Assignment
          </Title>
          <Text type="secondary">
            Drag and drop students to assign them to routes
          </Text>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={6}>
            <Input
              placeholder="Search students..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Filter by school"
              value={schoolFilter || undefined}
              onChange={setSchoolFilter}
              allowClear
              style={{ width: '100%' }}
            >
              {schools.map(school => (
                <Option key={school.id} value={school.id}>
                  {school.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Filter by grade"
              value={gradeFilter || undefined}
              onChange={setGradeFilter}
              allowClear
              style={{ width: '100%' }}
            >
              {['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(grade => (
                <Option key={grade} value={grade}>
                  Grade {grade}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f5222d' }}>
                {filteredUnassignedStudents.length}
              </div>
              <div style={{ color: '#666' }}>Unassigned Students</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {routes.length}
              </div>
              <div style={{ color: '#666' }}>Active Routes</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {Math.round(routes.reduce((acc, route) => acc + ((getRouteAssignments(route.id).length / (route.capacity || 50)) * 100), 0) / routes.length) || 0}%
              </div>
              <div style={{ color: '#666' }}>Average Utilization</div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Unassigned Students Panel */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <TeamOutlined style={{ marginRight: '8px' }} />
                  Unassigned Students
                </div>
                <Badge count={filteredUnassignedStudents.length} style={{ backgroundColor: '#f5222d' }} />
              </div>
            }
            style={{ height: '600px' }}
          >
            {unassignedLoading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
              </div>
            ) : filteredUnassignedStudents.length > 0 ? (
              <div style={{ height: '500px', overflowY: 'auto' }}>
                {filteredUnassignedStudents.map(student => (
                  <DraggableStudent 
                    key={student.id} 
                    student={student}
                  />
                ))}
              </div>
            ) : (
              <Empty 
                description="No unassigned students"
                style={{ padding: '50px 0' }}
              />
            )}
          </Card>
        </Col>

          {/* Routes Panel */}
          <Col xs={24} lg={16}>
            <div style={{ height: '600px', overflowY: 'auto' }}>
              {routesLoading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <Spin size="large" />
                </div>
              ) : routes.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {routes.map(route => (
                    <Col xs={24} md={12} xl={8} key={route.id}>
                      <RouteCard
                        route={route}
                        assignments={getRouteAssignments(route.id)}
                        utilization={getRouteUtilization(route.id)}
                        onAssignStudent={handleAssignStudent}
                        onTransferStudent={handleTransferStudent}
                        onUnassignStudent={handleUnassignStudent}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty 
                  description="No active routes available"
                  style={{ padding: '100px 0' }}
                />
              )}
            </div>
          </Col>
        </Row>

      {/* Transfer Modal */}
      <Modal
        title="Transfer Student"
        open={transferModalVisible}
        onCancel={() => setTransferModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedAssignment && (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <InfoCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Transfer Functionality</Title>
            <Text type="secondary">
              Student transfer functionality will be implemented in the next development phase.
            </Text>
            <div style={{ marginTop: '16px' }}>
              <Text strong>Student: </Text>
              {selectedAssignment.student?.firstName} {selectedAssignment.student?.lastName}
              <br />
              <Text strong>Current Route: </Text>
              {selectedAssignment.route?.routeName}
              <br />
              <Text strong>Current Stop: </Text>
              {selectedAssignment.stop?.name}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}