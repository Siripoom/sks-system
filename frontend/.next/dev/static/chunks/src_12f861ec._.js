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
            console.log('ApiClient: Making request to:', config.url);
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
            if (token && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token)) {
                config.headers.Authorization = `Bearer ${token}`;
            }
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
"[project]/src/services/trackingService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackingService",
    ()=>TrackingService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
'use client';
;
class TrackingService {
    static BASE_PATH = '/tracking';
    // Real-time Trip Tracking
    static async getActiveTrips(filters) {
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status);
        if (filters?.driverId) params.append('driverId', filters.driverId);
        if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        if (filters?.date) params.append('date', filters.date);
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/active?${params.toString()}`);
        return response.data;
    }
    static async getTripTracking(tripId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/trips/${tripId}`);
        return response.data;
    }
    static async updateTripLocation(tripId, location) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/location`, location);
    }
    static async updateTripStatus(tripId, status, metadata) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/trips/${tripId}/status`, {
            status,
            metadata
        });
        return response.data;
    }
    // Stop Management
    static async arriveAtStop(tripId, stopId, location) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/arrive`, {
            location,
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    static async departFromStop(tripId, stopId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/depart`, {
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    static async skipStop(tripId, stopId, reason) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/skip`, {
            reason,
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    // Student Management
    static async updateStudentStatus(tripId, studentId, status, stopId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/trips/${tripId}/students/${studentId}`, {
            status,
            stopId,
            timestamp: new Date().toISOString()
        });
    }
    static async bulkUpdateStudentStatus(tripId, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/trips/${tripId}/students/bulk`, {
            updates: updates.map((update)=>({
                    ...update,
                    timestamp: new Date().toISOString()
                }))
        });
    }
    // Alerts and Notifications
    static async createAlert(tripId, alert) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/alerts`, {
            ...alert,
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    static async getActiveAlerts() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/alerts/active`);
        return response.data;
    }
    static async acknowledgeAlert(alertId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/alerts/${alertId}/acknowledge`, {
            acknowledgedAt: new Date().toISOString()
        });
        return response.data;
    }
    static async resolveAlert(alertId, resolution) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/alerts/${alertId}/resolve`, {
            resolution,
            resolvedAt: new Date().toISOString()
        });
        return response.data;
    }
    // Route Optimization
    static async getRouteOptimization(routeId, date) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/routes/${routeId}/optimize?date=${date}`);
        return response.data;
    }
    static async applyRouteOptimization(routeId, optimizationId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/routes/${routeId}/apply-optimization`, {
            optimizationId
        });
    }
    // ETA and Predictions
    static async getETAForStop(tripId, stopId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/eta`);
        return response.data;
    }
    static async getETAForStudent(studentId, date) {
        const params = date ? `?date=${date}` : '';
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/students/${studentId}/eta${params}`);
        return response.data;
    }
    // Geofencing
    static async checkGeofence(tripId, location) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/geofence`, location);
        return response.data;
    }
    // Emergency and Incident Management
    static async reportEmergency(tripId, emergency) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/emergency`, {
            ...emergency,
            timestamp: new Date().toISOString()
        });
        return response.data.emergencyId;
    }
    static async updateEmergencyStatus(emergencyId, status, notes) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/emergencies/${emergencyId}`, {
            status,
            notes,
            updatedAt: new Date().toISOString()
        });
    }
    // Driver Communication
    static async sendMessageToDriver(driverId, message) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/drivers/${driverId}/messages`, {
            ...message,
            timestamp: new Date().toISOString()
        });
        return response.data.messageId;
    }
    static async getDriverMessages(driverId, unreadOnly) {
        const params = unreadOnly ? '?unreadOnly=true' : '';
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/drivers/${driverId}/messages${params}`);
        return response.data;
    }
    // Analytics and Reporting
    static async getTrackingStats(filters) {
        const params = new URLSearchParams();
        if (filters?.date) params.append('date', filters.date);
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/stats?${params.toString()}`);
        return response.data;
    }
    static async getTripHistory(tripId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/trips/${tripId}/history`);
        return response.data;
    }
    static async exportTrackingData(filters) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/export`, filters, {
            responseType: 'blob'
        });
        return response.data;
    }
    // Parent/Guardian Access
    static async getStudentTripTracking(studentId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/students/${studentId}/tracking`);
        return response.data;
    }
    // Maintenance Integration
    static async reportVehicleIssue(tripId, issue) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/vehicle-issue`, {
            ...issue,
            timestamp: new Date().toISOString()
        });
        return response.data.issueId;
    }
    // Weather Integration
    static async getWeatherForRoute(routeId, date) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/routes/${routeId}/weather?date=${date}`);
        return response.data;
    }
    // Performance Monitoring
    static async getDriverPerformance(driverId, period) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/drivers/${driverId}/performance?period=${period}`);
        return response.data;
    }
    static async getVehiclePerformance(vehicleId, period) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/vehicles/${vehicleId}/performance?period=${period}`);
        return response.data;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useTracking.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAcknowledgeAlert",
    ()=>useAcknowledgeAlert,
    "useActiveAlerts",
    ()=>useActiveAlerts,
    "useActiveTrips",
    ()=>useActiveTrips,
    "useArriveAtStop",
    ()=>useArriveAtStop,
    "useBulkUpdateStudentStatus",
    ()=>useBulkUpdateStudentStatus,
    "useCreateAlert",
    ()=>useCreateAlert,
    "useDepartFromStop",
    ()=>useDepartFromStop,
    "useDriverMessages",
    ()=>useDriverMessages,
    "useDriverPerformance",
    ()=>useDriverPerformance,
    "useExportTrackingData",
    ()=>useExportTrackingData,
    "useGeofenceCheck",
    ()=>useGeofenceCheck,
    "useReportEmergency",
    ()=>useReportEmergency,
    "useReportVehicleIssue",
    ()=>useReportVehicleIssue,
    "useResolveAlert",
    ()=>useResolveAlert,
    "useSendMessageToDriver",
    ()=>useSendMessageToDriver,
    "useSkipStop",
    ()=>useSkipStop,
    "useStopETA",
    ()=>useStopETA,
    "useStudentETA",
    ()=>useStudentETA,
    "useStudentTracking",
    ()=>useStudentTracking,
    "useTrackingStats",
    ()=>useTrackingStats,
    "useTripHistory",
    ()=>useTripHistory,
    "useTripTracking",
    ()=>useTripTracking,
    "useUpdateStudentStatus",
    ()=>useUpdateStudentStatus,
    "useUpdateTripLocation",
    ()=>useUpdateTripLocation,
    "useUpdateTripStatus",
    ()=>useUpdateTripStatus,
    "useVehiclePerformance",
    ()=>useVehiclePerformance,
    "useWeatherForRoute",
    ()=>useWeatherForRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/trackingService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature(), _s19 = __turbopack_context__.k.signature(), _s20 = __turbopack_context__.k.signature(), _s21 = __turbopack_context__.k.signature(), _s22 = __turbopack_context__.k.signature(), _s23 = __turbopack_context__.k.signature(), _s24 = __turbopack_context__.k.signature(), _s25 = __turbopack_context__.k.signature(), _s26 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Query Keys
const TRACKING_KEYS = {
    all: [
        'tracking'
    ],
    activeTrips: (filters)=>[
            ...TRACKING_KEYS.all,
            'active-trips',
            filters
        ],
    tripTracking: (tripId)=>[
            ...TRACKING_KEYS.all,
            'trip',
            tripId
        ],
    alerts: ()=>[
            ...TRACKING_KEYS.all,
            'alerts'
        ],
    studentTracking: (studentId)=>[
            ...TRACKING_KEYS.all,
            'student',
            studentId
        ],
    stats: (filters)=>[
            ...TRACKING_KEYS.all,
            'stats',
            filters
        ],
    driverMessages: (driverId)=>[
            ...TRACKING_KEYS.all,
            'driver-messages',
            driverId
        ],
    eta: (tripId, stopId)=>[
            ...TRACKING_KEYS.all,
            'eta',
            tripId,
            stopId
        ],
    studentETA: (studentId, date)=>[
            ...TRACKING_KEYS.all,
            'student-eta',
            studentId,
            date
        ],
    tripHistory: (tripId)=>[
            ...TRACKING_KEYS.all,
            'trip-history',
            tripId
        ],
    weather: (routeId, date)=>[
            ...TRACKING_KEYS.all,
            'weather',
            routeId,
            date
        ],
    driverPerformance: (driverId, period)=>[
            ...TRACKING_KEYS.all,
            'driver-performance',
            driverId,
            period
        ],
    vehiclePerformance: (vehicleId, period)=>[
            ...TRACKING_KEYS.all,
            'vehicle-performance',
            vehicleId,
            period
        ]
};
const useActiveTrips = (filters, refreshInterval)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] !== filters) {
        t0 = TRACKING_KEYS.activeTrips(filters);
        $[1] = filters;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== filters) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getActiveTrips(filters);
        $[3] = filters;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = refreshInterval || 5000;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            refetchInterval: t2,
            staleTime: 2000,
            refetchIntervalInBackground: true
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
_s(useActiveTrips, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useTripTracking = (tripId, t0)=>{
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const refreshInterval = t0 === undefined ? 3000 : t0;
    let t1;
    if ($[1] !== tripId) {
        t1 = TRACKING_KEYS.tripTracking(tripId);
        $[1] = tripId;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== tripId) {
        t2 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getTripTracking(tripId);
        $[3] = tripId;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const t3 = !!tripId;
    let t4;
    if ($[5] !== refreshInterval || $[6] !== t1 || $[7] !== t2 || $[8] !== t3) {
        t4 = {
            queryKey: t1,
            queryFn: t2,
            enabled: t3,
            refetchInterval: refreshInterval,
            staleTime: 1000,
            refetchIntervalInBackground: true
        };
        $[5] = refreshInterval;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t4);
};
_s1(useTripTracking, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useStudentTracking = (studentId, t0)=>{
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const refreshInterval = t0 === undefined ? 10000 : t0;
    let t1;
    if ($[1] !== studentId) {
        t1 = TRACKING_KEYS.studentTracking(studentId);
        $[1] = studentId;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== studentId) {
        t2 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getStudentTripTracking(studentId);
        $[3] = studentId;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const t3 = !!studentId;
    let t4;
    if ($[5] !== refreshInterval || $[6] !== t1 || $[7] !== t2 || $[8] !== t3) {
        t4 = {
            queryKey: t1,
            queryFn: t2,
            enabled: t3,
            refetchInterval: refreshInterval,
            staleTime: 5000,
            refetchIntervalInBackground: true
        };
        $[5] = refreshInterval;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t4);
};
_s2(useStudentTracking, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useActiveAlerts = (refreshInterval)=>{
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = TRACKING_KEYS.alerts();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const t1 = refreshInterval || 15000;
    let t2;
    if ($[2] !== t1) {
        t2 = {
            queryKey: t0,
            queryFn: _temp,
            refetchInterval: t1,
            staleTime: 10000,
            refetchIntervalInBackground: true
        };
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t2);
};
_s3(useActiveAlerts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useStopETA = (tripId, stopId, t0)=>{
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const refreshInterval = t0 === undefined ? 30000 : t0;
    let t1;
    if ($[1] !== stopId || $[2] !== tripId) {
        t1 = TRACKING_KEYS.eta(tripId, stopId);
        $[1] = stopId;
        $[2] = tripId;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== stopId || $[5] !== tripId) {
        t2 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getETAForStop(tripId, stopId);
        $[4] = stopId;
        $[5] = tripId;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const t3 = !!(tripId && stopId);
    let t4;
    if ($[7] !== refreshInterval || $[8] !== t1 || $[9] !== t2 || $[10] !== t3) {
        t4 = {
            queryKey: t1,
            queryFn: t2,
            enabled: t3,
            refetchInterval: refreshInterval,
            staleTime: 15000,
            refetchIntervalInBackground: true
        };
        $[7] = refreshInterval;
        $[8] = t1;
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t4);
};
_s4(useStopETA, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useStudentETA = (studentId, date, t0)=>{
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const refreshInterval = t0 === undefined ? 30000 : t0;
    let t1;
    if ($[1] !== date || $[2] !== studentId) {
        t1 = TRACKING_KEYS.studentETA(studentId, date);
        $[1] = date;
        $[2] = studentId;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== date || $[5] !== studentId) {
        t2 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getETAForStudent(studentId, date);
        $[4] = date;
        $[5] = studentId;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const t3 = !!studentId;
    let t4;
    if ($[7] !== refreshInterval || $[8] !== t1 || $[9] !== t2 || $[10] !== t3) {
        t4 = {
            queryKey: t1,
            queryFn: t2,
            enabled: t3,
            refetchInterval: refreshInterval,
            staleTime: 15000,
            refetchIntervalInBackground: true
        };
        $[7] = refreshInterval;
        $[8] = t1;
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t4);
};
_s5(useStudentETA, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useDriverMessages = (driverId, unreadOnly)=>{
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] !== driverId) {
        t0 = TRACKING_KEYS.driverMessages(driverId);
        $[1] = driverId;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== driverId || $[4] !== unreadOnly) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getDriverMessages(driverId, unreadOnly);
        $[3] = driverId;
        $[4] = unreadOnly;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    const t2 = !!driverId;
    let t3;
    if ($[6] !== t0 || $[7] !== t1 || $[8] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            refetchInterval: 10000,
            staleTime: 5000
        };
        $[6] = t0;
        $[7] = t1;
        $[8] = t2;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s6(useDriverMessages, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useTrackingStats = (filters, refreshInterval)=>{
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] !== filters) {
        t0 = TRACKING_KEYS.stats(filters);
        $[1] = filters;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== filters) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getTrackingStats(filters);
        $[3] = filters;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = refreshInterval || 60000;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            refetchInterval: t2,
            staleTime: 30000
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
_s7(useTrackingStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useTripHistory = (tripId)=>{
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] !== tripId) {
        t0 = TRACKING_KEYS.tripHistory(tripId);
        $[1] = tripId;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== tripId) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getTripHistory(tripId);
        $[3] = tripId;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!tripId;
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
};
_s8(useTripHistory, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useWeatherForRoute = (routeId, date)=>{
    _s9();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] !== date || $[2] !== routeId) {
        t0 = TRACKING_KEYS.weather(routeId, date);
        $[1] = date;
        $[2] = routeId;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    let t1;
    if ($[4] !== date || $[5] !== routeId) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getWeatherForRoute(routeId, date);
        $[4] = date;
        $[5] = routeId;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    const t2 = !!(routeId && date);
    let t3;
    if ($[7] !== t0 || $[8] !== t1 || $[9] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 900000,
            refetchInterval: 900000
        };
        $[7] = t0;
        $[8] = t1;
        $[9] = t2;
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s9(useWeatherForRoute, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useDriverPerformance = (driverId, period)=>{
    _s10();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] !== driverId || $[2] !== period) {
        t0 = TRACKING_KEYS.driverPerformance(driverId, period);
        $[1] = driverId;
        $[2] = period;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    let t1;
    if ($[4] !== driverId || $[5] !== period) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getDriverPerformance(driverId, period);
        $[4] = driverId;
        $[5] = period;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    const t2 = !!(driverId && period);
    let t3;
    if ($[7] !== t0 || $[8] !== t1 || $[9] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 1800000
        };
        $[7] = t0;
        $[8] = t1;
        $[9] = t2;
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s10(useDriverPerformance, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useVehiclePerformance = (vehicleId, period)=>{
    _s11();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] !== period || $[2] !== vehicleId) {
        t0 = TRACKING_KEYS.vehiclePerformance(vehicleId, period);
        $[1] = period;
        $[2] = vehicleId;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    let t1;
    if ($[4] !== period || $[5] !== vehicleId) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getVehiclePerformance(vehicleId, period);
        $[4] = period;
        $[5] = vehicleId;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    const t2 = !!(vehicleId && period);
    let t3;
    if ($[7] !== t0 || $[8] !== t1 || $[9] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 1800000
        };
        $[7] = t0;
        $[8] = t1;
        $[9] = t2;
        $[10] = t3;
    } else {
        t3 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
};
_s11(useVehiclePerformance, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useUpdateTripLocation = ()=>{
    _s12();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp2,
            onSuccess: (_, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.tripTracking(tripId_0)
                });
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.activeTrips()
                });
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
_s12(useUpdateTripLocation, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useUpdateTripStatus = ()=>{
    _s13();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp4,
            onSuccess: (updatedTrip, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId_0), updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.activeTrips()
                });
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.stats()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Trip status updated successfully");
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
_s13(useUpdateTripStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useArriveAtStop = ()=>{
    _s14();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp6,
            onSuccess: (updatedTrip, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId_0), updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.activeTrips()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Arrived at stop");
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
_s14(useArriveAtStop, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useDepartFromStop = ()=>{
    _s15();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp8,
            onSuccess: (updatedTrip, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId_0), updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.activeTrips()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Departed from stop");
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
_s15(useDepartFromStop, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useSkipStop = ()=>{
    _s16();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp10,
            onSuccess: (updatedTrip, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId_0), updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.activeTrips()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Stop marked as skipped");
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
_s16(useSkipStop, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useUpdateStudentStatus = ()=>{
    _s17();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp12,
            onSuccess: (_, t1)=>{
                const { tripId: tripId_0, studentId: studentId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.tripTracking(tripId_0)
                });
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.studentTracking(studentId_0)
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Student status updated");
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
_s17(useUpdateStudentStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useBulkUpdateStudentStatus = ()=>{
    _s18();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp14,
            onSuccess: (_, t1)=>{
                const { tripId: tripId_0, updates: updates_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.tripTracking(tripId_0)
                });
                updates_0.forEach((update)=>{
                    queryClient.invalidateQueries({
                        queryKey: TRACKING_KEYS.studentTracking(update.studentId)
                    });
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`${updates_0.length} student statuses updated`);
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
_s18(useBulkUpdateStudentStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useCreateAlert = ()=>{
    _s19();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp16,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.alerts()
                });
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.activeTrips()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Alert created successfully");
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
_s19(useCreateAlert, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useAcknowledgeAlert = ()=>{
    _s20();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp18,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.alerts()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Alert acknowledged");
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
_s20(useAcknowledgeAlert, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useResolveAlert = ()=>{
    _s21();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp20,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.alerts()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Alert resolved");
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
_s21(useResolveAlert, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useReportEmergency = ()=>{
    _s22();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp22,
            onSuccess: (emergencyId)=>{
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.alerts()
                });
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.activeTrips()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Emergency reported (ID: ${emergencyId})`);
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
_s22(useReportEmergency, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useSendMessageToDriver = ()=>{
    _s23();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp24,
            onSuccess: (messageId, t1)=>{
                const { driverId: driverId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.driverMessages(driverId_0)
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Message sent to driver");
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
_s23(useSendMessageToDriver, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useGeofenceCheck = ()=>{
    _s24();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp26,
            onError: _temp27
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s24(useGeofenceCheck, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useExportTrackingData = ()=>{
    _s25();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp28,
            onSuccess: _temp29,
            onError: _temp30
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s25(useExportTrackingData, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useReportVehicleIssue = ()=>{
    _s26();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "43921b431d9f310d28ea1b8c8abb03748e2d022c43da62a691b10b618a2066af";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp31,
            onSuccess: (issueId, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.tripTracking(tripId_0)
                });
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.alerts()
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Vehicle issue reported (ID: ${issueId})`);
            },
            onError: _temp32
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
};
_s26(useReportVehicleIssue, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].getActiveAlerts();
}
function _temp2(t0) {
    const { tripId, location } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].updateTripLocation(tripId, location);
}
function _temp3(error) {
    const errorMessage = error?.response?.data?.message || "Failed to update location";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp4(t0) {
    const { tripId, status, metadata } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].updateTripStatus(tripId, status, metadata);
}
function _temp5(error) {
    const errorMessage = error?.response?.data?.message || "Failed to update trip status";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp6(t0) {
    const { tripId, stopId, location } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].arriveAtStop(tripId, stopId, location);
}
function _temp7(error) {
    const errorMessage = error?.response?.data?.message || "Failed to record arrival";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp8(t0) {
    const { tripId, stopId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].departFromStop(tripId, stopId);
}
function _temp9(error) {
    const errorMessage = error?.response?.data?.message || "Failed to record departure";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp10(t0) {
    const { tripId, stopId, reason } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].skipStop(tripId, stopId, reason);
}
function _temp11(error) {
    const errorMessage = error?.response?.data?.message || "Failed to skip stop";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp12(t0) {
    const { tripId, studentId, status, stopId } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].updateStudentStatus(tripId, studentId, status, stopId);
}
function _temp13(error) {
    const errorMessage = error?.response?.data?.message || "Failed to update student status";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp14(t0) {
    const { tripId, updates } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].bulkUpdateStudentStatus(tripId, updates);
}
function _temp15(error) {
    const errorMessage = error?.response?.data?.message || "Failed to update student statuses";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp16(t0) {
    const { tripId, alert } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].createAlert(tripId, alert);
}
function _temp17(error) {
    const errorMessage = error?.response?.data?.message || "Failed to create alert";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp18(alertId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].acknowledgeAlert(alertId);
}
function _temp19(error) {
    const errorMessage = error?.response?.data?.message || "Failed to acknowledge alert";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp20(t0) {
    const { alertId, resolution } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].resolveAlert(alertId, resolution);
}
function _temp21(error) {
    const errorMessage = error?.response?.data?.message || "Failed to resolve alert";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp22(t0) {
    const { tripId, emergency } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].reportEmergency(tripId, emergency);
}
function _temp23(error) {
    const errorMessage = error?.response?.data?.message || "Failed to report emergency";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp24(t0) {
    const { driverId, message: driverMessage } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].sendMessageToDriver(driverId, driverMessage);
}
function _temp25(error) {
    const errorMessage = error?.response?.data?.message || "Failed to send message";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp26(t0) {
    const { tripId, location } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].checkGeofence(tripId, location);
}
function _temp27(error) {
    const errorMessage = error?.response?.data?.message || "Failed to check geofence";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp28(filters) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].exportTrackingData(filters);
}
function _temp29(blob, filters_0) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const format = filters_0.format?.toLowerCase() || "csv";
    link.download = `tracking_data_${new Date().toISOString().split("T")[0]}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Tracking data exported successfully");
}
function _temp30(error) {
    const errorMessage = error?.response?.data?.message || "Failed to export tracking data";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
function _temp31(t0) {
    const { tripId, issue } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrackingService"].reportVehicleIssue(tripId, issue);
}
function _temp32(error) {
    const errorMessage = error?.response?.data?.message || "Failed to report vehicle issue";
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/websocketService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getWebSocketService",
    ()=>getWebSocketService,
    "useWebSocket",
    ()=>useWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
'use client';
;
class WebSocketService {
    ws = null;
    eventHandlers = new Map();
    connectionStatusHandlers = [];
    config;
    reconnectAttempts = 0;
    reconnectTimer = null;
    heartbeatTimer = null;
    isManuallyDisconnected = false;
    userId = null;
    subscriptions = new Set();
    constructor(config = {}){
        this.config = {
            url: config.url || (("TURBOPACK compile-time truthy", 1) ? `ws://${window.location.hostname}:3001` : "TURBOPACK unreachable"),
            reconnectInterval: config.reconnectInterval || 5000,
            maxReconnectAttempts: config.maxReconnectAttempts || 10,
            heartbeatInterval: config.heartbeatInterval || 30000,
            enableLogging: config.enableLogging ?? true
        };
    }
    // Connection Management
    connect(userId) {
        return new Promise((resolve, reject)=>{
            try {
                if (this.ws?.readyState === WebSocket.OPEN) {
                    resolve();
                    return;
                }
                this.userId = userId || null;
                this.isManuallyDisconnected = false;
                const wsUrl = this.userId ? `${this.config.url}?userId=${this.userId}` : this.config.url;
                this.ws = new WebSocket(wsUrl);
                this.ws.onopen = ()=>{
                    this.log('WebSocket connected');
                    this.reconnectAttempts = 0;
                    this.startHeartbeat();
                    this.notifyConnectionStatus('connected');
                    // Resubscribe to previous subscriptions
                    this.subscriptions.forEach((subscription)=>{
                        this.subscribe(subscription);
                    });
                    resolve();
                };
                this.ws.onmessage = (event)=>{
                    this.handleMessage(event.data);
                };
                this.ws.onclose = (event)=>{
                    this.log(`WebSocket disconnected: ${event.code} - ${event.reason}`);
                    this.stopHeartbeat();
                    this.notifyConnectionStatus('disconnected');
                    if (!this.isManuallyDisconnected && this.reconnectAttempts < this.config.maxReconnectAttempts) {
                        this.scheduleReconnect();
                    }
                };
                this.ws.onerror = (error)=>{
                    this.log('WebSocket error:', error);
                    this.notifyConnectionStatus('error');
                    reject(error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }
    disconnect() {
        this.isManuallyDisconnected = true;
        this.clearReconnectTimer();
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close(1000, 'Manual disconnect');
            this.ws = null;
        }
        this.subscriptions.clear();
        this.log('WebSocket manually disconnected');
    }
    scheduleReconnect() {
        if (this.reconnectTimer) return;
        this.reconnectAttempts++;
        this.notifyConnectionStatus('reconnecting');
        this.log(`Scheduling reconnect attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts} in ${this.config.reconnectInterval}ms`);
        this.reconnectTimer = setTimeout(()=>{
            this.reconnectTimer = null;
            this.connect(this.userId || undefined).catch(()=>{
            // Reconnection failed, will try again if attempts remain
            });
        }, this.config.reconnectInterval);
    }
    clearReconnectTimer() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }
    // Heartbeat Management
    startHeartbeat() {
        this.heartbeatTimer = setInterval(()=>{
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.send({
                    type: 'HEARTBEAT',
                    data: {
                        timestamp: new Date().toISOString()
                    },
                    timestamp: new Date().toISOString()
                });
            }
        }, this.config.heartbeatInterval);
    }
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
    // Message Handling
    handleMessage(rawMessage) {
        try {
            const message = JSON.parse(rawMessage);
            this.log('Received message:', message);
            // Handle heartbeat responses
            if (message.type === 'HEARTBEAT') {
                return;
            }
            // Trigger event handlers
            const handlers = this.eventHandlers.get(message.type) || [];
            handlers.forEach((handler)=>{
                try {
                    handler(message.data);
                } catch (error) {
                    this.log('Error in event handler:', error);
                }
            });
        } catch (error) {
            this.log('Error parsing WebSocket message:', error);
        }
    }
    // Send Messages
    send(message) {
        if (this.ws?.readyState !== WebSocket.OPEN) {
            this.log('Cannot send message: WebSocket not connected');
            return false;
        }
        try {
            this.ws.send(JSON.stringify(message));
            this.log('Sent message:', message);
            return true;
        } catch (error) {
            this.log('Error sending message:', error);
            return false;
        }
    }
    // Event Subscription
    on(eventType, handler) {
        if (!this.eventHandlers.has(eventType)) {
            this.eventHandlers.set(eventType, []);
        }
        this.eventHandlers.get(eventType).push(handler);
        // Return unsubscribe function
        return ()=>{
            const handlers = this.eventHandlers.get(eventType) || [];
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        };
    }
    off(eventType, handler) {
        if (!handler) {
            this.eventHandlers.delete(eventType);
            return;
        }
        const handlers = this.eventHandlers.get(eventType) || [];
        const index = handlers.indexOf(handler);
        if (index > -1) {
            handlers.splice(index, 1);
        }
    }
    // Connection Status Subscription
    onConnectionStatus(handler) {
        this.connectionStatusHandlers.push(handler);
        // Return unsubscribe function
        return ()=>{
            const index = this.connectionStatusHandlers.indexOf(handler);
            if (index > -1) {
                this.connectionStatusHandlers.splice(index, 1);
            }
        };
    }
    notifyConnectionStatus(status) {
        this.connectionStatusHandlers.forEach((handler)=>{
            try {
                handler(status);
            } catch (error) {
                this.log('Error in connection status handler:', error);
            }
        });
    }
    // Subscription Management
    subscribe(subscription) {
        this.subscriptions.add(subscription);
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.send({
                type: 'SUBSCRIBE',
                data: {
                    subscription
                },
                timestamp: new Date().toISOString()
            });
        }
    }
    unsubscribe(subscription) {
        this.subscriptions.delete(subscription);
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.send({
                type: 'UNSUBSCRIBE',
                data: {
                    subscription
                },
                timestamp: new Date().toISOString()
            });
        }
    }
    // Specific Subscriptions
    subscribeTripUpdates(tripId) {
        this.subscribe(`trip:${tripId}`);
    }
    subscribeRouteUpdates(routeId) {
        this.subscribe(`route:${routeId}`);
    }
    subscribeSchoolUpdates(schoolId) {
        this.subscribe(`school:${schoolId}`);
    }
    subscribeDriverUpdates(driverId) {
        this.subscribe(`driver:${driverId}`);
    }
    subscribeAlerts() {
        this.subscribe('alerts');
    }
    subscribeSystemNotifications() {
        this.subscribe('system');
    }
    // Convenience Methods for Sending Specific Events
    updateTripLocation(tripId, location) {
        return this.send({
            type: 'TRIP_LOCATION_UPDATE',
            data: {
                location
            },
            timestamp: new Date().toISOString(),
            tripId
        });
    }
    updateStudentStatus(tripId, studentId, status) {
        return this.send({
            type: 'STUDENT_STATUS_UPDATE',
            data: {
                studentId,
                status
            },
            timestamp: new Date().toISOString(),
            tripId
        });
    }
    acknowledgeAlert(alertId) {
        return this.send({
            type: 'ALERT_ACKNOWLEDGED',
            data: {
                alertId,
                acknowledgedBy: this.userId
            },
            timestamp: new Date().toISOString()
        });
    }
    // Utility Methods
    getConnectionState() {
        if (!this.ws) return 'closed';
        switch(this.ws.readyState){
            case WebSocket.CONNECTING:
                return 'connecting';
            case WebSocket.OPEN:
                return 'open';
            case WebSocket.CLOSING:
                return 'closing';
            case WebSocket.CLOSED:
                return 'closed';
            default:
                return 'closed';
        }
    }
    isConnected() {
        return this.ws?.readyState === WebSocket.OPEN;
    }
    log(message, ...args) {
        if (this.config.enableLogging) {
            console.log(`[WebSocket] ${message}`, ...args);
        }
    }
    // Cleanup
    destroy() {
        this.disconnect();
        this.eventHandlers.clear();
        this.connectionStatusHandlers.length = 0;
    }
}
// Create singleton instance
let websocketService = null;
const getWebSocketService = ()=>{
    if (!websocketService) {
        websocketService = new WebSocketService();
    }
    return websocketService;
};
const useWebSocket = (userId)=>{
    const ws = getWebSocketService();
    // Auto-connect when component mounts
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && userId) {
        ws.connect(userId).catch((error)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to connect to real-time updates');
            console.error('WebSocket connection error:', error);
        });
    }
    return ws;
};
const __TURBOPACK__default__export__ = WebSocketService;
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
            set({
                isLoading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].login(credentials);
                if (response.success && response.data) {
                    set({
                        isAuthenticated: true,
                        user: response.data.user,
                        isLoading: false,
                        error: null
                    });
                } else {
                    throw new Error('Login failed');
                }
            } catch (error) {
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
            const authData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].initializeAuth();
            set({
                isAuthenticated: authData.isAuthenticated,
                user: authData.user,
                isLoading: false
            });
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
"[project]/src/components/parent/StudentTrackingDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentTrackingDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$timeline$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timeline$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/timeline/index.js [app-client] (ecmascript) <export default as Timeline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-client] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$empty$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Empty$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/empty/index.js [app-client] (ecmascript) <export default as Empty>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/statistic/index.js [app-client] (ecmascript) <export default as Statistic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/list/index.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/notification/index.js [app-client] (ecmascript) <export default as notification>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CarOutlined.js [app-client] (ecmascript) <export default as CarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BookOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/BookOutlined.js [app-client] (ecmascript) <export default as BookOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlayCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlayCircleOutlined.js [app-client] (ecmascript) <export default as PlayCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PauseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PauseCircleOutlined.js [app-client] (ecmascript) <export default as PauseCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AlertOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AlertOutlined.js [app-client] (ecmascript) <export default as AlertOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PhoneOutlined.js [app-client] (ecmascript) <export default as PhoneOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MessageOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MessageOutlined.js [app-client] (ecmascript) <export default as MessageOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ReloadOutlined.js [app-client] (ecmascript) <export default as ReloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AimOutlined.js [app-client] (ecmascript) <export default as AimOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CalendarOutlined.js [app-client] (ecmascript) <export default as CalendarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTracking.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$websocketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/websocketService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
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
function StudentTrackingDashboard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(90);
    if ($[0] !== "d873ed06ac517d7d99d97500a68620742b46357632804be2b0bd95a8c7e1d0de") {
        for(let $i = 0; $i < 90; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d873ed06ac517d7d99d97500a68620742b46357632804be2b0bd95a8c7e1d0de";
    }
    const { studentId } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().format("YYYY-MM-DD");
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [selectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [emergencyContactVisible, setEmergencyContactVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [, setBusLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$websocketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"])(user?.id);
    const trackingStudentId = studentId || user?.children?.[0]?.id || "";
    const { data: studentTrackingData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentTracking"])(trackingStudentId, 10000);
    const { data: etaData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentETA"])(trackingStudentId, selectedDate, 30000);
    const { data: alertsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveAlerts"])();
    let t2;
    if ($[2] !== studentTrackingData?.currentTrip?.id || $[3] !== trackingStudentId || $[4] !== ws) {
        t2 = ({
            "StudentTrackingDashboard[useEffect()]": ()=>{
                if (trackingStudentId && ws) {
                    ws.subscribe(`student:${trackingStudentId}`);
                    const unsubscribeTripUpdate = ws.on("TRIP_LOCATION_UPDATE", {
                        "StudentTrackingDashboard[useEffect() > ws.on()]": (data)=>{
                            setBusLocation(data.location);
                        }
                    }["StudentTrackingDashboard[useEffect() > ws.on()]"]);
                    const unsubscribeStudentUpdate = ws.on("STUDENT_STATUS_UPDATE", {
                        "StudentTrackingDashboard[useEffect() > ws.on()]": (data_0)=>{
                            if (data_0.studentId === trackingStudentId) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].success({
                                    message: "Student Status Updated",
                                    description: `Your child's status has been updated to: ${data_0.status}`,
                                    placement: "topRight"
                                });
                            }
                        }
                    }["StudentTrackingDashboard[useEffect() > ws.on()]"]);
                    const unsubscribeAlert = ws.on("ALERT_CREATED", {
                        "StudentTrackingDashboard[useEffect() > ws.on()]": (data_1)=>{
                            if (data_1.tripId && studentTrackingData?.currentTrip?.id === data_1.tripId) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].warning({
                                    message: "Trip Alert",
                                    description: data_1.message,
                                    placement: "topRight"
                                });
                            }
                        }
                    }["StudentTrackingDashboard[useEffect() > ws.on()]"]);
                    return ()=>{
                        unsubscribeTripUpdate();
                        unsubscribeStudentUpdate();
                        unsubscribeAlert();
                        ws.unsubscribe(`student:${trackingStudentId}`);
                    };
                }
            }
        })["StudentTrackingDashboard[useEffect()]"];
        $[2] = studentTrackingData?.currentTrip?.id;
        $[3] = trackingStudentId;
        $[4] = ws;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const t3 = studentTrackingData?.currentTrip?.id;
    let t4;
    if ($[6] !== t3 || $[7] !== trackingStudentId || $[8] !== ws) {
        t4 = [
            trackingStudentId,
            ws,
            t3
        ];
        $[6] = t3;
        $[7] = trackingStudentId;
        $[8] = ws;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t4);
    if (!trackingStudentId) {
        let t5;
        if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = {
                textAlign: "center",
                padding: "50px"
            };
            $[10] = t5;
        } else {
            t5 = $[10];
        }
        let t6;
        if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                style: t5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {
                        style: {
                            fontSize: "48px",
                            color: "#1890ff",
                            marginBottom: "16px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 129,
                        columnNumber: 29
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                        level: 4,
                        children: "No Student Information"
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 133,
                        columnNumber: 14
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                        type: "secondary",
                        children: "No student information found in your account. Please contact the school administration."
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 133,
                        columnNumber: 61
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 129,
                columnNumber: 12
            }, this);
            $[11] = t6;
        } else {
            t6 = $[11];
        }
        return t6;
    }
    if (isLoading) {
        let t5;
        if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                style: {
                    textAlign: "center",
                    padding: "50px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                        size: "large"
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 146,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "16px"
                        },
                        children: "Loading student tracking information..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 146,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 143,
                columnNumber: 12
            }, this);
            $[12] = t5;
        } else {
            t5 = $[12];
        }
        return t5;
    }
    const studentData = studentTrackingData;
    const currentTrip = studentData?.currentTrip;
    const todaysSchedule = studentData?.todaysSchedule;
    let t5;
    if ($[13] !== studentData?.recentHistory) {
        t5 = studentData?.recentHistory || [];
        $[13] = studentData?.recentHistory;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    const recentHistory = t5;
    let renderRecentHistory;
    let renderSchedule;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[15] !== alertsData?.data?.items || $[16] !== currentTrip || $[17] !== etaData || $[18] !== recentHistory || $[19] !== todaysSchedule || $[20] !== trackingStudentId) {
        const relevantAlerts = alertsData?.data?.items?.filter({
            "StudentTrackingDashboard[(anonymous)()]": (alert)=>alert.tripId === currentTrip?.id
        }["StudentTrackingDashboard[(anonymous)()]"]) || [];
        const getTripStatusColor = _StudentTrackingDashboardGetTripStatusColor;
        const getStudentStatusColor = _StudentTrackingDashboardGetStudentStatusColor;
        const renderCurrentTripInfo = {
            "StudentTrackingDashboard[renderCurrentTripInfo]": ()=>{
                if (!currentTrip) {
                    return null;
                }
                const studentStatus = currentTrip.studentsOnBoard.find({
                    "StudentTrackingDashboard[renderCurrentTripInfo > currentTrip.studentsOnBoard.find()]": (s)=>s.studentId === trackingStudentId
                }["StudentTrackingDashboard[renderCurrentTripInfo > currentTrip.studentsOnBoard.find()]"]);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                    title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {}, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 191,
                                columnNumber: 12
                            }, void 0),
                            "Current Trip",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                color: getTripStatusColor(currentTrip.status),
                                children: currentTrip.status
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 191,
                                columnNumber: 39
                            }, void 0),
                            currentTrip.status === "IN_PROGRESS" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                status: "processing",
                                text: "Live"
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 191,
                                columnNumber: 158
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 187,
                        columnNumber: 29
                    }, void 0),
                    extra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__["ReloadOutlined"], {}, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 191,
                                columnNumber: 236
                            }, void 0),
                            size: "small",
                            onClick: _StudentTrackingDashboardRenderCurrentTripInfoButtonOnClick,
                            children: "Refresh"
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 191,
                            columnNumber: 222
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 191,
                        columnNumber: 215
                    }, void 0),
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
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "16px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Route Information"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 193,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "8px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            marginBottom: "4px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {
                                                                style: {
                                                                    color: "#1890ff"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                children: currentTrip.route.routeName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                                lineNumber: 202,
                                                                columnNumber: 26
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 20
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            marginBottom: "4px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {
                                                                style: {
                                                                    color: "#52c41a"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                children: [
                                                                    "Vehicle: ",
                                                                    currentTrip.vehicleId
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                                lineNumber: 209,
                                                                columnNumber: 26
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 74
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {
                                                                style: {
                                                                    color: "#722ed1"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                                lineNumber: 213,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                children: [
                                                                    "Driver: ",
                                                                    currentTrip.driverId
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 26
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 77
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 193,
                                                columnNumber: 62
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 191,
                                        columnNumber: 409
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 191,
                                    columnNumber: 388
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    xs: 24,
                                    md: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "16px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Student Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 217,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "8px"
                                                },
                                                children: studentStatus ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                            color: getStudentStatusColor(studentStatus.status),
                                                            style: {
                                                                marginBottom: "8px"
                                                            },
                                                            children: studentStatus.status.replace("_", " ")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 42
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: "12px",
                                                                color: "#666"
                                                            },
                                                            children: [
                                                                "Last updated: ",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(studentStatus.timestamp).format("h:mm A")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 70
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 37
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    color: "default",
                                                    children: "Status Unknown"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 102
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 217,
                                                columnNumber: 59
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 215,
                                        columnNumber: 114
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 215,
                                    columnNumber: 93
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 191,
                            columnNumber: 365
                        }, this),
                        currentTrip.currentLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            message: "Bus Location",
                            description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "8px"
                                        },
                                        children: [
                                            "Current stop: ",
                                            currentTrip.currentStopId ? currentTrip.route.stops.find({
                                                "StudentTrackingDashboard[renderCurrentTripInfo > currentTrip.route.stops.find()]": (s_0)=>s_0.id === currentTrip.currentStopId
                                            }["StudentTrackingDashboard[renderCurrentTripInfo > currentTrip.route.stops.find()]"])?.name || "Unknown Stop" : "In Transit"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 224,
                                        columnNumber: 248
                                    }, void 0),
                                    currentTrip.estimatedArrival && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 232,
                                                columnNumber: 16
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                children: [
                                                    "Estimated arrival at next stop: ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(currentTrip.estimatedArrival).format("h:mm A")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 232,
                                                columnNumber: 39
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 228,
                                        columnNumber: 180
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 224,
                                columnNumber: 243
                            }, void 0),
                            type: "info",
                            style: {
                                marginTop: "16px"
                            },
                            action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                size: "small",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__["AimOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 234,
                                    columnNumber: 49
                                }, void 0),
                                children: "View Map"
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 234,
                                columnNumber: 22
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 224,
                            columnNumber: 200
                        }, this),
                        relevantAlerts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                            message: `${relevantAlerts.length} Active Alert${relevantAlerts.length > 1 ? "s" : ""}`,
                            description: relevantAlerts.map(_StudentTrackingDashboardRenderCurrentTripInfoRelevantAlertsMap).join(", "),
                            type: "warning",
                            style: {
                                marginTop: "16px"
                            },
                            showIcon: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 234,
                            columnNumber: 118
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 187,
                    columnNumber: 16
                }, this);
            }
        }["StudentTrackingDashboard[renderCurrentTripInfo]"];
        let t10;
        if ($[27] !== etaData || $[28] !== todaysSchedule) {
            t10 = ({
                "StudentTrackingDashboard[renderSchedule]": ()=>{
                    if (!todaysSchedule) {
                        return null;
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__["CalendarOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 250,
                                    columnNumber: 14
                                }, void 0),
                                "Today's Schedule"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 246,
                            columnNumber: 31
                        }, void 0),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    16
                                ],
                                children: [
                                    todaysSchedule.pickup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        md: 12,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                            size: "small",
                                            title: "Morning Pickup",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            children: "Route: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            children: todaysSchedule.pickup.routeName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 56
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 170
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            children: "Stop: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            children: todaysSchedule.pickup.stopName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 55
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 108
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            children: "Scheduled Time: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 256,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            children: todaysSchedule.pickup.estimatedTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 256,
                                                            columnNumber: 65
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 106
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    color: getTripStatusColor(todaysSchedule.pickup.status),
                                                    children: todaysSchedule.pickup.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 121
                                                }, this),
                                                etaData?.pickup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: "12px",
                                                        padding: "8px",
                                                        backgroundColor: "#f0f2ff",
                                                        borderRadius: "4px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            style: {
                                                                color: "#1890ff"
                                                            },
                                                            children: "Live ETA: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            style: {
                                                                color: "#1890ff"
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(etaData.pickup.estimatedArrival).format("h:mm A")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 41
                                                        }, this),
                                                        etaData.pickup.delayMinutes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: "12px",
                                                                color: "#fa8c16"
                                                            },
                                                            children: [
                                                                "Delayed by ",
                                                                etaData.pickup.delayMinutes,
                                                                " minutes"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 124
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 239
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                            lineNumber: 250,
                                            columnNumber: 128
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 250,
                                        columnNumber: 107
                                    }, this),
                                    todaysSchedule.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        md: 12,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                            size: "small",
                                            title: "Afternoon Dropoff",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            children: "Route: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            children: todaysSchedule.dropoff.routeName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 56
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 193
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            children: "Stop: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            children: todaysSchedule.dropoff.stopName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 55
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 109
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            children: "Scheduled Time: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            children: todaysSchedule.dropoff.estimatedTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 65
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 107
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    color: getTripStatusColor(todaysSchedule.dropoff.status),
                                                    children: todaysSchedule.dropoff.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 122
                                                }, this),
                                                etaData?.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: "12px",
                                                        padding: "8px",
                                                        backgroundColor: "#f0f2ff",
                                                        borderRadius: "4px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            strong: true,
                                                            style: {
                                                                color: "#1890ff"
                                                            },
                                                            children: "Live ETA: "
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 22
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                            style: {
                                                                color: "#1890ff"
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(etaData.dropoff.estimatedArrival).format("h:mm A")
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 281,
                                                            columnNumber: 41
                                                        }, this),
                                                        etaData.dropoff.delayMinutes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: "12px",
                                                                color: "#fa8c16"
                                                            },
                                                            children: [
                                                                "Delayed by ",
                                                                etaData.dropoff.delayMinutes,
                                                                " minutes"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 126
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 243
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                            lineNumber: 268,
                                            columnNumber: 148
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 268,
                                        columnNumber: 127
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 250,
                                columnNumber: 58
                            }, this),
                            !todaysSchedule.pickup && !todaysSchedule.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$empty$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Empty$3e$__["Empty"], {
                                description: "No trips scheduled for today",
                                style: {
                                    padding: "20px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 286,
                                columnNumber: 161
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 246,
                        columnNumber: 18
                    }, this);
                }
            })["StudentTrackingDashboard[renderSchedule]"];
            $[27] = etaData;
            $[28] = todaysSchedule;
            $[29] = t10;
        } else {
            t10 = $[29];
        }
        renderSchedule = t10;
        let t11;
        if ($[30] !== recentHistory) {
            t11 = ({
                "StudentTrackingDashboard[renderRecentHistory]": ()=>{
                    if (recentHistory.length === 0) {
                        return null;
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 309,
                                    columnNumber: 14
                                }, void 0),
                                "Recent Trip History"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 305,
                            columnNumber: 31
                        }, void 0),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$timeline$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timeline$3e$__["Timeline"], {
                            children: recentHistory.slice(0, 5).map({
                                "StudentTrackingDashboard[renderRecentHistory > (anonymous)()]": (trip, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$timeline$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timeline$3e$__["Timeline"].Item, {
                                        color: trip.status === "COMPLETED" ? "green" : trip.status === "CANCELLED" ? "red" : "blue",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 500,
                                                        marginBottom: "4px"
                                                    },
                                                    children: [
                                                        trip.routeName,
                                                        " - ",
                                                        trip.tripType
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 224
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#666",
                                                        marginBottom: "4px"
                                                    },
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(trip.date).format("MMM DD, YYYY"),
                                                        " • ",
                                                        trip.scheduledTime
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 64
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    color: getTripStatusColor(trip.status),
                                                    children: trip.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 94
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                            lineNumber: 310,
                                            columnNumber: 219
                                        }, this)
                                    }, index, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 310,
                                        columnNumber: 99
                                    }, this)
                            }["StudentTrackingDashboard[renderRecentHistory > (anonymous)()]"])
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 309,
                            columnNumber: 64
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 305,
                        columnNumber: 18
                    }, this);
                }
            })["StudentTrackingDashboard[renderRecentHistory]"];
            $[30] = recentHistory;
            $[31] = t11;
        } else {
            t11 = $[31];
        }
        renderRecentHistory = t11;
        if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
            t6 = {
                padding: "24px"
            };
            $[32] = t6;
        } else {
            t6 = $[32];
        }
        let t12;
        if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = {
                marginBottom: "24px"
            };
            $[33] = t12;
        } else {
            t12 = $[33];
        }
        let t13;
        if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                        level: 3,
                        style: {
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 351,
                                columnNumber: 12
                            }, this),
                            "Student Transportation"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 346,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                        type: "secondary",
                        children: "Real-time tracking and schedule information for your child"
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 351,
                        columnNumber: 58
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 346,
                columnNumber: 13
            }, this);
            $[34] = t13;
        } else {
            t13 = $[34];
        }
        let t14;
        if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__["PhoneOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 358,
                    columnNumber: 27
                }, void 0),
                onClick: {
                    "StudentTrackingDashboard[<Button>.onClick]": ()=>setEmergencyContactVisible(true)
                }["StudentTrackingDashboard[<Button>.onClick]"],
                type: "primary",
                danger: true,
                children: "Emergency Contact"
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 358,
                columnNumber: 13
            }, this);
            $[35] = t14;
        } else {
            t14 = $[35];
        }
        if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                justify: "space-between",
                align: "middle",
                style: t12,
                children: [
                    t13,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                t14,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MessageOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageOutlined$3e$__["MessageOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 366,
                                        columnNumber: 104
                                    }, void 0),
                                    children: "Contact School"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 366,
                                    columnNumber: 90
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 366,
                            columnNumber: 78
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 366,
                        columnNumber: 73
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 366,
                columnNumber: 12
            }, this);
            $[36] = t7;
        } else {
            t7 = $[36];
        }
        let t15;
        let t16;
        if ($[37] === Symbol.for("react.memo_cache_sentinel")) {
            t15 = [
                16,
                16
            ];
            t16 = {
                marginBottom: "24px"
            };
            $[37] = t15;
            $[38] = t16;
        } else {
            t15 = $[37];
            t16 = $[38];
        }
        const t17 = currentTrip ? currentTrip.status : "No Active Trip";
        const t18 = currentTrip?.status === "IN_PROGRESS" ? "#52c41a" : "#666";
        let t19;
        if ($[39] !== t18) {
            t19 = {
                color: t18,
                fontSize: "16px"
            };
            $[39] = t18;
            $[40] = t19;
        } else {
            t19 = $[40];
        }
        let t20;
        if ($[41] !== currentTrip?.status) {
            t20 = currentTrip?.status === "IN_PROGRESS" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlayCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircleOutlined$3e$__["PlayCircleOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 399,
                columnNumber: 53
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PauseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircleOutlined$3e$__["PauseCircleOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 399,
                columnNumber: 78
            }, this);
            $[41] = currentTrip?.status;
            $[42] = t20;
        } else {
            t20 = $[42];
        }
        let t21;
        if ($[43] !== t17 || $[44] !== t19 || $[45] !== t20) {
            t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                xs: 24,
                sm: 8,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                        title: "Current Status",
                        value: t17,
                        valueStyle: t19,
                        prefix: t20
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 407,
                        columnNumber: 39
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 407,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 407,
                columnNumber: 13
            }, this);
            $[43] = t17;
            $[44] = t19;
            $[45] = t20;
            $[46] = t21;
        } else {
            t21 = $[46];
        }
        let t22;
        if ($[47] !== etaData) {
            t22 = etaData?.pickup ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(etaData.pickup.estimatedArrival).format("h:mm A") : etaData?.dropoff ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(etaData.dropoff.estimatedArrival).format("h:mm A") : "No scheduled trips";
            $[47] = etaData;
            $[48] = t22;
        } else {
            t22 = $[48];
        }
        let t23;
        let t24;
        if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
            t23 = {
                fontSize: "16px"
            };
            t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 429,
                columnNumber: 13
            }, this);
            $[49] = t23;
            $[50] = t24;
        } else {
            t23 = $[49];
            t24 = $[50];
        }
        let t25;
        if ($[51] !== t22) {
            t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                xs: 24,
                sm: 8,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                        title: "Next Pickup/Dropoff",
                        value: t22,
                        valueStyle: t23,
                        prefix: t24
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 438,
                        columnNumber: 39
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 438,
                    columnNumber: 33
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 438,
                columnNumber: 13
            }, this);
            $[51] = t22;
            $[52] = t25;
        } else {
            t25 = $[52];
        }
        const t26 = relevantAlerts.length > 0 ? "#f5222d" : "#52c41a";
        let t27;
        if ($[53] !== t26) {
            t27 = {
                color: t26,
                fontSize: "16px"
            };
            $[53] = t26;
            $[54] = t27;
        } else {
            t27 = $[54];
        }
        let t28;
        if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
            t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AlertOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOutlined$3e$__["AlertOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 458,
                columnNumber: 13
            }, this);
            $[55] = t28;
        } else {
            t28 = $[55];
        }
        const t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                title: "Active Alerts",
                value: relevantAlerts.length,
                valueStyle: t27,
                prefix: t28
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 463,
                columnNumber: 23
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 463,
            columnNumber: 17
        }, this);
        let t30;
        if ($[56] !== t29) {
            t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                xs: 24,
                sm: 8,
                children: t29
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 466,
                columnNumber: 13
            }, this);
            $[56] = t29;
            $[57] = t30;
        } else {
            t30 = $[57];
        }
        if ($[58] !== t21 || $[59] !== t25 || $[60] !== t30) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: t15,
                style: t16,
                children: [
                    t21,
                    t25,
                    t30
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 473,
                columnNumber: 12
            }, this);
            $[58] = t21;
            $[59] = t25;
            $[60] = t30;
            $[61] = t8;
        } else {
            t8 = $[61];
        }
        t9 = currentTrip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                marginBottom: "24px"
            },
            children: renderCurrentTripInfo()
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 481,
            columnNumber: 25
        }, this);
        $[15] = alertsData?.data?.items;
        $[16] = currentTrip;
        $[17] = etaData;
        $[18] = recentHistory;
        $[19] = todaysSchedule;
        $[20] = trackingStudentId;
        $[21] = renderRecentHistory;
        $[22] = renderSchedule;
        $[23] = t6;
        $[24] = t7;
        $[25] = t8;
        $[26] = t9;
    } else {
        renderRecentHistory = $[21];
        renderSchedule = $[22];
        t6 = $[23];
        t7 = $[24];
        t8 = $[25];
        t9 = $[26];
    }
    let t10;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = [
            16,
            16
        ];
        $[62] = t10;
    } else {
        t10 = $[62];
    }
    let t11;
    if ($[63] !== renderSchedule) {
        t11 = renderSchedule();
        $[63] = renderSchedule;
        $[64] = t11;
    } else {
        t11 = $[64];
    }
    let t12;
    if ($[65] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            lg: 12,
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 521,
            columnNumber: 11
        }, this);
        $[65] = t11;
        $[66] = t12;
    } else {
        t12 = $[66];
    }
    let t13;
    if ($[67] !== renderRecentHistory) {
        t13 = renderRecentHistory();
        $[67] = renderRecentHistory;
        $[68] = t13;
    } else {
        t13 = $[68];
    }
    let t14;
    if ($[69] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            lg: 12,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 537,
            columnNumber: 11
        }, this);
        $[69] = t13;
        $[70] = t14;
    } else {
        t14 = $[70];
    }
    let t15;
    if ($[71] !== t12 || $[72] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
            gutter: t10,
            children: [
                t12,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 545,
            columnNumber: 11
        }, this);
        $[71] = t12;
        $[72] = t14;
        $[73] = t15;
    } else {
        t15 = $[73];
    }
    let t16;
    if ($[74] !== currentTrip || $[75] !== todaysSchedule?.dropoff || $[76] !== todaysSchedule?.pickup) {
        t16 = !currentTrip && !todaysSchedule?.pickup && !todaysSchedule?.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            style: {
                textAlign: "center",
                padding: "50px",
                marginTop: "24px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BookOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOutlined$3e$__["BookOutlined"], {
                    style: {
                        fontSize: "48px",
                        color: "#1890ff",
                        marginBottom: "16px"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 558,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                    level: 4,
                    children: "No Trips Scheduled Today"
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 562,
                    columnNumber: 12
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    type: "secondary",
                    children: "There are no transportation schedules for today. Please check with the school if you believe this is an error."
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 562,
                    columnNumber: 61
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 554,
            columnNumber: 82
        }, this);
        $[74] = currentTrip;
        $[75] = todaysSchedule?.dropoff;
        $[76] = todaysSchedule?.pickup;
        $[77] = t16;
    } else {
        t16 = $[77];
    }
    let t17;
    if ($[78] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ({
            "StudentTrackingDashboard[<Modal>.onCancel]": ()=>setEmergencyContactVisible(false)
        })["StudentTrackingDashboard[<Modal>.onCancel]"];
        $[78] = t17;
    } else {
        t17 = $[78];
    }
    let t18;
    if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
            dataSource: [
                {
                    name: "School Transportation Office",
                    phone: "(555) 123-4567",
                    type: "Transportation"
                },
                {
                    name: "School Main Office",
                    phone: "(555) 123-4568",
                    type: "School"
                },
                {
                    name: "Emergency Services",
                    phone: "911",
                    type: "Emergency"
                }
            ],
            renderItem: _StudentTrackingDashboardListRenderItem
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 581,
            columnNumber: 11
        }, this);
        $[79] = t18;
    } else {
        t18 = $[79];
    }
    let t19;
    if ($[80] !== emergencyContactVisible) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
            title: "Emergency Contacts",
            open: emergencyContactVisible,
            onCancel: t17,
            footer: null,
            width: 500,
            children: t18
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 600,
            columnNumber: 11
        }, this);
        $[80] = emergencyContactVisible;
        $[81] = t19;
    } else {
        t19 = $[81];
    }
    let t20;
    if ($[82] !== t15 || $[83] !== t16 || $[84] !== t19 || $[85] !== t6 || $[86] !== t7 || $[87] !== t8 || $[88] !== t9) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t6,
            children: [
                t7,
                t8,
                t9,
                t15,
                t16,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 608,
            columnNumber: 11
        }, this);
        $[82] = t15;
        $[83] = t16;
        $[84] = t19;
        $[85] = t6;
        $[86] = t7;
        $[87] = t8;
        $[88] = t9;
        $[89] = t20;
    } else {
        t20 = $[89];
    }
    return t20;
}
_s(StudentTrackingDashboard, "mNITTXydxrJ/u8vNuEn/y9i9/sQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$websocketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentTracking"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentETA"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveAlerts"]
    ];
});
_c = StudentTrackingDashboard;
function _StudentTrackingDashboardListRenderItem(contact) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
        actions: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                type: "primary",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__["PhoneOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 623,
                    columnNumber: 60
                }, void 0),
                href: `tel:${contact.phone}`,
                children: "Call"
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 623,
                columnNumber: 31
            }, void 0)
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item.Meta, {
            avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__["PhoneOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 623,
                    columnNumber: 163
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 623,
                columnNumber: 149
            }, void 0),
            title: contact.name,
            description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: contact.phone
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 623,
                        columnNumber: 225
                    }, void 0),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                        color: "blue",
                        children: contact.type
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 623,
                        columnNumber: 251
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 623,
                columnNumber: 220
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 623,
            columnNumber: 125
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
        lineNumber: 623,
        columnNumber: 10
    }, this);
}
function _StudentTrackingDashboardRenderCurrentTripInfoRelevantAlertsMap(alert_0) {
    return alert_0.message;
}
function _StudentTrackingDashboardRenderCurrentTripInfoButtonOnClick() {
    return window.location.reload();
}
function _StudentTrackingDashboardGetStudentStatusColor(status_0) {
    switch(status_0){
        case "PICKED_UP":
            {
                return "blue";
            }
        case "DROPPED_OFF":
            {
                return "green";
            }
        case "ABSENT":
            {
                return "red";
            }
        case "NO_SHOW":
            {
                return "orange";
            }
        default:
            {
                return "default";
            }
    }
}
function _StudentTrackingDashboardGetTripStatusColor(status) {
    switch(status){
        case "SCHEDULED":
            {
                return "blue";
            }
        case "IN_PROGRESS":
            {
                return "green";
            }
        case "DELAYED":
            {
                return "orange";
            }
        case "COMPLETED":
            {
                return "success";
            }
        case "CANCELLED":
            {
                return "red";
            }
        default:
            {
                return "default";
            }
    }
}
var _c;
__turbopack_context__.k.register(_c, "StudentTrackingDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/parent-portal/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParentPortalPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$parent$2f$StudentTrackingDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/parent/StudentTrackingDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ParentPortalPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "a08dbf840bad2ecdd4ec457e12d14859bb5a069828ac3cd357a1b20bf1f97330") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a08dbf840bad2ecdd4ec457e12d14859bb5a069828ac3cd357a1b20bf1f97330";
    }
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    let t1;
    if ($[1] !== router || $[2] !== user) {
        t0 = ({
            "ParentPortalPage[useEffect()]": ()=>{
                if (user && user.role !== "PARENT") {
                    router.push("/dashboard");
                }
            }
        })["ParentPortalPage[useEffect()]"];
        t1 = [
            user,
            router
        ];
        $[1] = router;
        $[2] = user;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    if (!user) {
        let t2;
        if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                style: {
                    textAlign: "center",
                    padding: "50px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    message: "Access Denied",
                    description: "Please log in to access the parent portal.",
                    type: "error"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
                    lineNumber: 47,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
                lineNumber: 44,
                columnNumber: 12
            }, this);
            $[5] = t2;
        } else {
            t2 = $[5];
        }
        return t2;
    }
    if (user.role !== "PARENT") {
        let t2;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                style: {
                    textAlign: "center",
                    padding: "50px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    message: "Access Denied",
                    description: "This portal is only available for parent accounts.",
                    type: "error"
                }, void 0, false, {
                    fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
                    lineNumber: 60,
                    columnNumber: 10
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
                lineNumber: 57,
                columnNumber: 12
            }, this);
            $[6] = t2;
        } else {
            t2 = $[6];
        }
        return t2;
    }
    let t2;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$parent$2f$StudentTrackingDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    return t2;
}
_s(ParentPortalPage, "KwXbbfEKCQHud4aonJd6vGZ56ig=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ParentPortalPage;
var _c;
__turbopack_context__.k.register(_c, "ParentPortalPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_12f861ec._.js.map