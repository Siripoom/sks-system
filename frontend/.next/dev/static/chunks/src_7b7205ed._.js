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
;
function TripsContent() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "b458e6335efab0bc424172062efe6dfb1b2e7816664ceb873a4e045e77ea107a") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b458e6335efab0bc424172062efe6dfb1b2e7816664ceb873a4e045e77ea107a";
    }
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedTrip, setSelectedTrip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [isViewMode, setIsViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStudentDrawerOpen, setIsStudentDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "TripsContent[handleAdd]": ()=>{
                setSelectedTrip(undefined);
                setIsViewMode(false);
                setIsModalOpen(true);
            }
        })["TripsContent[handleAdd]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const handleAdd = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "TripsContent[handleEdit]": (trip)=>{
                setSelectedTrip(trip);
                setIsViewMode(false);
                setIsModalOpen(true);
            }
        })["TripsContent[handleEdit]"];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const handleEdit = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "TripsContent[handleViewDetails]": (trip_0)=>{
                setSelectedTrip(trip_0);
                setIsViewMode(true);
                setIsModalOpen(true);
            }
        })["TripsContent[handleViewDetails]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const handleViewDetails = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "TripsContent[handleManageStudents]": (trip_1)=>{
                setSelectedTrip(trip_1);
                setIsStudentDrawerOpen(true);
            }
        })["TripsContent[handleManageStudents]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const handleManageStudents = t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "TripsContent[handleCloseModal]": ()=>{
                setIsModalOpen(false);
                setSelectedTrip(undefined);
                setIsViewMode(false);
            }
        })["TripsContent[handleCloseModal]"];
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const handleCloseModal = t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "TripsContent[handleSuccess]": ()=>{
                handleCloseModal();
            }
        })["TripsContent[handleSuccess]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const handleSuccess = t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trips$2f$TripList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onAdd: handleAdd,
            onEdit: handleEdit,
            onViewDetails: handleViewDetails,
            onManageStudents: handleManageStudents
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const t7 = isViewMode ? `Trip Details - ${selectedTrip ? `${selectedTrip.route?.routeName} (${selectedTrip.tripType})` : ""}` : selectedTrip ? "Edit Trip" : "Schedule New Trip";
    let t8;
    if ($[8] !== isViewMode || $[9] !== selectedTrip) {
        t8 = isViewMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Trip details view component coming soon..."
                }, void 0, false, {
                    fileName: "[project]/src/app/trips/page.tsx",
                    lineNumber: 115,
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
                            lineNumber: 115,
                            columnNumber: 99
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Driver: ",
                                selectedTrip.driver ? `${selectedTrip.driver.firstName} ${selectedTrip.driver.lastName}` : "N/A"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 115,
                            columnNumber: 165
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Vehicle: ",
                                selectedTrip.vehicle ? `${selectedTrip.vehicle.licensePlate} - ${selectedTrip.vehicle.model}` : "N/A"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 115,
                            columnNumber: 278
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Scheduled Time: ",
                                new Date(selectedTrip.scheduledTime).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 115,
                            columnNumber: 397
                        }, this),
                        selectedTrip.actualStartTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Start Time: ",
                                new Date(selectedTrip.actualStartTime).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 115,
                            columnNumber: 508
                        }, this),
                        selectedTrip.actualEndTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "End Time: ",
                                new Date(selectedTrip.actualEndTime).toLocaleString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 115,
                            columnNumber: 616
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Status: ",
                                selectedTrip.status
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/trips/page.tsx",
                            lineNumber: 115,
                            columnNumber: 689
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/trips/page.tsx",
                    lineNumber: 115,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 115,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$trips$2f$TripForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            trip: selectedTrip,
            onSuccess: handleSuccess,
            onCancel: handleCloseModal
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 115,
            columnNumber: 741
        }, this);
        $[8] = isViewMode;
        $[9] = selectedTrip;
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] !== isModalOpen || $[12] !== t7 || $[13] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
            title: t7,
            open: isModalOpen,
            onCancel: handleCloseModal,
            footer: null,
            width: 1000,
            destroyOnClose: true,
            children: t8
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        $[11] = isModalOpen;
        $[12] = t7;
        $[13] = t8;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "TripsContent[<Drawer>.onClose]": ()=>setIsStudentDrawerOpen(false)
        })["TripsContent[<Drawer>.onClose]"];
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            maxWidth: "1200px"
        };
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== selectedTrip) {
        t12 = selectedTrip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$driver$2f$StudentCheckIn$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            trip: selectedTrip,
            onBack: {
                "TripsContent[<StudentCheckIn>.onBack]": ()=>setIsStudentDrawerOpen(false)
            }["TripsContent[<StudentCheckIn>.onBack]"]
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 152,
            columnNumber: 27
        }, this);
        $[17] = selectedTrip;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] !== isStudentDrawerOpen || $[20] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$drawer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__["Drawer"], {
            title: "Student Check-In/Out",
            placement: "right",
            onClose: t10,
            open: isStudentDrawerOpen,
            width: "100%",
            style: t11,
            destroyOnClose: true,
            children: t12
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[19] = isStudentDrawerOpen;
        $[20] = t12;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    let t14;
    if ($[22] !== t13 || $[23] !== t9) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t6,
                t9,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 171,
            columnNumber: 11
        }, this);
        $[22] = t13;
        $[23] = t9;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    return t14;
}
_s(TripsContent, "4y1cS2D8U94gCTQSTulKreUObWE=");
_c = TripsContent;
function TripsPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "b458e6335efab0bc424172062efe6dfb1b2e7816664ceb873a4e045e77ea107a") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b458e6335efab0bc424172062efe6dfb1b2e7816664ceb873a4e045e77ea107a";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TripsContent, {}, void 0, false, {
                    fileName: "[project]/src/app/trips/page.tsx",
                    lineNumber: 190,
                    columnNumber: 37
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/trips/page.tsx",
                lineNumber: 190,
                columnNumber: 26
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/trips/page.tsx",
            lineNumber: 190,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = TripsPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "TripsContent");
__turbopack_context__.k.register(_c1, "TripsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7b7205ed._.js.map