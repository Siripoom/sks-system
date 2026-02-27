module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/styles/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "breakpoints",
    ()=>breakpoints,
    "customStyles",
    ()=>customStyles,
    "darkTheme",
    ()=>darkTheme,
    "default",
    ()=>__TURBOPACK__default__export__,
    "lightTheme",
    ()=>lightTheme,
    "transportationColors",
    ()=>transportationColors
]);
const lightTheme = {
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
        motionDurationSlow: '0.3s'
    },
    components: {
        Layout: {
            headerBg: '#ffffff',
            headerHeight: 64,
            headerPadding: '0 24px',
            siderBg: '#001529',
            triggerBg: '#002140',
            triggerColor: '#ffffff',
            bodyBg: '#f5f5f5'
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
            itemBorderRadius: 6
        },
        Button: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24
        },
        Input: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24
        },
        Select: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24
        },
        DatePicker: {
            borderRadius: 6,
            controlHeight: 32,
            controlHeightLG: 40,
            controlHeightSM: 24
        },
        Card: {
            borderRadius: 8,
            headerBg: '#fafafa'
        },
        Table: {
            headerBg: '#fafafa',
            headerSortActiveBg: '#f0f0f0',
            headerSortHoverBg: '#f5f5f5',
            borderColor: '#f0f0f0',
            rowHoverBg: '#fafafa'
        },
        Form: {
            labelColor: 'rgba(0, 0, 0, 0.85)',
            labelRequiredMarkColor: '#ff4d4f',
            itemMarginBottom: 24
        },
        Tabs: {
            borderRadius: 6,
            cardBg: '#fafafa'
        },
        Modal: {
            borderRadius: 8,
            headerBg: '#ffffff'
        },
        Drawer: {
            borderRadius: 0
        },
        Badge: {
            borderRadius: 10
        },
        Tag: {
            borderRadius: 6
        },
        Alert: {
            borderRadius: 6
        },
        Progress: {
            borderRadius: 100
        },
        Breadcrumb: {
            itemColor: 'rgba(0, 0, 0, 0.45)',
            lastItemColor: 'rgba(0, 0, 0, 0.85)',
            linkColor: 'rgba(0, 0, 0, 0.45)',
            linkHoverColor: 'rgba(0, 0, 0, 0.65)',
            separatorColor: 'rgba(0, 0, 0, 0.45)'
        }
    },
    algorithm: undefined
};
const darkTheme = {
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
        motionDurationSlow: '0.3s'
    },
    components: {
        Layout: {
            headerBg: '#1f1f1f',
            headerHeight: 64,
            headerPadding: '0 24px',
            siderBg: '#001529',
            triggerBg: '#002140',
            triggerColor: '#ffffff',
            bodyBg: '#141414'
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
            itemBorderRadius: 6
        },
        Card: {
            borderRadius: 8,
            headerBg: '#262626'
        },
        Table: {
            headerBg: '#262626',
            headerSortActiveBg: '#303030',
            headerSortHoverBg: '#404040',
            borderColor: '#303030',
            rowHoverBg: '#262626'
        },
        Form: {
            labelColor: 'rgba(255, 255, 255, 0.85)',
            labelRequiredMarkColor: '#ff4d4f',
            itemMarginBottom: 24
        },
        Modal: {
            borderRadius: 8,
            headerBg: '#1f1f1f'
        },
        Breadcrumb: {
            itemColor: 'rgba(255, 255, 255, 0.45)',
            lastItemColor: 'rgba(255, 255, 255, 0.85)',
            linkColor: 'rgba(255, 255, 255, 0.45)',
            linkHoverColor: 'rgba(255, 255, 255, 0.65)',
            separatorColor: 'rgba(255, 255, 255, 0.45)'
        }
    },
    algorithm: undefined
};
const transportationColors = {
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
    low: '#52c41a'
};
const customStyles = {
    // Page container
    pageContainer: {
        padding: '24px',
        minHeight: 'calc(100vh - 64px)'
    },
    // Card styles
    cardStyle: {
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    },
    // Table styles
    tableStyle: {
        borderRadius: '8px',
        overflow: 'hidden'
    },
    // Form styles
    formStyle: {
        maxWidth: '600px'
    },
    // Button styles
    primaryButton: {
        borderRadius: '6px',
        height: '40px',
        fontWeight: 500
    },
    // Status tag styles
    statusTag: {
        borderRadius: '6px',
        fontWeight: 500,
        border: 'none'
    }
};
const breakpoints = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
const __TURBOPACK__default__export__ = {
    lightTheme,
    darkTheme,
    transportationColors,
    customStyles,
    breakpoints
};
}),
"[project]/src/constants/app.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Configuration
__turbopack_context__.s([
    "API_CONFIG",
    ()=>API_CONFIG,
    "ASSIGNMENT_STATUS",
    ()=>ASSIGNMENT_STATUS,
    "AUTH_CONFIG",
    ()=>AUTH_CONFIG,
    "BREAKPOINTS",
    ()=>BREAKPOINTS,
    "DATE_FORMATS",
    ()=>DATE_FORMATS,
    "ERROR_MESSAGES",
    ()=>ERROR_MESSAGES,
    "FILE_UPLOAD",
    ()=>FILE_UPLOAD,
    "MAINTENANCE_STATUS",
    ()=>MAINTENANCE_STATUS,
    "NOTIFICATION_TYPE",
    ()=>NOTIFICATION_TYPE,
    "PAGINATION",
    ()=>PAGINATION,
    "QUERY_KEYS",
    ()=>QUERY_KEYS,
    "ROUTES",
    ()=>ROUTES,
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS,
    "SUCCESS_MESSAGES",
    ()=>SUCCESS_MESSAGES,
    "THEME_COLORS",
    ()=>THEME_COLORS,
    "THEME_MODE",
    ()=>THEME_MODE,
    "TRIP_STATUS",
    ()=>TRIP_STATUS,
    "TRIP_TYPE",
    ()=>TRIP_TYPE,
    "USER_ROLES",
    ()=>USER_ROLES,
    "VEHICLE_STATUS",
    ()=>VEHICLE_STATUS,
    "WS_EVENTS",
    ()=>WS_EVENTS
]);
const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
};
const AUTH_CONFIG = {
    ACCESS_TOKEN_KEY: "sks_access_token",
    REFRESH_TOKEN_KEY: "sks_refresh_token",
    USER_DATA_KEY: "sks_user_data",
    TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000
};
const USER_ROLES = {
    ADMIN: "ADMIN",
    TEACHER: "TEACHER",
    DRIVER: "DRIVER",
    PARENT: "PARENT"
};
const VEHICLE_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    MAINTENANCE: "MAINTENANCE"
};
const MAINTENANCE_STATUS = {
    GOOD: "GOOD",
    NEEDS_ATTENTION: "NEEDS_ATTENTION",
    CRITICAL: "CRITICAL"
};
const TRIP_STATUS = {
    SCHEDULED: "SCHEDULED",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
};
const TRIP_TYPE = {
    PICKUP: "PICKUP",
    DROPOFF: "DROPOFF"
};
const ASSIGNMENT_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE"
};
const NOTIFICATION_TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info"
};
const THEME_MODE = {
    LIGHT: "light",
    DARK: "dark"
};
const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [
        "10",
        "20",
        "50",
        "100"
    ],
    SHOW_QUICK_JUMPER: true,
    SHOW_SIZE_CHANGER: true
};
const DATE_FORMATS = {
    DISPLAY: "DD/MM/YYYY",
    DISPLAY_WITH_TIME: "DD/MM/YYYY HH:mm",
    API: "YYYY-MM-DD",
    API_WITH_TIME: "YYYY-MM-DDTHH:mm:ss.SSSZ"
};
const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024,
    ALLOWED_TYPES: [
        "image/jpeg",
        "image/png",
        "application/pdf"
    ],
    ALLOWED_EXTENSIONS: [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf"
    ]
};
const STORAGE_KEYS = {
    THEME: "sks_theme",
    LANGUAGE: "sks_language",
    SIDEBAR_COLLAPSED: "sks_sidebar_collapsed",
    TABLE_SETTINGS: "sks_table_settings"
};
const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network error occurred. Please check your connection.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    FORBIDDEN: "Access denied. Insufficient permissions.",
    NOT_FOUND: "The requested resource was not found.",
    SERVER_ERROR: "An unexpected server error occurred.",
    VALIDATION_ERROR: "Please check your input and try again.",
    TOKEN_EXPIRED: "Your session has expired. Please login again."
};
const SUCCESS_MESSAGES = {
    LOGIN: "Successfully logged in!",
    LOGOUT: "Successfully logged out!",
    CREATED: "Record created successfully!",
    UPDATED: "Record updated successfully!",
    DELETED: "Record deleted successfully!",
    SAVED: "Changes saved successfully!"
};
const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    DASHBOARD: "/dashboard",
    SCHOOLS: "/schools",
    VEHICLES: "/vehicles",
    USERS: "/users",
    STUDENTS: "/students",
    DRIVERS: "/drivers",
    ROUTES: "/routes",
    TRIPS: "/trips",
    ASSIGNMENTS: "/assignments",
    STOPS: "/stops",
    GUARDIANS: "/guardians",
    EVENT_LOGS: "/logs",
    PROFILE: "/profile",
    SETTINGS: "/settings"
};
const WS_EVENTS = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    TRIP_UPDATE: "trip_update",
    NOTIFICATION: "notification",
    LOCATION_UPDATE: "location_update",
    SUBSCRIBE_TRIP: "subscribe_trip",
    UNSUBSCRIBE_TRIP: "unsubscribe_trip"
};
const QUERY_KEYS = {
    USERS: [
        "users"
    ],
    USER: (id)=>[
            "users",
            id
        ],
    SCHOOLS: [
        "schools"
    ],
    SCHOOL: (id)=>[
            "schools",
            id
        ],
    VEHICLES: [
        "vehicles"
    ],
    VEHICLE: (id)=>[
            "vehicles",
            id
        ],
    STUDENTS: [
        "students"
    ],
    STUDENT: (id)=>[
            "students",
            id
        ],
    DRIVERS: [
        "drivers"
    ],
    DRIVER: (id)=>[
            "drivers",
            id
        ],
    ROUTES: [
        "routes"
    ],
    ROUTE: (id)=>[
            "routes",
            id
        ],
    TRIPS: [
        "trips"
    ],
    TRIP: (id)=>[
            "trips",
            id
        ],
    ASSIGNMENTS: [
        "assignments"
    ],
    ASSIGNMENT: (id)=>[
            "assignments",
            id
        ],
    STOPS: [
        "stops"
    ],
    STOP: (id)=>[
            "stops",
            id
        ],
    GUARDIANS: [
        "guardians"
    ],
    GUARDIAN: (id)=>[
            "guardians",
            id
        ],
    EVENT_LOGS: [
        "event_logs"
    ],
    EVENT_LOG: (id)=>[
            "event_logs",
            id
        ],
    CURRENT_USER: [
        "current_user"
    ]
};
const THEME_COLORS = {
    PRIMARY: "#1890ff",
    SUCCESS: "#52c41a",
    WARNING: "#faad14",
    ERROR: "#f5222d",
    INFO: "#1890ff",
    TEXT_PRIMARY: "rgba(0, 0, 0, 0.85)",
    TEXT_SECONDARY: "rgba(0, 0, 0, 0.65)",
    TEXT_DISABLED: "rgba(0, 0, 0, 0.25)"
};
const BREAKPOINTS = {
    XS: 480,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
    XXL: 1600
};
}),
"[project]/src/components/common/ThemeProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$config$2d$provider$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__ConfigProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/config-provider/index.js [app-ssr] (ecmascript) <locals> <export default as ConfigProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$app$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__App$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/app/index.js [app-ssr] (ecmascript) <export default as App>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$locale$2f$en_US$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/antd/locale/en_US.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/theme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
// Configure Query Client
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: (failureCount, error)=>{
                // Don't retry on authentication errors
                if (error?.response?.status === 401 || error?.response?.status === 403) {
                    return false;
                }
                return failureCount < 3;
            },
            refetchOnWindowFocus: false
        },
        mutations: {
            retry: false
        }
    }
});
function ThemeProvider({ children }) {
    // Initialize theme from localStorage or default to light
    const [isDarkMode, setIsDarkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return false;
    });
    // Toggle theme function
    const toggleTheme = ()=>{
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$config$2d$provider$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__ConfigProvider$3e$__["ConfigProvider"], {
                theme: isDarkMode ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["darkTheme"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lightTheme"],
                locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$locale$2f$en_US$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                componentSize: "middle",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$app$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__App$3e$__["App"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `app-container ${isDarkMode ? 'dark' : 'light'}`,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/ThemeProvider.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/common/ThemeProvider.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/common/ThemeProvider.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {
                initialIsOpen: false
            }, void 0, false, {
                fileName: "[project]/src/components/common/ThemeProvider.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/common/ThemeProvider.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6a9f6c2b._.js.map