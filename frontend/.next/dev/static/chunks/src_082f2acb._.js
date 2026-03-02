(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/providers/QueryProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function QueryProvider(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "53d88650c47d4fccb414faa9067a4a61ada9a5c33f7e33454eeac9baa724a583") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "53d88650c47d4fccb414faa9067a4a61ada9a5c33f7e33454eeac9baa724a583";
    }
    const { children } = t0;
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_QueryProviderUseState);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {
            initialIsOpen: false
        }, void 0, false, {
            fileName: "[project]/src/components/providers/QueryProvider.tsx",
            lineNumber: 24,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== children || $[3] !== queryClient) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: [
                children,
                t1
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/providers/QueryProvider.tsx",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[2] = children;
        $[3] = queryClient;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_s(QueryProvider, "0C9cZBrJebEGOHgNahhDk1PI7/o=");
_c = QueryProvider;
function _QueryProviderUseState() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
        defaultOptions: {
            queries: {
                staleTime: 300000,
                refetchOnWindowFocus: false,
                retry: 1
            }
        }
    });
}
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/app.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_CONFIG = {
    BASE_URL: ("TURBOPACK compile-time value", "http://localhost:5000/api") || "http://localhost:5000/api",
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/PWAProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PWAProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/notification/index.js [app-client] (ecmascript) <export default as notification>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DownloadOutlined.js [app-client] (ecmascript) <export default as DownloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ReloadOutlined.js [app-client] (ecmascript) <export default as ReloadOutlined>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PWAProvider() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "3fb01c1a18cdffc0656642c4eda6689774f50e1f472f688674342444a43832e8") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3fb01c1a18cdffc0656642c4eda6689774f50e1f472f688674342444a43832e8";
    }
    const [deferredPrompt, setDeferredPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [, setIsInstalled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PWAProvider[useEffect()]": {
            "PWAProvider.useEffect": ()=>{
                if ("serviceWorker" in navigator) {
                    navigator.serviceWorker.register("/sw.js").then(_PWAProviderUseEffectAnonymous).catch(_PWAProviderUseEffectAnonymous2);
                }
                const handleBeforeInstallPrompt = {
                    "PWAProvider[useEffect() > handleBeforeInstallPrompt]": {
                        "PWAProvider.useEffect": (e)=>{
                            e.preventDefault();
                            setDeferredPrompt(e);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].info({
                                message: "Install App",
                                description: "Install SKS Transportation System for a better experience",
                                btn: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    size: "small",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/common/PWAProvider.tsx",
                                        lineNumber: 42,
                                        columnNumber: 60
                                    }, void 0),
                                    onClick: handleInstallClick,
                                    children: "Install"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/common/PWAProvider.tsx",
                                    lineNumber: 42,
                                    columnNumber: 18
                                }, this),
                                duration: 10,
                                key: "install-prompt"
                            });
                        }
                    }["PWAProvider.useEffect"]
                }["PWAProvider[useEffect() > handleBeforeInstallPrompt]"];
                const handleAppInstalled = {
                    "PWAProvider[useEffect() > handleAppInstalled]": {
                        "PWAProvider.useEffect": ()=>{
                            setIsInstalled(true);
                            setDeferredPrompt(null);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].destroy("install-prompt");
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].success({
                                message: "App Installed",
                                description: "SKS Transportation System has been installed successfully!",
                                duration: 3
                            });
                        }
                    }["PWAProvider.useEffect"]
                }["PWAProvider[useEffect() > handleAppInstalled]"];
                window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
                window.addEventListener("appinstalled", handleAppInstalled);
                return ({
                    "PWAProvider.useEffect": ()=>{
                        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
                        window.removeEventListener("appinstalled", handleAppInstalled);
                    }
                })["PWAProvider.useEffect"];
            }
        }["PWAProvider.useEffect"]
    }["PWAProvider[useEffect()]"], t0);
    const handleInstallClick = {
        "PWAProvider[handleInstallClick]": async ()=>{
            if (!deferredPrompt) {
                return;
            }
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                console.log("User accepted the install prompt");
            } else {
                console.log("User dismissed the install prompt");
            }
            setDeferredPrompt(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].destroy("install-prompt");
        }
    }["PWAProvider[handleInstallClick]"];
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(_PWAProviderUseEffect, t1);
    return null;
}
_s(PWAProvider, "+7D9K+N+Z20K6Q43iOXLX9N2sAk=");
_c = PWAProvider;
function _PWAProviderUseEffect() {
    const handleOnline = _PWAProviderUseEffectHandleOnline;
    const handleOffline = _PWAProviderUseEffectHandleOffline;
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return ()=>{
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
    };
}
function _PWAProviderUseEffectHandleOffline() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].warning({
        message: "You are Offline",
        description: "Some features may be limited while offline.",
        duration: 5,
        key: "offline-status"
    });
}
function _PWAProviderUseEffectHandleOnline() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].success({
        message: "Connection Restored",
        description: "You are back online!",
        duration: 3,
        key: "online-status"
    });
}
function _PWAProviderUseEffectAnonymous2(registrationError) {
    console.log("SW registration failed: ", registrationError);
}
function _PWAProviderUseEffectAnonymous(registration) {
    console.log("SW registered: ", registration);
    registration.addEventListener("updatefound", {
        "PWAProvider[useEffect() > (anonymous)() > registration.addEventListener()]": ()=>{
            const newWorker = registration.installing;
            if (newWorker) {
                newWorker.addEventListener("statechange", {
                    "PWAProvider[useEffect() > (anonymous)() > registration.addEventListener() > newWorker.addEventListener()]": ()=>{
                        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].info({
                                message: "Update Available",
                                description: "A new version is available. Please refresh to update.",
                                btn: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    size: "small",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__["ReloadOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/common/PWAProvider.tsx",
                                        lineNumber: 137,
                                        columnNumber: 64
                                    }, void 0),
                                    onClick: _PWAProviderUseEffectAnonymousRegistrationAddEventListenerNewWorkerAddEventListenerButtonOnClick,
                                    children: "Refresh"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/common/PWAProvider.tsx",
                                    lineNumber: 137,
                                    columnNumber: 22
                                }, this),
                                duration: 0,
                                key: "sw-update"
                            });
                        }
                    }
                }["PWAProvider[useEffect() > (anonymous)() > registration.addEventListener() > newWorker.addEventListener()]"]);
            }
        }
    }["PWAProvider[useEffect() > (anonymous)() > registration.addEventListener()]"]);
}
function _PWAProviderUseEffectAnonymousRegistrationAddEventListenerNewWorkerAddEventListenerButtonOnClick() {
    window.location.reload();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].destroy();
}
var _c;
__turbopack_context__.k.register(_c, "PWAProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$config$2d$provider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__ConfigProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/config-provider/index.js [app-client] (ecmascript) <locals> <export default as ConfigProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$app$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__App$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/app/index.js [app-client] (ecmascript) <export default as App>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$locale$2f$en_US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/antd/locale/en_US.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$PWAProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/PWAProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
// Configure Query Client
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            // 5 minutes
            gcTime: 10 * 60 * 1000,
            // 10 minutes (formerly cacheTime)
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
function ThemeProvider(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "a901562b4001a6d3886eda08e77dc2c53b4a7da283b3f072492b9077720514a3") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a901562b4001a6d3886eda08e77dc2c53b4a7da283b3f072492b9077720514a3";
    }
    const { children } = t0;
    const [isDarkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_ThemeProviderUseState);
    const t1 = isDarkMode ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["darkTheme"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lightTheme"];
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$PWAProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/components/common/ThemeProvider.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    const t3 = `app-container ${isDarkMode ? "dark" : "light"}`;
    let t4;
    if ($[2] !== children || $[3] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$app$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__App$3e$__["App"], {
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: t3,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/common/ThemeProvider.tsx",
                    lineNumber: 61,
                    columnNumber: 19
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/common/ThemeProvider.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        $[2] = children;
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] !== t1 || $[6] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$config$2d$provider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__ConfigProvider$3e$__["ConfigProvider"], {
            theme: t1,
            locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$locale$2f$en_US$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            componentSize: "middle",
            children: t4
        }, void 0, false, {
            fileName: "[project]/src/components/common/ThemeProvider.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        $[5] = t1;
        $[6] = t4;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {
            initialIsOpen: false
        }, void 0, false, {
            fileName: "[project]/src/components/common/ThemeProvider.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== t5) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/common/ThemeProvider.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[9] = t5;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    return t7;
}
_s(ThemeProvider, "nGoOG//X0+XAqOr6+z10x/Osi8Y=");
_c = ThemeProvider;
function _ThemeProviderUseState() {
    if ("TURBOPACK compile-time truthy", 1) {
        const savedTheme = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].THEME);
        return savedTheme === "dark";
    }
    //TURBOPACK unreachable
    ;
}
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_082f2acb._.js.map