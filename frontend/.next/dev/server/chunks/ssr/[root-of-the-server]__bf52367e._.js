module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/utils/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PermissionChecker",
    ()=>PermissionChecker,
    "TokenStorage",
    ()=>TokenStorage,
    "UserStorage",
    ()=>UserStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-ssr] (ecmascript)");
;
class TokenStorage {
    static setTokens(accessToken, refreshToken) {
        try {
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].REFRESH_TOKEN_KEY, refreshToken);
            this.scheduleTokenRefresh(accessToken);
        } catch (error) {
            console.error('Failed to store tokens:', error);
        }
    }
    static getAccessToken() {
        try {
            return localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].ACCESS_TOKEN_KEY);
        } catch (error) {
            console.error('Failed to get access token:', error);
            return null;
        }
    }
    static getRefreshToken() {
        try {
            return localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Failed to get refresh token:', error);
            return null;
        }
    }
    static clearTokens() {
        try {
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].ACCESS_TOKEN_KEY);
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].REFRESH_TOKEN_KEY);
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY);
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
            return expirationTime - currentTime < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].TOKEN_REFRESH_THRESHOLD;
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
            const refreshTime = Math.max(0, timeUntilExpiry - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].TOKEN_REFRESH_THRESHOLD);
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
            localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Failed to store user data:', error);
        }
    }
    static getUser() {
        try {
            const userData = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Failed to get user data:', error);
            return null;
        }
    }
    static clearUser() {
        try {
            localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CONFIG"].USER_DATA_KEY);
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
}),
"[project]/src/services/apiClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/auth.ts [app-ssr] (ecmascript)");
;
;
;
class ApiClient {
    instance;
    isRefreshing = false;
    refreshSubscribers = [];
    constructor(){
        console.log('ApiClient: Initializing with BASE_URL:', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].BASE_URL);
        this.instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].BASE_URL,
            timeout: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].TIMEOUT,
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
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
            // console.log('ApiClient: Token available:', !!token);
            if (token) {
                // console.log('ApiClient: Token expired?', TokenStorage.isTokenExpired(token));
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token)) {
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
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getRefreshToken();
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].BASE_URL}/auth/refresh`, {
                refreshToken
            });
            if (response.data.success) {
                const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(accessToken, newRefreshToken);
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
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    handleAuthFailure() {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].clearTokens();
        // Only redirect if not already on login page
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && !window.location.pathname.includes('/auth')) //TURBOPACK unreachable
        ;
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
                    message: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].NETWORK_ERROR,
                    code: 'NETWORK_ERROR'
                }
            };
        }
        return {
            success: false,
            error: {
                message: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ERROR_MESSAGES"].SERVER_ERROR,
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
    async retryRequest(request, maxRetries = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].RETRY_ATTEMPTS, delay = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].RETRY_DELAY) {
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
}),
"[project]/src/services/trackingService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackingService",
    ()=>TrackingService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-ssr] (ecmascript)");
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/active?${params.toString()}`);
        return response.data;
    }
    static async getTripTracking(tripId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/trips/${tripId}`);
        return response.data;
    }
    static async updateTripLocation(tripId, location) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/location`, location);
    }
    static async updateTripStatus(tripId, status, metadata) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/trips/${tripId}/status`, {
            status,
            metadata
        });
        return response.data;
    }
    // Stop Management
    static async arriveAtStop(tripId, stopId, location) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/arrive`, {
            location,
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    static async departFromStop(tripId, stopId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/depart`, {
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    static async skipStop(tripId, stopId, reason) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/skip`, {
            reason,
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    // Student Management
    static async updateStudentStatus(tripId, studentId, status, stopId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/trips/${tripId}/students/${studentId}`, {
            status,
            stopId,
            timestamp: new Date().toISOString()
        });
    }
    static async bulkUpdateStudentStatus(tripId, updates) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/trips/${tripId}/students/bulk`, {
            updates: updates.map((update)=>({
                    ...update,
                    timestamp: new Date().toISOString()
                }))
        });
    }
    // Alerts and Notifications
    static async createAlert(tripId, alert) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/alerts`, {
            ...alert,
            timestamp: new Date().toISOString()
        });
        return response.data;
    }
    static async getActiveAlerts() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/alerts/active`);
        return response.data;
    }
    static async acknowledgeAlert(alertId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/alerts/${alertId}/acknowledge`, {
            acknowledgedAt: new Date().toISOString()
        });
        return response.data;
    }
    static async resolveAlert(alertId, resolution) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/alerts/${alertId}/resolve`, {
            resolution,
            resolvedAt: new Date().toISOString()
        });
        return response.data;
    }
    // Route Optimization
    static async getRouteOptimization(routeId, date) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/routes/${routeId}/optimize?date=${date}`);
        return response.data;
    }
    static async applyRouteOptimization(routeId, optimizationId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/routes/${routeId}/apply-optimization`, {
            optimizationId
        });
    }
    // ETA and Predictions
    static async getETAForStop(tripId, stopId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/trips/${tripId}/stops/${stopId}/eta`);
        return response.data;
    }
    static async getETAForStudent(studentId, date) {
        const params = date ? `?date=${date}` : '';
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/students/${studentId}/eta${params}`);
        return response.data;
    }
    // Geofencing
    static async checkGeofence(tripId, location) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/geofence`, location);
        return response.data;
    }
    // Emergency and Incident Management
    static async reportEmergency(tripId, emergency) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/emergency`, {
            ...emergency,
            timestamp: new Date().toISOString()
        });
        return response.data.emergencyId;
    }
    static async updateEmergencyStatus(emergencyId, status, notes) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/emergencies/${emergencyId}`, {
            status,
            notes,
            updatedAt: new Date().toISOString()
        });
    }
    // Driver Communication
    static async sendMessageToDriver(driverId, message) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/drivers/${driverId}/messages`, {
            ...message,
            timestamp: new Date().toISOString()
        });
        return response.data.messageId;
    }
    static async getDriverMessages(driverId, unreadOnly) {
        const params = unreadOnly ? '?unreadOnly=true' : '';
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/drivers/${driverId}/messages${params}`);
        return response.data;
    }
    // Analytics and Reporting
    static async getTrackingStats(filters) {
        const params = new URLSearchParams();
        if (filters?.date) params.append('date', filters.date);
        if (filters?.schoolId) params.append('schoolId', filters.schoolId);
        if (filters?.routeId) params.append('routeId', filters.routeId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/stats?${params.toString()}`);
        return response.data;
    }
    static async getTripHistory(tripId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/trips/${tripId}/history`);
        return response.data;
    }
    static async exportTrackingData(filters) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/export`, filters, {
            responseType: 'blob'
        });
        return response.data;
    }
    // Parent/Guardian Access
    static async getStudentTripTracking(studentId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/students/${studentId}/tracking`);
        return response.data;
    }
    // Maintenance Integration
    static async reportVehicleIssue(tripId, issue) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/trips/${tripId}/vehicle-issue`, {
            ...issue,
            timestamp: new Date().toISOString()
        });
        return response.data.issueId;
    }
    // Weather Integration
    static async getWeatherForRoute(routeId, date) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/routes/${routeId}/weather?date=${date}`);
        return response.data;
    }
    // Performance Monitoring
    static async getDriverPerformance(driverId, period) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/drivers/${driverId}/performance?period=${period}`);
        return response.data;
    }
    static async getVehiclePerformance(vehicleId, period) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/vehicles/${vehicleId}/performance?period=${period}`);
        return response.data;
    }
}
}),
"[project]/src/hooks/useTracking.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-ssr] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/trackingService.ts [app-ssr] (ecmascript)");
'use client';
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.activeTrips(filters),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getActiveTrips(filters),
        refetchInterval: refreshInterval || 5000,
        staleTime: 2000,
        refetchIntervalInBackground: true
    });
};
const useTripTracking = (tripId, refreshInterval = 3000)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.tripTracking(tripId),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getTripTracking(tripId),
        enabled: !!tripId,
        refetchInterval: refreshInterval,
        staleTime: 1000,
        refetchIntervalInBackground: true
    });
};
const useStudentTracking = (studentId, refreshInterval = 10000)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.studentTracking(studentId),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getStudentTripTracking(studentId),
        enabled: !!studentId,
        refetchInterval: refreshInterval,
        staleTime: 5000,
        refetchIntervalInBackground: true
    });
};
const useActiveAlerts = (refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.alerts(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getActiveAlerts(),
        refetchInterval: refreshInterval || 15000,
        staleTime: 10000,
        refetchIntervalInBackground: true
    });
};
const useStopETA = (tripId, stopId, refreshInterval = 30000)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.eta(tripId, stopId),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getETAForStop(tripId, stopId),
        enabled: !!(tripId && stopId),
        refetchInterval: refreshInterval,
        staleTime: 15000,
        refetchIntervalInBackground: true
    });
};
const useStudentETA = (studentId, date, refreshInterval = 30000)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.studentETA(studentId, date),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getETAForStudent(studentId, date),
        enabled: !!studentId,
        refetchInterval: refreshInterval,
        staleTime: 15000,
        refetchIntervalInBackground: true
    });
};
const useDriverMessages = (driverId, unreadOnly)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.driverMessages(driverId),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getDriverMessages(driverId, unreadOnly),
        enabled: !!driverId,
        refetchInterval: 10000,
        staleTime: 5000
    });
};
const useTrackingStats = (filters, refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.stats(filters),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getTrackingStats(filters),
        refetchInterval: refreshInterval || 60000,
        staleTime: 30000
    });
};
const useTripHistory = (tripId)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.tripHistory(tripId),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getTripHistory(tripId),
        enabled: !!tripId,
        staleTime: 5 * 60 * 1000
    });
};
const useWeatherForRoute = (routeId, date)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.weather(routeId, date),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getWeatherForRoute(routeId, date),
        enabled: !!(routeId && date),
        staleTime: 15 * 60 * 1000,
        refetchInterval: 15 * 60 * 1000
    });
};
const useDriverPerformance = (driverId, period)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.driverPerformance(driverId, period),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getDriverPerformance(driverId, period),
        enabled: !!(driverId && period),
        staleTime: 30 * 60 * 1000
    });
};
const useVehiclePerformance = (vehicleId, period)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: TRACKING_KEYS.vehiclePerformance(vehicleId, period),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].getVehiclePerformance(vehicleId, period),
        enabled: !!(vehicleId && period),
        staleTime: 30 * 60 * 1000
    });
};
const useUpdateTripLocation = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, location })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].updateTripLocation(tripId, location),
        onSuccess: (_, { tripId })=>{
            // Invalidate trip tracking to get fresh data
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.tripTracking(tripId)
            });
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.activeTrips()
            });
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to update location';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useUpdateTripStatus = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, status, metadata })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].updateTripStatus(tripId, status, metadata),
        onSuccess: (updatedTrip, { tripId })=>{
            // Update the specific trip
            queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
            // Invalidate related queries
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.activeTrips()
            });
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.stats()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Trip status updated successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to update trip status';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useArriveAtStop = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, stopId, location })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].arriveAtStop(tripId, stopId, location),
        onSuccess: (updatedTrip, { tripId })=>{
            queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.activeTrips()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Arrived at stop');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to record arrival';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useDepartFromStop = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, stopId })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].departFromStop(tripId, stopId),
        onSuccess: (updatedTrip, { tripId })=>{
            queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.activeTrips()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Departed from stop');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to record departure';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useSkipStop = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, stopId, reason })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].skipStop(tripId, stopId, reason),
        onSuccess: (updatedTrip, { tripId })=>{
            queryClient.setQueryData(TRACKING_KEYS.tripTracking(tripId), updatedTrip);
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.activeTrips()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Stop marked as skipped');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to skip stop';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useUpdateStudentStatus = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, studentId, status, stopId })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].updateStudentStatus(tripId, studentId, status, stopId),
        onSuccess: (_, { tripId, studentId })=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.tripTracking(tripId)
            });
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.studentTracking(studentId)
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Student status updated');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to update student status';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useBulkUpdateStudentStatus = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, updates })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].bulkUpdateStudentStatus(tripId, updates),
        onSuccess: (_, { tripId, updates })=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.tripTracking(tripId)
            });
            updates.forEach((update)=>{
                queryClient.invalidateQueries({
                    queryKey: TRACKING_KEYS.studentTracking(update.studentId)
                });
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`${updates.length} student statuses updated`);
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to update student statuses';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useCreateAlert = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, alert })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].createAlert(tripId, alert),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.alerts()
            });
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.activeTrips()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Alert created successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to create alert';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useAcknowledgeAlert = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (alertId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].acknowledgeAlert(alertId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.alerts()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Alert acknowledged');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to acknowledge alert';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useResolveAlert = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ alertId, resolution })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].resolveAlert(alertId, resolution),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.alerts()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Alert resolved');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to resolve alert';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useReportEmergency = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, emergency })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].reportEmergency(tripId, emergency),
        onSuccess: (emergencyId)=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.alerts()
            });
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.activeTrips()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Emergency reported (ID: ${emergencyId})`);
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to report emergency';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useSendMessageToDriver = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ driverId, message: driverMessage })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].sendMessageToDriver(driverId, driverMessage),
        onSuccess: (messageId, { driverId })=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.driverMessages(driverId)
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Message sent to driver');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to send message';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useGeofenceCheck = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, location })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].checkGeofence(tripId, location),
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to check geofence';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useExportTrackingData = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (filters)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].exportTrackingData(filters),
        onSuccess: (blob, filters)=>{
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const format = filters.format?.toLowerCase() || 'csv';
            link.download = `tracking_data_${new Date().toISOString().split('T')[0]}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Tracking data exported successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to export tracking data';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useReportVehicleIssue = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ tripId, issue })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$trackingService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackingService"].reportVehicleIssue(tripId, issue),
        onSuccess: (issueId, { tripId })=>{
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.tripTracking(tripId)
            });
            queryClient.invalidateQueries({
                queryKey: TRACKING_KEYS.alerts()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Vehicle issue reported (ID: ${issueId})`);
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to report vehicle issue';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/src/services/websocketService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getWebSocketService",
    ()=>getWebSocketService,
    "useWebSocket",
    ()=>useWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
class WebSocketService {
    socket = null;
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
            url: config.url || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'http://localhost:5000'),
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
                if (this.socket?.connected) {
                    resolve();
                    return;
                }
                this.userId = userId || null;
                this.isManuallyDisconnected = false;
                const socketOptions = {
                    reconnection: true,
                    reconnectionAttempts: this.config.maxReconnectAttempts,
                    reconnectionDelay: this.config.reconnectInterval,
                    transports: [
                        'websocket',
                        'polling'
                    ]
                };
                if (this.userId) {
                    socketOptions.query = {
                        userId: this.userId
                    };
                }
                this.socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(this.config.url, socketOptions);
                this.socket.on('connect', ()=>{
                    this.log('Socket.io connected');
                    this.reconnectAttempts = 0;
                    this.notifyConnectionStatus('connected');
                    // Resubscribe to previous subscriptions
                    this.subscriptions.forEach((subscription)=>{
                        this.subscribe(subscription);
                    });
                    resolve();
                });
                this.socket.on('message', (data)=>{
                    this.handleMessage(JSON.stringify(data));
                });
                // Listen for all WebSocket event types
                Object.values([
                    'TRIP_LOCATION_UPDATE',
                    'TRIP_STATUS_CHANGE',
                    'STUDENT_STATUS_UPDATE',
                    'ALERT_CREATED',
                    'ALERT_ACKNOWLEDGED',
                    'ALERT_RESOLVED',
                    'EMERGENCY_REPORTED',
                    'DRIVER_MESSAGE',
                    'SYSTEM_NOTIFICATION',
                    'ROUTE_UPDATE',
                    'WEATHER_ALERT'
                ]).forEach((eventType)=>{
                    this.socket?.on(eventType.toLowerCase(), (data)=>{
                        this.handleMessage(JSON.stringify({
                            type: eventType,
                            data,
                            timestamp: new Date().toISOString()
                        }));
                    });
                });
                this.socket.on('disconnect', (reason)=>{
                    this.log(`Socket.io disconnected: ${reason}`);
                    this.notifyConnectionStatus('disconnected');
                });
                this.socket.on('reconnecting', ()=>{
                    this.notifyConnectionStatus('reconnecting');
                });
                this.socket.on('connect_error', (error)=>{
                    this.log('Socket.io connection error:', error);
                    this.notifyConnectionStatus('error');
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    disconnect() {
        this.isManuallyDisconnected = true;
        this.clearReconnectTimer();
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.subscriptions.clear();
        this.log('Socket.io manually disconnected');
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
    // Heartbeat Management (Socket.io handles this automatically)
    startHeartbeat() {
    // Socket.io handles heartbeat automatically
    }
    stopHeartbeat() {
    // Socket.io handles heartbeat automatically
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
        if (!this.socket?.connected) {
            this.log('Cannot send message: Socket.io not connected');
            return false;
        }
        try {
            this.socket.emit(message.type.toLowerCase(), message);
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
        if (this.socket?.connected) {
            this.socket.emit('subscribe', {
                subscription
            });
        }
    }
    unsubscribe(subscription) {
        this.subscriptions.delete(subscription);
        if (this.socket?.connected) {
            this.socket.emit('unsubscribe', {
                subscription
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
        if (!this.socket) return 'closed';
        if (this.socket.connected) return 'open';
        if (this.socket.disconnected) return 'closed';
        return 'connecting';
    }
    isConnected() {
        return this.socket?.connected === true;
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return ws;
};
const __TURBOPACK__default__export__ = WebSocketService;
}),
"[project]/src/services/authService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/auth.ts [app-ssr] (ecmascript)");
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/login', credentials);
            if (response.success && response.data) {
                const { user, tokens } = response.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(tokens.accessToken, tokens.refreshToken);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].setUser(user);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/register', userData);
            if (response.success && response.data) {
                const { user, tokens } = response.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(tokens.accessToken, tokens.refreshToken);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].setUser(user);
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
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
            if (token) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/logout');
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
        const refreshToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getRefreshToken();
        if (!refreshToken) {
            this.clearLocalSession();
            return null;
        }
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/refresh', {
                refreshToken
            });
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].setTokens(response.data.accessToken, response.data.refreshToken);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/auth/me');
            if (response.success && response.data?.user) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].setUser(response.data.user);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put('/auth/profile', userData);
            if (response.success && response.data) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].setUser(response.data);
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
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put('/auth/change-password', data);
        } catch (error) {
            throw error;
        }
    }
    /**
   * Request password reset
   */ async requestPasswordReset(email) {
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/forgot-password', {
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
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/reset-password', {
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
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/verify-email', {
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
            return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/resend-verification', {
                email
            });
        } catch (error) {
            throw error;
        }
    }
    /**
   * Check if user is authenticated
   */ isAuthenticated() {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].getUser();
        return !!(token && user && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token));
    }
    /**
   * Get current user from storage
   */ getCurrentUserFromStorage() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].getUser();
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
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].clearTokens();
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].clearUser();
    }
    /**
   * Initialize authentication state from storage
   */ initializeAuth() {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserStorage"].getUser();
        if (token && user && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token)) {
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
    }
    /**
   * Check if token is expiring soon
   */ isTokenExpiringSoon() {
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
        return token ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpiringSoon(token) : true;
    }
}
// Export singleton instance
const authService = AuthService.getInstance();
const __TURBOPACK__default__export__ = authService;
}),
"[project]/src/stores/authStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-ssr] (ecmascript)");
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["devtools"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].login(credentials);
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].register(userData);
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].logout();
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
                const newToken = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].refreshToken();
                if (newToken) {
                    // Token refreshed successfully, user stays authenticated
                    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getCurrentUserFromStorage();
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
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getCurrentUser();
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].updateProfile(userData);
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
            const authData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].initializeAuth();
            console.log('AuthStore: Auth data:', authData);
            console.log('AuthStore: Token available:', !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].getAccessToken());
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
}),
"[project]/src/components/parent/StudentTrackingDashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentTrackingDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-ssr] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-ssr] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$timeline$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Timeline$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/timeline/index.js [app-ssr] (ecmascript) <export default as Timeline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-ssr] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-ssr] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/spin/index.js [app-ssr] (ecmascript) <export default as Spin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$empty$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Empty$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/empty/index.js [app-ssr] (ecmascript) <export default as Empty>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/statistic/index.js [app-ssr] (ecmascript) <export default as Statistic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-ssr] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/avatar/index.js [app-ssr] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/list/index.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-ssr] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/notification/index.js [app-ssr] (ecmascript) <export default as notification>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EnvironmentOutlined.js [app-ssr] (ecmascript) <export default as EnvironmentOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-ssr] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-ssr] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CarOutlined.js [app-ssr] (ecmascript) <export default as CarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BookOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/BookOutlined.js [app-ssr] (ecmascript) <export default as BookOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlayCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlayCircleOutlined.js [app-ssr] (ecmascript) <export default as PlayCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PauseCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PauseCircleOutlined.js [app-ssr] (ecmascript) <export default as PauseCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AlertOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AlertOutlined.js [app-ssr] (ecmascript) <export default as AlertOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PhoneOutlined.js [app-ssr] (ecmascript) <export default as PhoneOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MessageOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/MessageOutlined.js [app-ssr] (ecmascript) <export default as MessageOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ReloadOutlined.js [app-ssr] (ecmascript) <export default as ReloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AimOutlined.js [app-ssr] (ecmascript) <export default as AimOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CalendarOutlined.js [app-ssr] (ecmascript) <export default as CalendarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTracking.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$websocketService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/websocketService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const { Title, Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
function StudentTrackingDashboard({ studentId }) {
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().format('YYYY-MM-DD'));
    const [emergencyContactVisible, setEmergencyContactVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busLocation, setBusLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$websocketService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWebSocket"])(user?.id);
    // Use student ID from props or get from user's children
    const trackingStudentId = studentId || user?.children?.[0]?.id || '';
    // Queries
    const { data: studentTrackingData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStudentTracking"])(trackingStudentId, 10000);
    const { data: etaData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStudentETA"])(trackingStudentId, selectedDate, 30000);
    const { data: alertsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTracking$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveAlerts"])();
    // WebSocket subscriptions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (trackingStudentId && ws) {
            // Subscribe to student-specific updates
            ws.subscribe(`student:${trackingStudentId}`);
            // Listen for real-time updates
            const unsubscribeTripUpdate = ws.on('TRIP_LOCATION_UPDATE', (data)=>{
                setBusLocation(data.location);
            });
            const unsubscribeStudentUpdate = ws.on('STUDENT_STATUS_UPDATE', (data)=>{
                if (data.studentId === trackingStudentId) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].success({
                        message: 'Student Status Updated',
                        description: `Your child's status has been updated to: ${data.status}`,
                        placement: 'topRight'
                    });
                }
            });
            const unsubscribeAlert = ws.on('ALERT_CREATED', (data)=>{
                if (data.tripId && studentTrackingData?.currentTrip?.id === data.tripId) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$notification$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__notification$3e$__["notification"].warning({
                        message: 'Trip Alert',
                        description: data.message,
                        placement: 'topRight'
                    });
                }
            });
            return ()=>{
                unsubscribeTripUpdate();
                unsubscribeStudentUpdate();
                unsubscribeAlert();
                ws.unsubscribe(`student:${trackingStudentId}`);
            };
        }
    }, [
        trackingStudentId,
        ws,
        studentTrackingData?.currentTrip?.id
    ]);
    if (!trackingStudentId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            style: {
                textAlign: 'center',
                padding: '50px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {
                    style: {
                        fontSize: '48px',
                        color: '#1890ff',
                        marginBottom: '16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                    level: 4,
                    children: "No Student Information"
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    type: "secondary",
                    children: "No student information found in your account. Please contact the school administration."
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            style: {
                textAlign: 'center',
                padding: '50px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$spin$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Spin$3e$__["Spin"], {
                    size: "large"
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: '16px'
                    },
                    children: "Loading student tracking information..."
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this);
    }
    const studentData = studentTrackingData;
    const currentTrip = studentData?.currentTrip;
    const todaysSchedule = studentData?.todaysSchedule;
    const recentHistory = studentData?.recentHistory || [];
    // Get relevant alerts for this student's trip
    const relevantAlerts = alertsData?.data?.items?.filter((alert)=>alert.tripId === currentTrip?.id) || [];
    const getTripStatusColor = (status)=>{
        switch(status){
            case 'SCHEDULED':
                return 'blue';
            case 'IN_PROGRESS':
                return 'green';
            case 'DELAYED':
                return 'orange';
            case 'COMPLETED':
                return 'success';
            case 'CANCELLED':
                return 'red';
            default:
                return 'default';
        }
    };
    const getStudentStatusColor = (status)=>{
        switch(status){
            case 'PICKED_UP':
                return 'blue';
            case 'DROPPED_OFF':
                return 'green';
            case 'ABSENT':
                return 'red';
            case 'NO_SHOW':
                return 'orange';
            default:
                return 'default';
        }
    };
    const renderCurrentTripInfo = ()=>{
        if (!currentTrip) return null;
        const studentStatus = currentTrip.studentsOnBoard.find((s)=>s.studentId === trackingStudentId);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, void 0),
                    "Current Trip",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                        color: getTripStatusColor(currentTrip.status),
                        children: currentTrip.status
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 180,
                        columnNumber: 13
                    }, void 0),
                    currentTrip.status === 'IN_PROGRESS' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                        status: "processing",
                        text: "Live"
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 184,
                        columnNumber: 15
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 177,
                columnNumber: 11
            }, void 0),
            extra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ReloadOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ReloadOutlined$3e$__["ReloadOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 191,
                        columnNumber: 21
                    }, void 0),
                    size: "small",
                    onClick: ()=>window.location.reload(),
                    children: "Refresh"
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 190,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 189,
                columnNumber: 11
            }, void 0),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                    gutter: [
                        16,
                        16
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            md: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        strong: true,
                                        children: "Route Information"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    marginBottom: '4px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EnvironmentOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EnvironmentOutlined$3e$__["EnvironmentOutlined"], {
                                                        style: {
                                                            color: '#1890ff'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                        children: currentTrip.route.routeName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 205,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    marginBottom: '4px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CarOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CarOutlined$3e$__["CarOutlined"], {
                                                        style: {
                                                            color: '#52c41a'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                        children: [
                                                            "Vehicle: ",
                                                            currentTrip.vehicleId
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 209,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {
                                                        style: {
                                                            color: '#722ed1'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                        children: [
                                                            "Driver: ",
                                                            currentTrip.driverId
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            md: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        strong: true,
                                        children: "Student Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '8px'
                                        },
                                        children: studentStatus ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    color: getStudentStatusColor(studentStatus.status),
                                                    style: {
                                                        marginBottom: '8px'
                                                    },
                                                    children: studentStatus.status.replace('_', ' ')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: '12px',
                                                        color: '#666'
                                                    },
                                                    children: [
                                                        "Last updated: ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(studentStatus.timestamp).format('h:mm A')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                            lineNumber: 226,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                            color: "default",
                                            children: "Status Unknown"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                            lineNumber: 235,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 222,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this),
                currentTrip.currentLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    message: "Bus Location",
                    description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '8px'
                                },
                                children: [
                                    "Current stop: ",
                                    currentTrip.currentStopId ? currentTrip.route.stops.find((s)=>s.id === currentTrip.currentStopId)?.name || 'Unknown Stop' : 'In Transit'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 248,
                                columnNumber: 17
                            }, void 0),
                            currentTrip.estimatedArrival && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 256,
                                        columnNumber: 21
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        children: [
                                            "Estimated arrival at next stop: ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(currentTrip.estimatedArrival).format('h:mm A')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 257,
                                        columnNumber: 21
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 255,
                                columnNumber: 19
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 247,
                        columnNumber: 15
                    }, void 0),
                    type: "info",
                    style: {
                        marginTop: '16px'
                    },
                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        size: "small",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AimOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AimOutlined$3e$__["AimOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 267,
                            columnNumber: 42
                        }, void 0),
                        children: "View Map"
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 267,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 244,
                    columnNumber: 11
                }, this),
                relevantAlerts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                    message: `${relevantAlerts.length} Active Alert${relevantAlerts.length > 1 ? 's' : ''}`,
                    description: relevantAlerts.map((alert)=>alert.message).join(', '),
                    type: "warning",
                    style: {
                        marginTop: '16px'
                    },
                    showIcon: true
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 276,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 175,
            columnNumber: 7
        }, this);
    };
    const renderSchedule = ()=>{
        if (!todaysSchedule) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__["CalendarOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 294,
                        columnNumber: 11
                    }, void 0),
                    "Today's Schedule"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 293,
                columnNumber: 9
            }, void 0),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                    gutter: [
                        16,
                        16
                    ],
                    children: [
                        todaysSchedule.pickup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            md: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                size: "small",
                                title: "Morning Pickup",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Route: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 303,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                children: todaysSchedule.pickup.routeName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 304,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 302,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Stop: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 307,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                children: todaysSchedule.pickup.stopName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 306,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Scheduled Time: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                children: todaysSchedule.pickup.estimatedTime
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 312,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        color: getTripStatusColor(todaysSchedule.pickup.status),
                                        children: todaysSchedule.pickup.status
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 314,
                                        columnNumber: 17
                                    }, this),
                                    etaData?.pickup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '12px',
                                            padding: '8px',
                                            backgroundColor: '#f0f2ff',
                                            borderRadius: '4px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#1890ff'
                                                },
                                                children: "Live ETA: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 320,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                style: {
                                                    color: '#1890ff'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(etaData.pickup.estimatedArrival).format('h:mm A')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 321,
                                                columnNumber: 21
                                            }, this),
                                            etaData.pickup.delayMinutes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: '#fa8c16'
                                                },
                                                children: [
                                                    "Delayed by ",
                                                    etaData.pickup.delayMinutes,
                                                    " minutes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 325,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 319,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 301,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 300,
                            columnNumber: 13
                        }, this),
                        todaysSchedule.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            md: 12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                size: "small",
                                title: "Afternoon Dropoff",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Route: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 339,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                children: todaysSchedule.dropoff.routeName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 340,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Stop: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 343,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                children: todaysSchedule.dropoff.stopName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 342,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '8px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                children: "Scheduled Time: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                children: todaysSchedule.dropoff.estimatedTime
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 348,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 346,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        color: getTripStatusColor(todaysSchedule.dropoff.status),
                                        children: todaysSchedule.dropoff.status
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this),
                                    etaData?.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '12px',
                                            padding: '8px',
                                            backgroundColor: '#f0f2ff',
                                            borderRadius: '4px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#1890ff'
                                                },
                                                children: "Live ETA: "
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 356,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                style: {
                                                    color: '#1890ff'
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(etaData.dropoff.estimatedArrival).format('h:mm A')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 357,
                                                columnNumber: 21
                                            }, this),
                                            etaData.dropoff.delayMinutes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: '#fa8c16'
                                                },
                                                children: [
                                                    "Delayed by ",
                                                    etaData.dropoff.delayMinutes,
                                                    " minutes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                                lineNumber: 361,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 355,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 337,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this),
                !todaysSchedule.pickup && !todaysSchedule.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$empty$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Empty$3e$__["Empty"], {
                    description: "No trips scheduled for today",
                    style: {
                        padding: '20px'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 373,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 292,
            columnNumber: 7
        }, this);
    };
    const renderRecentHistory = ()=>{
        if (recentHistory.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 388,
                        columnNumber: 11
                    }, void 0),
                    "Recent Trip History"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 387,
                columnNumber: 9
            }, void 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$timeline$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Timeline$3e$__["Timeline"], {
                children: recentHistory.slice(0, 5).map((trip, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$timeline$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Timeline$3e$__["Timeline"].Item, {
                        color: trip.status === 'COMPLETED' ? 'green' : trip.status === 'CANCELLED' ? 'red' : 'blue',
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontWeight: 500,
                                        marginBottom: '4px'
                                    },
                                    children: [
                                        trip.routeName,
                                        " - ",
                                        trip.tripType
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 400,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '12px',
                                        color: '#666',
                                        marginBottom: '4px'
                                    },
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(trip.date).format('MMM DD, YYYY'),
                                        " • ",
                                        trip.scheduledTime
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 403,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                    color: getTripStatusColor(trip.status),
                                    children: trip.status
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 406,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 399,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 394,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 392,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
            lineNumber: 386,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '24px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                justify: "space-between",
                align: "middle",
                style: {
                    marginBottom: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                level: 3,
                                style: {
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this),
                                    "Student Transportation"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                type: "secondary",
                                children: "Real-time tracking and schedule information for your child"
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 426,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__["PhoneOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 433,
                                        columnNumber: 21
                                    }, void 0),
                                    onClick: ()=>setEmergencyContactVisible(true),
                                    type: "primary",
                                    danger: true,
                                    children: "Emergency Contact"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 432,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$MessageOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageOutlined$3e$__["MessageOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 441,
                                        columnNumber: 21
                                    }, void 0),
                                    children: "Contact School"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: [
                    16,
                    16
                ],
                style: {
                    marginBottom: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 8,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                title: "Current Status",
                                value: currentTrip ? currentTrip.status : 'No Active Trip',
                                valueStyle: {
                                    color: currentTrip?.status === 'IN_PROGRESS' ? '#52c41a' : '#666',
                                    fontSize: '16px'
                                },
                                prefix: currentTrip?.status === 'IN_PROGRESS' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlayCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircleOutlined$3e$__["PlayCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 460,
                                    columnNumber: 63
                                }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PauseCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircleOutlined$3e$__["PauseCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 460,
                                    columnNumber: 88
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 452,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 8,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                title: "Next Pickup/Dropoff",
                                value: etaData?.pickup ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(etaData.pickup.estimatedArrival).format('h:mm A') : etaData?.dropoff ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(etaData.dropoff.estimatedArrival).format('h:mm A') : 'No scheduled trips',
                                valueStyle: {
                                    fontSize: '16px'
                                },
                                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 474,
                                    columnNumber: 23
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 466,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 465,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 8,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                title: "Active Alerts",
                                value: relevantAlerts.length,
                                valueStyle: {
                                    color: relevantAlerts.length > 0 ? '#f5222d' : '#52c41a',
                                    fontSize: '16px'
                                },
                                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AlertOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertOutlined$3e$__["AlertOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 487,
                                    columnNumber: 23
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 479,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 478,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this),
            currentTrip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '24px'
                },
                children: renderCurrentTripInfo()
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 495,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: [
                    16,
                    16
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        lg: 12,
                        children: renderSchedule()
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 502,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        lg: 12,
                        children: renderRecentHistory()
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            !currentTrip && !todaysSchedule?.pickup && !todaysSchedule?.dropoff && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                style: {
                    textAlign: 'center',
                    padding: '50px',
                    marginTop: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$BookOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOutlined$3e$__["BookOutlined"], {
                        style: {
                            fontSize: '48px',
                            color: '#1890ff',
                            marginBottom: '16px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 513,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                        level: 4,
                        children: "No Trips Scheduled Today"
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 514,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                        type: "secondary",
                        children: "There are no transportation schedules for today. Please check with the school if you believe this is an error."
                    }, void 0, false, {
                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                        lineNumber: 515,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 512,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "Emergency Contacts",
                open: emergencyContactVisible,
                onCancel: ()=>setEmergencyContactVisible(false),
                footer: null,
                width: 500,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                    dataSource: [
                        {
                            name: 'School Transportation Office',
                            phone: '(555) 123-4567',
                            type: 'Transportation'
                        },
                        {
                            name: 'School Main Office',
                            phone: '(555) 123-4568',
                            type: 'School'
                        },
                        {
                            name: 'Emergency Services',
                            phone: '911',
                            type: 'Emergency'
                        }
                    ],
                    renderItem: (contact)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
                            actions: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__["PhoneOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 540,
                                        columnNumber: 25
                                    }, void 0),
                                    href: `tel:${contact.phone}`,
                                    children: "Call"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 538,
                                    columnNumber: 17
                                }, void 0)
                            ],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item.Meta, {
                                avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$avatar$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PhoneOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneOutlined$3e$__["PhoneOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                        lineNumber: 548,
                                        columnNumber: 39
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 548,
                                    columnNumber: 25
                                }, void 0),
                                title: contact.name,
                                description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: contact.phone
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                            lineNumber: 552,
                                            columnNumber: 21
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                            color: "blue",
                                            children: contact.type
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                            lineNumber: 553,
                                            columnNumber: 21
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                    lineNumber: 551,
                                    columnNumber: 19
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                                lineNumber: 547,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                            lineNumber: 536,
                            columnNumber: 13
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                    lineNumber: 529,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
                lineNumber: 522,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/parent/StudentTrackingDashboard.tsx",
        lineNumber: 418,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/(dashboard)/parent-portal/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParentPortalPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$parent$2f$StudentTrackingDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/parent/StudentTrackingDashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function ParentPortalPage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Redirect non-parent users
        if (user && user.role !== 'PARENT') {
            router.push('/dashboard');
        }
    }, [
        user,
        router
    ]);
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            style: {
                textAlign: 'center',
                padding: '50px'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                message: "Access Denied",
                description: "Please log in to access the parent portal.",
                type: "error"
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this);
    }
    if (user.role !== 'PARENT') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            style: {
                textAlign: 'center',
                padding: '50px'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                message: "Access Denied",
                description: "This portal is only available for parent accounts.",
                type: "error"
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$parent$2f$StudentTrackingDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/parent-portal/page.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bf52367e._.js.map