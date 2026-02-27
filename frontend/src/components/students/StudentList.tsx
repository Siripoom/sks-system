'use client';

import { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Popconfirm, 
  message, 
  Card,
  Input,
  Row,
  Col,
  Tag,
  Typography,
  Tooltip,
  Select,
  Avatar,
  Dropdown,
  Badge,
  Upload
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  UserOutlined,
  BookOutlined,
  HeartOutlined,
  MoreOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  UploadOutlined,
  DownloadOutlined,
  GroupOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useStudents, useDeleteStudent, useBulkUpdateStudents, useImportStudents } from '@/hooks/useStudents';
import { useSchools } from '@/hooks/useSchools';
import type { Student } from '@/types/api';
import { formatDate, formatFullName } from '@/utils/format';
import { PAGINATION } from '@/constants/app';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface StudentListProps {
  onAdd: () => void;
  onEdit: (student: Student) => void;
  onViewDetails: (student: Student) => void;
}

export default function StudentList({ onAdd, onEdit, onViewDetails }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('');
  const [schoolFilter, setSchoolFilter] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  });

  const { 
    data: studentsData, 
    isLoading, 
    error 
  } = useStudents({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchQuery || undefined,
    grade: gradeFilter || undefined,
    schoolId: schoolFilter || undefined
  });

  const { data: schoolsData } = useSchools({ limit: 100 }); // Get schools for filter

  const deleteStudentMutation = useDeleteStudent();
  const bulkUpdateMutation = useBulkUpdateStudents();
  const importMutation = useImportStudents();

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteStudentMutation.mutateAsync(id);
      message.success(`Student "${name}" deleted successfully`);
    } catch (error) {
      message.error('Failed to delete student');
    }
  };

  const handleBulkUpdate = async (updates: any) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select students to update');
      return;
    }

    try {
      await bulkUpdateMutation.mutateAsync({ 
        studentIds: selectedRowKeys, 
        updates 
      });
      message.success(`Updated ${selectedRowKeys.length} students successfully`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('Failed to update students');
    }
  };

  const handleImport = async (file: File) => {
    if (!schoolFilter) {
      message.error('Please select a school filter before importing');
      return;
    }

    try {
      await importMutation.mutateAsync({ file, schoolId: schoolFilter });
      message.success('Students imported successfully');
    } catch (error) {
      message.error('Failed to import students');
    }
  };

  const handleTableChange = (paginationConfig: any) => {
    setPagination({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const getGradeColor = (grade: string) => {
    const gradeNum = parseInt(grade);
    if (grade === 'K') return 'purple';
    if (gradeNum <= 5) return 'blue';
    if (gradeNum <= 8) return 'green';
    if (gradeNum <= 12) return 'orange';
    return 'default';
  };

  const getStudentActions = (student: Student): MenuProps['items'] => [
    {
      key: 'view',
      icon: <UserOutlined />,
      label: 'View Details',
      onClick: () => onViewDetails(student),
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Student',
      onClick: () => onEdit(student),
    },
    {
      type: 'divider',
    },
    {
      key: 'medical',
      icon: <MedicineBoxOutlined />,
      label: 'Medical Info',
      disabled: !student.medicalInfo,
    },
    {
      key: 'emergency',
      icon: <PhoneOutlined />,
      label: 'Emergency Contact',
      disabled: !student.emergencyContact,
    },
  ];

  const bulkActions: MenuProps['items'] = [
    {
      key: 'activate',
      icon: <TeamOutlined />,
      label: 'Mark Active',
      onClick: () => handleBulkUpdate({ isActive: true }),
    },
    {
      key: 'deactivate',
      icon: <TeamOutlined />,
      label: 'Mark Inactive',
      onClick: () => handleBulkUpdate({ isActive: false }),
    },
    {
      type: 'divider',
    },
    {
      key: 'grade-promotion',
      icon: <BookOutlined />,
      label: 'Grade Promotion',
      children: [
        { key: 'grade-k', label: 'Kindergarten', onClick: () => handleBulkUpdate({ grade: 'K' }) },
        { key: 'grade-1', label: 'Grade 1', onClick: () => handleBulkUpdate({ grade: '1' }) },
        { key: 'grade-2', label: 'Grade 2', onClick: () => handleBulkUpdate({ grade: '2' }) },
        { key: 'grade-3', label: 'Grade 3', onClick: () => handleBulkUpdate({ grade: '3' }) },
        { key: 'grade-4', label: 'Grade 4', onClick: () => handleBulkUpdate({ grade: '4' }) },
        { key: 'grade-5', label: 'Grade 5', onClick: () => handleBulkUpdate({ grade: '5' }) },
        { key: 'grade-6', label: 'Grade 6', onClick: () => handleBulkUpdate({ grade: '6' }) },
        { key: 'grade-7', label: 'Grade 7', onClick: () => handleBulkUpdate({ grade: '7' }) },
        { key: 'grade-8', label: 'Grade 8', onClick: () => handleBulkUpdate({ grade: '8' }) },
        { key: 'grade-9', label: 'Grade 9', onClick: () => handleBulkUpdate({ grade: '9' }) },
        { key: 'grade-10', label: 'Grade 10', onClick: () => handleBulkUpdate({ grade: '10' }) },
        { key: 'grade-11', label: 'Grade 11', onClick: () => handleBulkUpdate({ grade: '11' }) },
        { key: 'grade-12', label: 'Grade 12', onClick: () => handleBulkUpdate({ grade: '12' }) },
      ],
    },
  ];

  const columns: ColumnsType<Student> = [
    {
      title: 'Student',
      key: 'student',
      width: '25%',
      render: (_, record: Student) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size={40} 
            icon={<UserOutlined />}
            style={{ backgroundColor: getGradeColor(record.grade) }}
          >
            {record.firstName.charAt(0)}{record.lastName.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>
              {formatFullName(record.firstName, record.lastName)}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
              ID: {record.studentId}
            </div>
            {record.dateOfBirth && (
              <div style={{ fontSize: '12px', color: '#999' }}>
                DOB: {formatDate(record.dateOfBirth)}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Grade & School',
      key: 'gradeSchool',
      width: '20%',
      render: (_, record: Student) => (
        <Space direction="vertical" size={2}>
          <Tag color={getGradeColor(record.grade)} style={{ minWidth: '60px', textAlign: 'center' }}>
            Grade {record.grade}
          </Tag>
          {record.school && (
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <BookOutlined />
              <span>{record.school.name}</span>
            </div>
          )}
        </Space>
      ),
    },
    {
      title: 'Guardians',
      key: 'guardians',
      width: '20%',
      render: (_, record: Student) => (
        <Space direction="vertical" size={2}>
          {record.guardians && record.guardians.length > 0 ? (
            record.guardians.slice(0, 2).map((guardian, index) => (
              <div key={guardian.id} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HeartOutlined style={{ color: '#fa8c16' }} />
                <span>{formatFullName(guardian.firstName, guardian.lastName)}</span>
                {guardian.relationship && (
                  <Tag>({guardian.relationship})</Tag>
                )}
              </div>
            ))
          ) : (
            <div style={{ fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
              No guardians assigned
            </div>
          )}
          {record.guardians && record.guardians.length > 2 && (
            <div style={{ fontSize: '11px', color: '#666' }}>
              +{record.guardians.length - 2} more
            </div>
          )}
        </Space>
      ),
    },
    {
      title: 'Special Info',
      key: 'specialInfo',
      width: '20%',
      render: (_, record: Student) => (
        <Space direction="vertical" size={2}>
          {record.medicalInfo && (
            <Badge status="warning" text="Medical Info" />
          )}
          {record.specialNeeds && (
            <Badge status="processing" text="Special Needs" />
          )}
          {record.emergencyContact && (
            <Badge status="success" text="Emergency Contact" />
          )}
          <div style={{ fontSize: '12px', color: '#999' }}>
            Added: {formatDate(record.createdAt)}
          </div>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      width: '10%',
      align: 'center',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'default'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      align: 'center',
      render: (_, record: Student) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<UserOutlined />}
              onClick={() => onViewDetails(record)}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Edit Student">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          
          <Dropdown 
            menu={{ items: getStudentActions(record) }} 
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              size="small"
            />
          </Dropdown>

          <Popconfirm
            title="Delete Student"
            description={`Are you sure you want to delete "${formatFullName(record.firstName, record.lastName)}"?`}
            onConfirm={() => handleDelete(record.id, formatFullName(record.firstName, record.lastName))}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete Student">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                size="small"
                loading={deleteStudentMutation.isPending}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys as string[]),
  };

  if (error) {
    message.error('Failed to load students');
  }

  return (
    <Card>
      <div style={{ marginBottom: '16px' }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={16} md={18}>
            <Title level={4} style={{ margin: 0 }}>
              Student Management
            </Title>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Space>
              <Upload
                beforeUpload={(file) => {
                  handleImport(file);
                  return false; // Prevent auto upload
                }}
                accept=".csv,.xlsx"
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} loading={importMutation.isPending}>
                  Import
                </Button>
              </Upload>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={onAdd}
              >
                Add Student
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search students..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={6} md={4}>
            <Select
              placeholder="Grade"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={gradeFilter || undefined}
              onChange={setGradeFilter}
            >
              <Option value="K">Kindergarten</Option>
              {[...Array(12)].map((_, i) => (
                <Option key={i + 1} value={`${i + 1}`}>Grade {i + 1}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={6} md={4}>
            <Select
              placeholder="School"
              allowClear
              size="large"
              style={{ width: '100%' }}
              value={schoolFilter || undefined}
              onChange={setSchoolFilter}
            >
              {schoolsData?.data?.items?.map((school) => (
                <Option key={school.id} value={school.id}>
                  {school.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {selectedRowKeys.length > 0 && (
        <div style={{ marginBottom: '16px', padding: '8px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <span style={{ fontWeight: 500 }}>{selectedRowKeys.length} students selected</span>
            </Col>
            <Col>
              <Space>
                <Button 
                  size="small" 
                  onClick={() => setSelectedRowKeys([])}
                >
                  Clear Selection
                </Button>
                <Dropdown menu={{ items: bulkActions }} trigger={['click']}>
                  <Button 
                    icon={<GroupOutlined />} 
                    loading={bulkUpdateMutation.isPending}
                  >
                    Bulk Actions
                  </Button>
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={studentsData?.data?.items || []}
        rowKey="id"
        loading={isLoading}
        rowSelection={rowSelection}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: studentsData?.data?.pagination.total || 0,
          showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
          showQuickJumper: PAGINATION.SHOW_QUICK_JUMPER,
          pageSizeOptions: [...PAGINATION.PAGE_SIZE_OPTIONS],
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} students`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
        size="small"
      />
    </Card>
  );
}