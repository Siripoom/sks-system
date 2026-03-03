(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PermissionChecker",
    ()=>PermissionChecker,
    "TokenStorage",
    ()=>TokenStorage,
    "UserStorage",
    ()=>UserStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
;
class TokenStorage {
    static setTokens(accessToken, refreshToken) {
        try {
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].REFRESH_TOKEN_KEY, refreshToken);
            this.scheduleTokenRefresh(accessToken);
        } catch (error) {
            console.error('Failed to store tokens:', error);
        }
    }
    static getAccessToken() {
        try {
            return localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].ACCESS_TOKEN_KEY);
        } catch (error) {
            console.error('Failed to get access token:', error);
            return null;
        }
    }
    static getRefreshToken() {
        try {
            return localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Failed to get refresh token:', error);
            return null;
        }
    }
    static clearTokens() {
        try {
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].ACCESS_TOKEN_KEY);
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].REFRESH_TOKEN_KEY);
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY);
        } catch (error) {
            console.error('Failed to clear tokens:', error);
        }
    }
    static isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            return true;
        }
    }
    static isTokenExpiringSoon(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now();
            const expirationTime = payload.exp * 1000;
            return expirationTime - currentTime < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].TOKEN_REFRESH_THRESHOLD;
        } catch (error) {
            return true;
        }
    }
    static scheduleTokenRefresh(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = payload.exp * 1000;
            const currentTime = Date.now();
            const timeUntilExpiry = expirationTime - currentTime;
            // Refresh 5 minutes before expiry
            const refreshTime = Math.max(0, timeUntilExpiry - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].TOKEN_REFRESH_THRESHOLD);
            setTimeout(()=>{
                window.dispatchEvent(new CustomEvent('tokenRefreshNeeded'));
            }, refreshTime);
        } catch (error) {
            console.error('Failed to schedule token refresh:', error);
        }
    }
}
class UserStorage {
    static setUser(user) {
        try {
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Failed to store user data:', error);
        }
    }
    static getUser() {
        try {
            const userData = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Failed to get user data:', error);
            return null;
        }
    }
    static clearUser() {
        try {
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY);
        } catch (error) {
            console.error('Failed to clear user data:', error);
        }
    }
}
class PermissionChecker {
    static hasRole(userRole, allowedRoles) {
        if (!allowedRoles || allowedRoles.length === 0) return true;
        return allowedRoles.includes(userRole);
    }
    static hasAnyRole(userRole, roles) {
        return this.hasRole(userRole, roles);
    }
    static hasAllRoles(userRole, roles) {
        // For single user role system, user either has the role or doesn't
        return roles.every((role)=>userRole === role);
    }
    static canAccessResource(userRole, resourceRoles) {
        if (!resourceRoles || resourceRoles.length === 0) return true;
        return this.hasAnyRole(userRole, resourceRoles);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/apiClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/auth.ts [app-client] (ecmascript)");
;
;
;
class ApiClient {
    instance;
    isRefreshing = false;
    refreshSubscribers = [];
    constructor(){
        console.log('ApiClient: Initializing with BASE_URL:', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].BASE_URL);
        this.instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].BASE_URL,
            timeout: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setupInterceptors();
        this.setupTokenRefreshListener();
    }
    setupInterceptors() {
        // Request interceptor to add auth token
        this.instance.interceptors.request.use((config)=>{
            // console.log('ApiClient: Making request to:', config.url);
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
            // console.log('ApiClient: Token available:', !!token);
            if (token) {
                // console.log('ApiClient: Token expired?', TokenStorage.isTokenExpired(token));
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token)) {
                    config.headers.Authorization = `Bearer ${token}`;
                // console.log('ApiClient: Added Authorization header');
                } else {
                // console.log('ApiClient: Token expired, not adding to request');
                }
            } else {
            // console.log('ApiClient: No token available');
            }
            // console.log('ApiClient: Request config:', {
            //   url: config.url,
            //   method: config.method,
            //   hasAuth: !!config.headers.Authorization,
            //   params: config.params
            // });
            return config;
        }, (error)=>{
            console.error('ApiClient: Request error:', error);
            return Promise.reject(error);
        });
        // Response interceptor to handle token refresh and errors
        this.instance.interceptors.response.use((response)=>{
            console.log('ApiClient: Response received:', response.status, response.config.url);
            return response;
        }, async (error)=>{
            console.error('ApiClient: Response error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url,
                code: error.code,
                message: error.message
            });
            const originalRequest = error.config;
            // Handle 401 Unauthorized errors
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newToken = await this.handleTokenRefresh();
                    if (newToken && originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return this.instance(originalRequest);
                    }
                } catch (refreshError) {
                    this.handleAuthFailure();
                    return Promise.reject(refreshError);
                }
            }
            // Handle other errors
            return Promise.reject(this.handleError(error));
        });
    }
    async handleTokenRefresh() {
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getRefreshToken();
        if (!refreshToken) {
            this.handleAuthFailure();
            return null;
        }
        if (this.isRefreshing) {
            // If already refreshing, wait for the refresh to complete
            return new Promise((resolve)=>{
                this.refreshSubscribers.push(resolve);
            });
        }
        this.isRefreshing = true;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].BASE_URL}/auth/refresh`, {
                refreshToken
            });
            if (response.data.success) {
                const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(accessToken, newRefreshToken);
                // Notify all waiting requests
                this.refreshSubscribers.forEach((callback)=>callback(accessToken));
                this.refreshSubscribers = [];
                return accessToken;
            } else {
                throw new Error('Token refresh failed');
            }
        } catch (error) {
            this.handleAuthFailure();
            return null;
        } finally{
            this.isRefreshing = false;
        }
    }
    setupTokenRefreshListener() {
        if ("TURBOPACK compile-time truthy", 1) {
            window.addEventListener('tokenRefreshNeeded', ()=>{
                this.handleTokenRefresh();
            });
        }
    }
    handleAuthFailure() {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].clearTokens();
        // Only redirect if not already on login page
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && !window.location.pathname.includes('/auth')) {
            window.location.href = '/auth/login';
        }
    }
    handleError(error) {
        if (error.response?.data) {
            return error.response.data;
        }
        // Handle different types of errors
        if (error.code === 'ECONNABORTED') {
            return {
                success: false,
                error: {
                    message: 'Request timeout. Please try again.',
                    code: 'TIMEOUT'
                }
            };
        }
        if (error.code === 'ERR_NETWORK') {
            return {
                success: false,
                error: {
                    message: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].NETWORK_ERROR,
                    code: 'NETWORK_ERROR'
                }
            };
        }
        return {
            success: false,
            error: {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].SERVER_ERROR,
                code: 'UNKNOWN_ERROR'
            }
        };
    }
    // Generic API methods
    async get(url, config) {
        try {
            const response = await this.instance.get(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async post(url, data, config) {
        try {
            const response = await this.instance.post(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async put(url, data, config) {
        try {
            const response = await this.instance.put(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async patch(url, data, config) {
        try {
            const response = await this.instance.patch(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async delete(url, config) {
        try {
            const response = await this.instance.delete(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    // Pagination helper
    async getPaginated(url, page = 1, limit = 10, filters, config) {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...Object.entries(filters || {}).reduce((acc, [key, value])=>{
                if (value !== undefined && value !== null && value !== '') {
                    acc[key] = value.toString();
                }
                return acc;
            }, {})
        });
        try {
            const response = await this.instance.get(`${url}?${params}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    // File upload helper
    async uploadFile(url, file, field = 'file', additionalData, onUploadProgress) {
        const formData = new FormData();
        formData.append(field, file);
        if (additionalData) {
            Object.entries(additionalData).forEach(([key, value])=>{
                formData.append(key, value.toString());
            });
        }
        try {
            const response = await this.instance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent)=>{
                    if (onUploadProgress && progressEvent.total) {
                        const progress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                        onUploadProgress(progress);
                    }
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    // Retry mechanism for failed requests
    async retryRequest(request, maxRetries = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].RETRY_ATTEMPTS, delay = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].RETRY_DELAY) {
        let lastError;
        for(let attempt = 1; attempt <= maxRetries; attempt++){
            try {
                return await request();
            } catch (error) {
                lastError = error;
                if (attempt === maxRetries) {
                    throw lastError;
                }
                // Wait before retrying
                await new Promise((resolve)=>setTimeout(resolve, delay * attempt));
            }
        }
        throw lastError;
    }
    // Health check
    async healthCheck() {
        try {
            await this.instance.get('/health');
            return true;
        } catch (error) {
            return false;
        }
    }
    // Get the raw axios instance for special cases
    getInstance() {
        return this.instance;
    }
}
// Export singleton instance
const apiClient = new ApiClient();
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/assignmentService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssignmentService",
    ()=>AssignmentService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
'use client';
;
class AssignmentService {
    static BASE_PATH = '/assignments';
    // Assignment CRUD Operations
    static async getAssignments(filters) {
        const params = new URLSearchParams();
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        if (filters?.search) params.append('search', filters.search);
        if (filters?.studentId) params.append('studentId', filters.studentId);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        if (filters?.stopId) params.append('stopId', filters.stopId);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.assignmentDate) params.append('assignmentDate', filters.assignmentDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}?${params.toString()}`);
        return response.data;
    }
    static async getAssignmentById(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
    static async createAssignment(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.BASE_PATH, data);
        return response.data;
    }
    static async updateAssignment(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }
    static async deleteAssignment(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${id}`);
    }
    // Bulk Assignment Operations
    static async createBulkAssignments(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/bulk`, data);
        return response.data;
    }
    static async updateBulkAssignments(assignmentIds, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/bulk`, {
            assignmentIds,
            updates
        });
    }
    static async deleteBulkAssignments(assignmentIds) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/bulk`, {
            data: {
                assignmentIds
            }
        });
    }
    // Student Assignment Operations
    static async getStudentAssignments(studentId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/students/${studentId}/assignments`);
        return response.data;
    }
    static async assignStudentToRoute(studentId, routeId, stopId, assignmentDate) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/students/${studentId}/assign`, {
            routeId,
            stopId,
            assignmentDate,
            status: 'ACTIVE'
        });
        return response.data;
    }
    static async unassignStudent(studentId, assignmentId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/students/${studentId}/assignments/${assignmentId}`);
    }
    // Route Assignment Operations
    static async getRouteAssignments(routeId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/routes/${routeId}/assignments`);
        return response.data;
    }
    static async getUnassignedStudents(filters) {
        const params = new URLSearchParams();
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.grade) params.append('grade', filters.grade);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/students/unassigned?${params.toString()}`);
        return response.data;
    }
    // Assignment Status Management
    static async updateAssignmentStatus(id, status) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/status`, {
            status
        });
        return response.data;
    }
    static async activateAssignment(id) {
        return this.updateAssignmentStatus(id, 'ACTIVE');
    }
    static async deactivateAssignment(id) {
        return this.updateAssignmentStatus(id, 'INACTIVE');
    }
    // Transfer Operations
    static async transferStudent(studentId, fromRouteId, toRouteId, toStopId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/students/${studentId}/transfer`, {
            fromRouteId,
            toRouteId,
            toStopId,
            transferDate: new Date().toISOString()
        });
        return response.data;
    }
    static async transferStudents(transfers) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/bulk-transfer`, {
            transfers,
            transferDate: new Date().toISOString()
        });
        return response.data;
    }
    // Analytics and Reporting
    static async getAssignmentStats(filters) {
        const params = new URLSearchParams();
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/stats?${params.toString()}`);
        return response.data;
    }
    static async getRouteUtilization(routeId) {
        const params = routeId ? `?routeId=${routeId}` : '';
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/utilization${params}`);
        return response.data;
    }
    static async getAssignmentHistory(studentId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/students/${studentId}/assignment-history`);
        return response.data;
    }
    // Validation and Conflicts
    static async validateAssignment(studentId, routeId, stopId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/validate`, {
            studentId,
            routeId,
            stopId
        });
        return response.data;
    }
    static async getAssignmentConflicts() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/conflicts`);
        return response.data;
    }
    // Import/Export
    static async importAssignments(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/import`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
    static async exportAssignments(filters) {
        const params = new URLSearchParams();
        if (filters?.search) params.append('search', filters.search);
        if (filters?.studentId) params.append('studentId', filters.studentId);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        if (filters?.stopId) params.append('stopId', filters.stopId);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.assignmentDate) params.append('assignmentDate', filters.assignmentDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/export?${params.toString()}`, {
            responseType: 'blob'
        });
        return response.data;
    }
    // Auto-Assignment
    static async autoAssignStudents(criteria) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/auto-assign`, criteria);
        return response.data;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAssignments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActivateAssignment",
    ()=>useActivateAssignment,
    "useAssignStudentToRoute",
    ()=>useAssignStudentToRoute,
    "useAssignment",
    ()=>useAssignment,
    "useAssignmentConflicts",
    ()=>useAssignmentConflicts,
    "useAssignmentHistory",
    ()=>useAssignmentHistory,
    "useAssignmentStats",
    ()=>useAssignmentStats,
    "useAssignments",
    ()=>useAssignments,
    "useAutoAssignStudents",
    ()=>useAutoAssignStudents,
    "useCreateAssignment",
    ()=>useCreateAssignment,
    "useCreateBulkAssignments",
    ()=>useCreateBulkAssignments,
    "useDeactivateAssignment",
    ()=>useDeactivateAssignment,
    "useDeleteAssignment",
    ()=>useDeleteAssignment,
    "useDeleteBulkAssignments",
    ()=>useDeleteBulkAssignments,
    "useExportAssignments",
    ()=>useExportAssignments,
    "useImportAssignments",
    ()=>useImportAssignments,
    "useRouteAssignments",
    ()=>useRouteAssignments,
    "useRouteUtilization",
    ()=>useRouteUtilization,
    "useStudentAssignments",
    ()=>useStudentAssignments,
    "useTransferStudent",
    ()=>useTransferStudent,
    "useTransferStudents",
    ()=>useTransferStudents,
    "useUnassignStudent",
    ()=>useUnassignStudent,
    "useUnassignedStudents",
    ()=>useUnassignedStudents,
    "useUpdateAssignment",
    ()=>useUpdateAssignment,
    "useUpdateAssignmentStatus",
    ()=>useUpdateAssignmentStatus,
    "useUpdateBulkAssignments",
    ()=>useUpdateBulkAssignments,
    "useValidateAssignment",
    ()=>useValidateAssignment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/assignmentService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature(), _s19 = __turbopack_context__.k.signature(), _s20 = __turbopack_context__.k.signature(), _s21 = __turbopack_context__.k.signature(), _s22 = __turbopack_context__.k.signature(), _s23 = __turbopack_context__.k.signature(), _s24 = __turbopack_context__.k.signature(), _s25 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Query Keys
const ASSIGNMENT_KEYS = {
    all: [
        'assignments'
    ],
    lists: ()=>[
            ...ASSIGNMENT_KEYS.all,
            'list'
        ],
    list: (filters)=>[
            ...ASSIGNMENT_KEYS.lists(),
            filters
        ],
    details: ()=>[
            ...ASSIGNMENT_KEYS.all,
            'detail'
        ],
    detail: (id)=>[
            ...ASSIGNMENT_KEYS.details(),
            id
        ],
    student: (studentId)=>[
            ...ASSIGNMENT_KEYS.all,
            'student',
            studentId
        ],
    route: (routeId)=>[
            ...ASSIGNMENT_KEYS.all,
            'route',
            routeId
        ],
    unassigned: ()=>[
            ...ASSIGNMENT_KEYS.all,
            'unassigned'
        ],
    stats: (filters)=>[
            ...ASSIGNMENT_KEYS.all,
            'stats',
            filters
        ],
    utilization: (routeId)=>[
            ...ASSIGNMENT_KEYS.all,
            'utilization',
            routeId
        ],
    history: (studentId)=>[
            ...ASSIGNMENT_KEYS.all,
            'history',
            studentId
        ],
    conflicts: ()=>[
            ...ASSIGNMENT_KEYS.all,
            'conflicts'
        ]
};
const useAssignments = (filters)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] !== filters) {
        t0 = ASSIGNMENT_KEYS.list(filters);
        $[1] = filters;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== filters) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getAssignments(filters);
        $[3] = filters;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    let t2;
    if ($[5] !== t0 || $[6] !== t1) {
        t2 = {
            queryKey: t0,
            queryFn: t1,
            staleTime: 300000,
            refetchInterval: 30000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t2);
};
_s(useAssignments, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAssignment = (id)=>{
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] !== id) {
        t0 = ASSIGNMENT_KEYS.detail(id);
        $[1] = id;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== id) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getAssignmentById(id);
        $[3] = id;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!id;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 120000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s1(useAssignment, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useStudentAssignments = (studentId)=>{
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] !== studentId) {
        t0 = ASSIGNMENT_KEYS.student(studentId);
        $[1] = studentId;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== studentId) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getStudentAssignments(studentId);
        $[3] = studentId;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!studentId;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 120000,
            refetchInterval: 15000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s2(useStudentAssignments, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useRouteAssignments = (routeId)=>{
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] !== routeId) {
        t0 = ASSIGNMENT_KEYS.route(routeId);
        $[1] = routeId;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== routeId) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getRouteAssignments(routeId);
        $[3] = routeId;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!routeId;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 120000,
            refetchInterval: 15000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s3(useRouteAssignments, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useUnassignedStudents = (filters)=>{
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ASSIGNMENT_KEYS.unassigned();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] !== filters) {
        t1 = {
            queryKey: t0,
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getUnassignedStudents(filters),
            staleTime: 60000,
            refetchInterval: 20000
        };
        $[2] = filters;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t1);
};
_s4(useUnassignedStudents, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAssignmentStats = (filters)=>{
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] !== filters) {
        t0 = ASSIGNMENT_KEYS.stats(filters);
        $[1] = filters;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== filters) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getAssignmentStats(filters);
        $[3] = filters;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    let t2;
    if ($[5] !== t0 || $[6] !== t1) {
        t2 = {
            queryKey: t0,
            queryFn: t1,
            staleTime: 300000,
            refetchInterval: 60000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t2);
};
_s5(useAssignmentStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useRouteUtilization = (routeId)=>{
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] !== routeId) {
        t0 = ASSIGNMENT_KEYS.utilization(routeId);
        $[1] = routeId;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== routeId) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getRouteUtilization(routeId);
        $[3] = routeId;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    let t2;
    if ($[5] !== t0 || $[6] !== t1) {
        t2 = {
            queryKey: t0,
            queryFn: t1,
            staleTime: 300000,
            refetchInterval: 30000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t2);
};
_s6(useRouteUtilization, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAssignmentHistory = (studentId)=>{
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] !== studentId) {
        t0 = ASSIGNMENT_KEYS.history(studentId);
        $[1] = studentId;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== studentId) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getAssignmentHistory(studentId);
        $[3] = studentId;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!studentId;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 600000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s7(useAssignmentHistory, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAssignmentConflicts = ()=>{
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            queryKey: ASSIGNMENT_KEYS.conflicts(),
            queryFn: _temp,
            staleTime: 120000,
            refetchInterval: 45000
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
};
_s8(useAssignmentConflicts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useCreateAssignment = ()=>{
    _s9();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp2,
            onSuccess: (newAssignment)=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.lists()
                });
                if (newAssignment.studentId) {
                    queryClient.invalidateQueries({
                        queryKey: ASSIGNMENT_KEYS.student(newAssignment.studentId)
                    });
                }
                if (newAssignment.routeId) {
                    queryClient.invalidateQueries({
                        queryKey: ASSIGNMENT_KEYS.route(newAssignment.routeId)
                    });
                }
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.stats()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.utilization()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.unassigned()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.conflicts()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignment created successfully");
            },
            onError: _temp3
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s9(useCreateAssignment, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useUpdateAssignment = ()=>{
    _s10();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp4,
            onSuccess: (updatedAssignment, t1)=>{
                const { id: id_0 } = t1;
                queryClient.setQueryData(ASSIGNMENT_KEYS.detail(id_0), updatedAssignment);
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.lists()
                });
                if (updatedAssignment.studentId) {
                    queryClient.invalidateQueries({
                        queryKey: ASSIGNMENT_KEYS.student(updatedAssignment.studentId)
                    });
                }
                if (updatedAssignment.routeId) {
                    queryClient.invalidateQueries({
                        queryKey: ASSIGNMENT_KEYS.route(updatedAssignment.routeId)
                    });
                }
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.stats()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.utilization()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignment updated successfully");
            },
            onError: _temp5
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s10(useUpdateAssignment, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useDeleteAssignment = ()=>{
    _s11();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp6,
            onSuccess: (_, id_0)=>{
                queryClient.removeQueries({
                    queryKey: ASSIGNMENT_KEYS.detail(id_0)
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.lists()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.student(id_0)
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.route(id_0)
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.stats()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.utilization()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.unassigned()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.conflicts()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignment deleted successfully");
            },
            onError: _temp7
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s11(useDeleteAssignment, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useCreateBulkAssignments = ()=>{
    _s12();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp8,
            onSuccess: (assignments)=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`${assignments.length} assignments created successfully`);
            },
            onError: _temp9
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s12(useCreateBulkAssignments, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useUpdateBulkAssignments = ()=>{
    _s13();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp10,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignments updated successfully");
            },
            onError: _temp11
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s13(useUpdateBulkAssignments, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useDeleteBulkAssignments = ()=>{
    _s14();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp12,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignments deleted successfully");
            },
            onError: _temp13
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s14(useDeleteBulkAssignments, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useAssignStudentToRoute = ()=>{
    _s15();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp14,
            onSuccess: (assignment)=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Student assigned to route successfully");
            },
            onError: _temp15
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s15(useAssignStudentToRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useUnassignStudent = ()=>{
    _s16();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp16,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Student unassigned successfully");
            },
            onError: _temp17
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s16(useUnassignStudent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useTransferStudent = ()=>{
    _s17();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp18,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Student transferred successfully");
            },
            onError: _temp19
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s17(useTransferStudent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useTransferStudents = ()=>{
    _s18();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp20,
            onSuccess: (assignments)=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`${assignments.length} students transferred successfully`);
            },
            onError: _temp21
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s18(useTransferStudents, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useUpdateAssignmentStatus = ()=>{
    _s19();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp22,
            onSuccess: (assignment, t1)=>{
                const { id: id_0 } = t1;
                queryClient.setQueryData(ASSIGNMENT_KEYS.detail(id_0), assignment);
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.lists()
                });
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.stats()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignment status updated successfully");
            },
            onError: _temp23
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s19(useUpdateAssignmentStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useActivateAssignment = ()=>{
    _s20();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp24,
            onSuccess: (assignment)=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignment activated successfully");
            },
            onError: _temp25
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s20(useActivateAssignment, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useDeactivateAssignment = ()=>{
    _s21();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp26,
            onSuccess: (assignment)=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignment deactivated successfully");
            },
            onError: _temp27
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s21(useDeactivateAssignment, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useValidateAssignment = ()=>{
    _s22();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp28,
            onError: _temp29
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s22(useValidateAssignment, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useAutoAssignStudents = ()=>{
    _s23();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp30,
            onSuccess: (result)=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Auto-assignment completed: ${result.assignedCount} students assigned, ${result.unassignedCount} remain unassigned`);
            },
            onError: _temp31
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s23(useAutoAssignStudents, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useImportAssignments = ()=>{
    _s24();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp32,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: ASSIGNMENT_KEYS.all
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignments imported successfully");
            },
            onError: _temp33
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s24(useImportAssignments, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useExportAssignments = ()=>{
    _s25();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "86346a5f32248651f873ab088f9b47edeaf322a3d7820a72f93d7c04d1f1b975";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp34,
            onSuccess: _temp35,
            onError: _temp36
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s25(useExportAssignments, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].getAssignmentConflicts();
}
function _temp2(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].createAssignment(data);
}
function _temp3(error) {
    const errorMessage = error?.response?.data?.message || "Failed to create assignment";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp4(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].updateAssignment(id, data);
}
function _temp5(error) {
    const errorMessage = error?.response?.data?.message || "Failed to update assignment";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp6(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].deleteAssignment(id);
}
function _temp7(error) {
    const errorMessage = error?.response?.data?.message || "Failed to delete assignment";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp8(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].createBulkAssignments(data);
}
function _temp9(error) {
    const errorMessage = error?.response?.data?.message || "Failed to create bulk assignments";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp10(t0) {
    const { assignmentIds, updates } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].updateBulkAssignments(assignmentIds, updates);
}
function _temp11(error) {
    const errorMessage = error?.response?.data?.message || "Failed to update assignments";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp12(assignmentIds) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].deleteBulkAssignments(assignmentIds);
}
function _temp13(error) {
    const errorMessage = error?.response?.data?.message || "Failed to delete assignments";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp14(t0) {
    const { studentId, routeId, stopId, assignmentDate } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].assignStudentToRoute(studentId, routeId, stopId, assignmentDate);
}
function _temp15(error) {
    const errorMessage = error?.response?.data?.message || "Failed to assign student to route";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp16(t0) {
    const { studentId, assignmentId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].unassignStudent(studentId, assignmentId);
}
function _temp17(error) {
    const errorMessage = error?.response?.data?.message || "Failed to unassign student";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp18(t0) {
    const { studentId, fromRouteId, toRouteId, toStopId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].transferStudent(studentId, fromRouteId, toRouteId, toStopId);
}
function _temp19(error) {
    const errorMessage = error?.response?.data?.message || "Failed to transfer student";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp20(transfers) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].transferStudents(transfers);
}
function _temp21(error) {
    const errorMessage = error?.response?.data?.message || "Failed to transfer students";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp22(t0) {
    const { id, status } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].updateAssignmentStatus(id, status);
}
function _temp23(error) {
    const errorMessage = error?.response?.data?.message || "Failed to update assignment status";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp24(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].activateAssignment(id);
}
function _temp25(error) {
    const errorMessage = error?.response?.data?.message || "Failed to activate assignment";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp26(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].deactivateAssignment(id);
}
function _temp27(error) {
    const errorMessage = error?.response?.data?.message || "Failed to deactivate assignment";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp28(t0) {
    const { studentId, routeId, stopId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].validateAssignment(studentId, routeId, stopId);
}
function _temp29(error) {
    const errorMessage = error?.response?.data?.message || "Failed to validate assignment";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp30(criteria) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].autoAssignStudents(criteria);
}
function _temp31(error) {
    const errorMessage = error?.response?.data?.message || "Failed to auto-assign students";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp32(file) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].importAssignments(file);
}
function _temp33(error) {
    const errorMessage = error?.response?.data?.message || "Failed to import assignments";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp34(filters) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$assignmentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignmentService"].exportAssignments(filters);
}
function _temp35(blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `assignments_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Assignments exported successfully");
}
function _temp36(error) {
    const errorMessage = error?.response?.data?.message || "Failed to export assignments";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/studentService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentService",
    ()=>StudentService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
;
class StudentService {
    static BASE_PATH = '/students';
    static async getStudents(params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(this.BASE_PATH, {
            params
        });
        return response.data;
    }
    static async getStudent(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
    static async createStudent(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.BASE_PATH, data);
        return response.data;
    }
    static async updateStudent(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }
    static async deleteStudent(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${id}`);
    }
    static async searchStudents(query, params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/search`, {
            params: {
                q: query,
                ...params
            }
        });
        return response.data;
    }
    static async getStudentsBySchool(schoolId, params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/schools/${schoolId}/students`, {
            params
        });
        return response.data;
    }
    static async getStudentsByGuardian(guardianId, params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/guardians/${guardianId}/students`, {
            params
        });
        return response.data;
    }
    static async assignGuardian(studentId, guardianId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/${studentId}/guardians`, {
            guardianId
        });
    }
    static async removeGuardian(studentId, guardianId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${studentId}/guardians/${guardianId}`);
    }
    static async getStudentStats(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}/stats`);
        return response.data;
    }
    static async bulkUpdateStudents(studentIds, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/bulk-update`, {
            studentIds,
            updates
        });
    }
    static async importStudents(file, schoolId) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('schoolId', schoolId);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/import`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useStudents.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAssignGuardian",
    ()=>useAssignGuardian,
    "useBulkUpdateStudents",
    ()=>useBulkUpdateStudents,
    "useCreateStudent",
    ()=>useCreateStudent,
    "useDeleteStudent",
    ()=>useDeleteStudent,
    "useImportStudents",
    ()=>useImportStudents,
    "useRemoveGuardian",
    ()=>useRemoveGuardian,
    "useSearchStudents",
    ()=>useSearchStudents,
    "useStudent",
    ()=>useStudent,
    "useStudentStats",
    ()=>useStudentStats,
    "useStudents",
    ()=>useStudents,
    "useStudentsByGuardian",
    ()=>useStudentsByGuardian,
    "useStudentsBySchool",
    ()=>useStudentsBySchool,
    "useUpdateStudent",
    ()=>useUpdateStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/studentService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature();
;
;
;
;
function useStudents(params) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    let t0;
    if ($[1] !== params) {
        t0 = {
            queryKey: [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS,
                params
            ],
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].getStudents(params),
            staleTime: 300000
        };
        $[1] = params;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s(useStudents, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useStudent(id) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    let t0;
    if ($[1] !== id) {
        t0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENT(id);
        $[1] = id;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== id) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].getStudent(id);
        $[3] = id;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!id;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s1(useStudent, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateStudent() {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s2(useCreateStudent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].createStudent(data);
}
function useUpdateStudent() {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp2,
            onSuccess: (_, t1)=>{
                const { id: id_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENT(id_0)
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s3(useUpdateStudent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp2(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].updateStudent(id, data);
}
function useDeleteStudent() {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp3,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s4(useDeleteStudent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp3(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].deleteStudent(id);
}
function useStudentsBySchool(schoolId, params) {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    let t0;
    let t1;
    if ($[1] !== params || $[2] !== schoolId) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOL(schoolId),
            "students",
            params
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].getStudentsBySchool(schoolId, params);
        $[1] = params;
        $[2] = schoolId;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    const t2 = !!schoolId;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 300000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s5(useStudentsBySchool, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useStudentsByGuardian(guardianId, params) {
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    let t0;
    let t1;
    if ($[1] !== guardianId || $[2] !== params) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].GUARDIAN(guardianId),
            "students",
            params
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].getStudentsByGuardian(guardianId, params);
        $[1] = guardianId;
        $[2] = params;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    const t2 = !!guardianId;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 300000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s6(useStudentsByGuardian, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useAssignGuardian() {
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp4,
            onSuccess: (_, t1)=>{
                const { studentId: studentId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENT(studentId_0)
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s7(useAssignGuardian, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp4(t0) {
    const { studentId, guardianId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].assignGuardian(studentId, guardianId);
}
function useRemoveGuardian() {
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp5,
            onSuccess: (_, t1)=>{
                const { studentId: studentId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENT(studentId_0)
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s8(useRemoveGuardian, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp5(t0) {
    const { studentId, guardianId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].removeGuardian(studentId, guardianId);
}
function useBulkUpdateStudents() {
    _s9();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp6,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s9(useBulkUpdateStudents, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp6(t0) {
    const { studentIds, updates } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].bulkUpdateStudents(studentIds, updates);
}
function useSearchStudents(query, params) {
    _s10();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    let t0;
    let t1;
    if ($[1] !== params || $[2] !== query) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS,
            "search",
            query,
            params
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].searchStudents(query, params);
        $[1] = params;
        $[2] = query;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    const t2 = !!query && query.length > 0;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 120000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s10(useSearchStudents, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useStudentStats(id) {
    _s11();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    let t0;
    let t1;
    if ($[1] !== id) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENT(id),
            "stats"
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].getStudentStats(id);
        $[1] = id;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!id;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2
        };
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s11(useStudentStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useImportStudents() {
    _s12();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "539328147aa6a55f815c07fd6d756dd93c6e70d4399c0c0e312d98a4289e86bd";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp7,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].STUDENTS
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s12(useImportStudents, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp7(t0) {
    const { file, schoolId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$studentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentService"].importStudents(file, schoolId);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/routeService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RouteService",
    ()=>RouteService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
'use client';
;
class RouteService {
    static BASE_PATH = '/routes';
    // Route CRUD Operations
    static async getRoutes(filters) {
        const params = new URLSearchParams();
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        if (filters?.search) params.append('search', filters.search);
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}?${params.toString()}`);
        return response.data;
    }
    static async getRouteById(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
    static async createRoute(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.BASE_PATH, data);
        return response.data;
    }
    static async updateRoute(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }
    static async deleteRoute(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${id}`);
    }
    static async toggleRouteStatus(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/toggle-status`);
        return response.data;
    }
    // Stop Management
    static async getRouteStops(routeId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${routeId}/stops`);
        return response.data;
    }
    static async createStop(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/stops', data);
        return response.data;
    }
    static async updateStop(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/stops/${id}`, data);
        return response.data;
    }
    static async deleteStop(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/stops/${id}`);
    }
    static async reorderStops(routeId, stopOrders) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${routeId}/stops/reorder`, {
            stopOrders
        });
    }
    // Route Optimization
    static async optimizeRoute(routeId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/${routeId}/optimize`);
        return response.data;
    }
    static async calculateDistance(routeId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${routeId}/distance`);
        return response.data;
    }
    // Bulk Operations
    static async bulkUpdateRoutes(routeIds, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/bulk`, {
            routeIds,
            updates
        });
    }
    static async duplicateRoute(routeId, newName) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/${routeId}/duplicate`, {
            routeName: newName
        });
        return response.data;
    }
    // Student Assignments
    static async getRouteAssignments(routeId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${routeId}/assignments`);
        return response.data;
    }
    static async assignStudentsToRoute(routeId, assignments) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/${routeId}/assign-students`, {
            assignments
        });
    }
    static async removeStudentFromRoute(routeId, studentId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${routeId}/students/${studentId}`);
    }
    // Import/Export
    static async importRoutes(file, schoolId) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('schoolId', schoolId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/import`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
    static async exportRoutes(filters) {
        const params = new URLSearchParams();
        if (filters?.search) params.append('search', filters.search);
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/export?${params.toString()}`, {
            responseType: 'blob'
        });
        return response.data;
    }
    // School-specific routes
    static async getSchoolRoutes(schoolId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/schools/${schoolId}/routes`);
        return response.data;
    }
    // Analytics
    static async getRouteStats(routeId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${routeId}/stats`);
        return response.data;
    }
    static async getRouteUtilization(routeId, dateRange) {
        const params = new URLSearchParams();
        if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
        if (dateRange?.endDate) params.append('endDate', dateRange.endDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${routeId}/utilization?${params.toString()}`);
        return response.data;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useRoutes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAssignStudentsToRoute",
    ()=>useAssignStudentsToRoute,
    "useBulkUpdateRoutes",
    ()=>useBulkUpdateRoutes,
    "useCalculateDistance",
    ()=>useCalculateDistance,
    "useCreateRoute",
    ()=>useCreateRoute,
    "useCreateStop",
    ()=>useCreateStop,
    "useDeleteRoute",
    ()=>useDeleteRoute,
    "useDeleteStop",
    ()=>useDeleteStop,
    "useDuplicateRoute",
    ()=>useDuplicateRoute,
    "useExportRoutes",
    ()=>useExportRoutes,
    "useImportRoutes",
    ()=>useImportRoutes,
    "useOptimizeRoute",
    ()=>useOptimizeRoute,
    "useRemoveStudentFromRoute",
    ()=>useRemoveStudentFromRoute,
    "useReorderStops",
    ()=>useReorderStops,
    "useRoute",
    ()=>useRoute,
    "useRouteAssignments",
    ()=>useRouteAssignments,
    "useRouteStats",
    ()=>useRouteStats,
    "useRouteStops",
    ()=>useRouteStops,
    "useRouteUtilization",
    ()=>useRouteUtilization,
    "useRoutes",
    ()=>useRoutes,
    "useSchoolRoutes",
    ()=>useSchoolRoutes,
    "useToggleRouteStatus",
    ()=>useToggleRouteStatus,
    "useUpdateRoute",
    ()=>useUpdateRoute,
    "useUpdateStop",
    ()=>useUpdateStop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/routeService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature(), _s19 = __turbopack_context__.k.signature(), _s20 = __turbopack_context__.k.signature(), _s21 = __turbopack_context__.k.signature(), _s22 = __turbopack_context__.k.signature();
'use client';
;
;
;
const QUERY_KEYS = {
    routes: 'routes',
    route: 'route',
    routeStops: 'routeStops',
    routeAssignments: 'routeAssignments',
    routeStats: 'routeStats',
    schoolRoutes: 'schoolRoutes'
};
function useRoutes(filters) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    if ($[1] !== filters) {
        t0 = {
            queryKey: [
                QUERY_KEYS.routes,
                filters
            ],
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].getRoutes(filters),
            staleTime: 300000
        };
        $[1] = filters;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s(useRoutes, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useRoute(id) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    let t1;
    if ($[1] !== id) {
        t0 = [
            QUERY_KEYS.route,
            id
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].getRouteById(id);
        $[1] = id;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!id;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 300000
        };
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s1(useRoute, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSchoolRoutes(schoolId) {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    let t1;
    if ($[1] !== schoolId) {
        t0 = [
            QUERY_KEYS.schoolRoutes,
            schoolId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].getSchoolRoutes(schoolId);
        $[1] = schoolId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!schoolId;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 300000
        };
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s2(useSchoolRoutes, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateRoute() {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.schoolRoutes
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s3(useCreateRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].createRoute(data);
}
function useUpdateRoute() {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp2,
            onSuccess: (updatedRoute)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.route,
                    updatedRoute.id
                ], updatedRoute);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.schoolRoutes
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s4(useUpdateRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp2(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].updateRoute(id, data);
}
function useDeleteRoute() {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp3,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.schoolRoutes
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s5(useDeleteRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp3(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].deleteRoute(id);
}
function useToggleRouteStatus() {
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp4,
            onSuccess: (updatedRoute)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.route,
                    updatedRoute.id
                ], updatedRoute);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.schoolRoutes
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s6(useToggleRouteStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Stop Queries and Mutations
function _temp4(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].toggleRouteStatus(id);
}
function useRouteStops(routeId) {
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    let t1;
    if ($[1] !== routeId) {
        t0 = [
            QUERY_KEYS.routeStops,
            routeId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].getRouteStops(routeId);
        $[1] = routeId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!routeId;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 120000
        };
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s7(useRouteStops, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateStop() {
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp5,
            onSuccess: (newStop)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeStops,
                        newStop.routeId
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.route,
                        newStop.routeId
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s8(useCreateStop, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp5(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].createStop(data);
}
function useUpdateStop() {
    _s9();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp6,
            onSuccess: (updatedStop)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeStops,
                        updatedStop.routeId
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.route,
                        updatedStop.routeId
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s9(useUpdateStop, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp6(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].updateStop(id, data);
}
function useDeleteStop() {
    _s10();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp7,
            onSuccess: (_, t1)=>{
                const { routeId: routeId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeStops,
                        routeId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.route,
                        routeId_0
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s10(useDeleteStop, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp7(t0) {
    const { stopId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].deleteStop(stopId);
}
function useReorderStops() {
    _s11();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp8,
            onSuccess: (_, t1)=>{
                const { routeId: routeId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeStops,
                        routeId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.route,
                        routeId_0
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s11(useReorderStops, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Route Optimization
function _temp8(t0) {
    const { routeId, stopOrders } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].reorderStops(routeId, stopOrders);
}
function useOptimizeRoute() {
    _s12();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp9,
            onSuccess: (optimizedRoute)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.route,
                    optimizedRoute.id
                ], optimizedRoute);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeStops,
                        optimizedRoute.id
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s12(useOptimizeRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp9(routeId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].optimizeRoute(routeId);
}
function useCalculateDistance() {
    _s13();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp10
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s13(useCalculateDistance, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Bulk Operations
function _temp10(routeId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].calculateDistance(routeId);
}
function useBulkUpdateRoutes() {
    _s14();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp11,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.schoolRoutes
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s14(useBulkUpdateRoutes, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp11(t0) {
    const { routeIds, updates } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].bulkUpdateRoutes(routeIds, updates);
}
function useDuplicateRoute() {
    _s15();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp12,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.schoolRoutes
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s15(useDuplicateRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Student Assignments
function _temp12(t0) {
    const { routeId, newName } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].duplicateRoute(routeId, newName);
}
function useRouteAssignments(routeId) {
    _s16();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    let t1;
    if ($[1] !== routeId) {
        t0 = [
            QUERY_KEYS.routeAssignments,
            routeId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].getRouteAssignments(routeId);
        $[1] = routeId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!routeId;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 120000
        };
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s16(useRouteAssignments, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useAssignStudentsToRoute() {
    _s17();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp13,
            onSuccess: (_, t1)=>{
                const { routeId: routeId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeAssignments,
                        routeId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.route,
                        routeId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        "students"
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s17(useAssignStudentsToRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp13(t0) {
    const { routeId, assignments } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].assignStudentsToRoute(routeId, assignments);
}
function useRemoveStudentFromRoute() {
    _s18();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp14,
            onSuccess: (_, t1)=>{
                const { routeId: routeId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeAssignments,
                        routeId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.route,
                        routeId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        "students"
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s18(useRemoveStudentFromRoute, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Import/Export
function _temp14(t0) {
    const { routeId, studentId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].removeStudentFromRoute(routeId, studentId);
}
function useImportRoutes() {
    _s19();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp15,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routes
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.schoolRoutes
                    ]
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s19(useImportRoutes, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp15(t0) {
    const { file, schoolId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].importRoutes(file, schoolId);
}
function useExportRoutes() {
    _s20();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp16
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s20(useExportRoutes, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Analytics
function _temp16(filters) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].exportRoutes(filters);
}
function useRouteStats(routeId) {
    _s21();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    let t1;
    if ($[1] !== routeId) {
        t0 = [
            QUERY_KEYS.routeStats,
            routeId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].getRouteStats(routeId);
        $[1] = routeId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!routeId;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 600000
        };
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s21(useRouteStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useRouteUtilization() {
    _s22();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "efc51c99595ff2e6ae9089052a2b31c736808aa65b428c8770c6c040bf8e831d";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp17
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s22(useRouteUtilization, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp17(t0) {
    const { routeId, dateRange } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$routeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouteService"].getRouteUtilization(routeId, dateRange);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/schoolService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SchoolService",
    ()=>SchoolService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
;
class SchoolService {
    static BASE_PATH = '/schools';
    static async getSchools(params) {
        console.log('SchoolService.getSchools called with params:', params);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(this.BASE_PATH, {
            params
        });
        console.log('SchoolService.getSchools raw response:', response);
        console.log('SchoolService.getSchools response type:', typeof response);
        console.log('SchoolService.getSchools response keys:', Object.keys(response));
        // Check if response has the expected structure
        if (response && typeof response === 'object') {
            console.log('SchoolService.getSchools response.success:', response.success);
            console.log('SchoolService.getSchools response.data:', response.data);
            console.log('SchoolService.getSchools response.error:', response.error);
        }
        // Handle different response structures
        if (!response.success) {
            console.error('SchoolService.getSchools API error:', response.error);
            throw new Error(response.error?.message || 'Failed to fetch schools');
        }
        // Check if we have the expected data structure
        if (!response.data) {
            console.error('SchoolService.getSchools no data in response');
            throw new Error('No data received from schools API');
        }
        console.log('SchoolService.getSchools returning data:', response.data);
        return response.data;
    }
    static async getSchool(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}`);
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to fetch school');
        }
        return response.data;
    }
    static async createSchool(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.BASE_PATH, data);
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to create school');
        }
        return response.data;
    }
    static async updateSchool(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/${id}`, data);
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to update school');
        }
        return response.data;
    }
    static async deleteSchool(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${id}`);
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to delete school');
        }
    }
    static async searchSchools(query, params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/search`, {
            params: {
                q: query,
                ...params
            }
        });
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to search schools');
        }
        return response.data;
    }
    static async getSchoolStats(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}/stats`);
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to get school stats');
        }
        return response.data;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useSchools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateSchool",
    ()=>useCreateSchool,
    "useDeleteSchool",
    ()=>useDeleteSchool,
    "useSchool",
    ()=>useSchool,
    "useSchoolStats",
    ()=>useSchoolStats,
    "useSchools",
    ()=>useSchools,
    "useSearchSchools",
    ()=>useSearchSchools,
    "useUpdateSchool",
    ()=>useUpdateSchool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/schoolService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
;
;
;
;
function useSchools(params) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4";
    }
    let t0;
    if ($[1] !== params) {
        t0 = {
            queryKey: [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOLS,
                params
            ],
            queryFn: async ()=>{
                console.log("useSchools: Fetching schools with params:", params);
                ;
                try {
                    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SchoolService"].getSchools(params);
                    console.log("useSchools: Success, result:", result);
                    return result;
                } catch (t1) {
                    const error = t1;
                    console.error("useSchools: Error fetching schools:", error);
                    throw error;
                }
            },
            staleTime: 300000,
            onError: _temp,
            onSuccess: _temp2
        };
        $[1] = params;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s(useSchools, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function _temp2(data) {
    console.log("useSchools: Query success:", data);
}
function _temp(error_0) {
    console.error("useSchools: Query error:", error_0);
}
function useSchool(id) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4";
    }
    let t0;
    if ($[1] !== id) {
        t0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOL(id);
        $[1] = id;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== id) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SchoolService"].getSchool(id);
        $[3] = id;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!id;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s1(useSchool, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateSchool() {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp3,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOLS
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s2(useCreateSchool, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp3(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SchoolService"].createSchool(data);
}
function useUpdateSchool() {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp4,
            onSuccess: (_, t1)=>{
                const { id: id_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOLS
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOL(id_0)
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s3(useUpdateSchool, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp4(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SchoolService"].updateSchool(id, data);
}
function useDeleteSchool() {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp5,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOLS
                });
            }
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s4(useDeleteSchool, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp5(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SchoolService"].deleteSchool(id);
}
function useSearchSchools(query, params) {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4";
    }
    let t0;
    let t1;
    if ($[1] !== params || $[2] !== query) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOLS,
            "search",
            query,
            params
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SchoolService"].searchSchools(query, params);
        $[1] = params;
        $[2] = query;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    const t2 = !!query && query.length > 0;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 120000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s5(useSearchSchools, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSchoolStats(id) {
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "db5786e1d99c0f3eb82fe0c04b8abcb72f83f79b0ec6772d9d26ebad870a5bc4";
    }
    let t0;
    let t1;
    if ($[1] !== id) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].SCHOOL(id),
            "stats"
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$schoolService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SchoolService"].getSchoolStats(id);
        $[1] = id;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!id;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2
        };
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s6(useSchoolStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/assignments/AssignmentList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssignmentList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tooltip/index.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/statistic/index.js [app-client] (ecmascript) <export default as Statistic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/date-picker/index.js [app-client] (ecmascript) <export default as DatePicker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/popconfirm/index.js [app-client] (ecmascript) <export default as Popconfirm>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/drawer/index.js [app-client] (ecmascript) <export default as Drawer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SearchOutlined.js [app-client] (ecmascript) <export default as SearchOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlusOutlined.js [app-client] (ecmascript) <export default as PlusOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EditOutlined.js [app-client] (ecmascript) <export default as EditOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DeleteOutlined.js [app-client] (ecmascript) <export default as DeleteOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SwapOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SwapOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SwapOutlined.js [app-client] (ecmascript) <export default as SwapOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/TeamOutlined.js [app-client] (ecmascript) <export default as TeamOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CalendarOutlined.js [app-client] (ecmascript) <export default as CalendarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ExportOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExportOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ExportOutlined.js [app-client] (ecmascript) <export default as ExportOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ImportOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImportOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ImportOutlined.js [app-client] (ecmascript) <export default as ImportOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ReloadOutlined.js [app-client] (ecmascript) <export default as ReloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/HomeOutlined.js [app-client] (ecmascript) <export default as HomeOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js [app-client] (ecmascript) <export default as CheckCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ExclamationCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExclamationCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ExclamationCircleOutlined.js [app-client] (ecmascript) <export default as ExclamationCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$RobotOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RobotOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/RobotOutlined.js [app-client] (ecmascript) <export default as RobotOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DownloadOutlined.js [app-client] (ecmascript) <export default as DownloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAssignments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useStudents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSchools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
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
const { Title, Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
const { RangePicker } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__["DatePicker"];
function AssignmentList({ onEdit, onView, onCreate, onTransfer }) {
    _s();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        page: 1,
        limit: 10,
        search: '',
        studentId: '',
        routeId: '',
        stopId: '',
        status: undefined,
        schoolId: '',
        assignmentDate: ''
    });
    const [selectedRowKeys, setSelectedRowKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [statsVisible, setStatsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [conflictsVisible, setConflictsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoAssignModal, setAutoAssignModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoAssignCriteria, setAutoAssignCriteria] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        schoolId: '',
        grade: '',
        strategy: 'nearest_route',
        maxStudentsPerRoute: 50
    });
    const [importModalVisible, setImportModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Queries
    const { data: assignmentsData, isLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignments"])(filters);
    const { data: statsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignmentStats"])({
        schoolId: filters.schoolId
    });
    const { data: conflictsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignmentConflicts"])();
    const { data: studentsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudents"])({
        limit: 100
    });
    const { data: routesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"])({
        limit: 100
    });
    const { data: schoolsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"])({
        limit: 100
    });
    // Mutations
    const deleteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteAssignment"])();
    const updateStatusMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateAssignmentStatus"])();
    const activateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActivateAssignment"])();
    const deactivateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeactivateAssignment"])();
    const bulkDeleteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteBulkAssignments"])();
    const bulkUpdateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateBulkAssignments"])();
    const autoAssignMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoAssignStudents"])();
    const exportMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExportAssignments"])();
    const importMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImportAssignments"])();
    const assignments = assignmentsData?.data?.items || [];
    const pagination = assignmentsData?.data?.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
    };
    const stats = statsData || {};
    const conflicts = conflictsData?.data?.items || [];
    const students = studentsData?.data?.items || [];
    const routes = routesData?.data?.items || [];
    const schools = schoolsData?.data?.items || [];
    const handleSearch = (value)=>{
        setFilters((prev)=>({
                ...prev,
                search: value,
                page: 1
            }));
    };
    const handleFilterChange = (key, value_0)=>{
        setFilters((prev_0)=>({
                ...prev_0,
                [key]: value_0,
                page: 1
            }));
    };
    const handleTableChange = (page, pageSize)=>{
        setFilters((prev_1)=>({
                ...prev_1,
                page,
                limit: pageSize
            }));
    };
    const handleDelete = async (id, studentName)=>{
        try {
            await deleteMutation.mutateAsync(id);
            setSelectedRowKeys((prev_2)=>prev_2.filter((key_0)=>key_0 !== id));
        } catch (error) {
        // Error handled by hook
        }
    };
    const handleStatusUpdate = async (id_0, status)=>{
        try {
            await updateStatusMutation.mutateAsync({
                id: id_0,
                status
            });
        } catch (error_0) {
        // Error handled by hook
        }
    };
    const handleBulkDelete = async ()=>{
        if (selectedRowKeys.length === 0) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"].confirm({
            title: 'Delete Assignments',
            content: `Are you sure you want to delete ${selectedRowKeys.length} assignment(s)?`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async ()=>{
                try {
                    await bulkDeleteMutation.mutateAsync(selectedRowKeys);
                    setSelectedRowKeys([]);
                } catch (error_1) {
                // Error handled by hook
                }
            }
        });
    };
    const handleBulkStatusUpdate = (status_0)=>{
        if (selectedRowKeys.length === 0) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"].confirm({
            title: 'Update Assignment Status',
            content: `Are you sure you want to change the status of ${selectedRowKeys.length} assignment(s) to ${status_0}?`,
            onOk: async ()=>{
                try {
                    await bulkUpdateMutation.mutateAsync({
                        assignmentIds: selectedRowKeys,
                        updates: {
                            status: status_0
                        }
                    });
                    setSelectedRowKeys([]);
                } catch (error_2) {
                // Error handled by hook
                }
            }
        });
    };
    const handleAutoAssign = async ()=>{
        if (!autoAssignCriteria.schoolId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Please select a school');
            return;
        }
        try {
            const result = await autoAssignMutation.mutateAsync(autoAssignCriteria);
            setAutoAssignModal(false);
            if (result.conflicts && result.conflicts.length > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"].warning({
                    title: 'Auto-assignment Completed with Conflicts',
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Assigned: ",
                                    result.assignedCount,
                                    " students"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 200,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Unassigned: ",
                                    result.unassignedCount,
                                    " students"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 201,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#fa8c16'
                                },
                                children: [
                                    "Conflicts detected: ",
                                    result.conflicts.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 199,
                        columnNumber: 20
                    }, this)
                });
            }
        } catch (error_3) {
        // Error handled by hook
        }
    };
    const handleExport = async ()=>{
        try {
            await exportMutation.mutateAsync(filters);
        } catch (error_4) {
        // Error handled by hook
        }
    };
    const handleImport = (file)=>{
        importMutation.mutate(file, {
            onSuccess: ()=>{
                setImportModalVisible(false);
            }
        });
    };
    const getStatusColor = (status_1)=>{
        switch(status_1){
            case 'ACTIVE':
                return 'green';
            case 'INACTIVE':
                return 'red';
            case 'PENDING':
                return 'orange';
            case 'COMPLETED':
                return 'blue';
            default:
                return 'default';
        }
    };
    const getStatusIcon = (status_2)=>{
        switch(status_2){
            case 'ACTIVE':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 243,
                    columnNumber: 16
                }, this);
            case 'INACTIVE':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ExclamationCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExclamationCircleOutlined$3e$__["ExclamationCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 245,
                    columnNumber: 16
                }, this);
            case 'PENDING':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 247,
                    columnNumber: 16
                }, this);
            case 'COMPLETED':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 249,
                    columnNumber: 16
                }, this);
            default:
                return null;
        }
    };
    const columns = [
        {
            title: 'Student',
            key: 'student',
            width: 200,
            render: (record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                            size: "small",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 263,
                                columnNumber: 38
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 500
                                    },
                                    children: [
                                        record.student?.firstName,
                                        " ",
                                        record.student?.lastName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 265,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '12px',
                                        color: '#666'
                                    },
                                    children: [
                                        "Grade ",
                                        record.student?.grade
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 258,
                    columnNumber: 37
                }, this)
        },
        {
            title: 'Route',
            key: 'route',
            width: 180,
            render: (record_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {
                                    style: {
                                        color: '#1890ff'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this),
                                record_0.route?.routeName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '12px',
                                color: '#666'
                            },
                            children: record_0.route?.description
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 278,
                    columnNumber: 39
                }, this)
        },
        {
            title: 'Stop',
            dataIndex: [
                'stop',
                'name'
            ],
            width: 120,
            render: (stopName, record_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontWeight: 500
                            },
                            children: stopName
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 300,
                            columnNumber: 11
                        }, this),
                        record_1.stop?.estimatedArrival && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '12px',
                                color: '#666',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this),
                                record_1.stop.estimatedArrival
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 303,
                            columnNumber: 47
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 299,
                    columnNumber: 57
                }, this)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 100,
            render: (status_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                    color: getStatusColor(status_3),
                    icon: getStatusIcon(status_3),
                    children: status_3
                }, void 0, false, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 318,
                    columnNumber: 45
                }, this)
        },
        {
            title: 'Assignment Date',
            dataIndex: 'assignmentDate',
            width: 120,
            render: (date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '12px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__["CalendarOutlined"], {
                            style: {
                                marginRight: '4px'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 328,
                            columnNumber: 11
                        }, this),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(date).format('MMM DD, YYYY')
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 325,
                    columnNumber: 31
                }, this)
        },
        {
            title: 'School',
            key: 'school',
            width: 120,
            render: (record_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__["HomeOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this),
                        record_2.student?.school?.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 337,
                    columnNumber: 39
                }, this)
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            fixed: 'right',
            render: (record_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    size: "small",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: "View Details",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 353,
                                    columnNumber: 39
                                }, void 0),
                                onClick: ()=>onView(record_3),
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: "Edit Assignment",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__["EditOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 356,
                                    columnNumber: 39
                                }, void 0),
                                onClick: ()=>onEdit(record_3),
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 355,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: "Transfer Student",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SwapOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SwapOutlined$3e$__["SwapOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 359,
                                    columnNumber: 39
                                }, void 0),
                                onClick: ()=>onTransfer(record_3),
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: record_3.status === 'ACTIVE' ? 'Deactivate' : 'Activate',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: record_3.status === 'ACTIVE' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ExclamationCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExclamationCircleOutlined$3e$__["ExclamationCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 362,
                                    columnNumber: 70
                                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 362,
                                    columnNumber: 102
                                }, void 0),
                                onClick: ()=>record_3.status === 'ACTIVE' ? deactivateMutation.mutate(record_3.id) : activateMutation.mutate(record_3.id),
                                loading: activateMutation.isPending || deactivateMutation.isPending,
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 361,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__["Popconfirm"], {
                            title: "Delete Assignment",
                            description: "Are you sure you want to delete this assignment?",
                            onConfirm: ()=>handleDelete(record_3.id, `${record_3.student?.firstName} ${record_3.student?.lastName}`),
                            okText: "Yes",
                            cancelText: "No",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__["DeleteOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 365,
                                    columnNumber: 39
                                }, void 0),
                                danger: true,
                                size: "small",
                                loading: deleteMutation.isPending
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 351,
                    columnNumber: 39
                }, this)
        }
    ];
    const bulkActions = [
        {
            key: 'activate',
            label: 'Activate Selected',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 372,
                columnNumber: 11
            }, this),
            onClick: ()=>handleBulkStatusUpdate('ACTIVE')
        },
        {
            key: 'deactivate',
            label: 'Deactivate Selected',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ExclamationCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExclamationCircleOutlined$3e$__["ExclamationCircleOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 377,
                columnNumber: 11
            }, this),
            onClick: ()=>handleBulkStatusUpdate('INACTIVE')
        },
        {
            type: 'divider'
        },
        {
            key: 'delete',
            label: 'Delete Selected',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__["DeleteOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 384,
                columnNumber: 11
            }, this),
            danger: true,
            onClick: handleBulkDelete
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '24px'
        },
        children: [
            statsVisible && stats && Object.keys(stats).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: [
                    16,
                    16
                ],
                style: {
                    marginBottom: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 6,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                title: "Total Assignments",
                                value: stats.totalAssignments || 0,
                                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__["TeamOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 397,
                                    columnNumber: 105
                                }, void 0),
                                valueStyle: {
                                    color: '#1890ff'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 397,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 396,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 6,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                title: "Active Assignments",
                                value: stats.activeAssignments || 0,
                                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 404,
                                    columnNumber: 107
                                }, void 0),
                                valueStyle: {
                                    color: '#52c41a'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 404,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 403,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 6,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                title: "Students Assigned",
                                value: stats.studentsAssigned || 0,
                                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 411,
                                    columnNumber: 105
                                }, void 0),
                                valueStyle: {
                                    color: '#722ed1'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 411,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 410,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 409,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 6,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                title: "Students Unassigned",
                                value: stats.studentsUnassigned || 0,
                                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ExclamationCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExclamationCircleOutlined$3e$__["ExclamationCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 418,
                                    columnNumber: 109
                                }, void 0),
                                valueStyle: {
                                    color: stats.studentsUnassigned > 0 ? '#f5222d' : '#52c41a'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 418,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 417,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 416,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 392,
                columnNumber: 66
            }, this),
            conflicts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                message: `${conflicts.length} Assignment Conflicts Detected`,
                description: "Some assignments may have scheduling conflicts or capacity issues.",
                type: "warning",
                showIcon: true,
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    size: "small",
                    onClick: ()=>setConflictsVisible(true),
                    children: "View Conflicts"
                }, void 0, false, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 426,
                    columnNumber: 214
                }, void 0),
                style: {
                    marginBottom: '16px'
                },
                closable: true
            }, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 426,
                columnNumber: 32
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                            justify: "space-between",
                            align: "middle",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                        level: 4,
                                        style: {
                                            margin: 0
                                        },
                                        children: [
                                            "Assignment Management",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                                count: assignments.length,
                                                style: {
                                                    marginLeft: '8px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 443,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 438,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__["ReloadOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 31
                                                }, void 0),
                                                onClick: ()=>refetch(),
                                                loading: isLoading,
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 450,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$RobotOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RobotOutlined$3e$__["RobotOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 31
                                                }, void 0),
                                                onClick: ()=>setAutoAssignModal(true),
                                                type: "dashed",
                                                children: "Auto Assign"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ImportOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImportOutlined$3e$__["ImportOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 31
                                                }, void 0),
                                                onClick: ()=>setImportModalVisible(true),
                                                children: "Import"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 456,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ExportOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExportOutlined$3e$__["ExportOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 31
                                                }, void 0),
                                                onClick: handleExport,
                                                loading: exportMutation.isPending,
                                                children: "Export"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 459,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                type: "primary",
                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__["PlusOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 46
                                                }, void 0),
                                                onClick: onCreate,
                                                children: "New Assignment"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 462,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 449,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 448,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 437,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 434,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                            gutter: [
                                16,
                                16
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    xs: 24,
                                    sm: 8,
                                    md: 6,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                        placeholder: "Search students, routes...",
                                        prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__["SearchOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                            lineNumber: 476,
                                            columnNumber: 71
                                        }, void 0),
                                        value: filters.search,
                                        onChange: (e)=>handleSearch(e.target.value),
                                        allowClear: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    xs: 24,
                                    sm: 8,
                                    md: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "School",
                                        value: filters.schoolId || undefined,
                                        onChange: (value_1)=>handleFilterChange('schoolId', value_1),
                                        allowClear: true,
                                        style: {
                                            width: '100%'
                                        },
                                        children: schools.map((school)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: school.id,
                                                children: school.name
                                            }, school.id, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 482,
                                                columnNumber: 40
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    xs: 24,
                                    sm: 8,
                                    md: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Route",
                                        value: filters.routeId || undefined,
                                        onChange: (value_2)=>handleFilterChange('routeId', value_2),
                                        allowClear: true,
                                        style: {
                                            width: '100%'
                                        },
                                        children: routes.map((route)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: route.id,
                                                children: route.routeName
                                            }, route.id, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 491,
                                                columnNumber: 38
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 488,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 487,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    xs: 24,
                                    sm: 8,
                                    md: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Status",
                                        value: filters.status,
                                        onChange: (value_3)=>handleFilterChange('status', value_3),
                                        allowClear: true,
                                        style: {
                                            width: '100%'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "ACTIVE",
                                                children: "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 500,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "INACTIVE",
                                                children: "Inactive"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 501,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "PENDING",
                                                children: "Pending"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 502,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "COMPLETED",
                                                children: "Completed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 497,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 496,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    xs: 24,
                                    sm: 8,
                                    md: 6,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__["DatePicker"], {
                                        placeholder: "Assignment Date",
                                        value: filters.assignmentDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(filters.assignmentDate) : null,
                                        onChange: (date_0)=>handleFilterChange('assignmentDate', date_0?.format('YYYY-MM-DD') || ''),
                                        style: {
                                            width: '100%'
                                        },
                                        allowClear: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 507,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                    lineNumber: 506,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 474,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 471,
                        columnNumber: 9
                    }, this),
                    selectedRowKeys.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            message: `${selectedRowKeys.length} assignment(s) selected`,
                            type: "info",
                            action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        size: "small",
                                        onClick: ()=>setSelectedRowKeys([]),
                                        children: "Clear Selection"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 519,
                                        columnNumber: 19
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        size: "small",
                                        type: "primary",
                                        danger: true,
                                        onClick: handleBulkDelete,
                                        loading: bulkDeleteMutation.isPending,
                                        children: "Delete Selected"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 522,
                                        columnNumber: 19
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 518,
                                columnNumber: 101
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 518,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 515,
                        columnNumber: 40
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                        columns: columns,
                        dataSource: assignments,
                        rowKey: "id",
                        loading: isLoading,
                        pagination: {
                            current: pagination.page,
                            pageSize: pagination.limit,
                            total: pagination.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range)=>`${range[0]}-${range[1]} of ${total} assignments`,
                            onChange: handleTableChange
                        },
                        rowSelection: {
                            selectedRowKeys,
                            onChange: (selectedRowKeys_0)=>setSelectedRowKeys(selectedRowKeys_0),
                            preserveSelectedRowKeys: true
                        },
                        scroll: {
                            x: 1200
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "Auto Assign Students",
                open: autoAssignModal,
                onCancel: ()=>setAutoAssignModal(false),
                onOk: handleAutoAssign,
                okText: "Start Auto Assignment",
                confirmLoading: autoAssignMutation.isPending,
                width: 600,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                            type: "secondary",
                            children: "Automatically assign unassigned students to routes based on your selected criteria."
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 551,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        gutter: [
                            16,
                            16
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                span: 12,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: "School *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 558,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select school",
                                        value: autoAssignCriteria.schoolId,
                                        onChange: (value_4)=>setAutoAssignCriteria((prev_3)=>({
                                                    ...prev_3,
                                                    schoolId: value_4
                                                })),
                                        style: {
                                            width: '100%'
                                        },
                                        children: schools.map((school_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: school_0.id,
                                                children: school_0.name
                                            }, school_0.id, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 567,
                                                columnNumber: 40
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 561,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 557,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                span: 12,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: "Grade (Optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 573,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "All grades",
                                        value: autoAssignCriteria.grade,
                                        onChange: (value_5)=>setAutoAssignCriteria((prev_4)=>({
                                                    ...prev_4,
                                                    grade: value_5
                                                })),
                                        style: {
                                            width: '100%'
                                        },
                                        allowClear: true,
                                        children: [
                                            'K',
                                            '1',
                                            '2',
                                            '3',
                                            '4',
                                            '5',
                                            '6',
                                            '7',
                                            '8',
                                            '9',
                                            '10',
                                            '11',
                                            '12'
                                        ].map((grade)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: grade,
                                                children: [
                                                    "Grade ",
                                                    grade
                                                ]
                                            }, grade, true, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 582,
                                                columnNumber: 98
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                span: 12,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: "Assignment Strategy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 588,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        value: autoAssignCriteria.strategy,
                                        onChange: (value_6)=>setAutoAssignCriteria((prev_5)=>({
                                                    ...prev_5,
                                                    strategy: value_6
                                                })),
                                        style: {
                                            width: '100%'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "nearest_route",
                                                children: "Nearest Route"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 597,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "balanced_load",
                                                children: "Balanced Load"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 598,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "shortest_distance",
                                                children: "Shortest Distance"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 599,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 591,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 587,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                span: 12,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: "Max Students per Route"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 603,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        value: autoAssignCriteria.maxStudentsPerRoute,
                                        onChange: (value_7)=>setAutoAssignCriteria((prev_6)=>({
                                                    ...prev_6,
                                                    maxStudentsPerRoute: value_7
                                                })),
                                        style: {
                                            width: '100%'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: 30,
                                                children: "30 Students"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 612,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: 40,
                                                children: "40 Students"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 613,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: 50,
                                                children: "50 Students"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 614,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: 60,
                                                children: "60 Students"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                                lineNumber: 615,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 606,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 602,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 556,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 547,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "Import Assignments",
                open: importModalVisible,
                onCancel: ()=>setImportModalVisible(false),
                footer: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        padding: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {
                            style: {
                                fontSize: '48px',
                                color: '#1890ff',
                                marginBottom: '16px'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 627,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '16px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                strong: true,
                                children: "Upload CSV File"
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 635,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 632,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                            type: "secondary",
                            children: "Select a CSV file containing assignment data to import."
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 637,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: '20px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: ".csv",
                                onChange: (e_0)=>{
                                    const file_0 = e_0.target.files?.[0];
                                    if (file_0) {
                                        handleImport(file_0);
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 643,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                            lineNumber: 640,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                    lineNumber: 623,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 622,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__["Drawer"], {
                title: "Assignment Conflicts",
                open: conflictsVisible,
                onClose: ()=>setConflictsVisible(false),
                width: 600,
                children: conflicts.map((conflict, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        style: {
                            marginBottom: '16px'
                        },
                        size: "small",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        strong: true,
                                        children: conflict.type
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 661,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        color: "red",
                                        style: {
                                            marginLeft: '8px'
                                        },
                                        children: "High Priority"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                        lineNumber: 662,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 658,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: conflict.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 666,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '8px',
                                    fontSize: '12px',
                                    color: '#666'
                                },
                                children: [
                                    "Student: ",
                                    conflict.studentName,
                                    " • Route: ",
                                    conflict.routeName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                                lineNumber: 667,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                        lineNumber: 655,
                        columnNumber: 45
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentList.tsx",
                lineNumber: 654,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/assignments/AssignmentList.tsx",
        lineNumber: 388,
        columnNumber: 10
    }, this);
}
_s(AssignmentList, "DSnFaNp7eUJhAdvHNPazDPRKaUM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignments"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignmentStats"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignmentConflicts"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteAssignment"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateAssignmentStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActivateAssignment"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeactivateAssignment"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteBulkAssignments"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateBulkAssignments"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoAssignStudents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExportAssignments"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImportAssignments"]
    ];
});
_c = AssignmentList;
var _c;
__turbopack_context__.k.register(_c, "AssignmentList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/assignments/AssignmentForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssignmentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-client] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/divider/index.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/date-picker/index.js [app-client] (ecmascript) <export default as DatePicker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$steps$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Steps$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/steps/index.js [app-client] (ecmascript) <export default as Steps>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SaveOutlined.js [app-client] (ecmascript) <export default as SaveOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CloseOutlined.js [app-client] (ecmascript) <export default as CloseOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CalendarOutlined.js [app-client] (ecmascript) <export default as CalendarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/TeamOutlined.js [app-client] (ecmascript) <export default as TeamOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js [app-client] (ecmascript) <export default as CheckCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAssignments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useStudents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSchools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
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
const { Title, Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
function AssignmentForm({ assignment, onSuccess, onCancel, preselectedStudent, preselectedRoute }) {
    _s();
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedStudent, setSelectedStudent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(preselectedStudent || null);
    const [selectedRoute, setSelectedRoute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(preselectedRoute || null);
    const [selectedStop, setSelectedStop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [validationResult, setValidationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [schoolFilter, setSchoolFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const isEditing = !!assignment;
    // Queries
    const { data: studentsData, isLoading: studentsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudents"])({
        limit: 100,
        schoolId: schoolFilter
    });
    const { data: routesData, isLoading: routesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"])({
        limit: 100,
        schoolId: schoolFilter
    });
    const { data: schoolsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"])({
        limit: 100
    });
    const { data: stopsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouteStops"])(selectedRoute?.id || '');
    // Mutations
    const createMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateAssignment"])();
    const updateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateAssignment"])();
    const validateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValidateAssignment"])();
    const assignStudentMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignStudentToRoute"])();
    const students = studentsData?.data?.items || [];
    const routes = routesData?.data?.items || [];
    const schools = schoolsData?.data?.items || [];
    const stops = stopsData?.data?.items || [];
    const isLoading = createMutation.isPending || updateMutation.isPending || assignStudentMutation.isPending;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AssignmentForm.useEffect": ()=>{
            if (assignment) {
                setSelectedStudent(assignment.student || null);
                setSelectedRoute(assignment.route || null);
                setSelectedStop(assignment.stop || null);
                setCurrentStep(2); // Go directly to confirmation for editing
                form.setFieldsValue({
                    studentId: assignment.studentId,
                    routeId: assignment.routeId,
                    stopId: assignment.stopId,
                    assignmentDate: assignment.assignmentDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(assignment.assignmentDate) : null,
                    status: assignment.status
                });
            }
        }
    }["AssignmentForm.useEffect"], [
        assignment,
        form
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AssignmentForm.useEffect": ()=>{
            if (preselectedStudent) {
                setSelectedStudent(preselectedStudent);
                form.setFieldValue('studentId', preselectedStudent.id);
                if (preselectedStudent.school?.id) {
                    setSchoolFilter(preselectedStudent.school.id);
                }
            }
        }
    }["AssignmentForm.useEffect"], [
        preselectedStudent,
        form
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AssignmentForm.useEffect": ()=>{
            if (preselectedRoute) {
                setSelectedRoute(preselectedRoute);
                form.setFieldValue('routeId', preselectedRoute.id);
            }
        }
    }["AssignmentForm.useEffect"], [
        preselectedRoute,
        form
    ]);
    const handleStudentSelect = (value)=>{
        const student = students.find((s)=>s.id === value);
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
    const handleRouteSelect = (value_0)=>{
        const route = routes.find((r)=>r.id === value_0);
        setSelectedRoute(route || null);
        // Reset stop when route changes
        setSelectedStop(null);
        form.setFieldValue('stopId', undefined);
    };
    const handleStopSelect = (value_1)=>{
        const stop = stops.find((s_0)=>s_0.id === value_1);
        setSelectedStop(stop || null);
    };
    const validateAssignment = async ()=>{
        if (!selectedStudent || !selectedRoute || !selectedStop) return;
        try {
            const result = await validateMutation.mutateAsync({
                studentId: selectedStudent.id,
                routeId: selectedRoute.id,
                stopId: selectedStop.id
            });
            setValidationResult(result);
            return result.valid;
        } catch (error) {
            return false;
        }
    };
    const handleNext = async ()=>{
        try {
            await form.validateFields();
            if (currentStep === 1) {
                // Validate assignment before proceeding to confirmation
                const isValid = await validateAssignment();
                if (!isValid && validationResult?.conflicts?.length > 0) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning('Assignment has conflicts but can still be created');
                }
            }
            setCurrentStep((prev)=>prev + 1);
        } catch (error_0) {
        // Form validation failed
        }
    };
    const handlePrevious = ()=>{
        setCurrentStep((prev_0)=>prev_0 - 1);
    };
    const handleSubmit = async (values)=>{
        try {
            const assignmentData = {
                studentId: values.studentId,
                routeId: values.routeId,
                stopId: values.stopId,
                assignmentDate: values.assignmentDate?.format('YYYY-MM-DD'),
                status: values.status || 'ACTIVE'
            };
            if (isEditing && assignment) {
                await updateMutation.mutateAsync({
                    id: assignment.id,
                    data: assignmentData
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Assignment updated successfully');
            } else {
                // Use the specific assign student endpoint for better handling
                await assignStudentMutation.mutateAsync({
                    studentId: assignmentData.studentId,
                    routeId: assignmentData.routeId,
                    stopId: assignmentData.stopId,
                    assignmentDate: assignmentData.assignmentDate
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Student assigned to route successfully');
            }
            form.resetFields();
            onSuccess();
        } catch (error_1) {
            const errorMessage = error_1?.response?.data?.message || 'Failed to save assignment';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    };
    const steps = [
        {
            title: 'Select Student',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        gutter: [
                            16,
                            16
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                span: 24,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "studentId",
                                    label: "Student",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a student'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Search and select student",
                                        showSearch: true,
                                        loading: studentsLoading,
                                        optionFilterProp: "children",
                                        onChange: handleStudentSelect,
                                        filterOption: (input, option)=>(option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                        options: students.map((student_0)=>({
                                                value: student_0.id,
                                                label: `${student_0.firstName} ${student_0.lastName} - Grade ${student_0.grade}`
                                            }))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 209,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                span: 24,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    label: "Filter by School",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "All schools",
                                        value: schoolFilter || undefined,
                                        onChange: setSchoolFilter,
                                        allowClear: true,
                                        children: schools.map((school)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: school.id,
                                                children: school.name
                                            }, school.id, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 219,
                                                columnNumber: 42
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 218,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this),
                    selectedStudent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        size: "small",
                        style: {
                            marginTop: '16px',
                            backgroundColor: '#f6ffed'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 236,
                                        columnNumber: 31
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 236,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: 500
                                            },
                                            children: [
                                                selectedStudent.firstName,
                                                " ",
                                                selectedStudent.lastName
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 238,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '12px',
                                                color: '#666'
                                            },
                                            children: [
                                                "Grade ",
                                                selectedStudent.grade,
                                                " • ",
                                                selectedStudent.school?.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '12px',
                                                color: '#666'
                                            },
                                            children: selectedStudent.address
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 231,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 227,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                lineNumber: 202,
                columnNumber: 14
            }, this)
        },
        {
            title: 'Select Route & Stop',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        gutter: [
                            16,
                            16
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                md: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "routeId",
                                    label: "Route",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a route'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select route",
                                        loading: routesLoading,
                                        onChange: handleRouteSelect,
                                        children: routes.map((route_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: route_0.id,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 500
                                                            },
                                                            children: route_0.routeName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                            lineNumber: 271,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#666'
                                                            },
                                                            children: [
                                                                route_0.description,
                                                                " • ",
                                                                route_0.distance,
                                                                "km"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 23
                                                }, this)
                                            }, route_0.id, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 269,
                                                columnNumber: 42
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 268,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                md: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "stopId",
                                    label: "Stop",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a stop'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select stop",
                                        disabled: !selectedRoute,
                                        onChange: handleStopSelect,
                                        children: stops.map((stop_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: stop_0.id,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 500
                                                            },
                                                            children: stop_0.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#666'
                                                            },
                                                            children: [
                                                                stop_0.address,
                                                                stop_0.estimatedArrival && ` • ${stop_0.estimatedArrival}`
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                            lineNumber: 297,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 23
                                                }, this)
                                            }, stop_0.id, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 292,
                                                columnNumber: 40
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 291,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                md: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "assignmentDate",
                                    label: "Assignment Date",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select assignment date'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__["DatePicker"], {
                                        style: {
                                            width: '100%'
                                        },
                                        disabledDate: (current)=>current && current < (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().startOf('day')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 315,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this),
                            isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                md: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "status",
                                    label: "Status",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select status'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select status",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "ACTIVE",
                                                children: "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 327,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "INACTIVE",
                                                children: "Inactive"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 328,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "PENDING",
                                                children: "Pending"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 329,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "COMPLETED",
                                                children: "Completed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 330,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 326,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 322,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 321,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this),
                    selectedRoute && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        size: "small",
                        style: {
                            marginTop: '16px',
                            backgroundColor: '#f0f2ff'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {
                                    style: {
                                        color: '#1890ff',
                                        fontSize: '16px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 345,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontWeight: 500
                                            },
                                            children: selectedRoute.routeName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 350,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '12px',
                                                color: '#666'
                                            },
                                            children: [
                                                selectedRoute.description,
                                                " • Distance: ",
                                                selectedRoute.distance,
                                                "km"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 353,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '12px',
                                                color: '#666'
                                            },
                                            children: [
                                                "Estimated Duration: ",
                                                selectedRoute.estimatedDuration ? Math.round(selectedRoute.estimatedDuration / 60) : 'N/A',
                                                " minutes"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 359,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 349,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 340,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 336,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                lineNumber: 261,
                columnNumber: 14
            }, this)
        },
        {
            title: 'Confirmation',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginBottom: '24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {
                                style: {
                                    fontSize: '48px',
                                    color: '#52c41a',
                                    marginBottom: '16px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                level: 4,
                                children: "Confirm Assignment"
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                type: "secondary",
                                children: "Please review the assignment details before confirming."
                            }, void 0, false, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 372,
                        columnNumber: 11
                    }, this),
                    validationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: '24px'
                        },
                        children: validationResult.valid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            message: "Assignment Validated Successfully",
                            description: "No conflicts detected for this assignment.",
                            type: "success",
                            showIcon: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 391,
                            columnNumber: 41
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            message: "Assignment Conflicts Detected",
                            description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: "The following issues were found:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 392,
                                        columnNumber: 23
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        style: {
                                            margin: 0,
                                            paddingLeft: '20px'
                                        },
                                        children: validationResult.conflicts?.map((conflict, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: conflict
                                            }, index, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 399,
                                                columnNumber: 95
                                            }, void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 395,
                                        columnNumber: 23
                                    }, void 0),
                                    validationResult.warnings?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Warnings:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 404,
                                                columnNumber: 27
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                style: {
                                                    margin: 0,
                                                    paddingLeft: '20px'
                                                },
                                                children: validationResult.warnings.map((warning, index_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: warning
                                                    }, index_0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 98
                                                    }, void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 405,
                                                columnNumber: 27
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 401,
                                        columnNumber: 65
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                lineNumber: 391,
                                columnNumber: 238
                            }, void 0),
                            type: "warning",
                            showIcon: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 391,
                            columnNumber: 178
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 388,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        title: "Assignment Summary",
                        size: "small",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                            gutter: [
                                16,
                                16
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 24,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px',
                                            backgroundColor: '#fafafa',
                                            borderRadius: '6px',
                                            marginBottom: '12px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {
                                                style: {
                                                    color: '#1890ff'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 428,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 500
                                                        },
                                                        children: "Student"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 432,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '14px'
                                                        },
                                                        children: [
                                                            selectedStudent?.firstName,
                                                            " ",
                                                            selectedStudent?.lastName,
                                                            " - Grade ",
                                                            selectedStudent?.grade
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: '#666'
                                                        },
                                                        children: selectedStudent?.school?.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 431,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 419,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 418,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 24,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px',
                                            backgroundColor: '#fafafa',
                                            borderRadius: '6px',
                                            marginBottom: '12px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {
                                                style: {
                                                    color: '#52c41a'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 460,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 500
                                                        },
                                                        children: "Route"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '14px'
                                                        },
                                                        children: selectedRoute?.routeName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: '#666'
                                                        },
                                                        children: selectedRoute?.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 463,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 451,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 450,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 24,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px',
                                            backgroundColor: '#fafafa',
                                            borderRadius: '6px',
                                            marginBottom: '12px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__["TeamOutlined"], {
                                                style: {
                                                    color: '#722ed1'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 492,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 500
                                                        },
                                                        children: "Stop"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '14px'
                                                        },
                                                        children: selectedStop?.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '12px',
                                                            color: '#666'
                                                        },
                                                        children: [
                                                            selectedStop?.address,
                                                            selectedStop?.estimatedArrival && ` • Arrival: ${selectedStop.estimatedArrival}`
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 495,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 483,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 482,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 24,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px',
                                            backgroundColor: '#fafafa',
                                            borderRadius: '6px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__["CalendarOutlined"], {
                                                style: {
                                                    color: '#fa8c16'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 524,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 500
                                                        },
                                                        children: "Assignment Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '14px'
                                                        },
                                                        children: form.getFieldValue('assignmentDate')?.format('MMMM DD, YYYY')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                                lineNumber: 527,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                        lineNumber: 516,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 515,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 417,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 416,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                lineNumber: 371,
                columnNumber: 14
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '24px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                    level: 4,
                    style: {
                        margin: 0
                    },
                    children: isEditing ? 'Edit Assignment' : 'Create New Assignment'
                }, void 0, false, {
                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                    lineNumber: 547,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$steps$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Steps$3e$__["Steps"], {
                current: currentStep,
                style: {
                    marginBottom: '32px'
                },
                items: steps.map((step, index_1)=>({
                        key: index_1,
                        title: step.title,
                        icon: index_1 === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 559,
                            columnNumber: 29
                        }, void 0) : index_1 === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 559,
                            columnNumber: 64
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 559,
                            columnNumber: 90
                        }, void 0)
                    }))
            }, void 0, false, {
                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                form: form,
                layout: "vertical",
                onFinish: handleSubmit,
                initialValues: {
                    assignmentDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(),
                    status: 'ACTIVE'
                },
                autoComplete: "off",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            minHeight: '400px'
                        },
                        children: steps[currentStep].content
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {}, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 572,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        justify: "end",
                        style: {
                            marginTop: '24px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    onClick: onCancel,
                                    size: "large",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseOutlined$3e$__["CloseOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 579,
                                            columnNumber: 15
                                        }, this),
                                        "Cancel"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, this),
                                currentStep > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    onClick: handlePrevious,
                                    size: "large",
                                    children: "Previous"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 583,
                                    columnNumber: 33
                                }, this),
                                currentStep < steps.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    onClick: handleNext,
                                    size: "large",
                                    disabled: currentStep === 0 && !selectedStudent || currentStep === 1 && (!selectedRoute || !selectedStop),
                                    children: "Next"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 587,
                                    columnNumber: 47
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    htmlType: "submit",
                                    loading: isLoading,
                                    size: "large",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__["SaveOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                            lineNumber: 590,
                                            columnNumber: 17
                                        }, this),
                                        isEditing ? 'Update Assignment' : 'Create Assignment'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                                    lineNumber: 589,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                            lineNumber: 577,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                        lineNumber: 574,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
                lineNumber: 562,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/assignments/AssignmentForm.tsx",
        lineNumber: 543,
        columnNumber: 10
    }, this);
}
_s(AssignmentForm, "XxCqqj+tF1SR/oBME6s3WGh1aoc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouteStops"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateAssignment"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateAssignment"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useValidateAssignment"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAssignments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssignStudentToRoute"]
    ];
});
_c = AssignmentForm;
var _c;
__turbopack_context__.k.register(_c, "AssignmentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/authService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/auth.ts [app-client] (ecmascript)");
;
;
class AuthService {
    static instance;
    constructor(){}
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    /**
   * Login user with email and password
   */ async login(credentials) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/login', credentials);
            if (response.success && response.data) {
                const { user, tokens } = response.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(tokens.accessToken, tokens.refreshToken);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].setUser(user);
                return {
                    success: true,
                    data: response.data
                };
            }
            throw new Error(response.error?.message || 'Login failed');
        } catch (error) {
            throw {
                success: false,
                error: {
                    message: error.error?.message || error.message || 'Login failed',
                    code: error.error?.code || 'LOGIN_ERROR'
                }
            };
        }
    }
    /**
   * Register new user
   */ async register(userData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/register', userData);
            if (response.success && response.data) {
                const { user, tokens } = response.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(tokens.accessToken, tokens.refreshToken);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].setUser(user);
                return {
                    success: true,
                    data: response.data
                };
            }
            throw new Error(response.error?.message || 'Registration failed');
        } catch (error) {
            throw {
                success: false,
                error: {
                    message: error.error?.message || error.message || 'Registration failed',
                    code: error.error?.code || 'REGISTER_ERROR'
                }
            };
        }
    }
    /**
   * Logout user
   */ async logout() {
        try {
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
            if (token) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/logout');
            }
        } catch (error) {
            // Continue with logout even if API call fails
            console.error('Logout API call failed:', error);
        } finally{
            this.clearLocalSession();
        }
    }
    /**
   * Refresh access token
   */ async refreshToken() {
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getRefreshToken();
        if (!refreshToken) {
            this.clearLocalSession();
            return null;
        }
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/refresh', {
                refreshToken
            });
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(response.data.accessToken, response.data.refreshToken);
                return response.data.accessToken;
            }
            throw new Error('Token refresh failed');
        } catch (error) {
            this.clearLocalSession();
            return null;
        }
    }
    /**
   * Get current user profile
   */ async getCurrentUser() {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/auth/me');
            if (response.success && response.data?.user) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].setUser(response.data.user);
                return response.data.user;
            }
            return null;
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            return null;
        }
    }
    /**
   * Update user profile
   */ async updateProfile(userData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put('/auth/profile', userData);
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].setUser(response.data);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
    /**
   * Change password
   */ async changePassword(data) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put('/auth/change-password', data);
        } catch (error) {
            throw error;
        }
    }
    /**
   * Request password reset
   */ async requestPasswordReset(email) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/forgot-password', {
                email
            });
        } catch (error) {
            throw error;
        }
    }
    /**
   * Reset password with token
   */ async resetPassword(token, newPassword) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/reset-password', {
                token,
                newPassword
            });
        } catch (error) {
            throw error;
        }
    }
    /**
   * Verify email with token
   */ async verifyEmail(token) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/verify-email', {
                token
            });
        } catch (error) {
            throw error;
        }
    }
    /**
   * Resend email verification
   */ async resendVerification(email) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/resend-verification', {
                email
            });
        } catch (error) {
            throw error;
        }
    }
    /**
   * Check if user is authenticated
   */ isAuthenticated() {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].getUser();
        return !!(token && user && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token));
    }
    /**
   * Get current user from storage
   */ getCurrentUserFromStorage() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].getUser();
    }
    /**
   * Check if user has specific role
   */ hasRole(role) {
        const user = this.getCurrentUserFromStorage();
        return user?.role === role;
    }
    /**
   * Check if user has any of the specified roles
   */ hasAnyRole(roles) {
        const user = this.getCurrentUserFromStorage();
        return user ? roles.includes(user.role) : false;
    }
    /**
   * Clear local session data
   */ clearLocalSession() {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].clearTokens();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].clearUser();
    }
    /**
   * Initialize authentication state from storage
   */ initializeAuth() {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserStorage"].getUser();
        if (token && user && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token)) {
            return {
                isAuthenticated: true,
                user
            };
        }
        // Clear invalid data
        this.clearLocalSession();
        return {
            isAuthenticated: false,
            user: null
        };
    }
    /**
   * Get access token
   */ getAccessToken() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
    }
    /**
   * Check if token is expiring soon
   */ isTokenExpiringSoon() {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
        return token ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpiringSoon(token) : true;
    }
}
// Export singleton instance
const authService = AuthService.getInstance();
const __TURBOPACK__default__export__ = authService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/authStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devtools"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Initial state
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
        // Actions
        login: async (credentials)=>{
            console.log('AuthStore: Login attempt with credentials:', {
                email: credentials.email
            });
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].login(credentials);
                console.log('AuthStore: Login response:', response);
                if (response.success && response.data) {
                    console.log('AuthStore: Login successful, user:', response.data.user);
                    console.log('AuthStore: Tokens received:', !!response.data.tokens);
                    set({
                        isAuthenticated: true,
                        user: response.data.user,
                        isLoading: false,
                        error: null
                    });
                    console.log('AuthStore: Auth state updated after login');
                } else {
                    throw new Error('Login failed');
                }
            } catch (error) {
                console.error('AuthStore: Login error:', error);
                set({
                    isAuthenticated: false,
                    user: null,
                    isLoading: false,
                    error: error.error?.message || error.message || 'Login failed'
                });
                throw error;
            }
        },
        register: async (userData)=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].register(userData);
                if (response.success && response.data) {
                    set({
                        isAuthenticated: true,
                        user: response.data.user,
                        isLoading: false,
                        error: null
                    });
                } else {
                    throw new Error('Registration failed');
                }
            } catch (error) {
                set({
                    isAuthenticated: false,
                    user: null,
                    isLoading: false,
                    error: error.error?.message || error.message || 'Registration failed'
                });
                throw error;
            }
        },
        logout: async ()=>{
            set({
                isLoading: true
            });
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].logout();
            } catch (error) {
                console.error('Logout error:', error);
            } finally{
                set({
                    isAuthenticated: false,
                    user: null,
                    isLoading: false,
                    error: null
                });
            }
        },
        refreshToken: async ()=>{
            try {
                const newToken = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].refreshToken();
                if (newToken) {
                    // Token refreshed successfully, user stays authenticated
                    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getCurrentUserFromStorage();
                    set({
                        isAuthenticated: true,
                        user
                    });
                } else {
                    // Refresh failed, logout user
                    set({
                        isAuthenticated: false,
                        user: null,
                        error: 'Session expired'
                    });
                }
            } catch (error) {
                set({
                    isAuthenticated: false,
                    user: null,
                    error: error.message || 'Session expired'
                });
            }
        },
        getCurrentUser: async ()=>{
            set({
                isLoading: true,
                error: null
            });
            try {
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getCurrentUser();
                if (user) {
                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false
                    });
                } else {
                    set({
                        isAuthenticated: false,
                        user: null,
                        isLoading: false,
                        error: 'Failed to fetch user data'
                    });
                }
            } catch (error) {
                set({
                    isAuthenticated: false,
                    user: null,
                    isLoading: false,
                    error: error.message || 'Failed to fetch user data'
                });
            }
        },
        updateProfile: async (userData)=>{
            const { user } = get();
            if (!user) throw new Error('User not authenticated');
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].updateProfile(userData);
                if (response.success && response.data) {
                    set({
                        user: response.data,
                        isLoading: false
                    });
                } else {
                    throw new Error('Profile update failed');
                }
            } catch (error) {
                set({
                    isLoading: false,
                    error: error.error?.message || error.message || 'Profile update failed'
                });
                throw error;
            }
        },
        clearError: ()=>{
            set({
                error: null
            });
        },
        setLoading: (loading)=>{
            set({
                isLoading: loading
            });
        },
        initializeAuth: ()=>{
            console.log('AuthStore: Initializing auth...');
            const authData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].initializeAuth();
            console.log('AuthStore: Auth data:', authData);
            console.log('AuthStore: Token available:', !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getAccessToken());
            console.log('AuthStore: User from storage:', authData.user);
            set({
                isAuthenticated: authData.isAuthenticated,
                user: authData.user,
                isLoading: false
            });
            console.log('AuthStore: Auth initialized, isAuthenticated:', authData.isAuthenticated);
        },
        // Helper functions
        hasRole: (role)=>{
            const { user } = get();
            return user?.role === role;
        },
        hasAnyRole: (roles)=>{
            const { user } = get();
            return user ? roles.includes(user.role) : false;
        },
        canAccessResource: (resourceRoles)=>{
            const { user, hasAnyRole } = get();
            if (!user) return false;
            if (!resourceRoles || resourceRoles.length === 0) return true;
            return hasAnyRole(resourceRoles);
        }
    }), {
    name: 'auth-store',
    partialize: (state)=>({
            // Only persist user data and authentication status
            // Tokens are handled by authService
            isAuthenticated: state.isAuthenticated,
            user: state.user
        })
}), {
    name: 'auth-store'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProtectedComponent",
    ()=>ProtectedComponent,
    "default",
    ()=>ProtectedRoute,
    "usePermissions",
    ()=>usePermissions,
    "withAuth",
    ()=>withAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$result$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Result$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/result/index.js [app-client] (ecmascript) <export default as Result>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-client] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ProtectedRoute(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "f0d08e26876eb63117185d03dc2424521cc195984ccd01e67857db8b59e930b2") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f0d08e26876eb63117185d03dc2424521cc195984ccd01e67857db8b59e930b2";
    }
    const { children, roles: t1, requireAuth: t2, fallback } = t0;
    const roles = t1 === undefined ? [] : t1;
    const requireAuth = t2 === undefined ? true : t2;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, user, isLoading, initializeAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    let t3;
    let t4;
    if ($[1] !== initializeAuth) {
        t3 = ({
            "ProtectedRoute[useEffect()]": ()=>{
                initializeAuth();
            }
        })["ProtectedRoute[useEffect()]"];
        t4 = [
            initializeAuth
        ];
        $[1] = initializeAuth;
        $[2] = t3;
        $[3] = t4;
    } else {
        t3 = $[2];
        t4 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    if (isLoading) {
        let t5;
        if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                    size: "large"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/ProtectedRoute.tsx",
                    lineNumber: 63,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/auth/ProtectedRoute.tsx",
                lineNumber: 58,
                columnNumber: 12
            }, this);
            $[4] = t5;
        } else {
            t5 = $[4];
        }
        return t5;
    }
    if (requireAuth && !isAuthenticated) {
        router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN);
        return null;
    }
    if (roles.length > 0 && user) {
        const hasAccess = roles.includes(user.role);
        if (!hasAccess) {
            let t5;
            if ($[5] !== fallback || $[6] !== router) {
                t5 = fallback || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$result$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Result$3e$__["Result"], {
                    status: "403",
                    title: "403",
                    subTitle: "Sorry, you are not authorized to access this page.",
                    extra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        type: "primary",
                        onClick: {
                            "ProtectedRoute[<Button>.onClick]": ()=>router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD)
                        }["ProtectedRoute[<Button>.onClick]"],
                        children: "Back to Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/ProtectedRoute.tsx",
                        lineNumber: 79,
                        columnNumber: 128
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/ProtectedRoute.tsx",
                    lineNumber: 79,
                    columnNumber: 26
                }, this);
                $[5] = fallback;
                $[6] = router;
                $[7] = t5;
            } else {
                t5 = $[7];
            }
            return t5;
        }
    }
    let t5;
    if ($[8] !== children) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
        $[8] = children;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    return t5;
}
_s(ProtectedRoute, "yPam2Z3jdjJZtD30sTkddp/GXtQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = ProtectedRoute;
function withAuth(WrappedComponent, options = {}) {
    const { roles = [], requireAuth = true, redirectTo = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN } = options;
    return function AuthenticatedComponent(props) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProtectedRoute, {
            roles: roles,
            requireAuth: requireAuth,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WrappedComponent, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/auth/ProtectedRoute.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/ProtectedRoute.tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    };
}
function ProtectedComponent(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "f0d08e26876eb63117185d03dc2424521cc195984ccd01e67857db8b59e930b2") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f0d08e26876eb63117185d03dc2424521cc195984ccd01e67857db8b59e930b2";
    }
    const { children, roles: t1, fallback: t2, user: overrideUser } = t0;
    let t3;
    if ($[1] !== t1) {
        t3 = t1 === undefined ? [] : t1;
        $[1] = t1;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const roles = t3;
    const fallback = t2 === undefined ? null : t2;
    const { user: storeUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const user = overrideUser || storeUser;
    if (roles.length === 0) {
        let t4;
        if ($[3] !== children || $[4] !== fallback || $[5] !== user) {
            t4 = user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: children
            }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: fallback
            }, void 0, false);
            $[3] = children;
            $[4] = fallback;
            $[5] = user;
            $[6] = t4;
        } else {
            t4 = $[6];
        }
        return t4;
    }
    let t4;
    if ($[7] !== roles || $[8] !== user) {
        t4 = user && roles.includes(user.role);
        $[7] = roles;
        $[8] = user;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    const hasAccess = t4;
    let t5;
    if ($[10] !== children || $[11] !== fallback || $[12] !== hasAccess) {
        t5 = hasAccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: fallback
        }, void 0, false);
        $[10] = children;
        $[11] = fallback;
        $[12] = hasAccess;
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    return t5;
}
_s1(ProtectedComponent, "KHHnUeVJwFw495Xi2keNQdACZ7s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c1 = ProtectedComponent;
function usePermissions() {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(31);
    if ($[0] !== "f0d08e26876eb63117185d03dc2424521cc195984ccd01e67857db8b59e930b2") {
        for(let $i = 0; $i < 31; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f0d08e26876eb63117185d03dc2424521cc195984ccd01e67857db8b59e930b2";
    }
    const { user, hasRole, hasAnyRole, canAccessResource } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    let t0;
    let t1;
    let t2;
    let t3;
    if ($[1] !== hasRole) {
        t0 = ()=>hasRole("ADMIN");
        t1 = ()=>hasRole("TEACHER");
        t2 = ()=>hasRole("DRIVER");
        t3 = ()=>hasRole("PARENT");
        $[1] = hasRole;
        $[2] = t0;
        $[3] = t1;
        $[4] = t2;
        $[5] = t3;
    } else {
        t0 = $[2];
        t1 = $[3];
        t2 = $[4];
        t3 = $[5];
    }
    let t4;
    let t5;
    let t6;
    if ($[6] !== hasAnyRole) {
        t4 = ()=>hasAnyRole([
                "ADMIN",
                "TEACHER"
            ]);
        t5 = ()=>hasAnyRole([
                "ADMIN",
                "TEACHER"
            ]);
        t6 = ()=>hasAnyRole([
                "ADMIN",
                "TEACHER"
            ]);
        $[6] = hasAnyRole;
        $[7] = t4;
        $[8] = t5;
        $[9] = t6;
    } else {
        t4 = $[7];
        t5 = $[8];
        t6 = $[9];
    }
    let t7;
    if ($[10] !== hasRole) {
        t7 = ()=>hasRole("ADMIN");
        $[10] = hasRole;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== hasAnyRole) {
        t8 = ()=>hasAnyRole([
                "ADMIN",
                "TEACHER"
            ]);
        $[12] = hasAnyRole;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== hasRole) {
        t9 = ()=>hasRole("ADMIN");
        $[14] = hasRole;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== canAccessResource || $[17] !== hasAnyRole || $[18] !== hasRole || $[19] !== t0 || $[20] !== t1 || $[21] !== t2 || $[22] !== t3 || $[23] !== t4 || $[24] !== t5 || $[25] !== t6 || $[26] !== t7 || $[27] !== t8 || $[28] !== t9 || $[29] !== user) {
        t10 = {
            user,
            hasRole,
            hasAnyRole,
            canAccessResource,
            isAdmin: t0,
            isTeacher: t1,
            isDriver: t2,
            isParent: t3,
            canManageSchools: t4,
            canManageVehicles: t5,
            canManageUsers: t6,
            canManageDrivers: t7,
            canViewReports: t8,
            canAccessLogs: t9
        };
        $[16] = canAccessResource;
        $[17] = hasAnyRole;
        $[18] = hasRole;
        $[19] = t0;
        $[20] = t1;
        $[21] = t2;
        $[22] = t3;
        $[23] = t4;
        $[24] = t5;
        $[25] = t6;
        $[26] = t7;
        $[27] = t8;
        $[28] = t9;
        $[29] = user;
        $[30] = t10;
    } else {
        t10 = $[30];
    }
    return t10;
}
_s2(usePermissions, "xX7CV1oqUZDiRDdgdkURuBJ8BeE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
var _c, _c1;
__turbopack_context__.k.register(_c, "ProtectedRoute");
__turbopack_context__.k.register(_c1, "ProtectedComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/appStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppStore",
    ()=>useAppStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useAppStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devtools"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Initial state
        sidebarCollapsed: false,
        isMobile: false,
        theme: 'light',
        breadcrumbs: [],
        currentPage: '',
        notifications: [],
        unreadCount: 0,
        globalLoading: false,
        dashboardWidgets: [],
        searchVisible: false,
        searchQuery: '',
        // UI Actions
        toggleSidebar: ()=>{
            set((state)=>({
                    sidebarCollapsed: !state.sidebarCollapsed
                }));
        },
        setSidebarCollapsed: (collapsed)=>{
            set({
                sidebarCollapsed: collapsed
            });
        },
        setIsMobile: (isMobile)=>{
            set({
                isMobile
            });
            // Auto-collapse sidebar on mobile
            if (isMobile) {
                set({
                    sidebarCollapsed: true
                });
            }
        },
        setTheme: (theme)=>{
            set({
                theme
            });
        },
        // Navigation Actions
        setBreadcrumbs: (breadcrumbs)=>{
            set({
                breadcrumbs
            });
        },
        setCurrentPage: (page)=>{
            set({
                currentPage: page
            });
        },
        // Notification Actions
        addNotification: (notification)=>{
            const id = Math.random().toString(36).substr(2, 9);
            const timestamp = new Date();
            set((state)=>{
                const newNotification = {
                    id,
                    timestamp,
                    read: false,
                    ...notification
                };
                const notifications = [
                    newNotification,
                    ...state.notifications
                ];
                const unreadCount = notifications.filter((n)=>!n.read).length;
                return {
                    notifications,
                    unreadCount
                };
            });
            // Auto-remove notification after 5 seconds for success messages
            if (notification.type === 'success') {
                setTimeout(()=>{
                    get().removeNotification(id);
                }, 5000);
            }
        },
        removeNotification: (id)=>{
            set((state)=>{
                const notifications = state.notifications.filter((n)=>n.id !== id);
                const unreadCount = notifications.filter((n)=>!n.read).length;
                return {
                    notifications,
                    unreadCount
                };
            });
        },
        markNotificationRead: (id)=>{
            set((state)=>{
                const notifications = state.notifications.map((n)=>n.id === id ? {
                        ...n,
                        read: true
                    } : n);
                const unreadCount = notifications.filter((n)=>!n.read).length;
                return {
                    notifications,
                    unreadCount
                };
            });
        },
        markAllNotificationsRead: ()=>{
            set((state)=>({
                    notifications: state.notifications.map((n)=>({
                            ...n,
                            read: true
                        })),
                    unreadCount: 0
                }));
        },
        clearNotifications: ()=>{
            set({
                notifications: [],
                unreadCount: 0
            });
        },
        // Loading Actions
        setGlobalLoading: (loading)=>{
            set({
                globalLoading: loading
            });
        },
        // Dashboard Actions
        updateDashboardWidgets: (widgets)=>{
            set({
                dashboardWidgets: widgets
            });
        },
        updateWidget: (id, data)=>{
            set((state)=>({
                    dashboardWidgets: state.dashboardWidgets.map((widget)=>widget.id === id ? {
                            ...widget,
                            ...data
                        } : widget)
                }));
        },
        // Search Actions
        setSearchVisible: (visible)=>{
            set({
                searchVisible: visible
            });
            if (!visible) {
                set({
                    searchQuery: ''
                });
            }
        },
        setSearchQuery: (query)=>{
            set({
                searchQuery: query
            });
        },
        // Reset
        resetApp: ()=>{
            set({
                sidebarCollapsed: false,
                breadcrumbs: [],
                currentPage: '',
                notifications: [],
                unreadCount: 0,
                globalLoading: false,
                dashboardWidgets: [],
                searchVisible: false,
                searchQuery: ''
            });
        }
    }), {
    name: 'app-store',
    partialize: (state)=>({
            // Only persist UI preferences
            sidebarCollapsed: state.sidebarCollapsed,
            theme: state.theme
        })
}), {
    name: 'app-store'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/format.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capitalizeFirst",
    ()=>capitalizeFirst,
    "capitalizeWords",
    ()=>capitalizeWords,
    "formatAddress",
    ()=>formatAddress,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatFileSize",
    ()=>formatFileSize,
    "formatFullName",
    ()=>formatFullName,
    "formatId",
    ()=>formatId,
    "formatLicensePlate",
    ()=>formatLicensePlate,
    "formatNumber",
    ()=>formatNumber,
    "formatPercentage",
    ()=>formatPercentage,
    "formatPhoneNumber",
    ()=>formatPhoneNumber,
    "formatRelativeTime",
    ()=>formatRelativeTime,
    "formatStatus",
    ()=>formatStatus,
    "getInitials",
    ()=>getInitials,
    "isToday",
    ()=>isToday,
    "isYesterday",
    ()=>isYesterday,
    "maskEmail",
    ()=>maskEmail,
    "truncateText",
    ()=>truncateText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$plugin$2f$relativeTime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/plugin/relativeTime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$plugin$2f$relativeTime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
const formatDate = (date, format)=>{
    if (!date) return '';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(date).format(format || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DATE_FORMATS"].DISPLAY);
};
const formatDateTime = (date)=>{
    return formatDate(date, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DATE_FORMATS"].DISPLAY_WITH_TIME);
};
const formatRelativeTime = (date)=>{
    if (!date) return '';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(date).fromNow();
};
const isToday = (date)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(date).isSame((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(), 'day');
};
const isYesterday = (date)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(date).isSame((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, 'day'), 'day');
};
const formatNumber = (num, decimals = 0)=>{
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
};
const formatCurrency = (amount, currency = 'USD')=>{
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
};
const formatPercentage = (value, decimals = 1)=>{
    return `${formatNumber(value, decimals)}%`;
};
const capitalizeFirst = (str)=>{
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const capitalizeWords = (str)=>{
    if (!str) return '';
    return str.split(' ').map(capitalizeFirst).join(' ');
};
const truncateText = (text, maxLength)=>{
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
const formatFullName = (firstName, lastName)=>{
    return [
        firstName,
        lastName
    ].filter(Boolean).join(' ');
};
const getInitials = (firstName, lastName)=>{
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last;
};
const formatPhoneNumber = (phone)=>{
    if (!phone) return '';
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    // Format as (XXX) XXX-XXXX for US numbers
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    // For international numbers, just add spaces
    if (cleaned.length > 10) {
        return cleaned.replace(/(\d{1,3})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
    }
    return phone;
};
const formatAddress = (address)=>{
    if (!address) return '';
    // Basic address formatting - can be enhanced based on requirements
    return capitalizeWords(address.trim());
};
const formatFileSize = (bytes)=>{
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB'
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
const formatStatus = (status)=>{
    if (!status) return '';
    return status.split('_').map(capitalizeFirst).join(' ');
};
const formatId = (id, prefix)=>{
    if (!id) return '';
    if (prefix) {
        return `${prefix}-${id}`;
    }
    return id;
};
const maskEmail = (email)=>{
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (!domain) return email;
    const maskedUsername = username.substring(0, 2) + '*'.repeat(Math.max(0, username.length - 2));
    return `${maskedUsername}@${domain}`;
};
const formatLicensePlate = (plate)=>{
    if (!plate) return '';
    return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AppHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/layout/index.js [app-client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/dropdown/index.js [app-client] (ecmascript) <export default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/breadcrumb/index.js [app-client] (ecmascript) <export default as Breadcrumb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuFoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuFoldOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MenuFoldOutlined.js [app-client] (ecmascript) <export default as MenuFoldOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuUnfoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuUnfoldOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MenuUnfoldOutlined.js [app-client] (ecmascript) <export default as MenuUnfoldOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BellOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/BellOutlined.js [app-client] (ecmascript) <export default as BellOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SearchOutlined.js [app-client] (ecmascript) <export default as SearchOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SettingOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SettingOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SettingOutlined.js [app-client] (ecmascript) <export default as SettingOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$LogoutOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogoutOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/LogoutOutlined.js [app-client] (ecmascript) <export default as LogoutOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/appStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
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
const { Header } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"];
const { Search } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
function AppHeader(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(80);
    if ($[0] !== "9058a75839643a7e36d17f22f237b83746e48f6c85907ef6c149886b808397dc") {
        for(let $i = 0; $i < 80; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9058a75839643a7e36d17f22f237b83746e48f6c85907ef6c149886b808397dc";
    }
    const { collapsed, onToggle, theme } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { notifications, unreadCount, breadcrumbs, searchVisible, setSearchVisible, setSearchQuery } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])();
    let notificationMenuItems;
    let userMenuItems;
    if ($[1] !== logout || $[2] !== notifications || $[3] !== router) {
        let t1;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 58,
                columnNumber: 12
            }, this);
            $[6] = t1;
        } else {
            t1 = $[6];
        }
        let t2;
        if ($[7] !== router) {
            t2 = {
                key: "profile",
                icon: t1,
                label: "Profile",
                onClick: ()=>router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].PROFILE)
            };
            $[7] = router;
            $[8] = t2;
        } else {
            t2 = $[8];
        }
        let t3;
        if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SettingOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SettingOutlined$3e$__["SettingOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 78,
                columnNumber: 12
            }, this);
            $[9] = t3;
        } else {
            t3 = $[9];
        }
        let t4;
        if ($[10] !== router) {
            t4 = {
                key: "settings",
                icon: t3,
                label: "Settings",
                onClick: ()=>router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].SETTINGS)
            };
            $[10] = router;
            $[11] = t4;
        } else {
            t4 = $[11];
        }
        let t5;
        if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = {
                type: "divider"
            };
            $[12] = t5;
        } else {
            t5 = $[12];
        }
        let t6;
        if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$LogoutOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogoutOutlined$3e$__["LogoutOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 107,
                columnNumber: 12
            }, this);
            $[13] = t6;
        } else {
            t6 = $[13];
        }
        userMenuItems = [
            t2,
            t4,
            t5,
            {
                key: "logout",
                icon: t6,
                label: "Logout",
                onClick: handleLogout
            }
        ];
        let t7;
        if ($[14] !== notifications || $[15] !== router) {
            let t8;
            if ($[17] !== notifications.length || $[18] !== router) {
                t8 = notifications.length > 0 ? [
                    {
                        type: "divider"
                    },
                    {
                        key: "view-all",
                        label: "View All Notifications",
                        onClick: ()=>router.push("/notifications")
                    }
                ] : [];
                $[17] = notifications.length;
                $[18] = router;
                $[19] = t8;
            } else {
                t8 = $[19];
            }
            let t9;
            if ($[20] !== notifications.length) {
                t9 = notifications.length === 0 ? [
                    {
                        key: "no-notifications",
                        label: "No new notifications",
                        disabled: true
                    }
                ] : [];
                $[20] = notifications.length;
                $[21] = t9;
            } else {
                t9 = $[21];
            }
            t7 = [
                ...notifications.slice(0, 5).map(_AppHeaderAnonymous),
                ...t8,
                ...t9
            ];
            $[14] = notifications;
            $[15] = router;
            $[16] = t7;
        } else {
            t7 = $[16];
        }
        notificationMenuItems = t7;
        async function handleLogout() {
            ;
            try {
                await logout();
                router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN);
            } catch (t8) {
                const error = t8;
                console.error("Logout failed:", error);
            }
        }
        $[1] = logout;
        $[2] = notifications;
        $[3] = router;
        $[4] = notificationMenuItems;
        $[5] = userMenuItems;
    } else {
        notificationMenuItems = $[4];
        userMenuItems = $[5];
    }
    let t1;
    if ($[22] !== setSearchQuery) {
        t1 = ({
            "AppHeader[handleSearch]": (value)=>{
                setSearchQuery(value);
                console.log("Searching for:", value);
            }
        })["AppHeader[handleSearch]"];
        $[22] = setSearchQuery;
        $[23] = t1;
    } else {
        t1 = $[23];
    }
    const handleSearch = t1;
    const t2 = theme === "light" ? "#fff" : "#1f1f1f";
    const t3 = `1px solid ${theme === "light" ? "#f0f0f0" : "#303030"}`;
    let t4;
    if ($[24] !== t2 || $[25] !== t3) {
        t4 = {
            padding: 0,
            background: t2,
            borderBottom: t3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        };
        $[24] = t2;
        $[25] = t3;
        $[26] = t4;
    } else {
        t4 = $[26];
    }
    let t5;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            display: "flex",
            alignItems: "center",
            flex: 1
        };
        $[27] = t5;
    } else {
        t5 = $[27];
    }
    let t6;
    if ($[28] !== collapsed) {
        t6 = collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuUnfoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuUnfoldOutlined$3e$__["MenuUnfoldOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 219,
            columnNumber: 22
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MenuFoldOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuFoldOutlined$3e$__["MenuFoldOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 219,
            columnNumber: 47
        }, this);
        $[28] = collapsed;
        $[29] = t6;
    } else {
        t6 = $[29];
    }
    let t7;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            fontSize: "16px",
            width: 64,
            height: 64
        };
        $[30] = t7;
    } else {
        t7 = $[30];
    }
    let t8;
    if ($[31] !== onToggle || $[32] !== t6) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
            type: "text",
            icon: t6,
            onClick: onToggle,
            style: t7
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 238,
            columnNumber: 10
        }, this);
        $[31] = onToggle;
        $[32] = t6;
        $[33] = t8;
    } else {
        t8 = $[33];
    }
    let t9;
    if ($[34] !== breadcrumbs) {
        t9 = breadcrumbs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__["Breadcrumb"], {
            style: {
                margin: "0 16px"
            },
            children: breadcrumbs.map(_AppHeaderBreadcrumbsMap)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 247,
            columnNumber: 36
        }, this);
        $[34] = breadcrumbs;
        $[35] = t9;
    } else {
        t9 = $[35];
    }
    let t10;
    if ($[36] !== t8 || $[37] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t5,
            children: [
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[36] = t8;
        $[37] = t9;
        $[38] = t10;
    } else {
        t10 = $[38];
    }
    let t11;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            marginRight: 24
        };
        $[39] = t11;
    } else {
        t11 = $[39];
    }
    let t12;
    if ($[40] !== handleSearch || $[41] !== searchVisible || $[42] !== setSearchVisible) {
        t12 = searchVisible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Search, {
            placeholder: "Search...",
            style: {
                width: 200
            },
            onSearch: handleSearch,
            onBlur: {
                "AppHeader[<Search>.onBlur]": ()=>setSearchVisible(false)
            }["AppHeader[<Search>.onBlur]"],
            autoFocus: true
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 275,
            columnNumber: 27
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
            type: "text",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__["SearchOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 279,
                columnNumber: 86
            }, void 0),
            onClick: {
                "AppHeader[<Button>.onClick]": ()=>setSearchVisible(true)
            }["AppHeader[<Button>.onClick]"]
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 279,
            columnNumber: 60
        }, this);
        $[40] = handleSearch;
        $[41] = searchVisible;
        $[42] = setSearchVisible;
        $[43] = t12;
    } else {
        t12 = $[43];
    }
    let t13;
    if ($[44] !== notificationMenuItems) {
        t13 = {
            items: notificationMenuItems
        };
        $[44] = notificationMenuItems;
        $[45] = t13;
    } else {
        t13 = $[45];
    }
    let t14;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = [
            "click"
        ];
        $[46] = t14;
    } else {
        t14 = $[46];
    }
    let t15;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BellOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellOutlined$3e$__["BellOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 308,
            columnNumber: 11
        }, this);
        $[47] = t15;
    } else {
        t15 = $[47];
    }
    let t16;
    if ($[48] !== unreadCount) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
            type: "text",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                count: unreadCount,
                size: "small",
                children: t15
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 315,
                columnNumber: 37
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 315,
            columnNumber: 11
        }, this);
        $[48] = unreadCount;
        $[49] = t16;
    } else {
        t16 = $[49];
    }
    let t17;
    if ($[50] !== t13 || $[51] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
            menu: t13,
            placement: "bottomRight",
            trigger: t14,
            children: t16
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 323,
            columnNumber: 11
        }, this);
        $[50] = t13;
        $[51] = t16;
        $[52] = t17;
    } else {
        t17 = $[52];
    }
    let t18;
    if ($[53] !== userMenuItems) {
        t18 = {
            items: userMenuItems
        };
        $[53] = userMenuItems;
        $[54] = t18;
    } else {
        t18 = $[54];
    }
    let t19;
    let t20;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = [
            "click"
        ];
        t20 = {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "0 8px"
        };
        $[55] = t19;
        $[56] = t20;
    } else {
        t19 = $[55];
        t20 = $[56];
    }
    let t21;
    let t22;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 359,
            columnNumber: 11
        }, this);
        t22 = {
            marginRight: 8
        };
        $[57] = t21;
        $[58] = t22;
    } else {
        t21 = $[57];
        t22 = $[58];
    }
    let t23;
    if ($[59] !== user) {
        t23 = user ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(user.firstName, user.lastName) : "U";
        $[59] = user;
        $[60] = t23;
    } else {
        t23 = $[60];
    }
    let t24;
    if ($[61] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
            size: "small",
            icon: t21,
            style: t22,
            children: t23
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 379,
            columnNumber: 11
        }, this);
        $[61] = t23;
        $[62] = t24;
    } else {
        t24 = $[62];
    }
    let t25;
    if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = {
            fontSize: "11px"
        };
        $[63] = t25;
    } else {
        t25 = $[63];
    }
    const t26 = user?.role || "Unknown";
    let t27;
    if ($[64] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
            direction: "vertical",
            size: 0,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                type: "secondary",
                style: t25,
                children: t26
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 397,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 397,
            columnNumber: 11
        }, this);
        $[64] = t26;
        $[65] = t27;
    } else {
        t27 = $[65];
    }
    let t28;
    if ($[66] !== t24 || $[67] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t20,
            children: [
                t24,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 405,
            columnNumber: 11
        }, this);
        $[66] = t24;
        $[67] = t27;
        $[68] = t28;
    } else {
        t28 = $[68];
    }
    let t29;
    if ($[69] !== t18 || $[70] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
            menu: t18,
            placement: "bottomRight",
            trigger: t19,
            children: t28
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 414,
            columnNumber: 11
        }, this);
        $[69] = t18;
        $[70] = t28;
        $[71] = t29;
    } else {
        t29 = $[71];
    }
    let t30;
    if ($[72] !== t12 || $[73] !== t17 || $[74] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
            size: "middle",
            style: t11,
            children: [
                t12,
                t17,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 423,
            columnNumber: 11
        }, this);
        $[72] = t12;
        $[73] = t17;
        $[74] = t29;
        $[75] = t30;
    } else {
        t30 = $[75];
    }
    let t31;
    if ($[76] !== t10 || $[77] !== t30 || $[78] !== t4) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Header, {
            style: t4,
            children: [
                t10,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 433,
            columnNumber: 11
        }, this);
        $[76] = t10;
        $[77] = t30;
        $[78] = t4;
        $[79] = t31;
    } else {
        t31 = $[79];
    }
    return t31;
}
_s(AppHeader, "czXa0IYHsXQniwedFkJxy+ViLTE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"]
    ];
});
_c = AppHeader;
function _AppHeaderBreadcrumbsMap(item, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__["Breadcrumb"].Item, {
        href: item.path,
        children: item.title
    }, index, false, {
        fileName: "[project]/src/components/layout/AppHeader.tsx",
        lineNumber: 444,
        columnNumber: 10
    }, this);
}
function _AppHeaderAnonymous(notification) {
    return {
        key: notification.id,
        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "notification-item",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "notification-title",
                    children: notification.title
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppHeader.tsx",
                    lineNumber: 449,
                    columnNumber: 47
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "notification-message",
                    children: notification.message
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppHeader.tsx",
                    lineNumber: 449,
                    columnNumber: 109
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "notification-time",
                    children: notification.timestamp.toLocaleTimeString()
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppHeader.tsx",
                    lineNumber: 449,
                    columnNumber: 175
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppHeader.tsx",
            lineNumber: 449,
            columnNumber: 12
        }, this)
    };
}
var _c;
__turbopack_context__.k.register(_c, "AppHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AppSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/layout/index.js [app-client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$menu$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/menu/index.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DashboardOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DashboardOutlined.js [app-client] (ecmascript) <export default as DashboardOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BankOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BankOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/BankOutlined.js [app-client] (ecmascript) <export default as BankOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CarOutlined.js [app-client] (ecmascript) <export default as CarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ScheduleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScheduleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ScheduleOutlined.js [app-client] (ecmascript) <export default as ScheduleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$LinkOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/LinkOutlined.js [app-client] (ecmascript) <export default as LinkOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HeartOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/HeartOutlined.js [app-client] (ecmascript) <export default as HeartOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const { Sider } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"];
const { Title } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
// Menu items configuration with role-based access
const menuItems = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DashboardOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardOutlined$3e$__["DashboardOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 26,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD
    },
    {
        key: 'schools',
        label: 'Schools',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BankOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BankOutlined$3e$__["BankOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 31,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].SCHOOLS,
        roles: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].ADMIN,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].TEACHER
        ]
    },
    {
        key: 'vehicles',
        label: 'Vehicles',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 37,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].VEHICLES,
        roles: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].ADMIN,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].TEACHER
        ]
    },
    {
        key: 'users',
        label: 'Users',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 43,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].USERS,
        roles: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].ADMIN,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].TEACHER
        ]
    },
    // {
    //   key: 'students',
    //   label: 'Students',
    //   icon: <TeamOutlined />,
    //   path: ROUTES.STUDENTS,
    //   roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
    // },
    // {
    //   key: 'drivers',
    //   label: 'Drivers',
    //   icon: <SafetyCertificateOutlined />,
    //   path: ROUTES.DRIVERS,
    //   roles: [USER_ROLES.ADMIN],
    // },
    {
        key: 'routes',
        label: 'Routes',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 64,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].ROUTES
    },
    {
        key: 'trips',
        label: 'Trips',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ScheduleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScheduleOutlined$3e$__["ScheduleOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 69,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].TRIPS
    },
    {
        key: 'my-trips',
        label: 'My Trips',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ScheduleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScheduleOutlined$3e$__["ScheduleOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 74,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: '/my-trips',
        roles: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].DRIVER
        ]
    },
    {
        key: 'my-children',
        label: 'My Children',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HeartOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartOutlined$3e$__["HeartOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 80,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: '/my-children',
        roles: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].PARENT
        ]
    },
    {
        key: 'assignments',
        label: 'Assignments',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$LinkOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinkOutlined$3e$__["LinkOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 86,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].ASSIGNMENTS,
        roles: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].ADMIN,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].TEACHER
        ]
    }
];
function AppSidebar(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(36);
    if ($[0] !== "dbe78d397fdf8e04bea2484e9236ce5b12bd32994d8dbd33c5eeaab009017a93") {
        for(let $i = 0; $i < 36; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "dbe78d397fdf8e04bea2484e9236ce5b12bd32994d8dbd33c5eeaab009017a93";
    }
    const { collapsed } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { user, hasAnyRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    let t1;
    if ($[1] !== hasAnyRole || $[2] !== router || $[3] !== user) {
        let t2;
        if ($[5] !== hasAnyRole || $[6] !== user) {
            t2 = ({
                "AppSidebar[menuItems.filter()]": (item)=>{
                    if (!item.roles || item.roles.length === 0) {
                        return true;
                    }
                    return user && hasAnyRole(item.roles);
                }
            })["AppSidebar[menuItems.filter()]"];
            $[5] = hasAnyRole;
            $[6] = user;
            $[7] = t2;
        } else {
            t2 = $[7];
        }
        const filteredMenuItems = menuItems.filter(t2);
        let t3;
        if ($[8] !== router) {
            t3 = ({
                "AppSidebar[filteredMenuItems.map()]": (item_0)=>({
                        key: item_0.key,
                        icon: item_0.icon,
                        label: item_0.label,
                        onClick: ()=>{
                            if (item_0.path) {
                                router.push(item_0.path);
                            }
                        }
                    })
            })["AppSidebar[filteredMenuItems.map()]"];
            $[8] = router;
            $[9] = t3;
        } else {
            t3 = $[9];
        }
        t1 = filteredMenuItems.map(t3);
        $[1] = hasAnyRole;
        $[2] = router;
        $[3] = user;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const antMenuItems = t1;
    let t2;
    if ($[10] !== pathname) {
        t2 = ({
            "AppSidebar[getSelectedKey]": ()=>{
                const currentItem = menuItems.find({
                    "AppSidebar[getSelectedKey > menuItems.find()]": (item_1)=>item_1.path === pathname
                }["AppSidebar[getSelectedKey > menuItems.find()]"]);
                return currentItem ? [
                    currentItem.key
                ] : [
                    "dashboard"
                ];
            }
        })["AppSidebar[getSelectedKey]"];
        $[10] = pathname;
        $[11] = t2;
    } else {
        t2 = $[11];
    }
    const getSelectedKey = t2;
    let t3;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0
        };
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    const t4 = collapsed ? "center" : "flex-start";
    let t5;
    if ($[13] !== t4) {
        t5 = {
            height: 64,
            margin: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: t4
        };
        $[13] = t4;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    let t6;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {
            style: {
                fontSize: "24px",
                color: "#1890ff"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 216,
            columnNumber: 10
        }, this);
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    let t7;
    if ($[16] !== collapsed) {
        t7 = !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
            level: 4,
            style: {
                color: "#ffffff",
                margin: 0,
                fontSize: "16px"
            },
            children: "SKS Transport"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 226,
            columnNumber: 24
        }, this);
        $[16] = collapsed;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    let t8;
    if ($[18] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
            children: [
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 238,
            columnNumber: 10
        }, this);
        $[18] = t7;
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    let t9;
    if ($[20] !== t5 || $[21] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t5,
            children: t8
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 246,
            columnNumber: 10
        }, this);
        $[20] = t5;
        $[21] = t8;
        $[22] = t9;
    } else {
        t9 = $[22];
    }
    let t10;
    if ($[23] !== getSelectedKey) {
        t10 = getSelectedKey();
        $[23] = getSelectedKey;
        $[24] = t10;
    } else {
        t10 = $[24];
    }
    let t11;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            borderRight: 0
        };
        $[25] = t11;
    } else {
        t11 = $[25];
    }
    let t12;
    if ($[26] !== antMenuItems || $[27] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$menu$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
            theme: "dark",
            mode: "inline",
            selectedKeys: t10,
            items: antMenuItems,
            style: t11
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 272,
            columnNumber: 11
        }, this);
        $[26] = antMenuItems;
        $[27] = t10;
        $[28] = t12;
    } else {
        t12 = $[28];
    }
    let t13;
    if ($[29] !== collapsed) {
        t13 = !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.45)",
                fontSize: "12px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "SKS Transportation"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppSidebar.tsx",
                    lineNumber: 289,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "Management System"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppSidebar.tsx",
                    lineNumber: 289,
                    columnNumber: 37
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 4
                    },
                    children: "v1.0.0"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppSidebar.tsx",
                    lineNumber: 289,
                    columnNumber: 65
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 281,
            columnNumber: 25
        }, this);
        $[29] = collapsed;
        $[30] = t13;
    } else {
        t13 = $[30];
    }
    let t14;
    if ($[31] !== collapsed || $[32] !== t12 || $[33] !== t13 || $[34] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sider, {
            trigger: null,
            collapsible: true,
            collapsed: collapsed,
            theme: "dark",
            width: 256,
            style: t3,
            children: [
                t9,
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppSidebar.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[31] = collapsed;
        $[32] = t12;
        $[33] = t13;
        $[34] = t9;
        $[35] = t14;
    } else {
        t14 = $[35];
    }
    return t14;
}
_s(AppSidebar, "NA5aShT/C0iJeh/ANU49PjdmQSE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AppSidebar;
var _c;
__turbopack_context__.k.register(_c, "AppSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/AppLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/layout/index.js [app-client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-client] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/appStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppSidebar.tsx [app-client] (ecmascript)");
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
const { Content } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"];
function AppLayout(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "602cdc469510eef5329762af7218a4f97199910a0c91d7297bc026a9ba3ff22b") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "602cdc469510eef5329762af7218a4f97199910a0c91d7297bc026a9ba3ff22b";
    }
    const { children } = t0;
    const { isLoading, initializeAuth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { sidebarCollapsed, toggleSidebar, theme, setTheme, setIsMobile, globalLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    let t2;
    if ($[1] !== setIsMobile) {
        t1 = ({
            "AppLayout[useEffect()]": ()=>{
                const handleResize = {
                    "AppLayout[useEffect() > handleResize]": ()=>{
                        const isMobile = window.innerWidth < 768;
                        setIsMobile(isMobile);
                    }
                }["AppLayout[useEffect() > handleResize]"];
                handleResize();
                window.addEventListener("resize", handleResize);
                return ()=>window.removeEventListener("resize", handleResize);
            }
        })["AppLayout[useEffect()]"];
        t2 = [
            setIsMobile
        ];
        $[1] = setIsMobile;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    let t4;
    if ($[4] !== initializeAuth) {
        t3 = ({
            "AppLayout[useEffect()]": ()=>{
                initializeAuth();
                setMounted(true);
            }
        })["AppLayout[useEffect()]"];
        t4 = [
            initializeAuth
        ];
        $[4] = initializeAuth;
        $[5] = t3;
        $[6] = t4;
    } else {
        t3 = $[5];
        t4 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[7] !== setTheme || $[8] !== theme) {
        t5 = ({
            "AppLayout[handleThemeChange]": ()=>{
                const newTheme = theme === "light" ? "dark" : "light";
                setTheme(newTheme);
            }
        })["AppLayout[handleThemeChange]"];
        $[7] = setTheme;
        $[8] = theme;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    const handleThemeChange = t5;
    if (!mounted || isLoading) {
        let t6;
        if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                    size: "large"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/AppLayout.tsx",
                    lineNumber: 106,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppLayout.tsx",
                lineNumber: 101,
                columnNumber: 12
            }, this);
            $[10] = t6;
        } else {
            t6 = $[10];
        }
        return t6;
    }
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            minHeight: "100vh"
        };
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== sidebarCollapsed || $[13] !== theme) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            collapsed: sidebarCollapsed,
            theme: theme
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppLayout.tsx",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        $[12] = sidebarCollapsed;
        $[13] = theme;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    const t8 = sidebarCollapsed ? 80 : 256;
    let t9;
    if ($[15] !== t8) {
        t9 = {
            marginLeft: t8,
            transition: "margin-left 0.2s"
        };
        $[15] = t8;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== handleThemeChange || $[18] !== sidebarCollapsed || $[19] !== theme || $[20] !== toggleSidebar) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            collapsed: sidebarCollapsed,
            onToggle: toggleSidebar,
            theme: theme,
            onThemeChange: handleThemeChange
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppLayout.tsx",
            lineNumber: 145,
            columnNumber: 11
        }, this);
        $[17] = handleThemeChange;
        $[18] = sidebarCollapsed;
        $[19] = theme;
        $[20] = toggleSidebar;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            margin: "24px 24px 0",
            overflow: "initial",
            minHeight: "calc(100vh - 64px - 24px)"
        };
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    const t12 = theme === "light" ? "#fff" : "#1f1f1f";
    let t13;
    if ($[23] !== t12) {
        t13 = {
            padding: 24,
            minHeight: 360,
            background: t12,
            borderRadius: 8
        };
        $[23] = t12;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== children || $[26] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t13,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppLayout.tsx",
            lineNumber: 181,
            columnNumber: 11
        }, this);
        $[25] = children;
        $[26] = t13;
        $[27] = t14;
    } else {
        t14 = $[27];
    }
    let t15;
    if ($[28] !== globalLoading || $[29] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Content, {
            style: t11,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                spinning: globalLoading,
                children: t14
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppLayout.tsx",
                lineNumber: 190,
                columnNumber: 32
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/AppLayout.tsx",
            lineNumber: 190,
            columnNumber: 11
        }, this);
        $[28] = globalLoading;
        $[29] = t14;
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    let t16;
    if ($[31] !== t10 || $[32] !== t15 || $[33] !== t9) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
            style: t9,
            children: [
                t10,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppLayout.tsx",
            lineNumber: 199,
            columnNumber: 11
        }, this);
        $[31] = t10;
        $[32] = t15;
        $[33] = t9;
        $[34] = t16;
    } else {
        t16 = $[34];
    }
    let t17;
    if ($[35] !== t16 || $[36] !== t7) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$layout$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
            style: t6,
            children: [
                t7,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/AppLayout.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        $[35] = t16;
        $[36] = t7;
        $[37] = t17;
    } else {
        t17 = $[37];
    }
    return t17;
}
_s(AppLayout, "CYWfKhlMJ15Ki6+MKYFFy2OgD2g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"]
    ];
});
_c = AppLayout;
var _c;
__turbopack_context__.k.register(_c, "AppLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/assignments/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssignmentsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assignments$2f$AssignmentList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/assignments/AssignmentList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assignments$2f$AssignmentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/assignments/AssignmentForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppLayout.tsx [app-client] (ecmascript)");
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
function AssignmentsContent() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(26);
    if ($[0] !== "8b30fe4a30c6278c1ca3615ed6e02c1828eae1fc4c0715c112abfc1d638c9d00") {
        for(let $i = 0; $i < 26; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8b30fe4a30c6278c1ca3615ed6e02c1828eae1fc4c0715c112abfc1d638c9d00";
    }
    const [formVisible, setFormVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewModalVisible, setViewModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transferModalVisible, setTransferModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAssignment, setSelectedAssignment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "AssignmentsContent[handleCreate]": ()=>{
                setSelectedAssignment(null);
                setFormVisible(true);
            }
        })["AssignmentsContent[handleCreate]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const handleCreate = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "AssignmentsContent[handleEdit]": (assignment)=>{
                setSelectedAssignment(assignment);
                setFormVisible(true);
            }
        })["AssignmentsContent[handleEdit]"];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const handleEdit = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "AssignmentsContent[handleView]": (assignment_0)=>{
                setSelectedAssignment(assignment_0);
                setViewModalVisible(true);
            }
        })["AssignmentsContent[handleView]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const handleView = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "AssignmentsContent[handleTransfer]": (assignment_1)=>{
                setSelectedAssignment(assignment_1);
                setTransferModalVisible(true);
            }
        })["AssignmentsContent[handleTransfer]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const handleTransfer = t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "AssignmentsContent[handleFormSuccess]": ()=>{
                setFormVisible(false);
                setSelectedAssignment(null);
            }
        })["AssignmentsContent[handleFormSuccess]"];
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const handleFormSuccess = t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "AssignmentsContent[handleFormCancel]": ()=>{
                setFormVisible(false);
                setSelectedAssignment(null);
            }
        })["AssignmentsContent[handleFormCancel]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const handleFormCancel = t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "AssignmentsContent[handleCloseView]": ()=>{
                setViewModalVisible(false);
                setSelectedAssignment(null);
            }
        })["AssignmentsContent[handleCloseView]"];
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const handleCloseView = t6;
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "AssignmentsContent[handleCloseTransfer]": ()=>{
                setTransferModalVisible(false);
                setSelectedAssignment(null);
            }
        })["AssignmentsContent[handleCloseTransfer]"];
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    const handleCloseTransfer = t7;
    let t8;
    if ($[9] !== formVisible || $[10] !== selectedAssignment) {
        t8 = !formVisible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assignments$2f$AssignmentList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onCreate: handleCreate,
            onEdit: handleEdit,
            onView: handleView,
            onTransfer: handleTransfer
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
            lineNumber: 129,
            columnNumber: 25
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assignments$2f$AssignmentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            assignment: selectedAssignment || undefined,
            onSuccess: handleFormSuccess,
            onCancel: handleFormCancel
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
            lineNumber: 129,
            columnNumber: 138
        }, this);
        $[9] = formVisible;
        $[10] = selectedAssignment;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== selectedAssignment) {
        t9 = selectedAssignment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "16px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "16px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Student:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                            lineNumber: 142,
                            columnNumber: 10
                        }, this),
                        " ",
                        selectedAssignment.student?.firstName,
                        " ",
                        selectedAssignment.student?.lastName
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                    lineNumber: 140,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "16px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Route:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                            lineNumber: 144,
                            columnNumber: 10
                        }, this),
                        " ",
                        selectedAssignment.route?.routeName
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                    lineNumber: 142,
                    columnNumber: 120
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "16px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Stop:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                            lineNumber: 146,
                            columnNumber: 10
                        }, this),
                        " ",
                        selectedAssignment.stop?.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                    lineNumber: 144,
                    columnNumber: 77
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "16px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Status:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                            lineNumber: 148,
                            columnNumber: 10
                        }, this),
                        " ",
                        selectedAssignment.status
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                    lineNumber: 146,
                    columnNumber: 70
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "16px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Assignment Date:"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                            lineNumber: 150,
                            columnNumber: 10
                        }, this),
                        " ",
                        selectedAssignment.assignmentDate
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                    lineNumber: 148,
                    columnNumber: 68
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
            lineNumber: 138,
            columnNumber: 32
        }, this);
        $[12] = selectedAssignment;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t9 || $[15] !== viewModalVisible) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
            title: "Assignment Details",
            open: viewModalVisible,
            onCancel: handleCloseView,
            footer: null,
            width: 600,
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
            lineNumber: 158,
            columnNumber: 11
        }, this);
        $[14] = t9;
        $[15] = viewModalVisible;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== selectedAssignment) {
        t11 = selectedAssignment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "16px",
                textAlign: "center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Transfer functionality for ",
                    selectedAssignment.student?.firstName,
                    " ",
                    selectedAssignment.student?.lastName,
                    " will be implemented in the next phase."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                lineNumber: 170,
                columnNumber: 8
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
            lineNumber: 167,
            columnNumber: 33
        }, this);
        $[17] = selectedAssignment;
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] !== t11 || $[20] !== transferModalVisible) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
            title: "Transfer Student",
            open: transferModalVisible,
            onCancel: handleCloseTransfer,
            footer: null,
            width: 800,
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
            lineNumber: 178,
            columnNumber: 11
        }, this);
        $[19] = t11;
        $[20] = transferModalVisible;
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] !== t10 || $[23] !== t12 || $[24] !== t8) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t8,
                t10,
                t12
            ]
        }, void 0, true);
        $[22] = t10;
        $[23] = t12;
        $[24] = t8;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    return t13;
}
_s(AssignmentsContent, "o1R7hwLtTbvmPT3ysjbeQfgwprM=");
_c = AssignmentsContent;
function AssignmentsPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "8b30fe4a30c6278c1ca3615ed6e02c1828eae1fc4c0715c112abfc1d638c9d00") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8b30fe4a30c6278c1ca3615ed6e02c1828eae1fc4c0715c112abfc1d638c9d00";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssignmentsContent, {}, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                    lineNumber: 207,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
                lineNumber: 207,
                columnNumber: 26
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/assignments/page.tsx",
            lineNumber: 207,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = AssignmentsPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "AssignmentsContent");
__turbopack_context__.k.register(_c1, "AssignmentsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_50fe0d11._.js.map