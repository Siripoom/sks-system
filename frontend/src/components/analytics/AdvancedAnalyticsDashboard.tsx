'use client';

import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Select,
  DatePicker,
  Space,
  Typography,
  Progress,
  List,
  Tag,
  Button,
  Table,
  Alert,
  Tooltip
} from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface AnalyticsData {
  tripStats: {
    totalTrips: number;
    completedTrips: number;
    onTimeRate: number;
    avgTripDuration: number;
    totalDistance: number;
  };
  performanceMetrics: {
    driverPerformance: Array<{
      driverId: string;
      driverName: string;
      onTimeRate: number;
      safetyScore: number;
      totalTrips: number;
      rating: number;
    }>;
    vehicleUtilization: Array<{
      vehicleId: string;
      vehiclePlate: string;
      utilizationRate: number;
      totalDistance: number;
      fuelEfficiency: number;
      maintenanceScore: number;
    }>;
    routeEfficiency: Array<{
      routeId: string;
      routeName: string;
      avgDuration: number;
      onTimeRate: number;
      studentCount: number;
      distance: number;
    }>;
  };
  trends: {
    dailyTrips: Array<{ date: string; count: number; onTime: number }>;
    weeklyPerformance: Array<{ week: string; onTimeRate: number; incidents: number }>;
    monthlyStats: Array<{ month: string; trips: number; distance: number; efficiency: number }>;
  };
  insights: Array<{
    type: 'success' | 'warning' | 'error' | 'info';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    recommendation?: string;
  }>;
}

export default function AdvancedAnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs()
  ]);
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [selectedSchool, setSelectedSchool] = useState('all');

  // Mock data - in real implementation, this would come from API
  const analyticsData: AnalyticsData = {
    tripStats: {
      totalTrips: 2847,
      completedTrips: 2789,
      onTimeRate: 94.2,
      avgTripDuration: 28.5,
      totalDistance: 45680
    },
    performanceMetrics: {
      driverPerformance: [
        { driverId: '1', driverName: 'John Smith', onTimeRate: 96.8, safetyScore: 98.2, totalTrips: 185, rating: 4.9 },
        { driverId: '2', driverName: 'Maria Garcia', onTimeRate: 95.4, safetyScore: 97.8, totalTrips: 167, rating: 4.8 },
        { driverId: '3', driverName: 'David Wilson', onTimeRate: 93.2, safetyScore: 96.5, totalTrips: 198, rating: 4.7 },
        { driverId: '4', driverName: 'Sarah Johnson', onTimeRate: 97.1, safetyScore: 98.9, totalTrips: 156, rating: 4.9 },
        { driverId: '5', driverName: 'Michael Brown', onTimeRate: 92.8, safetyScore: 95.2, totalTrips: 178, rating: 4.6 }
      ],
      vehicleUtilization: [
        { vehicleId: '1', vehiclePlate: 'BUS-001', utilizationRate: 87.3, totalDistance: 8945, fuelEfficiency: 8.2, maintenanceScore: 92.1 },
        { vehicleId: '2', vehiclePlate: 'BUS-002', utilizationRate: 91.7, totalDistance: 9234, fuelEfficiency: 7.8, maintenanceScore: 88.5 },
        { vehicleId: '3', vehiclePlate: 'BUS-003', utilizationRate: 85.9, totalDistance: 8567, fuelEfficiency: 8.5, maintenanceScore: 94.3 },
        { vehicleId: '4', vehiclePlate: 'BUS-004', utilizationRate: 89.2, totalDistance: 8876, fuelEfficiency: 8.1, maintenanceScore: 90.7 },
        { vehicleId: '5', vehiclePlate: 'BUS-005', utilizationRate: 92.4, totalDistance: 9156, fuelEfficiency: 7.9, maintenanceScore: 87.9 }
      ],
      routeEfficiency: [
        { routeId: '1', routeName: 'North District', avgDuration: 25.4, onTimeRate: 96.2, studentCount: 45, distance: 12.8 },
        { routeId: '2', routeName: 'South District', avgDuration: 31.7, onTimeRate: 93.8, studentCount: 52, distance: 15.6 },
        { routeId: '3', routeName: 'East District', avgDuration: 28.9, onTimeRate: 95.1, studentCount: 38, distance: 13.2 },
        { routeId: '4', routeName: 'West District', avgDuration: 26.3, onTimeRate: 94.7, studentCount: 41, distance: 11.9 },
        { routeId: '5', routeName: 'Central District', avgDuration: 23.8, onTimeRate: 97.3, studentCount: 35, distance: 10.5 }
      ]
    },
    trends: {
      dailyTrips: [
        { date: '2024-01-15', count: 95, onTime: 89 },
        { date: '2024-01-16', count: 98, onTime: 92 },
        { date: '2024-01-17', count: 92, onTime: 88 },
        { date: '2024-01-18', count: 105, onTime: 98 },
        { date: '2024-01-19', count: 87, onTime: 84 },
        { date: '2024-01-20', count: 76, onTime: 72 },
        { date: '2024-01-21', count: 78, onTime: 74 },
        { date: '2024-01-22', count: 102, onTime: 96 },
        { date: '2024-01-23', count: 99, onTime: 94 },
        { date: '2024-01-24', count: 94, onTime: 90 }
      ],
      weeklyPerformance: [
        { week: 'Week 1', onTimeRate: 94.2, incidents: 3 },
        { week: 'Week 2', onTimeRate: 96.1, incidents: 1 },
        { week: 'Week 3', onTimeRate: 93.8, incidents: 4 },
        { week: 'Week 4', onTimeRate: 95.7, incidents: 2 }
      ],
      monthlyStats: [
        { month: 'Oct', trips: 2650, distance: 42300, efficiency: 94.1 },
        { month: 'Nov', trips: 2789, distance: 44200, efficiency: 95.3 },
        { month: 'Dec', trips: 2456, distance: 39100, efficiency: 96.2 },
        { month: 'Jan', trips: 2847, distance: 45680, efficiency: 94.8 }
      ]
    },
    insights: [
      {
        type: 'success',
        title: 'Exceptional On-Time Performance',
        description: 'Overall on-time rate has improved by 3.2% compared to last month',
        impact: 'high',
        recommendation: 'Continue current scheduling optimization'
      },
      {
        type: 'warning',
        title: 'Route Efficiency Opportunity',
        description: 'South District route shows 8% longer average duration than optimal',
        impact: 'medium',
        recommendation: 'Review traffic patterns and consider route adjustments'
      },
      {
        type: 'info',
        title: 'Driver Performance Recognition',
        description: 'Sarah Johnson achieved 97.1% on-time rate with perfect safety score',
        impact: 'low',
        recommendation: 'Share best practices with other drivers'
      },
      {
        type: 'error',
        title: 'Vehicle Maintenance Alert',
        description: 'BUS-002 showing decreased fuel efficiency (7.8 L/100km)',
        impact: 'high',
        recommendation: 'Schedule immediate maintenance inspection'
      }
    ]
  };

  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return '#52c41a';
    if (value >= thresholds.warning) return '#faad14';
    return '#ff4d4f';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning': return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'error': return <WarningOutlined style={{ color: '#ff4d4f' }} />;
      default: return <DashboardOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const driverColumns = [
    {
      title: 'Driver',
      dataIndex: 'driverName',
      key: 'driverName',
      render: (name: string) => <Text strong>{name}</Text>
    },
    {
      title: 'On-Time Rate',
      dataIndex: 'onTimeRate',
      key: 'onTimeRate',
      render: (rate: number) => (
        <div>
          <Text style={{ color: getPerformanceColor(rate, { good: 95, warning: 90 }) }}>
            {rate}%
          </Text>
          <Progress 
            percent={rate} 
            showInfo={false} 
            strokeColor={getPerformanceColor(rate, { good: 95, warning: 90 })}
          />
        </div>
      ),
      sorter: (a: any, b: any) => a.onTimeRate - b.onTimeRate
    },
    {
      title: 'Safety Score',
      dataIndex: 'safetyScore',
      key: 'safetyScore',
      render: (score: number) => (
        <div>
          <Text style={{ color: getPerformanceColor(score, { good: 95, warning: 90 }) }}>
            {score}%
          </Text>
          <Progress 
            percent={score} 
            showInfo={false} 
            strokeColor={getPerformanceColor(score, { good: 95, warning: 90 })}
          />
        </div>
      ),
      sorter: (a: any, b: any) => a.safetyScore - b.safetyScore
    },
    {
      title: 'Total Trips',
      dataIndex: 'totalTrips',
      key: 'totalTrips',
      sorter: (a: any, b: any) => a.totalTrips - b.totalTrips
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Space>
          <TrophyOutlined style={{ color: '#faad14' }} />
          <Text>{rating}/5.0</Text>
        </Space>
      ),
      sorter: (a: any, b: any) => a.rating - b.rating
    }
  ];

  const vehicleColumns = [
    {
      title: 'Vehicle',
      dataIndex: 'vehiclePlate',
      key: 'vehiclePlate',
      render: (plate: string) => (
        <Space>
          <CarOutlined />
          <Text strong>{plate}</Text>
        </Space>
      )
    },
    {
      title: 'Utilization',
      dataIndex: 'utilizationRate',
      key: 'utilizationRate',
      render: (rate: number) => (
        <div>
          <Text>{rate}%</Text>
          <Progress percent={rate} showInfo={false} />
        </div>
      ),
      sorter: (a: any, b: any) => a.utilizationRate - b.utilizationRate
    },
    {
      title: 'Distance (km)',
      dataIndex: 'totalDistance',
      key: 'totalDistance',
      render: (distance: number) => distance.toLocaleString(),
      sorter: (a: any, b: any) => a.totalDistance - b.totalDistance
    },
    {
      title: 'Fuel Efficiency',
      dataIndex: 'fuelEfficiency',
      key: 'fuelEfficiency',
      render: (efficiency: number) => (
        <Text style={{ color: efficiency <= 8 ? '#52c41a' : efficiency <= 9 ? '#faad14' : '#ff4d4f' }}>
          {efficiency} L/100km
        </Text>
      ),
      sorter: (a: any, b: any) => a.fuelEfficiency - b.fuelEfficiency
    },
    {
      title: 'Maintenance Score',
      dataIndex: 'maintenanceScore',
      key: 'maintenanceScore',
      render: (score: number) => (
        <div>
          <Text style={{ color: getPerformanceColor(score, { good: 90, warning: 80 }) }}>
            {score}%
          </Text>
          <Progress 
            percent={score} 
            showInfo={false} 
            strokeColor={getPerformanceColor(score, { good: 90, warning: 80 })}
          />
        </div>
      ),
      sorter: (a: any, b: any) => a.maintenanceScore - b.maintenanceScore
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* Header */}
        <Col span={24}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                <BarChartOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
                Advanced Analytics Dashboard
              </Title>
              <Text type="secondary">Comprehensive performance insights and trend analysis</Text>
              
              <Space>
                <Select
                  defaultValue="all"
                  style={{ width: 200 }}
                  onChange={setSelectedSchool}
                >
                  <Select.Option value="all">All Schools</Select.Option>
                  <Select.Option value="elementary">Elementary School</Select.Option>
                  <Select.Option value="middle">Middle School</Select.Option>
                  <Select.Option value="high">High School</Select.Option>
                </Select>
                
                <RangePicker
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
                />
                
                <Button icon={<DownloadOutlined />}>
                  Export Report
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* Key Metrics */}
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Trips"
                  value={analyticsData.tripStats.totalTrips}
                  prefix={<CarOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Progress 
                  percent={(analyticsData.tripStats.completedTrips / analyticsData.tripStats.totalTrips) * 100} 
                  showInfo={false} 
                  strokeColor="#52c41a"
                />
                <Text type="secondary">{analyticsData.tripStats.completedTrips} completed</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="On-Time Rate"
                  value={analyticsData.tripStats.onTimeRate}
                  suffix="%"
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <Progress 
                  percent={analyticsData.tripStats.onTimeRate} 
                  showInfo={false} 
                  strokeColor="#52c41a"
                />
                <Text type="secondary">↑ 3.2% from last month</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Avg Trip Duration"
                  value={analyticsData.tripStats.avgTripDuration}
                  suffix=" min"
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
                <Text type="secondary">Within target range</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Distance"
                  value={analyticsData.tripStats.totalDistance}
                  suffix=" km"
                  prefix={<EnvironmentOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Text type="secondary">This month</Text>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Performance Tables */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                Driver Performance
              </Space>
            }
          >
            <Table
              columns={driverColumns}
              dataSource={analyticsData.performanceMetrics.driverPerformance}
              pagination={false}
              rowKey="driverId"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CarOutlined />
                Vehicle Utilization
              </Space>
            }
          >
            <Table
              columns={vehicleColumns}
              dataSource={analyticsData.performanceMetrics.vehicleUtilization}
              pagination={false}
              rowKey="vehicleId"
            />
          </Card>
        </Col>

        {/* Chart Visualizations */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <LineChartOutlined />
                Daily Trip Trends
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.trends.dailyTrips}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#1890ff" 
                  strokeWidth={2}
                  name="Total Trips"
                />
                <Line 
                  type="monotone" 
                  dataKey="onTime" 
                  stroke="#52c41a" 
                  strokeWidth={2}
                  name="On-Time Trips"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <PieChartOutlined />
                Weekly Performance
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData.trends.weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <RechartsTooltip />
                <Area 
                  type="monotone" 
                  dataKey="onTimeRate" 
                  stroke="#52c41a" 
                  fill="#52c41a" 
                  fillOpacity={0.6}
                  name="On-Time Rate %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <BarChartOutlined />
                Monthly Statistics
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.trends.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="trips" fill="#1890ff" name="Total Trips" />
                <Bar dataKey="efficiency" fill="#52c41a" name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <PieChartOutlined />
                Route Performance Distribution
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.performanceMetrics.routeEfficiency}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.routeName}: ${entry.onTimeRate}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="onTimeRate"
                >
                  {analyticsData.performanceMetrics.routeEfficiency.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#1890ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1'][index % 5]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Route Efficiency */}
        <Col span={24}>
          <Card
            title={
              <Space>
                <EnvironmentOutlined />
                Route Efficiency Analysis
              </Space>
            }
          >
            <Row gutter={[16, 16]}>
              {analyticsData.performanceMetrics.routeEfficiency.map((route) => (
                <Col xs={24} sm={12} md={8} lg={6} key={route.routeId}>
                  <Card size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Text strong>{route.routeName}</Text>
                      <Statistic
                        title="Avg Duration"
                        value={route.avgDuration}
                        suffix=" min"
                      />
                      <div>
                        <Text>On-Time Rate: </Text>
                        <Text style={{ color: getPerformanceColor(route.onTimeRate, { good: 95, warning: 90 }) }}>
                          {route.onTimeRate}%
                        </Text>
                      </div>
                      <div>
                        <Text>Students: {route.studentCount}</Text>
                        <br />
                        <Text>Distance: {route.distance} km</Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Insights and Recommendations */}
        <Col span={24}>
          <Card
            title={
              <Space>
                <DashboardOutlined />
                Insights & Recommendations
              </Space>
            }
          >
            <List
              dataSource={analyticsData.insights}
              renderItem={(insight) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getInsightIcon(insight.type)}
                    title={
                      <Space>
                        {insight.title}
                        <Tag color={
                          insight.impact === 'high' ? 'red' : 
                          insight.impact === 'medium' ? 'orange' : 'blue'
                        }>
                          {insight.impact.toUpperCase()} IMPACT
                        </Tag>
                      </Space>
                    }
                    description={
                      <div>
                        <Text>{insight.description}</Text>
                        {insight.recommendation && (
                          <div style={{ marginTop: '8px' }}>
                            <Text strong>Recommendation: </Text>
                            <Text type="secondary">{insight.recommendation}</Text>
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}