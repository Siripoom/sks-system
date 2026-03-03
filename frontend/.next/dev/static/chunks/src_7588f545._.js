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
"[project]/src/services/tripService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TripService",
    ()=>TripService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
'use client';
;
class TripService {
    static BASE_PATH = '/trips';
    // Trip CRUD Operations
    static async getTrips(filters) {
        const params = new URLSearchParams();
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        if (filters?.search) params.append('search', filters.search);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
        if (filters?.driverId) params.append('driverId', filters.driverId);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.tripType) params.append('tripType', filters.tripType);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}?${params.toString()}`);
        return response.data;
    }
    static async getTripById(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
    static async createTrip(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.BASE_PATH, data);
        return response.data;
    }
    static async updateTrip(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }
    static async deleteTrip(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${id}`);
    }
    // Trip Status Management
    static async updateTripStatus(id, status) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/status`, {
            status
        });
        return response.data;
    }
    static async startTrip(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/start`);
        return response.data;
    }
    static async completeTrip(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/complete`);
        return response.data;
    }
    static async cancelTrip(id, reason) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/cancel`, {
            reason
        });
        return response.data;
    }
    // Bulk Operations
    static async bulkUpdateTrips(tripIds, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/bulk`, {
            tripIds,
            updates
        });
    }
    static async bulkCreateTrips(trips) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/bulk-create`, {
            trips
        });
        return response.data;
    }
    // Scheduling Operations
    static async createRecurringTrips(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/recurring`, data);
        return response.data;
    }
    static async duplicateTrip(tripId, newDate) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/${tripId}/duplicate`, {
            scheduledTime: newDate
        });
        return response.data;
    }
    // Driver-specific operations
    static async getDriverTrips(driverId, filters) {
        const params = new URLSearchParams();
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        if (filters?.status) params.append('status', filters.status);
        if (filters?.tripType) params.append('tripType', filters.tripType);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/drivers/${driverId}/trips?${params.toString()}`);
        return response.data;
    }
    static async getTodaysTrips(driverId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/drivers/${driverId}/trips/today`);
        return response.data;
    }
    // Vehicle-specific operations
    static async getVehicleTrips(vehicleId, filters) {
        const params = new URLSearchParams();
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        if (filters?.status) params.append('status', filters.status);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/vehicles/${vehicleId}/trips?${params.toString()}`);
        return response.data;
    }
    // Route-specific operations
    static async getRouteTrips(routeId, filters) {
        const params = new URLSearchParams();
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        if (filters?.status) params.append('status', filters.status);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/routes/${routeId}/trips?${params.toString()}`);
        return response.data;
    }
    // Student Operations
    static async getTripStudents(tripId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${tripId}/students`);
        return response.data;
    }
    static async updateStudentStatus(tripId, studentId, status) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${tripId}/students/${studentId}/status`, {
            status
        });
    }
    static async bulkUpdateStudentStatus(tripId, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${tripId}/students/bulk-status`, {
            updates
        });
    }
    // Analytics and Reporting
    static async getTripStats(filters) {
        const params = new URLSearchParams();
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.driverId) params.append('driverId', filters.driverId);
        if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/stats?${params.toString()}`);
        return response.data;
    }
    static async getTripPerformance(tripId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${tripId}/performance`);
        return response.data;
    }
    // Import/Export
    static async importTrips(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/import`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
    static async exportTrips(filters) {
        const params = new URLSearchParams();
        if (filters?.search) params.append('search', filters.search);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        if (filters?.vehicleId) params.append('vehicleId', filters.vehicleId);
        if (filters?.driverId) params.append('driverId', filters.driverId);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.tripType) params.append('tripType', filters.tripType);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/export?${params.toString()}`, {
            responseType: 'blob'
        });
        return response.data;
    }
    // Real-time tracking (for future implementation)
    static async updateTripLocation(tripId, location) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${tripId}/location`, location);
    }
    static async getTripLocation(tripId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${tripId}/location`);
        return response.data;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useTrips.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBulkCreateTrips",
    ()=>useBulkCreateTrips,
    "useBulkUpdateStudentStatus",
    ()=>useBulkUpdateStudentStatus,
    "useBulkUpdateTrips",
    ()=>useBulkUpdateTrips,
    "useCancelTrip",
    ()=>useCancelTrip,
    "useCompleteTrip",
    ()=>useCompleteTrip,
    "useCreateRecurringTrips",
    ()=>useCreateRecurringTrips,
    "useCreateTrip",
    ()=>useCreateTrip,
    "useDeleteTrip",
    ()=>useDeleteTrip,
    "useDriverTrips",
    ()=>useDriverTrips,
    "useDuplicateTrip",
    ()=>useDuplicateTrip,
    "useExportTrips",
    ()=>useExportTrips,
    "useImportTrips",
    ()=>useImportTrips,
    "useRouteTrips",
    ()=>useRouteTrips,
    "useStartTrip",
    ()=>useStartTrip,
    "useTodaysTrips",
    ()=>useTodaysTrips,
    "useTrip",
    ()=>useTrip,
    "useTripLocation",
    ()=>useTripLocation,
    "useTripPerformance",
    ()=>useTripPerformance,
    "useTripStats",
    ()=>useTripStats,
    "useTripStudents",
    ()=>useTripStudents,
    "useTrips",
    ()=>useTrips,
    "useUpdateStudentStatus",
    ()=>useUpdateStudentStatus,
    "useUpdateTrip",
    ()=>useUpdateTrip,
    "useUpdateTripLocation",
    ()=>useUpdateTripLocation,
    "useUpdateTripStatus",
    ()=>useUpdateTripStatus,
    "useVehicleTrips",
    ()=>useVehicleTrips
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/tripService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature(), _s17 = __turbopack_context__.k.signature(), _s18 = __turbopack_context__.k.signature(), _s19 = __turbopack_context__.k.signature(), _s20 = __turbopack_context__.k.signature(), _s21 = __turbopack_context__.k.signature(), _s22 = __turbopack_context__.k.signature(), _s23 = __turbopack_context__.k.signature(), _s24 = __turbopack_context__.k.signature(), _s25 = __turbopack_context__.k.signature();
'use client';
;
;
;
const QUERY_KEYS = {
    trips: 'trips',
    trip: 'trip',
    driverTrips: 'driverTrips',
    todaysTrips: 'todaysTrips',
    vehicleTrips: 'vehicleTrips',
    routeTrips: 'routeTrips',
    tripStudents: 'tripStudents',
    tripStats: 'tripStats',
    tripPerformance: 'tripPerformance'
};
function useTrips(filters) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    if ($[1] !== filters) {
        t0 = {
            queryKey: [
                QUERY_KEYS.trips,
                filters
            ],
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getTrips(filters),
            staleTime: 120000
        };
        $[1] = filters;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s(useTrips, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useTrip(id) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== id) {
        t0 = [
            QUERY_KEYS.trip,
            id
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getTripById(id);
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
            staleTime: 60000
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
_s1(useTrip, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useDriverTrips(driverId, filters) {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== driverId || $[2] !== filters) {
        t0 = [
            QUERY_KEYS.driverTrips,
            driverId,
            filters
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getDriverTrips(driverId, filters);
        $[1] = driverId;
        $[2] = filters;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    const t2 = !!driverId;
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
_s2(useDriverTrips, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useTodaysTrips(driverId) {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== driverId) {
        t0 = [
            QUERY_KEYS.todaysTrips,
            driverId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getTodaysTrips(driverId);
        $[1] = driverId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!driverId;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 30000,
            refetchInterval: 60000
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
_s3(useTodaysTrips, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useVehicleTrips(vehicleId, filters) {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== filters || $[2] !== vehicleId) {
        t0 = [
            QUERY_KEYS.vehicleTrips,
            vehicleId,
            filters
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getVehicleTrips(vehicleId, filters);
        $[1] = filters;
        $[2] = vehicleId;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    const t2 = !!vehicleId;
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
_s4(useVehicleTrips, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useRouteTrips(routeId, filters) {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== filters || $[2] !== routeId) {
        t0 = [
            QUERY_KEYS.routeTrips,
            routeId,
            filters
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getRouteTrips(routeId, filters);
        $[1] = filters;
        $[2] = routeId;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    const t2 = !!routeId;
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
_s5(useRouteTrips, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateTrip() {
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.vehicleTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeTrips
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
_s6(useCreateTrip, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].createTrip(data);
}
function useUpdateTrip() {
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp2,
            onSuccess: (updatedTrip)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.trip,
                    updatedTrip.id
                ], updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.vehicleTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeTrips
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
_s7(useUpdateTrip, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp2(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].updateTrip(id, data);
}
function useDeleteTrip() {
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp3,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.vehicleTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeTrips
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
_s8(useDeleteTrip, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Trip Status Management
function _temp3(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].deleteTrip(id);
}
function useUpdateTripStatus() {
    _s9();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp4,
            onSuccess: (updatedTrip)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.trip,
                    updatedTrip.id
                ], updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.todaysTrips
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
_s9(useUpdateTripStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp4(t0) {
    const { id, status } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].updateTripStatus(id, status);
}
function useStartTrip() {
    _s10();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp5,
            onSuccess: (updatedTrip)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.trip,
                    updatedTrip.id
                ], updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.todaysTrips
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
_s10(useStartTrip, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp5(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].startTrip(id);
}
function useCompleteTrip() {
    _s11();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp6,
            onSuccess: (updatedTrip)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.trip,
                    updatedTrip.id
                ], updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.todaysTrips
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
_s11(useCompleteTrip, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp6(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].completeTrip(id);
}
function useCancelTrip() {
    _s12();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp7,
            onSuccess: (updatedTrip)=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.setQueryData([
                    QUERY_KEYS.trip,
                    updatedTrip.id
                ], updatedTrip);
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.todaysTrips
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
_s12(useCancelTrip, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Bulk Operations
function _temp7(t0) {
    const { id, reason } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].cancelTrip(id, reason);
}
function useBulkUpdateTrips() {
    _s13();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp8,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.vehicleTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeTrips
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
_s13(useBulkUpdateTrips, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp8(t0) {
    const { tripIds, updates } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].bulkUpdateTrips(tripIds, updates);
}
function useBulkCreateTrips() {
    _s14();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp9,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.vehicleTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeTrips
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
_s14(useBulkCreateTrips, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Scheduling Operations
function _temp9(trips) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].bulkCreateTrips(trips);
}
function useCreateRecurringTrips() {
    _s15();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp10,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.vehicleTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeTrips
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
_s15(useCreateRecurringTrips, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp10(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].createRecurringTrips(data);
}
function useDuplicateTrip() {
    _s16();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp11,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.driverTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.vehicleTrips
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.routeTrips
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
_s16(useDuplicateTrip, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Student Operations
function _temp11(t0) {
    const { tripId, newDate } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].duplicateTrip(tripId, newDate);
}
function useTripStudents(tripId) {
    _s17();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== tripId) {
        t0 = [
            QUERY_KEYS.tripStudents,
            tripId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getTripStudents(tripId);
        $[1] = tripId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!tripId;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 60000
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
_s17(useTripStudents, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useUpdateStudentStatus() {
    _s18();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp12,
            onSuccess: (_, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.tripStudents,
                        tripId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trip,
                        tripId_0
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
_s18(useUpdateStudentStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp12(t0) {
    const { tripId, studentId, status } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].updateStudentStatus(tripId, studentId, status);
}
function useBulkUpdateStudentStatus() {
    _s19();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp13,
            onSuccess: (_, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.tripStudents,
                        tripId_0
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trip,
                        tripId_0
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
_s19(useBulkUpdateStudentStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Import/Export
function _temp13(t0) {
    const { tripId, updates } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].bulkUpdateStudentStatus(tripId, updates);
}
function useImportTrips() {
    _s20();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp14,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trips
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
_s20(useImportTrips, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp14(file) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].importTrips(file);
}
function useExportTrips() {
    _s21();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp15
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s21(useExportTrips, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
// Analytics
function _temp15(filters) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].exportTrips(filters);
}
function useTripStats(filters) {
    _s22();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    if ($[1] !== filters) {
        t0 = {
            queryKey: [
                QUERY_KEYS.tripStats,
                filters
            ],
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getTripStats(filters),
            staleTime: 300000
        };
        $[1] = filters;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s22(useTripStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useTripPerformance(tripId) {
    _s23();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== tripId) {
        t0 = [
            QUERY_KEYS.tripPerformance,
            tripId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getTripPerformance(tripId);
        $[1] = tripId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!tripId;
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
_s23(useTripPerformance, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useUpdateTripLocation() {
    _s24();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp16,
            onSuccess: (_, t1)=>{
                const { tripId: tripId_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: [
                        QUERY_KEYS.trip,
                        tripId_0
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
_s24(useUpdateTripLocation, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp16(t0) {
    const { tripId, location } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].updateTripLocation(tripId, location);
}
function useTripLocation(tripId) {
    _s25();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1723b9d88e7a0fb7f85c16b204351e2c116c189a3ffb3dacaae0c84de9a7f546";
    }
    let t0;
    let t1;
    if ($[1] !== tripId) {
        t0 = [
            "tripLocation",
            tripId
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$tripService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TripService"].getTripLocation(tripId);
        $[1] = tripId;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    const t2 = !!tripId;
    let t3;
    if ($[4] !== t0 || $[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 10000,
            refetchInterval: 15000
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
_s25(useTripLocation, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
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
"[project]/src/services/vehicleService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VehicleService",
    ()=>VehicleService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
;
class VehicleService {
    static BASE_PATH = '/vehicles';
    static async getVehicles(params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(this.BASE_PATH, {
            params
        });
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to fetch vehicles');
        }
        if (!response.data) {
            throw new Error('No data received from vehicles API');
        }
        return response.data;
    }
    static async getVehicle(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
    static async createVehicle(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.BASE_PATH, data);
        return response.data;
    }
    static async updateVehicle(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }
    static async deleteVehicle(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${id}`);
    }
    static async searchVehicles(query, params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/search`, {
            params: {
                q: query,
                ...params
            }
        });
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to search vehicles');
        }
        if (!response.data) {
            throw new Error('No data received from vehicle search API');
        }
        return response.data;
    }
    static async getVehicleStats(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}/stats`);
        return response.data;
    }
    static async updateVehicleStatus(id, status) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/status`, {
            status
        });
        return response.data;
    }
    static async updateMaintenanceStatus(id, maintenanceStatus, notes) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/maintenance`, {
            maintenanceStatus,
            notes
        });
        return response.data;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useVehicles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateVehicle",
    ()=>useCreateVehicle,
    "useDeleteVehicle",
    ()=>useDeleteVehicle,
    "useSearchVehicles",
    ()=>useSearchVehicles,
    "useUpdateMaintenanceStatus",
    ()=>useUpdateMaintenanceStatus,
    "useUpdateVehicle",
    ()=>useUpdateVehicle,
    "useUpdateVehicleStatus",
    ()=>useUpdateVehicleStatus,
    "useVehicle",
    ()=>useVehicle,
    "useVehicleStats",
    ()=>useVehicleStats,
    "useVehicles",
    ()=>useVehicles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/vehicleService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature();
;
;
;
;
function useVehicles(params) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    let t0;
    if ($[1] !== params) {
        t0 = {
            queryKey: [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLES,
                params
            ],
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].getVehicles(params),
            staleTime: 300000
        };
        $[1] = params;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s(useVehicles, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useVehicle(id) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    let t0;
    if ($[1] !== id) {
        t0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLE(id);
        $[1] = id;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== id) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].getVehicle(id);
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
_s1(useVehicle, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateVehicle() {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLES
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
_s2(useCreateVehicle, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].createVehicle(data);
}
function useUpdateVehicle() {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp2,
            onSuccess: (_, t1)=>{
                const { id: id_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLES
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLE(id_0)
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
_s3(useUpdateVehicle, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp2(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].updateVehicle(id, data);
}
function useDeleteVehicle() {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp3,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLES
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
_s4(useDeleteVehicle, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp3(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].deleteVehicle(id);
}
function useUpdateVehicleStatus() {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp4,
            onSuccess: (_, t1)=>{
                const { id: id_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLES
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLE(id_0)
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
_s5(useUpdateVehicleStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp4(t0) {
    const { id, status } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].updateVehicleStatus(id, status);
}
function useUpdateMaintenanceStatus() {
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp5,
            onSuccess: (_, t1)=>{
                const { id: id_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLES
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLE(id_0)
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
_s6(useUpdateMaintenanceStatus, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp5(t0) {
    const { id, maintenanceStatus, notes } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].updateMaintenanceStatus(id, maintenanceStatus, notes);
}
function useSearchVehicles(query, params) {
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    let t0;
    let t1;
    if ($[1] !== params || $[2] !== query) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLES,
            "search",
            query,
            params
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].searchVehicles(query, params);
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
_s7(useSearchVehicles, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useVehicleStats(id) {
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82422b0b1bcb20924475a960db95b1fac2f14ea616ee194e69ca3be6b532285a";
    }
    let t0;
    let t1;
    if ($[1] !== id) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].VEHICLE(id),
            "stats"
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$vehicleService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleService"].getVehicleStats(id);
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
_s8(useVehicleStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/userService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserService",
    ()=>UserService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-client] (ecmascript)");
;
class UserService {
    static BASE_PATH = '/users';
    static async getUsers(params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(this.BASE_PATH, {
            params
        });
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to fetch users');
        }
        if (!response.data) {
            throw new Error('No data received from users API');
        }
        console.log('Fetched users:', response.data);
        return {
            success: true,
            data: response.data
        };
    }
    static async getUser(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}`);
        return response.data;
    }
    static async createUser(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.BASE_PATH, data);
        return response.data;
    }
    static async updateUser(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }
    static async deleteUser(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/${id}`);
    }
    static async searchUsers(query, params) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/search`, {
            params: {
                q: query,
                ...params
            }
        });
        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to search users');
        }
        if (!response.data) {
            throw new Error('No data received from user search API');
        }
        return {
            success: true,
            data: response.data
        };
    }
    static async getUserProfile() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/auth/profile');
        return response.data;
    }
    static async updateUserProfile(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put('/auth/profile', data);
        return response.data;
    }
    static async changePassword(currentPassword, newPassword) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/change-password', {
            currentPassword,
            newPassword
        });
    }
    static async updateUserRole(id, role) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/${id}/role`, {
            role
        });
        return response.data;
    }
    static async bulkUpdateUsers(userIds, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/bulk-update`, {
            userIds,
            updates
        });
    }
    static async getUserStats(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/${id}/stats`);
        return response.data;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useUsers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBulkUpdateUsers",
    ()=>useBulkUpdateUsers,
    "useChangePassword",
    ()=>useChangePassword,
    "useCreateUser",
    ()=>useCreateUser,
    "useDeleteUser",
    ()=>useDeleteUser,
    "useSearchUsers",
    ()=>useSearchUsers,
    "useUpdateUser",
    ()=>useUpdateUser,
    "useUpdateUserProfile",
    ()=>useUpdateUserProfile,
    "useUpdateUserRole",
    ()=>useUpdateUserRole,
    "useUser",
    ()=>useUser,
    "useUserProfile",
    ()=>useUserProfile,
    "useUserStats",
    ()=>useUserStats,
    "useUsers",
    ()=>useUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/userService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature();
;
;
;
;
function useUsers(params) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    let t0;
    if ($[1] !== params) {
        t0 = {
            queryKey: [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USERS,
                params
            ],
            queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].getUsers(params),
            staleTime: 300000
        };
        $[1] = params;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s(useUsers, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useUser(id) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    let t0;
    if ($[1] !== id) {
        t0 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USER(id);
        $[1] = id;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== id) {
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].getUser(id);
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
_s1(useUser, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCreateUser() {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USERS
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
_s2(useCreateUser, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].createUser(data);
}
function useUpdateUser() {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp2,
            onSuccess: (_, t1)=>{
                const { id: id_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USERS
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USER(id_0)
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].CURRENT_USER
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
_s3(useUpdateUser, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp2(t0) {
    const { id, data } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].updateUser(id, data);
}
function useDeleteUser() {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp3,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USERS
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
_s4(useDeleteUser, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp3(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].deleteUser(id);
}
function useUserProfile() {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].CURRENT_USER,
            queryFn: _temp4,
            staleTime: 600000
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s5(useUserProfile, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function _temp4() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].getUserProfile();
}
function useUpdateUserProfile() {
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp5,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].CURRENT_USER
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
_s6(useUpdateUserProfile, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp5(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].updateUserProfile(data);
}
function useChangePassword() {
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            mutationFn: _temp6
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s7(useChangePassword, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp6(t0) {
    const { currentPassword, newPassword } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].changePassword(currentPassword, newPassword);
}
function useUpdateUserRole() {
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp7,
            onSuccess: (_, t1)=>{
                const { id: id_0 } = t1;
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USERS
                });
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USER(id_0)
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
_s8(useUpdateUserRole, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp7(t0) {
    const { id, role } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].updateUserRole(id, role);
}
function useBulkUpdateUsers() {
    _s9();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = {
            mutationFn: _temp8,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USERS
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
_s9(useBulkUpdateUsers, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp8(t0) {
    const { userIds, updates } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].bulkUpdateUsers(userIds, updates);
}
function useSearchUsers(query, params) {
    _s10();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    let t0;
    let t1;
    if ($[1] !== params || $[2] !== query) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USERS,
            "search",
            query,
            params
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].searchUsers(query, params);
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
_s10(useSearchUsers, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useUserStats(id) {
    _s11();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1f1976e7072f3eeafa265b0a079eee9cef04b2b73460a32bd415e3771cfc1e";
    }
    let t0;
    let t1;
    if ($[1] !== id) {
        t0 = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUERY_KEYS"].USER(id),
            "stats"
        ];
        t1 = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserService"].getUserStats(id);
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
_s11(useUserStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
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
"[project]/src/components/trips/TripList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TripList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tooltip/index.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/date-picker/index.js [app-client] (ecmascript) <export default as DatePicker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/dropdown/index.js [app-client] (ecmascript) <export default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$upload$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/upload/index.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/progress/index.js [app-client] (ecmascript) <export default as Progress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlusOutlined.js [app-client] (ecmascript) <export default as PlusOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EditOutlined.js [app-client] (ecmascript) <export default as EditOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DeleteOutlined.js [app-client] (ecmascript) <export default as DeleteOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SearchOutlined.js [app-client] (ecmascript) <export default as SearchOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ScheduleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScheduleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ScheduleOutlined.js [app-client] (ecmascript) <export default as ScheduleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CarOutlined.js [app-client] (ecmascript) <export default as CarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MoreOutlined.js [app-client] (ecmascript) <export default as MoreOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$GroupOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/GroupOutlined.js [app-client] (ecmascript) <export default as GroupOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UploadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UploadOutlined.js [app-client] (ecmascript) <export default as UploadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DownloadOutlined.js [app-client] (ecmascript) <export default as DownloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlayCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlayCircleOutlined.js [app-client] (ecmascript) <export default as PlayCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js [app-client] (ecmascript) <export default as CheckCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CloseCircleOutlined.js [app-client] (ecmascript) <export default as CloseCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/TeamOutlined.js [app-client] (ecmascript) <export default as TeamOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CopyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CopyOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CopyOutlined.js [app-client] (ecmascript) <export default as CopyOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTrips.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useVehicles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useUsers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
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
;
;
const { Title } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { Search } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
const { RangePicker } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__["DatePicker"];
function TripList({ onAdd, onEdit, onViewDetails, onManageStudents }) {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [routeFilter, setRouteFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [vehicleFilter, setVehicleFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [driverFilter, setDriverFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedRowKeys, setSelectedRowKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        current: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].DEFAULT_PAGE,
        pageSize: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].DEFAULT_PAGE_SIZE
    });
    const { data: tripsData, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrips"])({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchQuery || undefined,
        routeId: routeFilter || undefined,
        vehicleId: vehicleFilter || undefined,
        driverId: driverFilter || undefined,
        status: statusFilter || undefined,
        tripType: typeFilter || undefined,
        startDate: dateRange?.[0]?.toISOString(),
        endDate: dateRange?.[1]?.toISOString()
    });
    const { data: routesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"])({
        limit: 100
    });
    const { data: vehiclesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVehicles"])({
        limit: 100
    });
    const { data: driversData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUsers"])({
        role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].DRIVER,
        limit: 100
    });
    const deleteTripmutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteTrip"])();
    const updateStatusMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateTripStatus"])();
    const startTripMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStartTrip"])();
    const completeTripMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompleteTrip"])();
    const cancelTripMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCancelTrip"])();
    const bulkUpdateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkUpdateTrips"])();
    const importMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImportTrips"])();
    const exportMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExportTrips"])();
    const duplicateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDuplicateTrip"])();
    const handleDelete = async (id, tripInfo)=>{
        try {
            await deleteTripmutation.mutateAsync(id);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Trip "${tripInfo}" deleted successfully`);
        } catch (error_0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to delete trip');
        }
    };
    const handleStartTrip = async (id_0, tripInfo_0)=>{
        try {
            await startTripMutation.mutateAsync(id_0);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Trip "${tripInfo_0}" started successfully`);
        } catch (error_1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to start trip');
        }
    };
    const handleCompleteTrip = async (id_1, tripInfo_1)=>{
        try {
            await completeTripMutation.mutateAsync(id_1);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Trip "${tripInfo_1}" completed successfully`);
        } catch (error_2) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to complete trip');
        }
    };
    const handleCancelTrip = async (id_2, tripInfo_2)=>{
        try {
            await cancelTripMutation.mutateAsync({
                id: id_2,
                reason: 'Cancelled by admin'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Trip "${tripInfo_2}" cancelled successfully`);
        } catch (error_3) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to cancel trip');
        }
    };
    const handleBulkUpdate = async (updates)=>{
        if (selectedRowKeys.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning('Please select trips to update');
            return;
        }
        try {
            await bulkUpdateMutation.mutateAsync({
                tripIds: selectedRowKeys,
                updates
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Updated ${selectedRowKeys.length} trips successfully`);
            setSelectedRowKeys([]);
        } catch (error_4) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to update trips');
        }
    };
    const handleImport = async (file)=>{
        try {
            await importMutation.mutateAsync(file);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Trips imported successfully');
        } catch (error_5) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to import trips');
        }
    };
    const handleExport = async ()=>{
        try {
            const blob = await exportMutation.mutateAsync({
                search: searchQuery,
                routeId: routeFilter,
                vehicleId: vehicleFilter,
                driverId: driverFilter,
                status: statusFilter || undefined,
                tripType: typeFilter || undefined,
                startDate: dateRange?.[0]?.toISOString(),
                endDate: dateRange?.[1]?.toISOString()
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `trips-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Trips exported successfully');
        } catch (error_6) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to export trips');
        }
    };
    const handleDuplicate = async (trip)=>{
        const newDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().add(1, 'day').toISOString();
        try {
            await duplicateMutation.mutateAsync({
                tripId: trip.id,
                newDate
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Trip duplicated successfully');
        } catch (error_7) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to duplicate trip');
        }
    };
    const handleTableChange = (paginationConfig)=>{
        setPagination({
            current: paginationConfig.current,
            pageSize: paginationConfig.pageSize
        });
    };
    const handleSearch = (value)=>{
        setSearchQuery(value);
        setPagination((prev)=>({
                ...prev,
                current: 1
            }));
    };
    const getTripStatusColor = (status)=>{
        switch(status){
            case 'SCHEDULED':
                return 'blue';
            case 'IN_PROGRESS':
                return 'orange';
            case 'COMPLETED':
                return 'green';
            case 'CANCELLED':
                return 'red';
            default:
                return 'default';
        }
    };
    const getTripTypeColor = (type)=>{
        return type === 'PICKUP' ? 'purple' : 'cyan';
    };
    const getTripActions = (trip_0)=>{
        const canStart = trip_0.status === 'SCHEDULED';
        const canComplete = trip_0.status === 'IN_PROGRESS';
        const canCancel = trip_0.status === 'SCHEDULED' || trip_0.status === 'IN_PROGRESS';
        return [
            {
                key: 'view',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ScheduleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScheduleOutlined$3e$__["ScheduleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 223,
                    columnNumber: 13
                }, this),
                label: 'View Details',
                onClick: ()=>onViewDetails(trip_0)
            },
            {
                key: 'edit',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__["EditOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 228,
                    columnNumber: 13
                }, this),
                label: 'Edit Trip',
                onClick: ()=>onEdit(trip_0),
                disabled: trip_0.status === 'COMPLETED'
            },
            {
                type: 'divider'
            },
            {
                key: 'students',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__["TeamOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 236,
                    columnNumber: 13
                }, this),
                label: 'Manage Students',
                onClick: ()=>onManageStudents(trip_0)
            },
            {
                type: 'divider'
            },
            {
                key: 'start',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlayCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircleOutlined$3e$__["PlayCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 243,
                    columnNumber: 13
                }, this),
                label: 'Start Trip',
                onClick: ()=>handleStartTrip(trip_0.id, `${trip_0.route?.routeName} - ${trip_0.tripType}`),
                disabled: !canStart
            },
            {
                key: 'complete',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 249,
                    columnNumber: 13
                }, this),
                label: 'Complete Trip',
                onClick: ()=>handleCompleteTrip(trip_0.id, `${trip_0.route?.routeName} - ${trip_0.tripType}`),
                disabled: !canComplete
            },
            {
                key: 'cancel',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircleOutlined$3e$__["CloseCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 255,
                    columnNumber: 13
                }, this),
                label: 'Cancel Trip',
                onClick: ()=>handleCancelTrip(trip_0.id, `${trip_0.route?.routeName} - ${trip_0.tripType}`),
                disabled: !canCancel,
                danger: true
            },
            {
                type: 'divider'
            },
            {
                key: 'duplicate',
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CopyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CopyOutlined$3e$__["CopyOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 264,
                    columnNumber: 13
                }, this),
                label: 'Duplicate Trip',
                onClick: ()=>handleDuplicate(trip_0)
            }
        ];
    };
    const bulkActions = [
        {
            key: 'cancel-bulk',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircleOutlined$3e$__["CloseCircleOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/trips/TripList.tsx",
                lineNumber: 271,
                columnNumber: 11
            }, this),
            label: 'Cancel Selected',
            onClick: ()=>handleBulkUpdate({
                    status: 'CANCELLED'
                })
        },
        {
            type: 'divider'
        },
        {
            key: 'export-selected',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                fileName: "[project]/src/components/trips/TripList.tsx",
                lineNumber: 280,
                columnNumber: 11
            }, this),
            label: 'Export Selected',
            onClick: ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].info('Export selected feature coming soon');
            }
        }
    ];
    const columns = [
        {
            title: 'Trip Info',
            key: 'tripInfo',
            width: '25%',
            render: (_, record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                                backgroundColor: getTripStatusColor(record.status),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ScheduleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScheduleOutlined$3e$__["ScheduleOutlined"], {
                                style: {
                                    fontSize: '18px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        marginBottom: '4px'
                                    },
                                    children: record.route?.routeName || 'Unknown Route'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '12px',
                                        color: '#666',
                                        marginBottom: '2px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                            color: getTripTypeColor(record.tripType),
                                            children: record.tripType
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 322,
                                            columnNumber: 15
                                        }, this),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])(record.scheduledTime)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '12px',
                                        color: '#999'
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(record.scheduledTime).format('HH:mm A')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 290,
                    columnNumber: 34
                }, this)
        },
        {
            title: 'Driver & Vehicle',
            key: 'assignment',
            width: '20%',
            render: (__0, record_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    direction: "vertical",
                    size: 2,
                    children: [
                        record_0.driver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                    size: 20,
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 346,
                                        columnNumber: 39
                                    }, void 0),
                                    style: {
                                        backgroundColor: '#1890ff'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 346,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: `${record_0.driver.firstName} ${record_0.driver.lastName}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 340,
                            columnNumber: 31
                        }, this),
                        record_0.vehicle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {
                                    style: {
                                        color: '#52c41a'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 357,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        record_0.vehicle.licensePlate,
                                        " - ",
                                        record_0.vehicle.model
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 351,
                            columnNumber: 32
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 339,
                    columnNumber: 38
                }, this)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            align: 'center',
            render: (status_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                    color: getTripStatusColor(status_0),
                    children: status_0.replace('_', ' ')
                }, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 369,
                    columnNumber: 39
                }, this),
            filters: [
                {
                    text: 'Scheduled',
                    value: 'SCHEDULED'
                },
                {
                    text: 'In Progress',
                    value: 'IN_PROGRESS'
                },
                {
                    text: 'Completed',
                    value: 'COMPLETED'
                },
                {
                    text: 'Cancelled',
                    value: 'CANCELLED'
                }
            ]
        },
        {
            title: 'Timing',
            key: 'timing',
            width: '15%',
            render: (__1, record_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    direction: "vertical",
                    size: 2,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {
                                    style: {
                                        color: '#722ed1'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Scheduled: ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(record_1.scheduledTime).format('HH:mm')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 399,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this),
                        record_1.actualStartTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlayCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircleOutlined$3e$__["PlayCircleOutlined"], {
                                    style: {
                                        color: '#fa8c16'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 407,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Started: ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(record_1.actualStartTime).format('HH:mm')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 401,
                            columnNumber: 40
                        }, this),
                        record_1.actualEndTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {
                                    style: {
                                        color: '#52c41a'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 418,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Ended: ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(record_1.actualEndTime).format('HH:mm')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 421,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 412,
                            columnNumber: 38
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 389,
                    columnNumber: 38
                }, this)
        },
        {
            title: 'Progress',
            key: 'progress',
            width: '10%',
            align: 'center',
            render: (__2, record_2)=>{
                let percent = 0;
                let status_1 = 'normal';
                switch(record_2.status){
                    case 'SCHEDULED':
                        percent = 25;
                        break;
                    case 'IN_PROGRESS':
                        percent = 75;
                        status_1 = 'normal';
                        break;
                    case 'COMPLETED':
                        percent = 100;
                        status_1 = 'success';
                        break;
                    case 'CANCELLED':
                        percent = 0;
                        status_1 = 'exception';
                        break;
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__["Progress"], {
                    type: "circle",
                    percent: percent,
                    size: 40,
                    status: status_1,
                    strokeWidth: 8
                }, void 0, false, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 449,
                    columnNumber: 14
                }, this);
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '15%',
            align: 'center',
            render: (__3, record_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: "View Details",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ScheduleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScheduleOutlined$3e$__["ScheduleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 458,
                                    columnNumber: 39
                                }, void 0),
                                onClick: ()=>onViewDetails(record_3),
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 458,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 457,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: "Edit Trip",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__["EditOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 462,
                                    columnNumber: 39
                                }, void 0),
                                onClick: ()=>onEdit(record_3),
                                size: "small",
                                disabled: record_3.status === 'COMPLETED'
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 462,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 461,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                            menu: {
                                items: getTripActions(record_3)
                            },
                            trigger: [
                                'click'
                            ],
                            placement: "bottomRight",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "text",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreOutlined$3e$__["MoreOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 468,
                                    columnNumber: 39
                                }, void 0),
                                size: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 468,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 465,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__["Popconfirm"], {
                            title: "Delete Trip",
                            description: `Are you sure you want to delete this trip?`,
                            onConfirm: ()=>handleDelete(record_3.id, `${record_3.route?.routeName} - ${record_3.tripType}`),
                            okText: "Yes",
                            cancelText: "No",
                            okButtonProps: {
                                danger: true
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tooltip$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                title: "Delete Trip",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "text",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__["DeleteOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 475,
                                        columnNumber: 41
                                    }, void 0),
                                    danger: true,
                                    size: "small",
                                    loading: deleteTripmutation.isPending,
                                    disabled: record_3.status === 'IN_PROGRESS'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 475,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 456,
                    columnNumber: 38
                }, this)
        }
    ];
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys)=>setSelectedRowKeys(keys)
    };
    if (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('Failed to load trips');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '16px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                    justify: "space-between",
                    align: "middle",
                    gutter: [
                        16,
                        16
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            sm: 16,
                            md: 18,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                level: 4,
                                style: {
                                    margin: 0
                                },
                                children: "Trip Management"
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 492,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            sm: 8,
                            md: 6,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$upload$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        beforeUpload: (file_0)=>{
                                            handleImport(file_0);
                                            return false;
                                        },
                                        accept: ".csv,.xlsx",
                                        showUploadList: false,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UploadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadOutlined$3e$__["UploadOutlined"], {}, void 0, false, {
                                                fileName: "[project]/src/components/trips/TripList.tsx",
                                                lineNumber: 505,
                                                columnNumber: 31
                                            }, void 0),
                                            loading: importMutation.isPending,
                                            children: "Import"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 505,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 510,
                                            columnNumber: 29
                                        }, void 0),
                                        onClick: handleExport,
                                        loading: exportMutation.isPending,
                                        children: "Export"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        type: "primary",
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__["PlusOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 514,
                                            columnNumber: 44
                                        }, void 0),
                                        onClick: onAdd,
                                        children: "Schedule Trip"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 500,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 499,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 491,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/trips/TripList.tsx",
                lineNumber: 488,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        gutter: [
                            16,
                            16
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Search, {
                                    placeholder: "Search trips...",
                                    allowClear: true,
                                    enterButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__["SearchOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 527,
                                        columnNumber: 75
                                    }, void 0),
                                    size: "large",
                                    onSearch: handleSearch,
                                    style: {
                                        width: '100%'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 527,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    placeholder: "Select route",
                                    allowClear: true,
                                    size: "large",
                                    style: {
                                        width: '100%'
                                    },
                                    value: routeFilter || undefined,
                                    onChange: setRouteFilter,
                                    children: routesData?.data?.items?.map((route)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: route.id,
                                            children: route.routeName
                                        }, route.id, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 535,
                                            columnNumber: 54
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 532,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    placeholder: "Select status",
                                    allowClear: true,
                                    size: "large",
                                    style: {
                                        width: '100%'
                                    },
                                    value: statusFilter,
                                    onChange: setStatusFilter,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "SCHEDULED",
                                            children: "Scheduled"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 544,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "IN_PROGRESS",
                                            children: "In Progress"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 545,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "COMPLETED",
                                            children: "Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 546,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "CANCELLED",
                                            children: "Cancelled"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 547,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 541,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 540,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    placeholder: "Trip type",
                                    allowClear: true,
                                    size: "large",
                                    style: {
                                        width: '100%'
                                    },
                                    value: typeFilter,
                                    onChange: setTypeFilter,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "PICKUP",
                                            children: "Pickup"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 554,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "DROPOFF",
                                            children: "Dropoff"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 555,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 551,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 550,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trips/TripList.tsx",
                        lineNumber: 525,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        gutter: [
                            16,
                            16
                        ],
                        style: {
                            marginTop: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RangePicker, {
                                    placeholder: [
                                        'Start date',
                                        'End date'
                                    ],
                                    size: "large",
                                    style: {
                                        width: '100%'
                                    },
                                    value: dateRange,
                                    onChange: setDateRange
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 564,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 563,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    placeholder: "Select driver",
                                    allowClear: true,
                                    size: "large",
                                    style: {
                                        width: '100%'
                                    },
                                    value: driverFilter || undefined,
                                    onChange: setDriverFilter,
                                    children: driversData?.data?.items?.map((driver)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: driver.id,
                                            children: `${driver.firstName} ${driver.lastName}`
                                        }, driver.id, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 572,
                                            columnNumber: 56
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 569,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 568,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    placeholder: "Select vehicle",
                                    allowClear: true,
                                    size: "large",
                                    style: {
                                        width: '100%'
                                    },
                                    value: vehicleFilter || undefined,
                                    onChange: setVehicleFilter,
                                    children: vehiclesData?.data?.items?.map((vehicle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: vehicle.id,
                                            children: `${vehicle.licensePlate} - ${vehicle.model}`
                                        }, vehicle.id, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 581,
                                            columnNumber: 58
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripList.tsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 577,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trips/TripList.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/trips/TripList.tsx",
                lineNumber: 522,
                columnNumber: 7
            }, this),
            selectedRowKeys.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '16px',
                    padding: '8px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '4px'
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
                                    " trips selected"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 596,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                        size: "small",
                                        onClick: ()=>setSelectedRowKeys([]),
                                        children: "Clear Selection"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 603,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$dropdown$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dropdown$3e$__["Dropdown"], {
                                        menu: {
                                            items: bulkActions
                                        },
                                        trigger: [
                                            'click'
                                        ],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$GroupOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GroupOutlined$3e$__["GroupOutlined"], {}, void 0, false, {
                                                fileName: "[project]/src/components/trips/TripList.tsx",
                                                lineNumber: 609,
                                                columnNumber: 33
                                            }, void 0),
                                            loading: bulkUpdateMutation.isPending,
                                            children: "Bulk Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripList.tsx",
                                            lineNumber: 609,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripList.tsx",
                                        lineNumber: 606,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trips/TripList.tsx",
                                lineNumber: 602,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripList.tsx",
                            lineNumber: 601,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/trips/TripList.tsx",
                    lineNumber: 595,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/trips/TripList.tsx",
                lineNumber: 589,
                columnNumber: 38
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$table$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                columns: columns,
                dataSource: tripsData?.data?.items || [],
                rowKey: "id",
                loading: isLoading,
                rowSelection: rowSelection,
                pagination: {
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: tripsData?.data?.pagination.total || 0,
                    showSizeChanger: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].SHOW_SIZE_CHANGER,
                    showQuickJumper: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].SHOW_QUICK_JUMPER,
                    pageSizeOptions: [
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION"].PAGE_SIZE_OPTIONS
                    ],
                    showTotal: (total, range)=>`${range[0]}-${range[1]} of ${total} trips`
                },
                onChange: handleTableChange,
                scroll: {
                    x: 1400
                },
                size: "small"
            }, void 0, false, {
                fileName: "[project]/src/components/trips/TripList.tsx",
                lineNumber: 618,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/trips/TripList.tsx",
        lineNumber: 487,
        columnNumber: 10
    }, this);
}
_s(TripList, "NMyTyyuiA5soZSE3/G5bV9SBJ28=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrips"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVehicles"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUsers"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteTrip"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateTripStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStartTrip"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompleteTrip"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCancelTrip"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkUpdateTrips"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImportTrips"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExportTrips"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDuplicateTrip"]
    ];
});
_c = TripList;
var _c;
__turbopack_context__.k.register(_c, "TripList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/trips/TripForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TripForm
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/date-picker/index.js [app-client] (ecmascript) <export default as DatePicker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/divider/index.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$time$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TimePicker$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/time-picker/index.js [app-client] (ecmascript) <export default as TimePicker>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/checkbox/index.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SaveOutlined.js [app-client] (ecmascript) <export default as SaveOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CloseOutlined.js [app-client] (ecmascript) <export default as CloseOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CarOutlined.js [app-client] (ecmascript) <export default as CarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CalendarOutlined.js [app-client] (ecmascript) <export default as CalendarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ReloadOutlined.js [app-client] (ecmascript) <export default as ReloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTrips.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useVehicles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useUsers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
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
;
const { Title } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
function TripForm({ trip, onSuccess, onCancel }) {
    _s();
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const [isRecurring, setIsRecurring] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recurringPattern, setRecurringPattern] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'weekly',
        daysOfWeek: [
            1,
            2,
            3,
            4,
            5
        ],
        // Monday to Friday
        endDate: null,
        excludeDates: []
    });
    const isEditing = !!trip;
    const createTripMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateTrip"])();
    const updateTripMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateTrip"])();
    const createRecurringMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateRecurringTrips"])();
    const { data: routesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"])({
        limit: 100,
        isActive: true
    });
    const { data: vehiclesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVehicles"])({
        status: 'ACTIVE',
        limit: 100
    });
    const { data: driversData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUsers"])({
        role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_ROLES"].DRIVER,
        limit: 100
    });
    const isLoading = createTripMutation.isPending || updateTripMutation.isPending || createRecurringMutation.isPending;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TripForm.useEffect": ()=>{
            if (trip) {
                form.setFieldsValue({
                    routeId: trip.routeId,
                    vehicleId: trip.vehicleId,
                    driverId: trip.driverId,
                    tripType: trip.tripType,
                    scheduledDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(trip.scheduledTime),
                    scheduledTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(trip.scheduledTime),
                    status: trip.status
                });
            }
        }
    }["TripForm.useEffect"], [
        trip,
        form
    ]);
    const handleSubmit = async (values)=>{
        try {
            const scheduledDateTime = values.scheduledDate.hour(values.scheduledTime.hour()).minute(values.scheduledTime.minute()).second(0).millisecond(0);
            if (isRecurring && !isEditing) {
                // Create recurring trips
                const recurringData = {
                    routeId: values.routeId,
                    vehicleId: values.vehicleId,
                    driverId: values.driverId,
                    tripType: values.tripType,
                    scheduledTime: scheduledDateTime.toISOString(),
                    recurringPattern: {
                        type: recurringPattern.type,
                        daysOfWeek: recurringPattern.daysOfWeek,
                        endDate: recurringPattern.endDate?.toISOString() || '',
                        excludeDates: recurringPattern.excludeDates.map((date)=>date.toISOString())
                    }
                };
                await createRecurringMutation.mutateAsync(recurringData);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Recurring trips created successfully');
            } else {
                const formData = {
                    routeId: values.routeId,
                    vehicleId: values.vehicleId,
                    driverId: values.driverId,
                    tripType: values.tripType,
                    scheduledTime: scheduledDateTime.toISOString(),
                    status: values.status
                };
                if (isEditing && trip) {
                    const updateData = formData;
                    await updateTripMutation.mutateAsync({
                        id: trip.id,
                        data: updateData
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Trip updated successfully');
                } else {
                    const createData = {
                        ...formData,
                        status: 'SCHEDULED'
                    };
                    await createTripMutation.mutateAsync(createData);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Trip scheduled successfully');
                }
            }
            form.resetFields();
            setIsRecurring(false);
            onSuccess();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to save trip';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    };
    const handleReset = ()=>{
        if (trip) {
            form.setFieldsValue({
                routeId: trip.routeId,
                vehicleId: trip.vehicleId,
                driverId: trip.driverId,
                tripType: trip.tripType,
                scheduledDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(trip.scheduledTime),
                scheduledTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(trip.scheduledTime),
                status: trip.status
            });
        } else {
            form.resetFields();
        }
        setIsRecurring(false);
    };
    const handleRecurringChange = (checked)=>{
        setIsRecurring(checked);
        if (checked) {
            // Set default end date to 3 months from now
            setRecurringPattern((prev)=>({
                    ...prev,
                    endDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().add(3, 'month')
                }));
        }
    };
    const weekdays = [
        {
            label: 'Monday',
            value: 1
        },
        {
            label: 'Tuesday',
            value: 2
        },
        {
            label: 'Wednesday',
            value: 3
        },
        {
            label: 'Thursday',
            value: 4
        },
        {
            label: 'Friday',
            value: 5
        },
        {
            label: 'Saturday',
            value: 6
        },
        {
            label: 'Sunday',
            value: 0
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
                    children: isEditing ? 'Edit Trip' : 'Schedule New Trip'
                }, void 0, false, {
                    fileName: "[project]/src/components/trips/TripForm.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/trips/TripForm.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                form: form,
                layout: "vertical",
                onFinish: handleSubmit,
                initialValues: {
                    tripType: 'PICKUP',
                    scheduledDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(),
                    scheduledTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().hour(8).minute(0),
                    status: 'SCHEDULED'
                },
                autoComplete: "off",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                        children: "Trip Information"
                    }, void 0, false, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 199,
                        columnNumber: 9
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
                                    name: "routeId",
                                    label: "Route",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select route'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select route",
                                        size: "large",
                                        suffixIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 207,
                                            columnNumber: 75
                                        }, void 0),
                                        children: routesData?.data?.items?.map((route)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: route.id,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 23
                                                        }, this),
                                                        route.routeName,
                                                        route.school && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#666'
                                                            },
                                                            children: [
                                                                "- ",
                                                                route.school.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 40
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 21
                                                }, this)
                                            }, route.id, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 208,
                                                columnNumber: 56
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "tripType",
                                    label: "Trip Type",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select trip type'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select trip type",
                                        size: "large",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "PICKUP",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {
                                                            style: {
                                                                color: '#52c41a'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Pickup"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: "DROPOFF",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {
                                                            style: {
                                                                color: '#1890ff'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Drop-off"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                        children: "Assignment"
                    }, void 0, false, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 249,
                        columnNumber: 9
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
                                    name: "vehicleId",
                                    label: "Vehicle",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select vehicle'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select vehicle",
                                        size: "large",
                                        suffixIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 257,
                                            columnNumber: 77
                                        }, void 0),
                                        children: vehiclesData?.data?.items?.map((vehicle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: vehicle.id,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {}, void 0, false, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 23
                                                        }, this),
                                                        vehicle.licensePlate,
                                                        " - ",
                                                        vehicle.model,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#666'
                                                            },
                                                            children: [
                                                                "(",
                                                                vehicle.capacity,
                                                                " seats)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 21
                                                }, this)
                                            }, vehicle.id, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 258,
                                                columnNumber: 60
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "driverId",
                                    label: "Driver",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select driver'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                        placeholder: "Select driver",
                                        size: "large",
                                        suffixIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 276,
                                            columnNumber: 76
                                        }, void 0),
                                        children: driversData?.data?.items?.map((driver)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                value: driver.id,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 23
                                                        }, this),
                                                        `${driver.firstName} ${driver.lastName}`,
                                                        driver.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#666'
                                                            },
                                                            children: [
                                                                "- ",
                                                                driver.phone
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                                            lineNumber: 281,
                                                            columnNumber: 40
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 21
                                                }, this)
                                            }, driver.id, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 277,
                                                columnNumber: 58
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                        children: "Scheduling"
                    }, void 0, false, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 292,
                        columnNumber: 9
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
                                    name: "scheduledDate",
                                    label: "Scheduled Date",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select date'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__["DatePicker"], {
                                        placeholder: "Select date",
                                        size: "large",
                                        style: {
                                            width: '100%'
                                        },
                                        suffixIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__["CalendarOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 302,
                                            columnNumber: 28
                                        }, void 0),
                                        disabledDate: (current)=>current && current < (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().startOf('day')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "scheduledTime",
                                    label: "Scheduled Time",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select time'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$time$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TimePicker$3e$__["TimePicker"], {
                                        placeholder: "Select time",
                                        size: "large",
                                        style: {
                                            width: '100%'
                                        },
                                        suffixIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 313,
                                            columnNumber: 28
                                        }, void 0),
                                        format: "HH:mm",
                                        minuteStep: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    !isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    0
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 24,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                            checked: isRecurring,
                                            onChange: (e)=>handleRecurringChange(e.target.checked),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__["ReloadOutlined"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Create recurring trips"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 324,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 323,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 322,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this),
                            isRecurring && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                size: "small",
                                style: {
                                    backgroundColor: '#f8f9fa',
                                    marginBottom: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                        level: 5,
                                        children: "Recurring Pattern"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 337,
                                        columnNumber: 17
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
                                                    label: "Repeat Type",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                        value: recurringPattern.type,
                                                        onChange: (value)=>setRecurringPattern((prev_0)=>({
                                                                    ...prev_0,
                                                                    type: value
                                                                })),
                                                        size: "large",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                                value: "daily",
                                                                children: "Daily"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                                value: "weekly",
                                                                children: "Weekly"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                                value: "custom",
                                                                children: "Custom"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 340,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                xs: 24,
                                                sm: 8,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                    label: "End Date",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$date$2d$picker$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DatePicker$3e$__["DatePicker"], {
                                                        value: recurringPattern.endDate,
                                                        onChange: (date_0)=>setRecurringPattern((prev_1)=>({
                                                                    ...prev_1,
                                                                    endDate: date_0
                                                                })),
                                                        size: "large",
                                                        style: {
                                                            width: '100%'
                                                        },
                                                        disabledDate: (current_0)=>current_0 && current_0 <= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 353,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, this),
                                    (recurringPattern.type === 'weekly' || recurringPattern.type === 'custom') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                            span: 24,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                label: "Days of Week",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"].Group, {
                                                    options: weekdays,
                                                    value: recurringPattern.daysOfWeek,
                                                    onChange: (values_0)=>setRecurringPattern((prev_2)=>({
                                                                ...prev_2,
                                                                daysOfWeek: values_0
                                                            }))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                                lineNumber: 367,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 366,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 365,
                                        columnNumber: 96
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                        message: "Recurring Trip Preview",
                                        description: `This will create ${recurringPattern.type === 'daily' ? 'daily' : recurringPattern.type === 'weekly' ? 'weekly' : 'custom'} trips from ${form.getFieldValue('scheduledDate')?.format('MMM DD, YYYY') || 'selected date'} to ${recurringPattern.endDate?.format('MMM DD, YYYY') || 'end date'}${recurringPattern.daysOfWeek.length > 0 && recurringPattern.type !== 'daily' ? ` on ${recurringPattern.daysOfWeek.map((day)=>weekdays.find((w)=>w.value === day)?.label).join(', ')}` : ''}.`,
                                        type: "info",
                                        showIcon: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/trips/TripForm.tsx",
                                        lineNumber: 376,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 333,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true),
                    isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        gutter: [
                            16,
                            0
                        ],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            sm: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                name: "status",
                                label: "Trip Status",
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select status'
                                    }
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                    placeholder: "Select status",
                                    size: "large",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "SCHEDULED",
                                            children: "Scheduled"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 388,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "IN_PROGRESS",
                                            children: "In Progress"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 389,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "COMPLETED",
                                            children: "Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 390,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                            value: "CANCELLED",
                                            children: "Cancelled"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 391,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 387,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 383,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/trips/TripForm.tsx",
                            lineNumber: 382,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 381,
                        columnNumber: 23
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
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 402,
                                            columnNumber: 15
                                        }, this),
                                        "Cancel"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 400,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    onClick: handleReset,
                                    size: "large",
                                    children: "Reset"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 407,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    htmlType: "submit",
                                    loading: isLoading,
                                    size: "large",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__["SaveOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/trips/TripForm.tsx",
                                            lineNumber: 413,
                                            columnNumber: 15
                                        }, this),
                                        isRecurring && !isEditing ? 'Create Recurring Trips' : isEditing ? 'Update Trip' : 'Schedule Trip'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/trips/TripForm.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/trips/TripForm.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/trips/TripForm.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/trips/TripForm.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/trips/TripForm.tsx",
        lineNumber: 181,
        columnNumber: 10
    }, this);
}
_s(TripForm, "iKVMMZgVZpjB4rGVFfvXRyaM3sU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateTrip"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateTrip"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateRecurringTrips"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRoutes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useVehicles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVehicles"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUsers"]
    ];
});
_c = TripForm;
var _c;
__turbopack_context__.k.register(_c, "TripForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/driver/StudentCheckIn.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentCheckIn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/list/index.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-client] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/checkbox/index.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/progress/index.js [app-client] (ecmascript) <export default as Progress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-client] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js [app-client] (ecmascript) <export default as CheckCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CloseCircleOutlined.js [app-client] (ecmascript) <export default as CloseCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SearchOutlined.js [app-client] (ecmascript) <export default as SearchOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/TeamOutlined.js [app-client] (ecmascript) <export default as TeamOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PhoneOutlined.js [app-client] (ecmascript) <export default as PhoneOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/HomeOutlined.js [app-client] (ecmascript) <export default as HomeOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MedicineBoxOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MedicineBoxOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MedicineBoxOutlined.js [app-client] (ecmascript) <export default as MedicineBoxOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AlertOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AlertOutlined.js [app-client] (ecmascript) <export default as AlertOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-client] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTrips.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/format.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const { Title, Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { Search } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
function StudentCheckIn(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(134);
    if ($[0] !== "03f620d3aa0a7435b8993be9bc4dedaaa8763db803c76034c8644ccda452d9a5") {
        for(let $i = 0; $i < 134; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "03f620d3aa0a7435b8993be9bc4dedaaa8763db803c76034c8644ccda452d9a5";
    }
    const { trip, onBack } = t0;
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const [selectedStudents, setSelectedStudents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = new Map();
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const [studentStatuses, setStudentStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    const [bulkStatusModal, setBulkStatusModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const { data: tripStudentsData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTripStudents"])(trip.id);
    const updateStatusMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateStudentStatus"])();
    const bulkUpdateMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkUpdateStudentStatus"])();
    let t3;
    if ($[3] !== tripStudentsData?.data?.students) {
        t3 = tripStudentsData?.data?.students || [];
        $[3] = tripStudentsData?.data?.students;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const students = t3;
    let t4;
    let t5;
    if ($[5] !== students) {
        t4 = ({
            "StudentCheckIn[useEffect()]": ()=>{
                const initialStatuses = new Map();
                students.forEach({
                    "StudentCheckIn[useEffect() > students.forEach()]": (student)=>{
                        initialStatuses.set(student.id, {
                            studentId: student.id,
                            status: student.status || "absent",
                            timestamp: student.statusTimestamp,
                            notes: student.notes
                        });
                    }
                }["StudentCheckIn[useEffect() > students.forEach()]"]);
                setStudentStatuses(initialStatuses);
            }
        })["StudentCheckIn[useEffect()]"];
        t5 = [
            students
        ];
        $[5] = students;
        $[6] = t4;
        $[7] = t5;
    } else {
        t4 = $[6];
        t5 = $[7];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[8] !== trip.id || $[9] !== updateStatusMutation) {
        t6 = ({
            "StudentCheckIn[handleStatusChange]": async (studentId, status)=>{
                ;
                try {
                    await updateStatusMutation.mutateAsync({
                        tripId: trip.id,
                        studentId,
                        status
                    });
                    setStudentStatuses({
                        "StudentCheckIn[handleStatusChange > setStudentStatuses()]": (prev)=>{
                            const newMap = new Map(prev);
                            newMap.set(studentId, {
                                ...newMap.get(studentId),
                                status,
                                timestamp: new Date().toISOString()
                            });
                            return newMap;
                        }
                    }["StudentCheckIn[handleStatusChange > setStudentStatuses()]"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success("Student status updated successfully");
                } catch (t7) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to update student status");
                }
            }
        })["StudentCheckIn[handleStatusChange]"];
        $[8] = trip.id;
        $[9] = updateStatusMutation;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const handleStatusChange = t6;
    let t7;
    if ($[11] !== bulkUpdateMutation || $[12] !== form || $[13] !== selectedStudents || $[14] !== trip.id) {
        t7 = ({
            "StudentCheckIn[handleBulkStatusUpdate]": async (values)=>{
                if (selectedStudents.length === 0) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].warning("Please select students to update");
                    return;
                }
                ;
                try {
                    const updates = selectedStudents.map({
                        "StudentCheckIn[handleBulkStatusUpdate > selectedStudents.map()]": (studentId_0)=>({
                                studentId: studentId_0,
                                status: values.status
                            })
                    }["StudentCheckIn[handleBulkStatusUpdate > selectedStudents.map()]"]);
                    await bulkUpdateMutation.mutateAsync({
                        tripId: trip.id,
                        updates
                    });
                    setStudentStatuses({
                        "StudentCheckIn[handleBulkStatusUpdate > setStudentStatuses()]": (prev_0)=>{
                            const newMap_0 = new Map(prev_0);
                            selectedStudents.forEach({
                                "StudentCheckIn[handleBulkStatusUpdate > setStudentStatuses() > selectedStudents.forEach()]": (studentId_1)=>{
                                    newMap_0.set(studentId_1, {
                                        ...newMap_0.get(studentId_1),
                                        status: values.status,
                                        timestamp: new Date().toISOString()
                                    });
                                }
                            }["StudentCheckIn[handleBulkStatusUpdate > setStudentStatuses() > selectedStudents.forEach()]"]);
                            return newMap_0;
                        }
                    }["StudentCheckIn[handleBulkStatusUpdate > setStudentStatuses()]"]);
                    setSelectedStudents([]);
                    setBulkStatusModal(false);
                    form.resetFields();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Updated ${selectedStudents.length} students successfully`);
                } catch (t8) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error("Failed to update student statuses");
                }
            }
        })["StudentCheckIn[handleBulkStatusUpdate]"];
        $[11] = bulkUpdateMutation;
        $[12] = form;
        $[13] = selectedStudents;
        $[14] = trip.id;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    const handleBulkStatusUpdate = t7;
    const getStatusColor = _StudentCheckInGetStatusColor;
    const getStatusIcon = _StudentCheckInGetStatusIcon;
    let t8;
    if ($[16] !== searchQuery || $[17] !== statusFilter || $[18] !== studentStatuses || $[19] !== students) {
        t8 = ({
            "StudentCheckIn[getFilteredStudents]": ()=>{
                let filtered = students;
                if (searchQuery) {
                    filtered = filtered.filter({
                        "StudentCheckIn[getFilteredStudents > filtered.filter()]": (student_0)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFullName"])(student_0.firstName, student_0.lastName).toLowerCase().includes(searchQuery.toLowerCase())
                    }["StudentCheckIn[getFilteredStudents > filtered.filter()]"]);
                }
                if (statusFilter !== "all") {
                    filtered = filtered.filter({
                        "StudentCheckIn[getFilteredStudents > filtered.filter()]": (student_1)=>{
                            const status_2 = studentStatuses.get(student_1.id)?.status || "absent";
                            return status_2 === statusFilter;
                        }
                    }["StudentCheckIn[getFilteredStudents > filtered.filter()]"]);
                }
                return filtered;
            }
        })["StudentCheckIn[getFilteredStudents]"];
        $[16] = searchQuery;
        $[17] = statusFilter;
        $[18] = studentStatuses;
        $[19] = students;
        $[20] = t8;
    } else {
        t8 = $[20];
    }
    const getFilteredStudents = t8;
    let t9;
    if ($[21] !== studentStatuses || $[22] !== students) {
        const getStatusCounts = {
            "StudentCheckIn[getStatusCounts]": ()=>{
                const counts = {
                    present: 0,
                    picked_up: 0,
                    dropped_off: 0,
                    absent: 0
                };
                students.forEach({
                    "StudentCheckIn[getStatusCounts > students.forEach()]": (student_2)=>{
                        const status_3 = studentStatuses.get(student_2.id)?.status || "absent";
                        counts[status_3] = counts[status_3] + 1;
                    }
                }["StudentCheckIn[getStatusCounts > students.forEach()]"]);
                return counts;
            }
        }["StudentCheckIn[getStatusCounts]"];
        t9 = getStatusCounts();
        $[21] = studentStatuses;
        $[22] = students;
        $[23] = t9;
    } else {
        t9 = $[23];
    }
    const statusCounts = t9;
    let t10;
    if ($[24] !== getFilteredStudents) {
        t10 = getFilteredStudents();
        $[24] = getFilteredStudents;
        $[25] = t10;
    } else {
        t10 = $[25];
    }
    const filteredStudents = t10;
    let t11;
    if ($[26] !== statusCounts.dropped_off || $[27] !== statusCounts.picked_up || $[28] !== students.length) {
        t11 = students.length > 0 ? Math.round((statusCounts.picked_up + statusCounts.dropped_off) / students.length * 100) : 0;
        $[26] = statusCounts.dropped_off;
        $[27] = statusCounts.picked_up;
        $[28] = students.length;
        $[29] = t11;
    } else {
        t11 = $[29];
    }
    const completionRate = t11;
    let t12;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = {
            padding: "24px"
        };
        $[30] = t12;
    } else {
        t12 = $[30];
    }
    let t13;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = {
            marginBottom: "24px"
        };
        $[31] = t13;
    } else {
        t13 = $[31];
    }
    let t14;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
            level: 3,
            style: {
                margin: 0
            },
            children: "Student Check-In/Out"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[32] = t14;
    } else {
        t14 = $[32];
    }
    const t15 = trip.route?.routeName;
    const t16 = trip.vehicle?.licensePlate;
    let t17;
    if ($[33] !== t15 || $[34] !== t16 || $[35] !== trip.tripType) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                direction: "vertical",
                size: 0,
                children: [
                    t14,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                        type: "secondary",
                        children: [
                            t15,
                            " • ",
                            trip.tripType,
                            " • ",
                            t16
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                        lineNumber: 303,
                        columnNumber: 58
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 303,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 303,
            columnNumber: 11
        }, this);
        $[33] = t15;
        $[34] = t16;
        $[35] = trip.tripType;
        $[36] = t17;
    } else {
        t17 = $[36];
    }
    let t18;
    if ($[37] !== onBack) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                onClick: onBack,
                children: "Back to Dashboard"
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 313,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 313,
            columnNumber: 11
        }, this);
        $[37] = onBack;
        $[38] = t18;
    } else {
        t18 = $[38];
    }
    let t19;
    if ($[39] !== t17 || $[40] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
            justify: "space-between",
            align: "middle",
            style: t13,
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 321,
            columnNumber: 11
        }, this);
        $[39] = t17;
        $[40] = t18;
        $[41] = t19;
    } else {
        t19 = $[41];
    }
    let t20;
    if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = {
            marginBottom: "24px"
        };
        $[42] = t20;
    } else {
        t20 = $[42];
    }
    const t21 = `Trip Status: ${trip.status}`;
    const t22 = trip.status === "IN_PROGRESS" ? "You can check students in/out during the trip" : trip.status === "SCHEDULED" ? "Trip is scheduled. Start the trip to begin student check-in" : "Trip is completed. View-only mode.";
    const t23 = trip.status === "IN_PROGRESS" ? "info" : trip.status === "SCHEDULED" ? "warning" : "success";
    let t24;
    if ($[43] !== t21 || $[44] !== t22 || $[45] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
            style: t20,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                span: 24,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    message: t21,
                    description: t22,
                    type: t23,
                    showIcon: true
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 342,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 342,
                columnNumber: 28
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 342,
            columnNumber: 11
        }, this);
        $[43] = t21;
        $[44] = t22;
        $[45] = t23;
        $[46] = t24;
    } else {
        t24 = $[46];
    }
    let t25;
    let t26;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = [
            24,
            24
        ];
        t26 = {
            marginBottom: "24px"
        };
        $[47] = t25;
        $[48] = t26;
    } else {
        t25 = $[47];
        t26 = $[48];
    }
    let t27;
    if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = {
            textAlign: "center"
        };
        $[49] = t27;
    } else {
        t27 = $[49];
    }
    let t28;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t27,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {
                    style: {
                        fontSize: "24px",
                        color: "#1890ff"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 374,
                    columnNumber: 28
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: "8px"
                    },
                    children: "Present"
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 377,
                    columnNumber: 12
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 374,
            columnNumber: 11
        }, this);
        $[50] = t28;
    } else {
        t28 = $[50];
    }
    let t29;
    if ($[51] !== statusCounts.present) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 12,
            sm: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                    count: statusCounts.present,
                    overflowCount: 99,
                    color: "blue",
                    children: t28
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 386,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 386,
                columnNumber: 31
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 386,
            columnNumber: 11
        }, this);
        $[51] = statusCounts.present;
        $[52] = t29;
    } else {
        t29 = $[52];
    }
    let t30;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = {
            textAlign: "center"
        };
        $[53] = t30;
    } else {
        t30 = $[53];
    }
    let t31;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t30,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {
                    style: {
                        fontSize: "24px",
                        color: "#52c41a"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 403,
                    columnNumber: 28
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: "8px"
                    },
                    children: "Picked Up"
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 406,
                    columnNumber: 12
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 403,
            columnNumber: 11
        }, this);
        $[54] = t31;
    } else {
        t31 = $[54];
    }
    let t32;
    if ($[55] !== statusCounts.picked_up) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 12,
            sm: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                    count: statusCounts.picked_up,
                    overflowCount: 99,
                    color: "green",
                    children: t31
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 415,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 415,
                columnNumber: 31
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 415,
            columnNumber: 11
        }, this);
        $[55] = statusCounts.picked_up;
        $[56] = t32;
    } else {
        t32 = $[56];
    }
    let t33;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = {
            textAlign: "center"
        };
        $[57] = t33;
    } else {
        t33 = $[57];
    }
    let t34;
    if ($[58] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t33,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__["HomeOutlined"], {
                    style: {
                        fontSize: "24px",
                        color: "#722ed1"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 432,
                    columnNumber: 28
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: "8px"
                    },
                    children: "Dropped Off"
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 435,
                    columnNumber: 12
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 432,
            columnNumber: 11
        }, this);
        $[58] = t34;
    } else {
        t34 = $[58];
    }
    let t35;
    if ($[59] !== statusCounts.dropped_off) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 12,
            sm: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                    count: statusCounts.dropped_off,
                    overflowCount: 99,
                    color: "purple",
                    children: t34
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 444,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 444,
                columnNumber: 31
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 444,
            columnNumber: 11
        }, this);
        $[59] = statusCounts.dropped_off;
        $[60] = t35;
    } else {
        t35 = $[60];
    }
    let t36;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = {
            textAlign: "center"
        };
        $[61] = t36;
    } else {
        t36 = $[61];
    }
    let t37;
    if ($[62] !== completionRate) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__["Progress"], {
            type: "circle",
            percent: completionRate,
            size: 60
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 461,
            columnNumber: 11
        }, this);
        $[62] = completionRate;
        $[63] = t37;
    } else {
        t37 = $[63];
    }
    let t38;
    if ($[64] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                marginTop: "8px"
            },
            children: "Completion"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 469,
            columnNumber: 11
        }, this);
        $[64] = t38;
    } else {
        t38 = $[64];
    }
    let t39;
    if ($[65] !== t37) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 12,
            sm: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: t36,
                    children: [
                        t37,
                        t38
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 478,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 478,
                columnNumber: 31
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 478,
            columnNumber: 11
        }, this);
        $[65] = t37;
        $[66] = t39;
    } else {
        t39 = $[66];
    }
    let t40;
    if ($[67] !== t29 || $[68] !== t32 || $[69] !== t35 || $[70] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
            gutter: t25,
            style: t26,
            children: [
                t29,
                t32,
                t35,
                t39
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 486,
            columnNumber: 11
        }, this);
        $[67] = t29;
        $[68] = t32;
        $[69] = t35;
        $[70] = t39;
        $[71] = t40;
    } else {
        t40 = $[71];
    }
    let t41;
    let t42;
    if ($[72] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = [
            16,
            16
        ];
        t42 = {
            marginBottom: "24px"
        };
        $[72] = t41;
        $[73] = t42;
    } else {
        t41 = $[72];
        t42 = $[73];
    }
    let t43;
    if ($[74] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__["SearchOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 510,
            columnNumber: 11
        }, this);
        $[74] = t43;
    } else {
        t43 = $[74];
    }
    let t44;
    if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            sm: 12,
            md: 8,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Search, {
                placeholder: "Search students...",
                allowClear: true,
                enterButton: t43,
                onSearch: setSearchQuery,
                style: {
                    width: "100%"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 517,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 517,
            columnNumber: 11
        }, this);
        $[75] = t44;
    } else {
        t44 = $[75];
    }
    let t45;
    let t46;
    let t47;
    let t48;
    let t49;
    let t50;
    if ($[76] === Symbol.for("react.memo_cache_sentinel")) {
        t45 = {
            width: "100%"
        };
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "all",
            children: "All Students"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 534,
            columnNumber: 11
        }, this);
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "present",
            children: "Present"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 535,
            columnNumber: 11
        }, this);
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "picked_up",
            children: "Picked Up"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 536,
            columnNumber: 11
        }, this);
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "dropped_off",
            children: "Dropped Off"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 537,
            columnNumber: 11
        }, this);
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "absent",
            children: "Absent"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 538,
            columnNumber: 11
        }, this);
        $[76] = t45;
        $[77] = t46;
        $[78] = t47;
        $[79] = t48;
        $[80] = t49;
        $[81] = t50;
    } else {
        t45 = $[76];
        t46 = $[77];
        t47 = $[78];
        t48 = $[79];
        t49 = $[80];
        t50 = $[81];
    }
    let t51;
    if ($[82] !== statusFilter) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            sm: 12,
            md: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                placeholder: "Filter by status",
                value: statusFilter,
                onChange: setStatusFilter,
                style: t45,
                children: [
                    t46,
                    t47,
                    t48,
                    t49,
                    t50
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 555,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 555,
            columnNumber: 11
        }, this);
        $[82] = statusFilter;
        $[83] = t51;
    } else {
        t51 = $[83];
    }
    let t52;
    if ($[84] === Symbol.for("react.memo_cache_sentinel")) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TeamOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TeamOutlined$3e$__["TeamOutlined"], {}, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 563,
            columnNumber: 11
        }, this);
        $[84] = t52;
    } else {
        t52 = $[84];
    }
    const t53 = selectedStudents.length === 0 || trip.status === "COMPLETED";
    let t54;
    if ($[85] === Symbol.for("react.memo_cache_sentinel")) {
        t54 = ({
            "StudentCheckIn[<Button>.onClick]": ()=>setBulkStatusModal(true)
        })["StudentCheckIn[<Button>.onClick]"];
        $[85] = t54;
    } else {
        t54 = $[85];
    }
    let t55;
    if ($[86] !== selectedStudents.length || $[87] !== t53) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
            xs: 24,
            sm: 12,
            md: 6,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                type: "primary",
                icon: t52,
                disabled: t53,
                onClick: t54,
                block: true,
                children: [
                    "Bulk Update (",
                    selectedStudents.length,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 580,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 580,
            columnNumber: 11
        }, this);
        $[86] = selectedStudents.length;
        $[87] = t53;
        $[88] = t55;
    } else {
        t55 = $[88];
    }
    let t56;
    if ($[89] !== t51 || $[90] !== t55) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
            gutter: t41,
            style: t42,
            children: [
                t44,
                t51,
                t55
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 589,
            columnNumber: 11
        }, this);
        $[89] = t51;
        $[90] = t55;
        $[91] = t56;
    } else {
        t56 = $[91];
    }
    let t57;
    if ($[92] !== handleStatusChange || $[93] !== selectedStudents || $[94] !== studentStatuses || $[95] !== trip.status || $[96] !== trip.tripType || $[97] !== updateStatusMutation) {
        t57 = ({
            "StudentCheckIn[<List>.renderItem]": (student_3)=>{
                const status_4 = studentStatuses.get(student_3.id);
                const isSelected = selectedStudents.includes(student_3.id);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
                    style: {
                        backgroundColor: isSelected ? "#f0f2f5" : "transparent",
                        padding: "16px",
                        borderRadius: "8px",
                        marginBottom: "8px"
                    },
                    actions: [
                        trip.status === "IN_PROGRESS" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    size: "small",
                                    type: status_4?.status === "present" ? "primary" : "default",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                        lineNumber: 607,
                                        columnNumber: 151
                                    }, void 0),
                                    onClick: {
                                        "StudentCheckIn[<List>.renderItem > <Button>.onClick]": ()=>handleStatusChange(student_3.id, "present")
                                    }["StudentCheckIn[<List>.renderItem > <Button>.onClick]"],
                                    loading: updateStatusMutation.isPending,
                                    children: "Present"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 607,
                                    columnNumber: 62
                                }, void 0),
                                trip.tripType === "PICKUP" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    size: "small",
                                    type: status_4?.status === "picked_up" ? "primary" : "default",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                        lineNumber: 609,
                                        columnNumber: 248
                                    }, void 0),
                                    onClick: {
                                        "StudentCheckIn[<List>.renderItem > <Button>.onClick]": ()=>handleStatusChange(student_3.id, "picked_up")
                                    }["StudentCheckIn[<List>.renderItem > <Button>.onClick]"],
                                    loading: updateStatusMutation.isPending,
                                    children: "Pick Up"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 609,
                                    columnNumber: 157
                                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    size: "small",
                                    type: status_4?.status === "dropped_off" ? "primary" : "default",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__["HomeOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                        lineNumber: 611,
                                        columnNumber: 223
                                    }, void 0),
                                    onClick: {
                                        "StudentCheckIn[<List>.renderItem > <Button>.onClick]": ()=>handleStatusChange(student_3.id, "dropped_off")
                                    }["StudentCheckIn[<List>.renderItem > <Button>.onClick]"],
                                    loading: updateStatusMutation.isPending,
                                    children: "Drop Off"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 611,
                                    columnNumber: 130
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    size: "small",
                                    type: status_4?.status === "absent" ? "primary" : "default",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircleOutlined$3e$__["CloseCircleOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                        lineNumber: 613,
                                        columnNumber: 217
                                    }, void 0),
                                    onClick: {
                                        "StudentCheckIn[<List>.renderItem > <Button>.onClick]": ()=>handleStatusChange(student_3.id, "absent")
                                    }["StudentCheckIn[<List>.renderItem > <Button>.onClick]"],
                                    loading: updateStatusMutation.isPending,
                                    danger: status_4?.status === "absent",
                                    children: "Absent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 613,
                                    columnNumber: 129
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                            lineNumber: 607,
                            columnNumber: 55
                        }, void 0)
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item.Meta, {
                        avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                    checked: isSelected,
                                    onChange: {
                                        "StudentCheckIn[<List>.renderItem > <Checkbox>.onChange]": (e)=>{
                                            if (e.target.checked) {
                                                setSelectedStudents([
                                                    ...selectedStudents,
                                                    student_3.id
                                                ]);
                                            } else {
                                                setSelectedStudents(selectedStudents.filter({
                                                    "StudentCheckIn[<List>.renderItem > <Checkbox>.onChange > selectedStudents.filter()]": (id)=>id !== student_3.id
                                                }["StudentCheckIn[<List>.renderItem > <Checkbox>.onChange > selectedStudents.filter()]"]));
                                            }
                                        }
                                    }["StudentCheckIn[<List>.renderItem > <Checkbox>.onChange]"]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 615,
                                    columnNumber: 207
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                    size: 40,
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                        lineNumber: 625,
                                        columnNumber: 101
                                    }, void 0),
                                    style: {
                                        backgroundColor: getStatusColor(status_4?.status || "absent")
                                    },
                                    children: [
                                        student_3.firstName.charAt(0),
                                        student_3.lastName.charAt(0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 625,
                                    columnNumber: 77
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                            lineNumber: 615,
                            columnNumber: 200
                        }, void 0),
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFullName"])(student_3.firstName, student_3.lastName)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 627,
                                    columnNumber: 110
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                    color: getStatusColor(status_4?.status || "absent"),
                                    icon: getStatusIcon(status_4?.status || "absent"),
                                    children: status_4?.status?.replace("_", " ").toUpperCase() || "ABSENT"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 627,
                                    columnNumber: 180
                                }, void 0),
                                student_3.medicalInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                    color: "orange",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MedicineBoxOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MedicineBoxOutlined$3e$__["MedicineBoxOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                        lineNumber: 627,
                                        columnNumber: 410
                                    }, void 0),
                                    children: "Medical"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 627,
                                    columnNumber: 384
                                }, void 0),
                                student_3.specialNeeds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                    color: "purple",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AlertOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOutlined$3e$__["AlertOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                        lineNumber: 627,
                                        columnNumber: 502
                                    }, void 0),
                                    children: "Special Needs"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 627,
                                    columnNumber: 476
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                            lineNumber: 627,
                            columnNumber: 103
                        }, void 0),
                        description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            direction: "vertical",
                            size: 2,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#666"
                                    },
                                    children: [
                                        "Grade ",
                                        student_3.grade,
                                        " • Student ID: ",
                                        student_3.studentId
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 627,
                                    columnNumber: 601
                                }, void 0),
                                student_3.pickupAddress && trip.tripType === "PICKUP" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#666",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                            lineNumber: 636,
                                            columnNumber: 16
                                        }, void 0),
                                        "Pickup: ",
                                        student_3.pickupAddress
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 630,
                                    columnNumber: 139
                                }, void 0),
                                student_3.dropoffAddress && trip.tripType === "DROPOFF" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#666",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                            lineNumber: 642,
                                            columnNumber: 16
                                        }, void 0),
                                        "Drop-off: ",
                                        student_3.dropoffAddress
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 636,
                                    columnNumber: 139
                                }, void 0),
                                student_3.guardians && student_3.guardians.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#666",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__["PhoneOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                            lineNumber: 648,
                                            columnNumber: 16
                                        }, void 0),
                                        "Guardian: ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatFullName"])(student_3.guardians[0].firstName, student_3.guardians[0].lastName),
                                        student_3.guardians[0].phone && ` - ${student_3.guardians[0].phone}`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 642,
                                    columnNumber: 140
                                }, void 0),
                                status_4?.timestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#999",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                            lineNumber: 654,
                                            columnNumber: 16
                                        }, void 0),
                                        "Last updated: ",
                                        new Date(status_4.timestamp).toLocaleTimeString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                                    lineNumber: 648,
                                    columnNumber: 227
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                            lineNumber: 627,
                            columnNumber: 564
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                        lineNumber: 615,
                        columnNumber: 176
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 602,
                    columnNumber: 16
                }, this);
            }
        })["StudentCheckIn[<List>.renderItem]"];
        $[92] = handleStatusChange;
        $[93] = selectedStudents;
        $[94] = studentStatuses;
        $[95] = trip.status;
        $[96] = trip.tripType;
        $[97] = updateStatusMutation;
        $[98] = t57;
    } else {
        t57 = $[98];
    }
    let t58;
    if ($[99] !== filteredStudents || $[100] !== isLoading || $[101] !== t57) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                loading: isLoading,
                dataSource: filteredStudents,
                renderItem: t57
            }, void 0, false, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 669,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 669,
            columnNumber: 11
        }, this);
        $[99] = filteredStudents;
        $[100] = isLoading;
        $[101] = t57;
        $[102] = t58;
    } else {
        t58 = $[102];
    }
    let t59;
    if ($[103] === Symbol.for("react.memo_cache_sentinel")) {
        t59 = ({
            "StudentCheckIn[<Modal>.onCancel]": ()=>setBulkStatusModal(false)
        })["StudentCheckIn[<Modal>.onCancel]"];
        $[103] = t59;
    } else {
        t59 = $[103];
    }
    const t60 = `Update status for ${selectedStudents.length} selected students`;
    let t61;
    if ($[104] === Symbol.for("react.memo_cache_sentinel")) {
        t61 = {
            marginBottom: "16px"
        };
        $[104] = t61;
    } else {
        t61 = $[104];
    }
    let t62;
    if ($[105] !== t60) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
            message: t60,
            type: "info",
            style: t61
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 698,
            columnNumber: 11
        }, this);
        $[105] = t60;
        $[106] = t62;
    } else {
        t62 = $[106];
    }
    let t63;
    if ($[107] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = [
            {
                required: true,
                message: "Please select a status"
            }
        ];
        $[107] = t63;
    } else {
        t63 = $[107];
    }
    let t64;
    if ($[108] === Symbol.for("react.memo_cache_sentinel")) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "present",
            children: "Present"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 716,
            columnNumber: 11
        }, this);
        $[108] = t64;
    } else {
        t64 = $[108];
    }
    let t65;
    if ($[109] !== trip.tripType) {
        t65 = trip.tripType === "PICKUP" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "picked_up",
            children: "Picked Up"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 723,
            columnNumber: 40
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "dropped_off",
            children: "Dropped Off"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 723,
            columnNumber: 87
        }, this);
        $[109] = trip.tripType;
        $[110] = t65;
    } else {
        t65 = $[110];
    }
    let t66;
    if ($[111] === Symbol.for("react.memo_cache_sentinel")) {
        t66 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
            value: "absent",
            children: "Absent"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 731,
            columnNumber: 11
        }, this);
        $[111] = t66;
    } else {
        t66 = $[111];
    }
    let t67;
    if ($[112] !== t65) {
        t67 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
            name: "status",
            label: "New Status",
            rules: t63,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                placeholder: "Select status",
                children: [
                    t64,
                    t65,
                    t66
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                lineNumber: 738,
                columnNumber: 67
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 738,
            columnNumber: 11
        }, this);
        $[112] = t65;
        $[113] = t67;
    } else {
        t67 = $[113];
    }
    let t68;
    if ($[114] === Symbol.for("react.memo_cache_sentinel")) {
        t68 = {
            width: "100%",
            justifyContent: "flex-end"
        };
        $[114] = t68;
    } else {
        t68 = $[114];
    }
    let t69;
    if ($[115] === Symbol.for("react.memo_cache_sentinel")) {
        t69 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
            onClick: {
                "StudentCheckIn[<Button>.onClick]": ()=>setBulkStatusModal(false)
            }["StudentCheckIn[<Button>.onClick]"],
            children: "Cancel"
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 756,
            columnNumber: 11
        }, this);
        $[115] = t69;
    } else {
        t69 = $[115];
    }
    let t70;
    if ($[116] !== bulkUpdateMutation.isPending) {
        t70 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
            style: t68,
            children: [
                t69,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    type: "primary",
                    htmlType: "submit",
                    loading: bulkUpdateMutation.isPending,
                    children: "Update Status"
                }, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 765,
                    columnNumber: 35
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 765,
            columnNumber: 11
        }, this);
        $[116] = bulkUpdateMutation.isPending;
        $[117] = t70;
    } else {
        t70 = $[117];
    }
    let t71;
    if ($[118] !== form || $[119] !== handleBulkStatusUpdate || $[120] !== t62 || $[121] !== t67 || $[122] !== t70) {
        t71 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
            form: form,
            onFinish: handleBulkStatusUpdate,
            layout: "vertical",
            children: [
                t62,
                t67,
                t70
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 773,
            columnNumber: 11
        }, this);
        $[118] = form;
        $[119] = handleBulkStatusUpdate;
        $[120] = t62;
        $[121] = t67;
        $[122] = t70;
        $[123] = t71;
    } else {
        t71 = $[123];
    }
    let t72;
    if ($[124] !== bulkStatusModal || $[125] !== t71) {
        t72 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
            title: "Bulk Update Student Status",
            open: bulkStatusModal,
            onCancel: t59,
            footer: null,
            children: t71
        }, void 0, false, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 785,
            columnNumber: 11
        }, this);
        $[124] = bulkStatusModal;
        $[125] = t71;
        $[126] = t72;
    } else {
        t72 = $[126];
    }
    let t73;
    if ($[127] !== t19 || $[128] !== t24 || $[129] !== t40 || $[130] !== t56 || $[131] !== t58 || $[132] !== t72) {
        t73 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t12,
            children: [
                t19,
                t24,
                t40,
                t56,
                t58,
                t72
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
            lineNumber: 794,
            columnNumber: 11
        }, this);
        $[127] = t19;
        $[128] = t24;
        $[129] = t40;
        $[130] = t56;
        $[131] = t58;
        $[132] = t72;
        $[133] = t73;
    } else {
        t73 = $[133];
    }
    return t73;
}
_s(StudentCheckIn, "liC4PzyvZLq4hTdaIqdIzbAiJmw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTripStudents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateStudentStatus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTrips$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkUpdateStudentStatus"]
    ];
});
_c = StudentCheckIn;
function _StudentCheckInGetStatusIcon(status_1) {
    switch(status_1){
        case "present":
            {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CheckCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleOutlined$3e$__["CheckCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 811,
                    columnNumber: 16
                }, this);
            }
        case "picked_up":
            {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 815,
                    columnNumber: 16
                }, this);
            }
        case "dropped_off":
            {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__["HomeOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 819,
                    columnNumber: 16
                }, this);
            }
        case "absent":
            {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloseCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloseCircleOutlined$3e$__["CloseCircleOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 823,
                    columnNumber: 16
                }, this);
            }
        default:
            {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/driver/StudentCheckIn.tsx",
                    lineNumber: 827,
                    columnNumber: 16
                }, this);
            }
    }
}
function _StudentCheckInGetStatusColor(status_0) {
    switch(status_0){
        case "present":
            {
                return "blue";
            }
        case "picked_up":
            {
                return "green";
            }
        case "dropped_off":
            {
                return "purple";
            }
        case "absent":
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
__turbopack_context__.k.register(_c, "StudentCheckIn");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/trips/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TripsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/drawer/index.js [app-client] (ecmascript) <export default as Drawer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trips$2f$TripList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/trips/TripList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trips$2f$TripForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/trips/TripForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$driver$2f$StudentCheckIn$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/driver/StudentCheckIn.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function TripsPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(26);
    if ($[0] !== "ff496aad32c51051cfc08cfc71515ed2c6548ad76c0367c0aba21a828efa3f5b") {
        for(let $i = 0; $i < 26; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ff496aad32c51051cfc08cfc71515ed2c6548ad76c0367c0aba21a828efa3f5b";
    }
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedTrip, setSelectedTrip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [isViewMode, setIsViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStudentDrawerOpen, setIsStudentDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "TripsPage[handleAdd]": ()=>{
                setSelectedTrip(undefined);
                setIsViewMode(false);
                setIsModalOpen(true);
            }
        })["TripsPage[handleAdd]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const handleAdd = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "TripsPage[handleEdit]": (trip)=>{
                setSelectedTrip(trip);
                setIsViewMode(false);
                setIsModalOpen(true);
            }
        })["TripsPage[handleEdit]"];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const handleEdit = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "TripsPage[handleViewDetails]": (trip_0)=>{
                setSelectedTrip(trip_0);
                setIsViewMode(true);
                setIsModalOpen(true);
            }
        })["TripsPage[handleViewDetails]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const handleViewDetails = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "TripsPage[handleManageStudents]": (trip_1)=>{
                setSelectedTrip(trip_1);
                setIsStudentDrawerOpen(true);
            }
        })["TripsPage[handleManageStudents]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const handleManageStudents = t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "TripsPage[handleCloseModal]": ()=>{
                setIsModalOpen(false);
                setSelectedTrip(undefined);
                setIsViewMode(false);
            }
        })["TripsPage[handleCloseModal]"];
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const handleCloseModal = t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "TripsPage[handleSuccess]": ()=>{
                handleCloseModal();
            }
        })["TripsPage[handleSuccess]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const handleSuccess = t5;
    let t6;
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            padding: "24px"
        };
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trips$2f$TripList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onAdd: handleAdd,
            onEdit: handleEdit,
            onViewDetails: handleViewDetails,
            onManageStudents: handleManageStudents
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 109,
            columnNumber: 10
        }, this);
        $[7] = t6;
        $[8] = t7;
    } else {
        t6 = $[7];
        t7 = $[8];
    }
    const t8 = isViewMode ? `Trip Details - ${selectedTrip ? `${selectedTrip.route?.routeName} (${selectedTrip.tripType})` : ""}` : selectedTrip ? "Edit Trip" : "Schedule New Trip";
    let t9;
    if ($[9] !== isViewMode || $[10] !== selectedTrip) {
        t9 = isViewMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Trip details view component coming soon..."
                }, void 0, false, {
                    fileName: "[project]/src/app/trips/page.tsx",
                    lineNumber: 119,
                    columnNumber: 28
                }, this),
                selectedTrip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: [
                                selectedTrip.route?.routeName,
                                " - ",
                                selectedTrip.tripType
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 119,
                            columnNumber: 99
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Driver: ",
                                selectedTrip.driver ? `${selectedTrip.driver.firstName} ${selectedTrip.driver.lastName}` : "N/A"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 119,
                            columnNumber: 165
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Vehicle: ",
                                selectedTrip.vehicle ? `${selectedTrip.vehicle.licensePlate} - ${selectedTrip.vehicle.model}` : "N/A"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 119,
                            columnNumber: 278
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Scheduled Time: ",
                                new Date(selectedTrip.scheduledTime).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 119,
                            columnNumber: 397
                        }, this),
                        selectedTrip.actualStartTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Start Time: ",
                                new Date(selectedTrip.actualStartTime).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 119,
                            columnNumber: 508
                        }, this),
                        selectedTrip.actualEndTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "End Time: ",
                                new Date(selectedTrip.actualEndTime).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 119,
                            columnNumber: 616
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Status: ",
                                selectedTrip.status
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 119,
                            columnNumber: 689
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/trips/page.tsx",
                    lineNumber: 119,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 119,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trips$2f$TripForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            trip: selectedTrip,
            onSuccess: handleSuccess,
            onCancel: handleCloseModal
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 119,
            columnNumber: 741
        }, this);
        $[9] = isViewMode;
        $[10] = selectedTrip;
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
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 128,
            columnNumber: 11
        }, this);
        $[12] = isModalOpen;
        $[13] = t8;
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "TripsPage[<Drawer>.onClose]": ()=>setIsStudentDrawerOpen(false)
        })["TripsPage[<Drawer>.onClose]"];
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = {
            maxWidth: "1200px"
        };
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== selectedTrip) {
        t13 = selectedTrip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$driver$2f$StudentCheckIn$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            trip: selectedTrip,
            onBack: {
                "TripsPage[<StudentCheckIn>.onBack]": ()=>setIsStudentDrawerOpen(false)
            }["TripsPage[<StudentCheckIn>.onBack]"]
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 156,
            columnNumber: 27
        }, this);
        $[18] = selectedTrip;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] !== isStudentDrawerOpen || $[21] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__["Drawer"], {
            title: "Student Check-In/Out",
            placement: "right",
            onClose: t11,
            open: isStudentDrawerOpen,
            width: "100%",
            style: t12,
            destroyOnClose: true,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 166,
            columnNumber: 11
        }, this);
        $[20] = isStudentDrawerOpen;
        $[21] = t13;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] !== t10 || $[24] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t6,
            children: [
                t7,
                t10,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[23] = t10;
        $[24] = t14;
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    return t15;
}
_s(TripsPage, "4y1cS2D8U94gCTQSTulKreUObWE=");
_c = TripsPage;
var _c;
__turbopack_context__.k.register(_c, "TripsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7588f545._.js.map