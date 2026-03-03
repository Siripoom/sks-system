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
"[project]/src/components/routes/RouteList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RouteList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/popconfirm/index.js [app-client] (ecmascript) <export default as Popconfirm>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tooltip/index.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/dropdown/index.js [app-client] (ecmascript) <export default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$upload$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/upload/index.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$switch$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/switch/index.js [app-client] (ecmascript) <export default as Switch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlusOutlined.js [app-client] (ecmascript) <export default as PlusOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EditOutlined.js [app-client] (ecmascript) <export default as EditOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DeleteOutlined.js [app-client] (ecmascript) <export default as DeleteOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SearchOutlined.js [app-client] (ecmascript) <export default as SearchOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BankOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BankOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/BankOutlined.js [app-client] (ecmascript) <export default as BankOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CarOutlined.js [app-client] (ecmascript) <export default as CarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MoreOutlined.js [app-client] (ecmascript) <export default as MoreOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$GroupOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/GroupOutlined.js [app-client] (ecmascript) <export default as GroupOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UploadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UploadOutlined.js [app-client] (ecmascript) <export default as UploadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DownloadOutlined.js [app-client] (ecmascript) <export default as DownloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CopyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CopyOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CopyOutlined.js [app-client] (ecmascript) <export default as CopyOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ThunderboltOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThunderboltOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ThunderboltOutlined.js [app-client] (ecmascript) <export default as ThunderboltOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/TeamOutlined.js [app-client] (ecmascript) <export default as TeamOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AimOutlined.js [app-client] (ecmascript) <export default as AimOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSchools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/format.ts [app-client] (ecmascript)");
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
;
;
const { Title } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { Search } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
function RouteList(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(131);
    if ($[0] !== "2f73cc916be16b4f0bcafc1cf83c7ca03f4c607bac969c91faaf792932379b4b") {
        for(let $i = 0; $i < 131; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2f73cc916be16b4f0bcafc1cf83c7ca03f4c607bac969c91faaf792932379b4b";
    }
    const { onAdd, onEdit, onViewDetails, onManageStops, onManageAssignments } = t0;
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [schoolFilter, setSchoolFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [selectedRowKeys, setSelectedRowKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            current: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].DEFAULT_PAGE,
            pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].DEFAULT_PAGE_SIZE
        };
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    const t3 = searchQuery || undefined;
    const t4 = schoolFilter || undefined;
    let t5;
    if ($[3] !== pagination.current || $[4] !== pagination.pageSize || $[5] !== statusFilter || $[6] !== t3 || $[7] !== t4) {
        t5 = {
            page: pagination.current,
            limit: pagination.pageSize,
            search: t3,
            schoolId: t4,
            isActive: statusFilter
        };
        $[3] = pagination.current;
        $[4] = pagination.pageSize;
        $[5] = statusFilter;
        $[6] = t3;
        $[7] = t4;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    const { data: routesData, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"])(t5);
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            limit: 100
        };
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    const { data: schoolsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"])(t6);
    const deleteRouteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteRoute"])();
    const toggleStatusMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleRouteStatus"])();
    const bulkUpdateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkUpdateRoutes"])();
    const importMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImportRoutes"])();
    const exportMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExportRoutes"])();
    const duplicateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDuplicateRoute"])();
    const optimizeMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOptimizeRoute"])();
    let t7;
    if ($[10] !== deleteRouteMutation) {
        t7 = ({
            "RouteList[handleDelete]": async (id, name)=>{
                ;
                try {
                    await deleteRouteMutation.mutateAsync(id);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Route "${name}" deleted successfully`);
                } catch (t8) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to delete route");
                }
            }
        })["RouteList[handleDelete]"];
        $[10] = deleteRouteMutation;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    const handleDelete = t7;
    let t8;
    if ($[12] !== toggleStatusMutation) {
        t8 = ({
            "RouteList[handleToggleStatus]": async (id_0, name_0)=>{
                ;
                try {
                    await toggleStatusMutation.mutateAsync(id_0);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Route "${name_0}" status updated successfully`);
                } catch (t9) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to update route status");
                }
            }
        })["RouteList[handleToggleStatus]"];
        $[12] = toggleStatusMutation;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    const handleToggleStatus = t8;
    let t9;
    if ($[14] !== bulkUpdateMutation || $[15] !== selectedRowKeys) {
        t9 = ({
            "RouteList[handleBulkUpdate]": async (updates)=>{
                if (selectedRowKeys.length === 0) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning("Please select routes to update");
                    return;
                }
                ;
                try {
                    await bulkUpdateMutation.mutateAsync({
                        routeIds: selectedRowKeys,
                        updates
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Updated ${selectedRowKeys.length} routes successfully`);
                    setSelectedRowKeys([]);
                } catch (t10) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to update routes");
                }
            }
        })["RouteList[handleBulkUpdate]"];
        $[14] = bulkUpdateMutation;
        $[15] = selectedRowKeys;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    const handleBulkUpdate = t9;
    let t10;
    if ($[17] !== importMutation || $[18] !== schoolFilter) {
        t10 = ({
            "RouteList[handleImport]": async (file)=>{
                if (!schoolFilter) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Please select a school filter before importing");
                    return;
                }
                ;
                try {
                    await importMutation.mutateAsync({
                        file,
                        schoolId: schoolFilter
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Routes imported successfully");
                } catch (t11) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to import routes");
                }
            }
        })["RouteList[handleImport]"];
        $[17] = importMutation;
        $[18] = schoolFilter;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    const handleImport = t10;
    let t11;
    if ($[20] !== exportMutation || $[21] !== schoolFilter || $[22] !== searchQuery || $[23] !== statusFilter) {
        t11 = ({
            "RouteList[handleExport]": async ()=>{
                ;
                try {
                    const blob = await exportMutation.mutateAsync({
                        search: searchQuery,
                        schoolId: schoolFilter,
                        isActive: statusFilter
                    });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `routes-${new Date().toISOString().split("T")[0]}.csv`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Routes exported successfully");
                } catch (t12) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to export routes");
                }
            }
        })["RouteList[handleExport]"];
        $[20] = exportMutation;
        $[21] = schoolFilter;
        $[22] = searchQuery;
        $[23] = statusFilter;
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    const handleExport = t11;
    let t12;
    if ($[25] !== duplicateMutation) {
        t12 = ({
            "RouteList[handleDuplicate]": async (routeId, routeName)=>{
                const newName = `${routeName} (Copy)`;
                ;
                try {
                    await duplicateMutation.mutateAsync({
                        routeId,
                        newName
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Route duplicated successfully");
                } catch (t13) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to duplicate route");
                }
            }
        })["RouteList[handleDuplicate]"];
        $[25] = duplicateMutation;
        $[26] = t12;
    } else {
        t12 = $[26];
    }
    const handleDuplicate = t12;
    let t13;
    if ($[27] !== optimizeMutation) {
        t13 = ({
            "RouteList[handleOptimize]": async (routeId_0, routeName_0)=>{
                ;
                try {
                    await optimizeMutation.mutateAsync(routeId_0);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Route "${routeName_0}" optimized successfully`);
                } catch (t14) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to optimize route");
                }
            }
        })["RouteList[handleOptimize]"];
        $[27] = optimizeMutation;
        $[28] = t13;
    } else {
        t13 = $[28];
    }
    const handleOptimize = t13;
    let t14;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "RouteList[handleTableChange]": (paginationConfig)=>{
                setPagination({
                    current: paginationConfig.current,
                    pageSize: paginationConfig.pageSize
                });
            }
        })["RouteList[handleTableChange]"];
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    const handleTableChange = t14;
    let t15;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = ({
            "RouteList[handleSearch]": (value)=>{
                setSearchQuery(value);
                setPagination(_RouteListHandleSearchSetPagination);
            }
        })["RouteList[handleSearch]"];
        $[30] = t15;
    } else {
        t15 = $[30];
    }
    const handleSearch = t15;
    const getRouteStatusColor = _RouteListGetRouteStatusColor;
    let t16;
    if ($[31] !== handleDuplicate || $[32] !== handleOptimize || $[33] !== onEdit || $[34] !== onManageAssignments || $[35] !== onManageStops || $[36] !== onViewDetails) {
        t16 = ({
            "RouteList[getRouteActions]": (route)=>[
                    {
                        key: "view",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 312,
                            columnNumber: 15
                        }, this),
                        label: "View Details",
                        onClick: ()=>onViewDetails(route)
                    },
                    {
                        key: "edit",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__["EditOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 317,
                            columnNumber: 15
                        }, this),
                        label: "Edit Route",
                        onClick: ()=>onEdit(route)
                    },
                    {
                        type: "divider"
                    },
                    {
                        key: "stops",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__["AimOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 324,
                            columnNumber: 15
                        }, this),
                        label: "Manage Stops",
                        onClick: ()=>onManageStops(route)
                    },
                    {
                        key: "assignments",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__["TeamOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 329,
                            columnNumber: 15
                        }, this),
                        label: "Student Assignments",
                        onClick: ()=>onManageAssignments(route)
                    },
                    {
                        type: "divider"
                    },
                    {
                        key: "duplicate",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CopyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CopyOutlined$3e$__["CopyOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 336,
                            columnNumber: 15
                        }, this),
                        label: "Duplicate Route",
                        onClick: ()=>handleDuplicate(route.id, route.routeName)
                    },
                    {
                        key: "optimize",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ThunderboltOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThunderboltOutlined$3e$__["ThunderboltOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 341,
                            columnNumber: 15
                        }, this),
                        label: "Optimize Route",
                        onClick: ()=>handleOptimize(route.id, route.routeName),
                        disabled: !route.isActive
                    }
                ]
        })["RouteList[getRouteActions]"];
        $[31] = handleDuplicate;
        $[32] = handleOptimize;
        $[33] = onEdit;
        $[34] = onManageAssignments;
        $[35] = onManageStops;
        $[36] = onViewDetails;
        $[37] = t16;
    } else {
        t16 = $[37];
    }
    const getRouteActions = t16;
    let t17;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 360,
            columnNumber: 11
        }, this);
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    let t18;
    if ($[39] !== handleBulkUpdate) {
        t18 = {
            key: "activate",
            icon: t17,
            label: "Activate Routes",
            onClick: ()=>handleBulkUpdate({
                    isActive: true
                })
        };
        $[39] = handleBulkUpdate;
        $[40] = t18;
    } else {
        t18 = $[40];
    }
    let t19;
    if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 382,
            columnNumber: 11
        }, this);
        $[41] = t19;
    } else {
        t19 = $[41];
    }
    let t20;
    if ($[42] !== handleBulkUpdate) {
        t20 = {
            key: "deactivate",
            icon: t19,
            label: "Deactivate Routes",
            onClick: ()=>handleBulkUpdate({
                    isActive: false
                })
        };
        $[42] = handleBulkUpdate;
        $[43] = t20;
    } else {
        t20 = $[43];
    }
    let t21;
    if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = {
            type: "divider"
        };
        $[44] = t21;
    } else {
        t21 = $[44];
    }
    let t22;
    if ($[45] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = {
            key: "export-selected",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 415,
                columnNumber: 13
            }, this),
            label: "Export Selected",
            onClick: _temp
        };
        $[45] = t22;
    } else {
        t22 = $[45];
    }
    let t23;
    if ($[46] !== t18 || $[47] !== t20) {
        t23 = [
            t18,
            t20,
            t21,
            t22
        ];
        $[46] = t18;
        $[47] = t20;
        $[48] = t23;
    } else {
        t23 = $[48];
    }
    const bulkActions = t23;
    let t24;
    let t25;
    let t26;
    let t27;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = {
            title: "Route",
            key: "route",
            width: "25%",
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 40,
                                height: 40,
                                borderRadius: "8px",
                                backgroundColor: getRouteStatusColor(record.isActive) === "success" ? "#52c41a" : "#d9d9d9",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {
                                style: {
                                    fontSize: "18px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteList.tsx",
                                lineNumber: 455,
                                columnNumber: 12
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 446,
                            columnNumber: 10
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        marginBottom: "4px"
                                    },
                                    children: record.routeName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 457,
                                    columnNumber: 27
                                }, this),
                                record.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#666"
                                    },
                                    children: record.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 461,
                                    columnNumber: 61
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#999"
                                    },
                                    children: [
                                        "Created: ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(record.createdAt)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 464,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 457,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/routes/RouteList.tsx",
                    lineNumber: 442,
                    columnNumber: 30
                }, this)
        };
        t25 = {
            title: "School",
            key: "school",
            width: "15%",
            render: _temp2
        };
        t26 = {
            title: "Stops",
            key: "stops",
            width: "15%",
            align: "center",
            render: _temp3
        };
        t27 = {
            title: "Route Info",
            key: "routeInfo",
            width: "20%",
            render: _temp4
        };
        $[49] = t24;
        $[50] = t25;
        $[51] = t26;
        $[52] = t27;
    } else {
        t24 = $[49];
        t25 = $[50];
        t26 = $[51];
        t27 = $[52];
    }
    let t28;
    if ($[53] !== handleToggleStatus || $[54] !== toggleStatusMutation) {
        t28 = {
            title: "Status",
            dataIndex: "isActive",
            key: "status",
            width: "10%",
            align: "center",
            render: (isActive_0, record_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: "Click to toggle status",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$switch$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
                        checked: isActive_0,
                        size: "small",
                        loading: toggleStatusMutation.isPending,
                        onChange: {
                            "RouteList[<anonymous> > <Switch>.onChange]": ()=>handleToggleStatus(record_3.id, record_3.routeName)
                        }["RouteList[<anonymous> > <Switch>.onChange]"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 506,
                        columnNumber: 81
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/routes/RouteList.tsx",
                    lineNumber: 506,
                    columnNumber: 41
                }, this)
        };
        $[53] = handleToggleStatus;
        $[54] = toggleStatusMutation;
        $[55] = t28;
    } else {
        t28 = $[55];
    }
    let t29;
    if ($[56] !== deleteRouteMutation || $[57] !== getRouteActions || $[58] !== handleDelete || $[59] !== onEdit || $[60] !== onViewDetails) {
        t29 = {
            title: "Actions",
            key: "actions",
            width: "15%",
            align: "center",
            render: (__3, record_4)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: "View Details",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 523,
                                    columnNumber: 97
                                }, void 0),
                                onClick: {
                                    "RouteList[<anonymous> > <Button>.onClick]": ()=>onViewDetails(record_4)
                                }["RouteList[<anonymous> > <Button>.onClick]"],
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteList.tsx",
                                lineNumber: 523,
                                columnNumber: 71
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 523,
                            columnNumber: 41
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: "Edit Route",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__["EditOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 525,
                                    columnNumber: 138
                                }, void 0),
                                onClick: {
                                    "RouteList[<anonymous> > <Button>.onClick]": ()=>onEdit(record_4)
                                }["RouteList[<anonymous> > <Button>.onClick]"],
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteList.tsx",
                                lineNumber: 525,
                                columnNumber: 112
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 525,
                            columnNumber: 84
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                            menu: {
                                items: getRouteActions(record_4)
                            },
                            trigger: [
                                "click"
                            ],
                            placement: "bottomRight",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreOutlined$3e$__["MoreOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 529,
                                    columnNumber: 82
                                }, void 0),
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteList.tsx",
                                lineNumber: 529,
                                columnNumber: 56
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 527,
                            columnNumber: 84
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__["Popconfirm"], {
                            title: "Delete Route",
                            description: `Are you sure you want to delete "${record_4.routeName}"?`,
                            onConfirm: {
                                "RouteList[<anonymous> > <Popconfirm>.onConfirm]": ()=>handleDelete(record_4.id, record_4.routeName)
                            }["RouteList[<anonymous> > <Popconfirm>.onConfirm]"],
                            okText: "Yes",
                            cancelText: "No",
                            okButtonProps: {
                                danger: true
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                title: "Delete Route",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "text",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__["DeleteOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteList.tsx",
                                        lineNumber: 533,
                                        columnNumber: 68
                                    }, void 0),
                                    danger: true,
                                    size: "small",
                                    loading: deleteRouteMutation.isPending
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 533,
                                    columnNumber: 42
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteList.tsx",
                                lineNumber: 533,
                                columnNumber: 12
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 529,
                            columnNumber: 126
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/routes/RouteList.tsx",
                    lineNumber: 523,
                    columnNumber: 34
                }, this)
        };
        $[56] = deleteRouteMutation;
        $[57] = getRouteActions;
        $[58] = handleDelete;
        $[59] = onEdit;
        $[60] = onViewDetails;
        $[61] = t29;
    } else {
        t29 = $[61];
    }
    let t30;
    if ($[62] !== t28 || $[63] !== t29) {
        t30 = [
            t24,
            t25,
            t26,
            t27,
            t28,
            t29
        ];
        $[62] = t28;
        $[63] = t29;
        $[64] = t30;
    } else {
        t30 = $[64];
    }
    const columns = t30;
    let t31;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = (keys)=>setSelectedRowKeys(keys);
        $[65] = t31;
    } else {
        t31 = $[65];
    }
    let t32;
    if ($[66] !== selectedRowKeys) {
        t32 = {
            selectedRowKeys,
            onChange: t31
        };
        $[66] = selectedRowKeys;
        $[67] = t32;
    } else {
        t32 = $[67];
    }
    const rowSelection = t32;
    if (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to load routes");
    }
    let t33;
    if ($[68] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = {
            marginBottom: "16px"
        };
        $[68] = t33;
    } else {
        t33 = $[68];
    }
    let t34;
    if ($[69] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = [
            16,
            16
        ];
        $[69] = t34;
    } else {
        t34 = $[69];
    }
    let t35;
    if ($[70] === Symbol.for("react.memo_cache_sentinel")) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            sm: 16,
            md: 18,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                level: 4,
                style: {
                    margin: 0
                },
                children: "Route Management"
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 594,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 594,
            columnNumber: 11
        }, this);
        $[70] = t35;
    } else {
        t35 = $[70];
    }
    let t36;
    if ($[71] !== handleImport) {
        t36 = ({
            "RouteList[<Upload>.beforeUpload]": (file_0)=>{
                handleImport(file_0);
                return false;
            }
        })["RouteList[<Upload>.beforeUpload]"];
        $[71] = handleImport;
        $[72] = t36;
    } else {
        t36 = $[72];
    }
    let t37;
    if ($[73] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UploadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadOutlined$3e$__["UploadOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 616,
            columnNumber: 11
        }, this);
        $[73] = t37;
    } else {
        t37 = $[73];
    }
    let t38;
    if ($[74] !== importMutation.isPending) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
            icon: t37,
            loading: importMutation.isPending,
            children: "Import"
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 623,
            columnNumber: 11
        }, this);
        $[74] = importMutation.isPending;
        $[75] = t38;
    } else {
        t38 = $[75];
    }
    let t39;
    if ($[76] !== t36 || $[77] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$upload$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
            beforeUpload: t36,
            accept: ".csv,.xlsx",
            showUploadList: false,
            children: t38
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 631,
            columnNumber: 11
        }, this);
        $[76] = t36;
        $[77] = t38;
        $[78] = t39;
    } else {
        t39 = $[78];
    }
    let t40;
    if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 640,
            columnNumber: 11
        }, this);
        $[79] = t40;
    } else {
        t40 = $[79];
    }
    let t41;
    if ($[80] !== exportMutation.isPending || $[81] !== handleExport) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
            icon: t40,
            onClick: handleExport,
            loading: exportMutation.isPending,
            children: "Export"
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 647,
            columnNumber: 11
        }, this);
        $[80] = exportMutation.isPending;
        $[81] = handleExport;
        $[82] = t41;
    } else {
        t41 = $[82];
    }
    let t42;
    if ($[83] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__["PlusOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 656,
            columnNumber: 11
        }, this);
        $[83] = t42;
    } else {
        t42 = $[83];
    }
    let t43;
    if ($[84] !== onAdd) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
            type: "primary",
            icon: t42,
            onClick: onAdd,
            children: "Add Route"
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 663,
            columnNumber: 11
        }, this);
        $[84] = onAdd;
        $[85] = t43;
    } else {
        t43 = $[85];
    }
    let t44;
    if ($[86] !== t39 || $[87] !== t41 || $[88] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t33,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                justify: "space-between",
                align: "middle",
                gutter: t34,
                children: [
                    t35,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 8,
                        md: 6,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                t39,
                                t41,
                                t43
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 671,
                            columnNumber: 117
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 671,
                        columnNumber: 90
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 671,
                columnNumber: 28
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 671,
            columnNumber: 11
        }, this);
        $[86] = t39;
        $[87] = t41;
        $[88] = t43;
        $[89] = t44;
    } else {
        t44 = $[89];
    }
    let t45;
    if ($[90] === Symbol.for("react.memo_cache_sentinel")) {
        t45 = {
            marginBottom: "16px"
        };
        $[90] = t45;
    } else {
        t45 = $[90];
    }
    let t46;
    if ($[91] === Symbol.for("react.memo_cache_sentinel")) {
        t46 = [
            16,
            16
        ];
        $[91] = t46;
    } else {
        t46 = $[91];
    }
    let t47;
    if ($[92] === Symbol.for("react.memo_cache_sentinel")) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__["SearchOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 697,
            columnNumber: 11
        }, this);
        $[92] = t47;
    } else {
        t47 = $[92];
    }
    let t48;
    if ($[93] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            sm: 8,
            md: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Search, {
                placeholder: "Search routes...",
                allowClear: true,
                enterButton: t47,
                size: "large",
                onSearch: handleSearch,
                style: {
                    width: "100%"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 704,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 704,
            columnNumber: 11
        }, this);
        $[93] = t48;
    } else {
        t48 = $[93];
    }
    let t49;
    if ($[94] === Symbol.for("react.memo_cache_sentinel")) {
        t49 = {
            width: "100%"
        };
        $[94] = t49;
    } else {
        t49 = $[94];
    }
    const t50 = schoolFilter || undefined;
    let t51;
    if ($[95] !== schoolsData?.data?.items) {
        t51 = schoolsData?.data?.items?.map(_RouteListAnonymous);
        $[95] = schoolsData?.data?.items;
        $[96] = t51;
    } else {
        t51 = $[96];
    }
    let t52;
    if ($[97] !== t50 || $[98] !== t51) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            sm: 8,
            md: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                placeholder: "Select school",
                allowClear: true,
                size: "large",
                style: t49,
                value: t50,
                onChange: setSchoolFilter,
                children: t51
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 731,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 731,
            columnNumber: 11
        }, this);
        $[97] = t50;
        $[98] = t51;
        $[99] = t52;
    } else {
        t52 = $[99];
    }
    let t53;
    if ($[100] === Symbol.for("react.memo_cache_sentinel")) {
        t53 = {
            width: "100%"
        };
        $[100] = t53;
    } else {
        t53 = $[100];
    }
    let t54;
    let t55;
    if ($[101] === Symbol.for("react.memo_cache_sentinel")) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: true,
            children: "Active"
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 750,
            columnNumber: 11
        }, this);
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: false,
            children: "Inactive"
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 751,
            columnNumber: 11
        }, this);
        $[101] = t54;
        $[102] = t55;
    } else {
        t54 = $[101];
        t55 = $[102];
    }
    let t56;
    if ($[103] !== statusFilter) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            sm: 8,
            md: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                placeholder: "Filter by status",
                allowClear: true,
                size: "large",
                style: t53,
                value: statusFilter,
                onChange: setStatusFilter,
                children: [
                    t54,
                    t55
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 760,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 760,
            columnNumber: 11
        }, this);
        $[103] = statusFilter;
        $[104] = t56;
    } else {
        t56 = $[104];
    }
    let t57;
    if ($[105] !== t52 || $[106] !== t56) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t45,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: t46,
                children: [
                    t48,
                    t52,
                    t56
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 768,
                columnNumber: 28
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 768,
            columnNumber: 11
        }, this);
        $[105] = t52;
        $[106] = t56;
        $[107] = t57;
    } else {
        t57 = $[107];
    }
    let t58;
    if ($[108] !== bulkActions || $[109] !== bulkUpdateMutation || $[110] !== selectedRowKeys.length) {
        t58 = selectedRowKeys.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                marginBottom: "16px",
                padding: "8px",
                backgroundColor: "#f0f2f5",
                borderRadius: "4px"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                justify: "space-between",
                align: "middle",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontWeight: 500
                            },
                            children: [
                                selectedRowKeys.length,
                                " routes selected"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 782,
                            columnNumber: 57
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 782,
                        columnNumber: 52
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    size: "small",
                                    onClick: {
                                        "RouteList[<Button>.onClick]": ()=>setSelectedRowKeys([])
                                    }["RouteList[<Button>.onClick]"],
                                    children: "Clear Selection"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 784,
                                    columnNumber: 79
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                    menu: {
                                        items: bulkActions
                                    },
                                    trigger: [
                                        "click"
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$GroupOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupOutlined$3e$__["GroupOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteList.tsx",
                                            lineNumber: 788,
                                            columnNumber: 50
                                        }, void 0),
                                        loading: bulkUpdateMutation.isPending,
                                        children: "Bulk Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteList.tsx",
                                        lineNumber: 788,
                                        columnNumber: 36
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteList.tsx",
                                    lineNumber: 786,
                                    columnNumber: 71
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/routes/RouteList.tsx",
                            lineNumber: 784,
                            columnNumber: 72
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 784,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 782,
                columnNumber: 8
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 777,
            columnNumber: 41
        }, this);
        $[108] = bulkActions;
        $[109] = bulkUpdateMutation;
        $[110] = selectedRowKeys.length;
        $[111] = t58;
    } else {
        t58 = $[111];
    }
    let t59;
    if ($[112] !== routesData?.data?.items) {
        t59 = routesData?.data?.items || [];
        $[112] = routesData?.data?.items;
        $[113] = t59;
    } else {
        t59 = $[113];
    }
    const t60 = routesData?.data?.pagination.total || 0;
    let t61;
    if ($[114] === Symbol.for("react.memo_cache_sentinel")) {
        t61 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].PAGE_SIZE_OPTIONS
        ];
        $[114] = t61;
    } else {
        t61 = $[114];
    }
    let t62;
    if ($[115] !== pagination.current || $[116] !== pagination.pageSize || $[117] !== t60) {
        t62 = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: t60,
            showSizeChanger: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].SHOW_SIZE_CHANGER,
            showQuickJumper: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].SHOW_QUICK_JUMPER,
            pageSizeOptions: t61,
            showTotal: _temp5
        };
        $[115] = pagination.current;
        $[116] = pagination.pageSize;
        $[117] = t60;
        $[118] = t62;
    } else {
        t62 = $[118];
    }
    let t63;
    if ($[119] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = {
            x: 1200
        };
        $[119] = t63;
    } else {
        t63 = $[119];
    }
    let t64;
    if ($[120] !== columns || $[121] !== isLoading || $[122] !== rowSelection || $[123] !== t59 || $[124] !== t62) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
            columns: columns,
            dataSource: t59,
            rowKey: "id",
            loading: isLoading,
            rowSelection: rowSelection,
            pagination: t62,
            onChange: handleTableChange,
            scroll: t63,
            size: "small"
        }, void 0, false, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 841,
            columnNumber: 11
        }, this);
        $[120] = columns;
        $[121] = isLoading;
        $[122] = rowSelection;
        $[123] = t59;
        $[124] = t62;
        $[125] = t64;
    } else {
        t64 = $[125];
    }
    let t65;
    if ($[126] !== t44 || $[127] !== t57 || $[128] !== t58 || $[129] !== t64) {
        t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            children: [
                t44,
                t57,
                t58,
                t64
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/routes/RouteList.tsx",
            lineNumber: 853,
            columnNumber: 11
        }, this);
        $[126] = t44;
        $[127] = t57;
        $[128] = t58;
        $[129] = t64;
        $[130] = t65;
    } else {
        t65 = $[130];
    }
    return t65;
}
_s(RouteList, "zgPCtuvxFiPO3QnBIkI7bwQdz0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteRoute"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleRouteStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkUpdateRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImportRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExportRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDuplicateRoute"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOptimizeRoute"]
    ];
});
_c = RouteList;
function _temp5(total, range) {
    return `${range[0]}-${range[1]} of ${total} routes`;
}
function _RouteListAnonymous(school) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
        value: school.id,
        children: school.name
    }, school.id, false, {
        fileName: "[project]/src/components/routes/RouteList.tsx",
        lineNumber: 868,
        columnNumber: 10
    }, this);
}
function _temp4(__2, record_2) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
        direction: "vertical",
        size: 2,
        children: [
            record_2.distance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__["AimOutlined"], {
                        style: {
                            color: "#722ed1"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 876,
                        columnNumber: 8
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            record_2.distance,
                            " km"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 878,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 871,
                columnNumber: 69
            }, this),
            record_2.estimatedDuration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {
                        style: {
                            color: "#fa8c16"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 883,
                        columnNumber: 8
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            Math.round(record_2.estimatedDuration / 60),
                            " min"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 885,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 878,
                columnNumber: 85
            }, this),
            record_2.assignments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__["TeamOutlined"], {
                        style: {
                            color: "#52c41a"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 890,
                        columnNumber: 8
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            record_2.assignments.length,
                            " students"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/routes/RouteList.tsx",
                        lineNumber: 892,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 885,
                columnNumber: 106
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/routes/RouteList.tsx",
        lineNumber: 871,
        columnNumber: 10
    }, this);
}
function _temp3(__1, record_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                count: record_1.stops?.length || 0,
                overflowCount: 99,
                color: "blue"
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 895,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    color: "#666",
                    marginTop: "2px"
                },
                children: "stops"
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 895,
                columnNumber: 92
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/routes/RouteList.tsx",
        lineNumber: 895,
        columnNumber: 10
    }, this);
}
function _temp2(__0, record_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: "4px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BankOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BankOutlined$3e$__["BankOutlined"], {
                style: {
                    color: "#1890ff"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 906,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: record_0.school?.name || "No School"
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteList.tsx",
                lineNumber: 908,
                columnNumber: 10
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/routes/RouteList.tsx",
        lineNumber: 902,
        columnNumber: 10
    }, this);
}
function _temp() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].info("Export selected feature coming soon");
}
function _RouteListGetRouteStatusColor(isActive) {
    return isActive ? "success" : "default";
}
function _RouteListHandleSearchSetPagination(prev) {
    return {
        ...prev,
        current: 1
    };
}
var _c;
__turbopack_context__.k.register(_c, "RouteList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/routes/RouteForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RouteForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-client] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input-number/index.js [app-client] (ecmascript) <export default as InputNumber>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$switch$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/switch/index.js [app-client] (ecmascript) <export default as Switch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/divider/index.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/table/index.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SaveOutlined.js [app-client] (ecmascript) <export default as SaveOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CloseOutlined.js [app-client] (ecmascript) <export default as CloseOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlusOutlined.js [app-client] (ecmascript) <export default as PlusOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DeleteOutlined.js [app-client] (ecmascript) <export default as DeleteOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EditOutlined.js [app-client] (ecmascript) <export default as EditOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AimOutlined.js [app-client] (ecmascript) <export default as AimOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSchools.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const { Title } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { TextArea } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
function RouteForm({ route, onSuccess, onCancel }) {
    _s();
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const [stopModalVisible, setStopModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingStop, setEditingStop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stopForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const isEditing = !!route;
    const createRouteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateRoute"])();
    const updateRouteMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateRoute"])();
    const { data: stopsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouteStops"])(route?.id || '');
    const createStopMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateStop"])();
    const updateStopMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateStop"])();
    const deleteStopMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteStop"])();
    const reorderStopsMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReorderStops"])();
    const { data: schoolsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"])({
        limit: 100
    });
    const isLoading = createRouteMutation.isPending || updateRouteMutation.isPending;
    const stops = stopsData?.data?.items || [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RouteForm.useEffect": ()=>{
            if (route) {
                form.setFieldsValue({
                    routeName: route.routeName,
                    description: route.description,
                    schoolId: route.schoolId,
                    distance: route.distance,
                    estimatedDuration: route.estimatedDuration ? Math.round(route.estimatedDuration / 60) : undefined,
                    isActive: route.isActive
                });
            }
        }
    }["RouteForm.useEffect"], [
        route,
        form
    ]);
    const handleSubmit = async (values)=>{
        try {
            const formData = {
                routeName: values.routeName,
                description: values.description,
                schoolId: values.schoolId,
                distance: values.distance,
                estimatedDuration: values.estimatedDuration ? values.estimatedDuration * 60 : undefined,
                isActive: values.isActive
            };
            if (isEditing && route) {
                const updateData = formData;
                await updateRouteMutation.mutateAsync({
                    id: route.id,
                    data: updateData
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Route updated successfully');
            } else {
                const createData = {
                    ...formData,
                    isActive: formData.isActive ?? true
                };
                await createRouteMutation.mutateAsync(createData);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Route created successfully');
            }
            form.resetFields();
            onSuccess();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to save route';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    };
    const handleReset = ()=>{
        if (route) {
            form.setFieldsValue({
                routeName: route.routeName,
                description: route.description,
                schoolId: route.schoolId,
                distance: route.distance,
                estimatedDuration: route.estimatedDuration ? Math.round(route.estimatedDuration / 60) : undefined,
                isActive: route.isActive
            });
        } else {
            form.resetFields();
        }
    };
    const handleAddStop = ()=>{
        setEditingStop(null);
        stopForm.resetFields();
        setStopModalVisible(true);
    };
    const handleEditStop = (stop)=>{
        setEditingStop(stop);
        stopForm.setFieldsValue({
            name: stop.name,
            address: stop.address,
            estimatedArrival: stop.estimatedArrival
        });
        setStopModalVisible(true);
    };
    const handleDeleteStop = async (stopId, stopName)=>{
        if (!route) return;
        try {
            await deleteStopMutation.mutateAsync({
                stopId,
                routeId: route.id
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Stop "${stopName}" deleted successfully`);
        } catch (error_0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to delete stop');
        }
    };
    const handleStopSubmit = async (values_0)=>{
        if (!route) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Please save the route first before adding stops');
            return;
        }
        try {
            const stopData = {
                ...values_0,
                routeId: route.id,
                stopOrder: editingStop ? editingStop.stopOrder : stops.length + 1,
                isActive: true
            };
            if (editingStop) {
                await updateStopMutation.mutateAsync({
                    id: editingStop.id,
                    data: stopData
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Stop updated successfully');
            } else {
                await createStopMutation.mutateAsync(stopData);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Stop added successfully');
            }
            setStopModalVisible(false);
            stopForm.resetFields();
            setEditingStop(null);
        } catch (error_1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to save stop');
        }
    };
    const stopColumns = [
        {
            title: 'Order',
            dataIndex: 'stopOrder',
            width: 80,
            render: (order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 500
                    },
                    children: order
                }, void 0, false, {
                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                    lineNumber: 171,
                    columnNumber: 32
                }, this)
        },
        {
            title: 'Stop Name',
            dataIndex: 'name',
            render: (name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontWeight: 500
                    },
                    children: name
                }, void 0, false, {
                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                    lineNumber: 188,
                    columnNumber: 31
                }, this)
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: (address)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '12px',
                        color: '#666'
                    },
                    children: address
                }, void 0, false, {
                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                    lineNumber: 194,
                    columnNumber: 34
                }, this)
        },
        {
            title: 'Estimated Arrival',
            dataIndex: 'estimatedArrival',
            render: (time)=>time ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this),
                        time
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                    lineNumber: 201,
                    columnNumber: 38
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        color: '#999',
                        fontStyle: 'italic'
                    },
                    children: "Not set"
                }, void 0, false, {
                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                    lineNumber: 209,
                    columnNumber: 20
                }, this)
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "text",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__["EditOutlined"], {}, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 218,
                                columnNumber: 37
                            }, void 0),
                            onClick: ()=>handleEditStop(record),
                            size: "small"
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            type: "text",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__["DeleteOutlined"], {}, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 219,
                                columnNumber: 37
                            }, void 0),
                            onClick: ()=>handleDeleteStop(record.id, record.name),
                            danger: true,
                            size: "small",
                            loading: deleteStopMutation.isPending
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                    lineNumber: 217,
                    columnNumber: 39
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
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
                            children: isEditing ? 'Edit Route' : 'Add New Route'
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                        form: form,
                        layout: "vertical",
                        onFinish: handleSubmit,
                        initialValues: {
                            isActive: true
                        },
                        autoComplete: "off",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                children: "Basic Information"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    0
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 12,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "routeName",
                                            label: "Route Name",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please enter route name'
                                                },
                                                {
                                                    min: 3,
                                                    message: 'Route name must be at least 3 characters'
                                                },
                                                {
                                                    max: 100,
                                                    message: 'Route name must not exceed 100 characters'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                placeholder: "Enter route name",
                                                size: "large",
                                                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 76
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                lineNumber: 252,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 12,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "schoolId",
                                            label: "School",
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please select school'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                placeholder: "Select school",
                                                size: "large",
                                                children: schoolsData?.data?.items?.map((school)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                        value: school.id,
                                                        children: school.name
                                                    }, school.id, false, {
                                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 60
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 257,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    0
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 24,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        name: "description",
                                        label: "Description",
                                        rules: [
                                            {
                                                max: 500,
                                                message: 'Description must not exceed 500 characters'
                                            }
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                                            placeholder: "Enter route description (optional)",
                                            rows: 3,
                                            size: "large"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                children: "Route Details"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    0
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 8,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "distance",
                                            label: "Distance (km)",
                                            rules: [
                                                {
                                                    type: 'number',
                                                    min: 0,
                                                    message: 'Distance must be positive'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                placeholder: "Enter distance",
                                                size: "large",
                                                style: {
                                                    width: '100%'
                                                },
                                                precision: 2,
                                                min: 0,
                                                addonAfter: "km"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 286,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 8,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "estimatedDuration",
                                            label: "Estimated Duration (minutes)",
                                            rules: [
                                                {
                                                    type: 'number',
                                                    min: 1,
                                                    message: 'Duration must be at least 1 minute'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                placeholder: "Enter duration",
                                                size: "large",
                                                style: {
                                                    width: '100%'
                                                },
                                                min: 1,
                                                addonAfter: "min"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 8,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "isActive",
                                            label: "Route Status",
                                            valuePropName: "checked",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$switch$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
                                                checkedChildren: "Active",
                                                unCheckedChildren: "Inactive"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 309,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            isEditing && route && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                        children: "Route Stops"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this),
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
                                                        level: 5,
                                                        style: {
                                                            margin: 0
                                                        },
                                                        children: [
                                                            "Stops (",
                                                            stops.length,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                        type: "primary",
                                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__["PlusOutlined"], {}, void 0, false, {
                                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 50
                                                        }, void 0),
                                                        onClick: handleAddStop,
                                                        children: "Add Stop"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 323,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 320,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                        dataSource: stops,
                                        columns: stopColumns,
                                        rowKey: "id",
                                        pagination: false,
                                        size: "small",
                                        locale: {
                                            emptyText: 'No stops added yet. Click "Add Stop" to get started.'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            !isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '12px',
                                    backgroundColor: '#f0f2f5',
                                    borderRadius: '6px',
                                    marginBottom: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__["AimOutlined"], {}, void 0, false, {
                                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: 500
                                                },
                                                children: "Stop Management"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '14px',
                                            color: '#666'
                                        },
                                        children: "You can add and manage stops after creating the route."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 344,
                                columnNumber: 26
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    16
                                ],
                                justify: "end",
                                style: {
                                    marginTop: '32px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                            onClick: onCancel,
                                            size: "large",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseOutlined$3e$__["CloseOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 17
                                                }, this),
                                                "Cancel"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 373,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 372,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                            onClick: handleReset,
                                            size: "large",
                                            children: "Reset"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 378,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                            type: "primary",
                                            htmlType: "submit",
                                            loading: isLoading,
                                            size: "large",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__["SaveOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 17
                                                }, this),
                                                isEditing ? 'Update Route' : 'Create Route'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                                            lineNumber: 384,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 383,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 369,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/routes/RouteForm.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: editingStop ? 'Edit Stop' : 'Add New Stop',
                open: stopModalVisible,
                onCancel: ()=>{
                    setStopModalVisible(false);
                    setEditingStop(null);
                    stopForm.resetFields();
                },
                footer: null,
                width: 600,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                    form: stopForm,
                    layout: "vertical",
                    onFinish: handleStopSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                            name: "name",
                            label: "Stop Name",
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter stop name'
                                },
                                {
                                    max: 100,
                                    message: 'Stop name must not exceed 100 characters'
                                }
                            ],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                placeholder: "Enter stop name",
                                size: "large"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 407,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                            name: "address",
                            label: "Address",
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter address'
                                },
                                {
                                    max: 200,
                                    message: 'Address must not exceed 200 characters'
                                }
                            ],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                                placeholder: "Enter full address",
                                rows: 3,
                                size: "large"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 417,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 410,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                            name: "estimatedArrival",
                            label: "Estimated Arrival Time",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                placeholder: "e.g., 08:30 AM",
                                size: "large"
                            }, void 0, false, {
                                fileName: "[project]/src/components/routes/RouteForm.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                            gutter: [
                                16,
                                16
                            ],
                            justify: "end",
                            style: {
                                marginTop: '24px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        onClick: ()=>{
                                            setStopModalVisible(false);
                                            setEditingStop(null);
                                            stopForm.resetFields();
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 428,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        type: "primary",
                                        htmlType: "submit",
                                        loading: createStopMutation.isPending || updateStopMutation.isPending,
                                        children: editingStop ? 'Update Stop' : 'Add Stop'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/routes/RouteForm.tsx",
                                        lineNumber: 437,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                                    lineNumber: 436,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/routes/RouteForm.tsx",
                            lineNumber: 424,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/routes/RouteForm.tsx",
                    lineNumber: 399,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/routes/RouteForm.tsx",
                lineNumber: 394,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(RouteForm, "ujo59aUnFScxQGmlG09bSh09L9s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateRoute"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateRoute"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouteStops"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateStop"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateStop"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteStop"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReorderStops"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSchools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSchools"]
    ];
});
_c = RouteForm;
var _c;
__turbopack_context__.k.register(_c, "RouteForm");
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
"[project]/src/app/routes/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoutesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/drawer/index.js [app-client] (ecmascript) <export default as Drawer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$routes$2f$RouteList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/routes/RouteList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$routes$2f$RouteForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/routes/RouteForm.tsx [app-client] (ecmascript)");
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
function RoutesContent() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(40);
    if ($[0] !== "d17cc6cd1575e800ad1f28862799e5aa32a6e803df3a49234eba257e619cc4bd") {
        for(let $i = 0; $i < 40; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d17cc6cd1575e800ad1f28862799e5aa32a6e803df3a49234eba257e619cc4bd";
    }
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedRoute, setSelectedRoute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [isViewMode, setIsViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStopsDrawerOpen, setIsStopsDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAssignmentsDrawerOpen, setIsAssignmentsDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "RoutesContent[handleAdd]": ()=>{
                setSelectedRoute(undefined);
                setIsViewMode(false);
                setIsModalOpen(true);
            }
        })["RoutesContent[handleAdd]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const handleAdd = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "RoutesContent[handleEdit]": (route)=>{
                setSelectedRoute(route);
                setIsViewMode(false);
                setIsModalOpen(true);
            }
        })["RoutesContent[handleEdit]"];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const handleEdit = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "RoutesContent[handleViewDetails]": (route_0)=>{
                setSelectedRoute(route_0);
                setIsViewMode(true);
                setIsModalOpen(true);
            }
        })["RoutesContent[handleViewDetails]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const handleViewDetails = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "RoutesContent[handleManageStops]": (route_1)=>{
                setSelectedRoute(route_1);
                setIsStopsDrawerOpen(true);
            }
        })["RoutesContent[handleManageStops]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const handleManageStops = t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "RoutesContent[handleManageAssignments]": (route_2)=>{
                setSelectedRoute(route_2);
                setIsAssignmentsDrawerOpen(true);
            }
        })["RoutesContent[handleManageAssignments]"];
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const handleManageAssignments = t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "RoutesContent[handleCloseModal]": ()=>{
                setIsModalOpen(false);
                setSelectedRoute(undefined);
                setIsViewMode(false);
            }
        })["RoutesContent[handleCloseModal]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const handleCloseModal = t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "RoutesContent[handleSuccess]": ()=>{
                handleCloseModal();
            }
        })["RoutesContent[handleSuccess]"];
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const handleSuccess = t6;
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$routes$2f$RouteList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onAdd: handleAdd,
            onEdit: handleEdit,
            onViewDetails: handleViewDetails,
            onManageStops: handleManageStops,
            onManageAssignments: handleManageAssignments
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    const t8 = isViewMode ? `Route Details - ${selectedRoute ? selectedRoute.routeName : ""}` : selectedRoute ? "Edit Route" : "Add New Route";
    let t9;
    if ($[9] !== isViewMode || $[10] !== selectedRoute) {
        t9 = isViewMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Route details view component coming soon..."
                }, void 0, false, {
                    fileName: "[project]/src/app/routes/page.tsx",
                    lineNumber: 128,
                    columnNumber: 28
                }, this),
                selectedRoute && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: selectedRoute.routeName
                        }, void 0, false, {
                            fileName: "[project]/src/app/routes/page.tsx",
                            lineNumber: 128,
                            columnNumber: 101
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: selectedRoute.description
                        }, void 0, false, {
                            fileName: "[project]/src/app/routes/page.tsx",
                            lineNumber: 128,
                            columnNumber: 135
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "School: ",
                                selectedRoute.school?.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/routes/page.tsx",
                            lineNumber: 128,
                            columnNumber: 169
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Stops: ",
                                selectedRoute.stops?.length || 0
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/routes/page.tsx",
                            lineNumber: 128,
                            columnNumber: 212
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Distance: ",
                                selectedRoute.distance,
                                " km"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/routes/page.tsx",
                            lineNumber: 128,
                            columnNumber: 260
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Duration:",
                                " ",
                                selectedRoute.estimatedDuration && Math.round(selectedRoute.estimatedDuration / 60),
                                " ",
                                "minutes"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/routes/page.tsx",
                            lineNumber: 128,
                            columnNumber: 304
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Status: ",
                                selectedRoute.isActive ? "Active" : "Inactive"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/routes/page.tsx",
                            lineNumber: 128,
                            columnNumber: 422
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/routes/page.tsx",
                    lineNumber: 128,
                    columnNumber: 96
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 128,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$routes$2f$RouteForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            route: selectedRoute,
            onSuccess: handleSuccess,
            onCancel: handleCloseModal
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 128,
            columnNumber: 501
        }, this);
        $[9] = isViewMode;
        $[10] = selectedRoute;
        $[11] = t9;
    } else {
        t9 = $[11];
    }
    let t10;
    if ($[12] !== isModalOpen || $[13] !== t8 || $[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
            title: t8,
            open: isModalOpen,
            onCancel: handleCloseModal,
            footer: null,
            width: 1000,
            destroyOnClose: true,
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[12] = isModalOpen;
        $[13] = t8;
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    const t11 = `Manage Stops - ${selectedRoute?.routeName || ""}`;
    let t12;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "RoutesContent[<Drawer>.onClose]": ()=>setIsStopsDrawerOpen(false)
        })["RoutesContent[<Drawer>.onClose]"];
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    let t13;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Stop management interface coming soon..."
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[17] = t13;
    } else {
        t13 = $[17];
    }
    let t14;
    if ($[18] !== selectedRoute) {
        t14 = selectedRoute && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    children: "Current Stops:"
                }, void 0, false, {
                    fileName: "[project]/src/app/routes/page.tsx",
                    lineNumber: 164,
                    columnNumber: 33
                }, this),
                selectedRoute.stops?.map(_RoutesContentAnonymous)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 164,
            columnNumber: 28
        }, this);
        $[18] = selectedRoute;
        $[19] = t14;
    } else {
        t14 = $[19];
    }
    let t15;
    if ($[20] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[20] = t14;
        $[21] = t15;
    } else {
        t15 = $[21];
    }
    let t16;
    if ($[22] !== isStopsDrawerOpen || $[23] !== t11 || $[24] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__["Drawer"], {
            title: t11,
            placement: "right",
            onClose: t12,
            open: isStopsDrawerOpen,
            width: 600,
            children: t15
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[22] = isStopsDrawerOpen;
        $[23] = t11;
        $[24] = t15;
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    const t17 = `Student Assignments - ${selectedRoute?.routeName || ""}`;
    let t18;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = ({
            "RoutesContent[<Drawer>.onClose]": ()=>setIsAssignmentsDrawerOpen(false)
        })["RoutesContent[<Drawer>.onClose]"];
        $[26] = t18;
    } else {
        t18 = $[26];
    }
    let t19;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Student assignment interface coming soon..."
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 200,
            columnNumber: 11
        }, this);
        $[27] = t19;
    } else {
        t19 = $[27];
    }
    let t20;
    if ($[28] !== selectedRoute) {
        t20 = selectedRoute && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    children: "Assigned Students:"
                }, void 0, false, {
                    fileName: "[project]/src/app/routes/page.tsx",
                    lineNumber: 207,
                    columnNumber: 33
                }, this),
                selectedRoute.assignments?.map(_RoutesContentAnonymous2)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 207,
            columnNumber: 28
        }, this);
        $[28] = selectedRoute;
        $[29] = t20;
    } else {
        t20 = $[29];
    }
    let t21;
    if ($[30] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 215,
            columnNumber: 11
        }, this);
        $[30] = t20;
        $[31] = t21;
    } else {
        t21 = $[31];
    }
    let t22;
    if ($[32] !== isAssignmentsDrawerOpen || $[33] !== t17 || $[34] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__["Drawer"], {
            title: t17,
            placement: "right",
            onClose: t18,
            open: isAssignmentsDrawerOpen,
            width: 800,
            children: t21
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 223,
            columnNumber: 11
        }, this);
        $[32] = isAssignmentsDrawerOpen;
        $[33] = t17;
        $[34] = t21;
        $[35] = t22;
    } else {
        t22 = $[35];
    }
    let t23;
    if ($[36] !== t10 || $[37] !== t16 || $[38] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t7,
                t10,
                t16,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[36] = t10;
        $[37] = t16;
        $[38] = t22;
        $[39] = t23;
    } else {
        t23 = $[39];
    }
    return t23;
}
_s(RoutesContent, "FnnXZ0RV37wIaf+FNvLTLKkER8Y=");
_c = RoutesContent;
function _RoutesContentAnonymous2(assignment) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "8px",
            border: "1px solid #d9d9d9",
            marginBottom: "8px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: [
                        "Student ID: ",
                        assignment.studentId
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/routes/page.tsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/routes/page.tsx",
                lineNumber: 248,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    color: "#666"
                },
                children: [
                    "Stop: ",
                    assignment.stopId
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/routes/page.tsx",
                lineNumber: 248,
                columnNumber: 68
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    color: "#999"
                },
                children: [
                    "Status: ",
                    assignment.status
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/routes/page.tsx",
                lineNumber: 251,
                columnNumber: 39
            }, this)
        ]
    }, assignment.id, true, {
        fileName: "[project]/src/app/routes/page.tsx",
        lineNumber: 244,
        columnNumber: 10
    }, this);
}
function _RoutesContentAnonymous(stop, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "8px",
            border: "1px solid #d9d9d9",
            marginBottom: "8px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: [
                        index + 1,
                        ". ",
                        stop.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/routes/page.tsx",
                    lineNumber: 261,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/routes/page.tsx",
                lineNumber: 261,
                columnNumber: 6
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    color: "#666"
                },
                children: stop.address
            }, void 0, false, {
                fileName: "[project]/src/app/routes/page.tsx",
                lineNumber: 261,
                columnNumber: 58
            }, this),
            stop.estimatedArrival && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "12px",
                    color: "#999"
                },
                children: [
                    "ETA: ",
                    stop.estimatedArrival
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/routes/page.tsx",
                lineNumber: 264,
                columnNumber: 54
            }, this)
        ]
    }, stop.id, true, {
        fileName: "[project]/src/app/routes/page.tsx",
        lineNumber: 257,
        columnNumber: 10
    }, this);
}
function RoutesPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "d17cc6cd1575e800ad1f28862799e5aa32a6e803df3a49234eba257e619cc4bd") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d17cc6cd1575e800ad1f28862799e5aa32a6e803df3a49234eba257e619cc4bd";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoutesContent, {}, void 0, false, {
                    fileName: "[project]/src/app/routes/page.tsx",
                    lineNumber: 279,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/routes/page.tsx",
                lineNumber: 279,
                columnNumber: 26
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/routes/page.tsx",
            lineNumber: 279,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = RoutesPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "RoutesContent");
__turbopack_context__.k.register(_c1, "RoutesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_53691ffa._.js.map