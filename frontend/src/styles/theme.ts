import { ThemeConfig } from 'antd';
import { THEME_COLORS } from '@/constants/app';

// Light theme configuration
export const lightTheme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    
    // Background colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgSpotlight: '#ffffff',
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    
    // Text colors
    colorText: 'rgba(0, 0, 0, 0.85)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    
    // Border colors
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    
    // Link colors
    colorLink: '#1890ff',
    colorLinkHover: '#40a9ff',
    colorLinkActive: '#096dd9',
    
    // Font family
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    
    // Font sizes
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeXL: 20,
    
    // Line height
    lineHeight: 1.5715,
    lineHeightLG: 1.5,
    lineHeightSM: 1.66,
    
    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    borderRadiusXS: 2,
    
    // Control height
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    
    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: '#001529',
      triggerBg: '#002140',
      triggerColor: '#ffffff',
      bodyBg: '#f5f5f5',
    },
    Menu: {
      darkItemBg: '#001529',
      darkItemColor: 'rgba(255, 255, 255, 0.65)',
      darkItemHoverBg: '#1890ff',
      darkItemHoverColor: '#ffffff',
      darkItemSelectedBg: '#1890ff',
      darkItemSelectedColor: '#ffffff',
      darkSubMenuItemBg: '#000c17',
      itemHeight: 40,
      itemMarginInline: 4,
      itemBorderRadius: 6,
    },
    Button: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },
    Select: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },
    DatePicker: {
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },
    Card: {
      borderRadius: 8,
      headerBg: '#fafafa',
    },
    Table: {
      headerBg: '#fafafa',
      headerSortActiveBg: '#f0f0f0',
      headerSortHoverBg: '#f5f5f5',
      borderColor: '#f0f0f0',
      rowHoverBg: '#fafafa',
    },
    Form: {
      labelColor: 'rgba(0, 0, 0, 0.85)',
      labelRequiredMarkColor: '#ff4d4f',
      itemMarginBottom: 24,
    },
    Tabs: {
      borderRadius: 6,
      cardBg: '#fafafa',
    },
    Modal: {
      borderRadius: 8,
      headerBg: '#ffffff',
    },
    Drawer: {
      borderRadius: 0,
    },
    Badge: {
      borderRadius: 10,
    },
    Tag: {
      borderRadius: 6,
    },
    Alert: {
      borderRadius: 6,
    },
    Progress: {
      borderRadius: 100,
    },
    Breadcrumb: {
      itemColor: 'rgba(0, 0, 0, 0.45)',
      lastItemColor: 'rgba(0, 0, 0, 0.85)',
      linkColor: 'rgba(0, 0, 0, 0.45)',
      linkHoverColor: 'rgba(0, 0, 0, 0.65)',
      separatorColor: 'rgba(0, 0, 0, 0.45)',
    },
  },
  algorithm: undefined, // Use default algorithm
};

// Dark theme configuration
export const darkTheme: ThemeConfig = {
  token: {
    // Primary colors (same as light)
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    
    // Background colors
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#262626',
    colorBgLayout: '#141414',
    colorBgSpotlight: '#262626',
    colorBgMask: 'rgba(0, 0, 0, 0.65)',
    
    // Text colors
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
    colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
    colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
    
    // Border colors
    colorBorder: '#434343',
    colorBorderSecondary: '#303030',
    
    // Link colors (same as light)
    colorLink: '#1890ff',
    colorLinkHover: '#40a9ff',
    colorLinkActive: '#096dd9',
    
    // Font settings (same as light)
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeXL: 20,
    lineHeight: 1.5715,
    lineHeightLG: 1.5,
    lineHeightSM: 1.66,
    
    // Border radius (same as light)
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    borderRadiusXS: 2,
    
    // Control height (same as light)
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    
    // Motion (same as light)
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Layout: {
      headerBg: '#1f1f1f',
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: '#001529',
      triggerBg: '#002140',
      triggerColor: '#ffffff',
      bodyBg: '#141414',
    },
    Menu: {
      darkItemBg: '#001529',
      darkItemColor: 'rgba(255, 255, 255, 0.65)',
      darkItemHoverBg: '#1890ff',
      darkItemHoverColor: '#ffffff',
      darkItemSelectedBg: '#1890ff',
      darkItemSelectedColor: '#ffffff',
      darkSubMenuItemBg: '#000c17',
      itemHeight: 40,
      itemMarginInline: 4,
      itemBorderRadius: 6,
    },
    Card: {
      borderRadius: 8,
      headerBg: '#262626',
    },
    Table: {
      headerBg: '#262626',
      headerSortActiveBg: '#303030',
      headerSortHoverBg: '#404040',
      borderColor: '#303030',
      rowHoverBg: '#262626',
    },
    Form: {
      labelColor: 'rgba(255, 255, 255, 0.85)',
      labelRequiredMarkColor: '#ff4d4f',
      itemMarginBottom: 24,
    },
    Modal: {
      borderRadius: 8,
      headerBg: '#1f1f1f',
    },
    Breadcrumb: {
      itemColor: 'rgba(255, 255, 255, 0.45)',
      lastItemColor: 'rgba(255, 255, 255, 0.85)',
      linkColor: 'rgba(255, 255, 255, 0.45)',
      linkHoverColor: 'rgba(255, 255, 255, 0.65)',
      separatorColor: 'rgba(255, 255, 255, 0.45)',
    },
  },
  algorithm: undefined, // Use default dark algorithm
};

// Transportation-specific color palette
export const transportationColors = {
  // Status colors
  active: '#52c41a',
  inactive: '#d9d9d9',
  maintenance: '#faad14',
  critical: '#ff4d4f',
  
  // Trip status colors
  scheduled: '#1890ff',
  inProgress: '#faad14',
  completed: '#52c41a',
  cancelled: '#ff4d4f',
  
  // Role colors
  admin: '#722ed1',
  teacher: '#1890ff',
  driver: '#52c41a',
  parent: '#fa8c16',
  
  // Vehicle colors
  bus: '#1890ff',
  van: '#52c41a',
  car: '#faad14',
  
  // Priority colors
  high: '#ff4d4f',
  medium: '#faad14',
  low: '#52c41a',
};

// Custom component styles
export const customStyles = {
  // Page container
  pageContainer: {
    padding: '24px',
    minHeight: 'calc(100vh - 64px)',
  },
  
  // Card styles
  cardStyle: {
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  
  // Table styles
  tableStyle: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  
  // Form styles
  formStyle: {
    maxWidth: '600px',
  },
  
  // Button styles
  primaryButton: {
    borderRadius: '6px',
    height: '40px',
    fontWeight: 500,
  },
  
  // Status tag styles
  statusTag: {
    borderRadius: '6px',
    fontWeight: 500,
    border: 'none',
  },
};

// Responsive breakpoints
export const breakpoints = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

export default {
  lightTheme,
  darkTheme,
  transportationColors,
  customStyles,
  breakpoints,
};