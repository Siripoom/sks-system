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
            console.log('ApiClient: Making request to:', config.url);
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].getAccessToken();
            console.log('ApiClient: Token available:', !!token);
            if (token) {
                console.log('ApiClient: Token expired?', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token));
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenStorage"].isTokenExpired(token)) {
                    config.headers.Authorization = `Bearer ${token}`;
                    console.log('ApiClient: Added Authorization header');
                } else {
                    console.log('ApiClient: Token expired, not adding to request');
                }
            } else {
                console.log('ApiClient: No token available');
            }
            console.log('ApiClient: Request config:', {
                url: config.url,
                method: config.method,
                hasAuth: !!config.headers.Authorization,
                params: config.params
            });
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
"[project]/src/services/adminService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminService",
    ()=>AdminService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/apiClient.ts [app-ssr] (ecmascript)");
'use client';
;
class AdminService {
    static BASE_PATH = '/admin';
    // System Overview
    static async getSystemStats() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/stats`);
        return response.data;
    }
    static async getSystemHealth() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/health`);
        return response.data;
    }
    static async restartSystem(component) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/restart`, {
            component
        });
    }
    // Logging and Audit
    static async getSystemLogs(filters) {
        const params = new URLSearchParams();
        if (filters?.level) params.append('level', filters.level);
        if (filters?.module) params.append('module', filters.module);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/logs?${params.toString()}`);
        return response.data;
    }
    static async getAuditLogs(filters) {
        const params = new URLSearchParams();
        if (filters?.action) params.append('action', filters.action);
        if (filters?.resource) params.append('resource', filters.resource);
        if (filters?.userId) params.append('userId', filters.userId);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/audit?${params.toString()}`);
        return response.data;
    }
    static async exportLogs(type, filters) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/logs/export`, {
            type,
            filters
        }, {
            responseType: 'blob'
        });
        return response.data;
    }
    // User Management
    static async getActiveSessions() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/sessions`);
        return response.data;
    }
    static async terminateSession(sessionId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/sessions/${sessionId}`);
    }
    static async terminateUserSessions(userId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/users/${userId}/sessions`);
    }
    static async impersonateUser(userId, reason) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/impersonate`, {
            userId,
            reason
        });
        return response.data;
    }
    // Configuration Management
    static async getSystemConfig() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/config`);
        return response.data;
    }
    static async updateConfig(key, value) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].put(`${this.BASE_PATH}/config/${key}`, {
            value
        });
    }
    static async resetConfig(key) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/config/${key}`);
    }
    // System Alerts
    static async getSystemAlerts(filters) {
        const params = new URLSearchParams();
        if (filters?.type) params.append('type', filters.type);
        if (filters?.severity) params.append('severity', filters.severity);
        if (filters?.acknowledged !== undefined) params.append('acknowledged', filters.acknowledged.toString());
        if (filters?.resolved !== undefined) params.append('resolved', filters.resolved.toString());
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/alerts?${params.toString()}`);
        return response.data;
    }
    static async acknowledgeAlert(alertId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/alerts/${alertId}/acknowledge`);
    }
    static async resolveAlert(alertId, resolution) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`${this.BASE_PATH}/alerts/${alertId}/resolve`, {
            resolution
        });
    }
    static async createAlert(alert) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/alerts`, alert);
        return response.data;
    }
    // Backup and Maintenance
    static async getBackups() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/backups`);
        return response.data;
    }
    static async createBackup(type = 'FULL') {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/backups`, {
            type
        });
        return response.data;
    }
    static async restoreBackup(backupId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/backups/${backupId}/restore`);
    }
    static async deleteBackup(backupId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/backups/${backupId}`);
    }
    static async scheduleBackup(schedule) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/backups/schedule`, schedule);
    }
    // Database Management
    static async getDatabaseMetrics() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/database/metrics`);
        return response.data;
    }
    static async optimizeDatabase() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/database/optimize`);
    }
    static async analyzeTables() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/database/analyze`);
    }
    static async rebuildIndexes() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/database/reindex`);
    }
    // System Maintenance
    static async clearCache(type) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/cache/clear`, {
            type
        });
    }
    static async runMaintenance(tasks) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/maintenance`, {
            tasks
        });
        return response.data;
    }
    static async cleanupFiles(olderThanDays) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/cleanup/files`, {
            olderThanDays
        });
        return response.data;
    }
    static async cleanupLogs(olderThanDays) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/cleanup/logs`, {
            olderThanDays
        });
        return response.data;
    }
    // Monitoring and Performance
    static async getPerformanceMetrics(timeRange = '24h') {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/metrics?timeRange=${timeRange}`);
        return response.data;
    }
    static async getSystemProcesses() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/processes`);
        return response.data;
    }
    // Security Management
    static async getSecurityEvents(filters) {
        const params = new URLSearchParams();
        if (filters?.type) params.append('type', filters.type);
        if (filters?.severity) params.append('severity', filters.severity);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/security/events?${params.toString()}`);
        return response.data;
    }
    static async blockIP(ip, reason, duration) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/security/block-ip`, {
            ip,
            reason,
            duration
        });
    }
    static async unblockIP(ip) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`${this.BASE_PATH}/security/block-ip/${ip}`);
    }
    static async getBlockedIPs() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/security/blocked-ips`);
        return response.data;
    }
    // System Updates
    static async checkUpdates() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/updates/check`);
        return response.data;
    }
    static async installUpdates() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${this.BASE_PATH}/updates/install`);
        return response.data;
    }
    static async getUpdateStatus(updateId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`${this.BASE_PATH}/updates/${updateId}/status`);
        return response.data;
    }
}
}),
"[project]/src/hooks/useAdmin.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAcknowledgeAlert",
    ()=>useAcknowledgeAlert,
    "useActiveSessions",
    ()=>useActiveSessions,
    "useAuditLogs",
    ()=>useAuditLogs,
    "useBackups",
    ()=>useBackups,
    "useBlockIP",
    ()=>useBlockIP,
    "useCleanupFiles",
    ()=>useCleanupFiles,
    "useCleanupLogs",
    ()=>useCleanupLogs,
    "useClearCache",
    ()=>useClearCache,
    "useCreateAlert",
    ()=>useCreateAlert,
    "useCreateBackup",
    ()=>useCreateBackup,
    "useDatabaseMetrics",
    ()=>useDatabaseMetrics,
    "useDeleteBackup",
    ()=>useDeleteBackup,
    "useExportLogs",
    ()=>useExportLogs,
    "useInstallUpdates",
    ()=>useInstallUpdates,
    "useOptimizeDatabase",
    ()=>useOptimizeDatabase,
    "usePerformanceMetrics",
    ()=>usePerformanceMetrics,
    "useResetConfig",
    ()=>useResetConfig,
    "useResolveAlert",
    ()=>useResolveAlert,
    "useRestartSystem",
    ()=>useRestartSystem,
    "useRestoreBackup",
    ()=>useRestoreBackup,
    "useRunMaintenance",
    ()=>useRunMaintenance,
    "useSecurityEvents",
    ()=>useSecurityEvents,
    "useSystemAlerts",
    ()=>useSystemAlerts,
    "useSystemConfig",
    ()=>useSystemConfig,
    "useSystemHealth",
    ()=>useSystemHealth,
    "useSystemLogs",
    ()=>useSystemLogs,
    "useSystemProcesses",
    ()=>useSystemProcesses,
    "useSystemStats",
    ()=>useSystemStats,
    "useSystemUpdates",
    ()=>useSystemUpdates,
    "useTerminateSession",
    ()=>useTerminateSession,
    "useTerminateUserSessions",
    ()=>useTerminateUserSessions,
    "useUnblockIP",
    ()=>useUnblockIP,
    "useUpdateConfig",
    ()=>useUpdateConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-ssr] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/adminService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
// Query Keys
const ADMIN_KEYS = {
    all: [
        'admin'
    ],
    stats: ()=>[
            ...ADMIN_KEYS.all,
            'stats'
        ],
    health: ()=>[
            ...ADMIN_KEYS.all,
            'health'
        ],
    logs: (filters)=>[
            ...ADMIN_KEYS.all,
            'logs',
            filters
        ],
    audit: (filters)=>[
            ...ADMIN_KEYS.all,
            'audit',
            filters
        ],
    sessions: ()=>[
            ...ADMIN_KEYS.all,
            'sessions'
        ],
    config: ()=>[
            ...ADMIN_KEYS.all,
            'config'
        ],
    alerts: (filters)=>[
            ...ADMIN_KEYS.all,
            'alerts',
            filters
        ],
    backups: ()=>[
            ...ADMIN_KEYS.all,
            'backups'
        ],
    database: ()=>[
            ...ADMIN_KEYS.all,
            'database'
        ],
    metrics: (timeRange)=>[
            ...ADMIN_KEYS.all,
            'metrics',
            timeRange
        ],
    processes: ()=>[
            ...ADMIN_KEYS.all,
            'processes'
        ],
    security: (filters)=>[
            ...ADMIN_KEYS.all,
            'security',
            filters
        ],
    updates: ()=>[
            ...ADMIN_KEYS.all,
            'updates'
        ]
};
const useSystemStats = (refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.stats(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getSystemStats(),
        refetchInterval: refreshInterval || 30000,
        staleTime: 15000
    });
};
const useSystemHealth = (refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.health(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getSystemHealth(),
        refetchInterval: refreshInterval || 10000,
        staleTime: 5000
    });
};
const useSystemLogs = (filters)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.logs(filters),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getSystemLogs(filters),
        staleTime: 30000
    });
};
const useAuditLogs = (filters)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.audit(filters),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getAuditLogs(filters),
        staleTime: 30000
    });
};
const useActiveSessions = (refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.sessions(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getActiveSessions(),
        refetchInterval: refreshInterval || 60000,
        staleTime: 30000
    });
};
const useSystemConfig = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.config(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getSystemConfig(),
        staleTime: 5 * 60 * 1000
    });
};
const useSystemAlerts = (filters, refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.alerts(filters),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getSystemAlerts(filters),
        refetchInterval: refreshInterval || 30000,
        staleTime: 15000
    });
};
const useBackups = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.backups(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getBackups(),
        staleTime: 2 * 60 * 1000
    });
};
const useDatabaseMetrics = (refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.database(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getDatabaseMetrics(),
        refetchInterval: refreshInterval || 60000,
        staleTime: 30000
    });
};
const usePerformanceMetrics = (timeRange)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.metrics(timeRange),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getPerformanceMetrics(timeRange),
        refetchInterval: 30000,
        staleTime: 15000
    });
};
const useSystemProcesses = (refreshInterval)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.processes(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getSystemProcesses(),
        refetchInterval: refreshInterval || 10000,
        staleTime: 5000
    });
};
const useSecurityEvents = (filters)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.security(filters),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].getSecurityEvents(filters),
        staleTime: 30000
    });
};
const useSystemUpdates = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: ADMIN_KEYS.updates(),
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].checkUpdates(),
        staleTime: 60 * 60 * 1000,
        retry: false
    });
};
const useRestartSystem = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (component)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].restartSystem(component),
        onSuccess: ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('System restart initiated');
            // Refresh system health after restart
            setTimeout(()=>{
                queryClient.invalidateQueries({
                    queryKey: ADMIN_KEYS.health()
                });
                queryClient.invalidateQueries({
                    queryKey: ADMIN_KEYS.stats()
                });
            }, 5000);
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to restart system';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useTerminateSession = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (sessionId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].terminateSession(sessionId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.sessions()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Session terminated successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to terminate session';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useTerminateUserSessions = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (userId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].terminateUserSessions(userId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.sessions()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('All user sessions terminated successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to terminate user sessions';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useUpdateConfig = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ key, value })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].updateConfig(key, value),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.config()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Configuration updated successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to update configuration';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useResetConfig = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (key)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].resetConfig(key),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.config()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Configuration reset to default');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to reset configuration';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useAcknowledgeAlert = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (alertId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].acknowledgeAlert(alertId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.alerts()
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
        mutationFn: ({ alertId, resolution })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].resolveAlert(alertId, resolution),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.alerts()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Alert resolved');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to resolve alert';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useCreateAlert = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (alert)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].createAlert(alert),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.alerts()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Alert created');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to create alert';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useCreateBackup = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (type = 'FULL')=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].createBackup(type),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.backups()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Backup started successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to start backup';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useRestoreBackup = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (backupId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].restoreBackup(backupId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.backups()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Backup restoration started');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to restore backup';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useDeleteBackup = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (backupId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].deleteBackup(backupId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.backups()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Backup deleted successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to delete backup';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useClearCache = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (type)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].clearCache(type),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.stats()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Cache cleared successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to clear cache';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useRunMaintenance = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (tasks)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].runMaintenance(tasks),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.stats()
            });
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.database()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Maintenance tasks completed');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to run maintenance';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useOptimizeDatabase = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].optimizeDatabase(),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.database()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Database optimization completed');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to optimize database';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useCleanupFiles = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (olderThanDays)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].cleanupFiles(olderThanDays),
        onSuccess: (result)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Cleaned up ${result.deletedCount} files, freed ${(result.freedSpace / 1024 / 1024).toFixed(2)} MB`);
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to cleanup files';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useCleanupLogs = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (olderThanDays)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].cleanupLogs(olderThanDays),
        onSuccess: (result)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`Cleaned up ${result.deletedCount} log entries`);
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to cleanup logs';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useBlockIP = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ ip, reason, duration })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].blockIP(ip, reason, duration),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.security()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('IP address blocked successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to block IP address';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useUnblockIP = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (ip)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].unblockIP(ip),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.security()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('IP address unblocked successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to unblock IP address';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useInstallUpdates = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].installUpdates(),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: ADMIN_KEYS.updates()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('System update installation started');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to install updates';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
const useExportLogs = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ({ type, filters })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$adminService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminService"].exportLogs(type, filters),
        onSuccess: (blob, variables)=>{
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${variables.type}_logs_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('Logs exported successfully');
        },
        onError: (error)=>{
            const errorMessage = error?.response?.data?.message || 'Failed to export logs';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error(errorMessage);
        }
    });
};
}),
"[project]/src/components/admin/SystemAdminDashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SystemAdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-ssr] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-ssr] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/statistic/index.js [app-ssr] (ecmascript) <export default as Statistic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-ssr] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/progress/index.js [app-ssr] (ecmascript) <export default as Progress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/list/index.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-ssr] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-ssr] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-ssr] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-ssr] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-ssr] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-ssr] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tabs/index.js [app-ssr] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-ssr] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DashboardOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DashboardOutlined.js [app-ssr] (ecmascript) <export default as DashboardOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloudServerOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudServerOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CloudServerOutlined.js [app-ssr] (ecmascript) <export default as CloudServerOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DatabaseOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DatabaseOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DatabaseOutlined.js [app-ssr] (ecmascript) <export default as DatabaseOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$WarningOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WarningOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/WarningOutlined.js [app-ssr] (ecmascript) <export default as WarningOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-ssr] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UploadOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UploadOutlined.js [app-ssr] (ecmascript) <export default as UploadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DownloadOutlined.js [app-ssr] (ecmascript) <export default as DownloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-ssr] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAdmin.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistance.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const { Title, Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { TabPane } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"];
function SystemAdminDashboard({ adminId }) {
    const [selectedAlert, setSelectedAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [configModal, setConfigModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedConfig, setSelectedConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessionModal, setSessionModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedSession, setSelectedSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [alertFilters, setAlertFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    // Queries
    const { data: stats, isLoading: statsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSystemStats"])(30000);
    const { data: health, isLoading: healthLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSystemHealth"])(10000);
    const { data: alertsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSystemAlerts"])(alertFilters, 15000);
    const { data: sessionsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveSessions"])(60000);
    const { data: configData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSystemConfig"])();
    const { data: backupsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBackups"])();
    const { data: dbMetrics } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDatabaseMetrics"])(60000);
    const { data: perfMetrics } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePerformanceMetrics"])('24h');
    const { data: processesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSystemProcesses"])(30000);
    const { data: securityData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSecurityEvents"])();
    const { data: updatesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSystemUpdates"])();
    // Mutations
    const restartSystemMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRestartSystem"])();
    const terminateSessionMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTerminateSession"])();
    const updateConfigMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUpdateConfig"])();
    const acknowledgeAlertMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAcknowledgeAlert"])();
    const resolveAlertMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResolveAlert"])();
    const createBackupMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCreateBackup"])();
    const clearCacheMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClearCache"])();
    const optimizeDatabaseMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOptimizeDatabase"])();
    const installUpdatesMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAdmin$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInstallUpdates"])();
    const getHealthStatusColor = (status)=>{
        switch(status){
            case 'HEALTHY':
                return '#52c41a';
            case 'WARNING':
                return '#faad14';
            case 'CRITICAL':
                return '#ff4d4f';
            default:
                return '#d9d9d9';
        }
    };
    const getAlertSeverityColor = (severity)=>{
        switch(severity){
            case 'LOW':
                return 'blue';
            case 'MEDIUM':
                return 'orange';
            case 'HIGH':
                return 'red';
            case 'CRITICAL':
                return 'purple';
            default:
                return 'default';
        }
    };
    const handleSystemRestart = (component)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"].confirm({
            title: 'Confirm System Restart',
            content: `Are you sure you want to restart ${component || 'the system'}? This will temporarily interrupt service.`,
            okType: 'danger',
            onOk: ()=>restartSystemMutation.mutate(component)
        });
    };
    const handleTerminateSession = (sessionId)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"].confirm({
            title: 'Confirm Session Termination',
            content: 'Are you sure you want to terminate this user session?',
            okType: 'danger',
            onOk: ()=>terminateSessionMutation.mutate(sessionId)
        });
    };
    const handleUpdateConfig = (values)=>{
        updateConfigMutation.mutate({
            key: selectedConfig.key,
            value: values.value
        }, {
            onSuccess: ()=>{
                setConfigModal(false);
                setSelectedConfig(null);
                form.resetFields();
            }
        });
    };
    const handleCreateBackup = (type)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"].confirm({
            title: 'Create Backup',
            content: `Are you sure you want to create a ${type} backup? This may take several minutes.`,
            onOk: ()=>createBackupMutation.mutate(type)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '24px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: [
                    24,
                    24
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        span: 24,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                    level: 2,
                                    style: {
                                        margin: 0,
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DashboardOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardOutlined$3e$__["DashboardOutlined"], {
                                            style: {
                                                marginRight: '12px',
                                                color: '#1890ff'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this),
                                        "System Administration Dashboard"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                    type: "secondary",
                                    children: "Comprehensive system monitoring and management"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        span: 24,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CloudServerOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudServerOutlined$3e$__["CloudServerOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, void 0),
                                    "System Health",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                        status: health?.status === 'HEALTHY' ? 'success' : health?.status === 'WARNING' ? 'warning' : 'error',
                                        text: health?.status || 'Loading...'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, void 0),
                            extra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                type: "primary",
                                danger: true,
                                onClick: ()=>handleSystemRestart(),
                                loading: restartSystemMutation.isPending,
                                children: "Restart System"
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 195,
                                columnNumber: 15
                            }, void 0),
                            loading: healthLoading,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    16
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 12,
                                        md: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                            title: "Uptime",
                                            value: health?.uptime || 0,
                                            suffix: "hours",
                                            prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {}, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 212,
                                                columnNumber: 27
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 12,
                                        md: 6,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                                title: "Memory Usage",
                                                value: health?.memoryUsage || 0,
                                                suffix: "%",
                                                valueStyle: {
                                                    color: (health?.memoryUsage || 0) > 80 ? '#ff4d4f' : '#3f8600'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__["Progress"], {
                                                percent: health?.memoryUsage || 0,
                                                showInfo: false,
                                                status: (health?.memoryUsage || 0) > 80 ? 'exception' : 'success'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 222,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 12,
                                        md: 6,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                                title: "CPU Usage",
                                                value: health?.cpuUsage || 0,
                                                suffix: "%",
                                                valueStyle: {
                                                    color: (health?.cpuUsage || 0) > 80 ? '#ff4d4f' : '#3f8600'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__["Progress"], {
                                                percent: health?.cpuUsage || 0,
                                                showInfo: false,
                                                status: (health?.cpuUsage || 0) > 80 ? 'exception' : 'success'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 24,
                                        sm: 12,
                                        md: 6,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                                title: "Disk Usage",
                                                value: health?.diskUsage || 0,
                                                suffix: "%",
                                                valueStyle: {
                                                    color: (health?.diskUsage || 0) > 90 ? '#ff4d4f' : '#3f8600'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 234,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$progress$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Progress$3e$__["Progress"], {
                                                percent: health?.diskUsage || 0,
                                                showInfo: false,
                                                status: (health?.diskUsage || 0) > 90 ? 'exception' : 'success'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        span: 24,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DashboardOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DashboardOutlined$3e$__["DashboardOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 248,
                                        columnNumber: 26
                                    }, void 0),
                                    " System Statistics"
                                ]
                            }, void 0, true),
                            loading: statsLoading,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                gutter: [
                                    16,
                                    16
                                ],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 12,
                                        sm: 8,
                                        md: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                            title: "Total Users",
                                            value: stats?.totalUsers || 0,
                                            prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 251,
                                                columnNumber: 87
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 12,
                                        sm: 8,
                                        md: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                            title: "Active Users",
                                            value: stats?.activeUsers || 0,
                                            valueStyle: {
                                                color: '#3f8600'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 12,
                                        sm: 8,
                                        md: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                            title: "Total Students",
                                            value: stats?.totalStudents || 0
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 257,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 12,
                                        sm: 8,
                                        md: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                            title: "Active Vehicles",
                                            value: stats?.activeVehicles || 0
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 260,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 12,
                                        sm: 8,
                                        md: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                            title: "Active Routes",
                                            value: stats?.activeRoutes || 0
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        xs: 12,
                                        sm: 8,
                                        md: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                            title: "Active Trips",
                                            value: stats?.activeTrips || 0,
                                            valueStyle: {
                                                color: '#1890ff'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        span: 24,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tabs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
                                defaultActiveKey: "alerts",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabPane, {
                                        tab: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$WarningOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__WarningOutlined$3e$__["WarningOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 31
                                                }, void 0),
                                                "Alerts"
                                            ]
                                        }, void 0, true),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                            direction: "vertical",
                                            style: {
                                                width: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                            placeholder: "Filter by type",
                                                            allowClear: true,
                                                            style: {
                                                                width: 150
                                                            },
                                                            onChange: (value)=>setAlertFilters({
                                                                    ...alertFilters,
                                                                    type: value
                                                                }),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "SYSTEM_ERROR",
                                                                    children: "System Error"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 285,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "SECURITY",
                                                                    children: "Security"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "PERFORMANCE",
                                                                    children: "Performance"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "MAINTENANCE",
                                                                    children: "Maintenance"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 288,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                            placeholder: "Filter by severity",
                                                            allowClear: true,
                                                            style: {
                                                                width: 150
                                                            },
                                                            onChange: (value)=>setAlertFilters({
                                                                    ...alertFilters,
                                                                    severity: value
                                                                }),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "LOW",
                                                                    children: "Low"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 296,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "MEDIUM",
                                                                    children: "Medium"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "HIGH",
                                                                    children: "High"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"].Option, {
                                                                    value: "CRITICAL",
                                                                    children: "Critical"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 299,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                    dataSource: alertsData?.data?.items || [],
                                                    renderItem: (alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
                                                            actions: [
                                                                !alert.acknowledged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                                    onClick: ()=>acknowledgeAlertMutation.mutate(alert.id),
                                                                    children: "Acknowledge"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 309,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                !alert.resolved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                                    type: "primary",
                                                                    onClick: ()=>resolveAlertMutation.mutate({
                                                                            alertId: alert.id
                                                                        }),
                                                                    children: "Resolve"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            ].filter(Boolean),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item.Meta, {
                                                                avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                    color: getAlertSeverityColor(alert.severity),
                                                                    children: alert.severity
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 322,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                title: alert.title,
                                                                description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                            children: alert.message
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 329,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 330,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                            type: "secondary",
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(alert.timestamp), {
                                                                                addSuffix: true
                                                                            })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 331,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        alert.acknowledged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                            color: "blue",
                                                                            style: {
                                                                                marginLeft: '8px'
                                                                            },
                                                                            children: "Acknowledged"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 335,
                                                                            columnNumber: 33
                                                                        }, void 0),
                                                                        alert.resolved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                            color: "green",
                                                                            style: {
                                                                                marginLeft: '8px'
                                                                            },
                                                                            children: "Resolved"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 338,
                                                                            columnNumber: 33
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 328,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 23
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this)
                                    }, "alerts", false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabPane, {
                                        tab: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 31
                                                }, void 0),
                                                "Active Sessions"
                                            ]
                                        }, void 0, true),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                            dataSource: sessionsData?.data?.items || [],
                                            renderItem: (session)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
                                                    actions: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            danger: true,
                                                            onClick: ()=>handleTerminateSession(session.id),
                                                            loading: terminateSessionMutation.isPending,
                                                            children: "Terminate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ],
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item.Meta, {
                                                        avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 33
                                                        }, void 0),
                                                        title: `${session.userName} (${session.userRole})`,
                                                        description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                    children: [
                                                                        "IP: ",
                                                                        session.ip
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 369,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 369,
                                                                    columnNumber: 58
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                    children: [
                                                                        "Login: ",
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(session.loginTime), {
                                                                            addSuffix: true
                                                                        })
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 370,
                                                                    columnNumber: 120
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                    children: [
                                                                        "Last Activity: ",
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(session.lastActivity), {
                                                                            addSuffix: true
                                                                        })
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 371,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                                                                    status: session.isActive ? 'success' : 'default',
                                                                    text: session.isActive ? 'Active' : 'Inactive',
                                                                    style: {
                                                                        marginLeft: '8px'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 372,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 27
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 23
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 21
                                                }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, this)
                                    }, "sessions", false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabPane, {
                                        tab: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DatabaseOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DatabaseOutlined$3e$__["DatabaseOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 31
                                                }, void 0),
                                                "Database"
                                            ]
                                        }, void 0, true),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                            gutter: [
                                                16,
                                                16
                                            ],
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                    xs: 24,
                                                    md: 12,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                                        title: "Database Metrics",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                                            gutter: [
                                                                16,
                                                                16
                                                            ],
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                                    span: 12,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                                                        title: "Total Size",
                                                                        value: `${((dbMetrics?.totalSize || 0) / 1024 / 1024).toFixed(2)} MB`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                        lineNumber: 391,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                                    span: 12,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                                                        title: "Tables",
                                                                        value: dbMetrics?.tableCount || 0
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                        lineNumber: 394,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 393,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                                    span: 12,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                                                        title: "Connections",
                                                                        value: dbMetrics?.connectionCount || 0
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 396,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                                    span: 12,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$statistic$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Statistic$3e$__["Statistic"], {
                                                                        title: "Avg Query Time",
                                                                        value: `${dbMetrics?.averageQueryTime || 0}ms`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                        lineNumber: 400,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 399,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                                    xs: 24,
                                                    md: 12,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                                        title: "Database Actions",
                                                        extra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                                    type: "primary",
                                                                    onClick: ()=>optimizeDatabaseMutation.mutate(),
                                                                    loading: optimizeDatabaseMutation.isPending,
                                                                    children: "Optimize"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 410,
                                                                    columnNumber: 27
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                                    onClick: ()=>clearCacheMutation.mutate('DATABASE'),
                                                                    children: "Clear Cache"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 417,
                                                                    columnNumber: 27
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 25
                                                        }, void 0),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                            direction: "vertical",
                                                            style: {
                                                                width: '100%'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                                                message: "Database Optimization",
                                                                description: "Optimize database performance by rebuilding indexes and updating statistics.",
                                                                type: "info"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                lineNumber: 424,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 386,
                                            columnNumber: 17
                                        }, this)
                                    }, "database", false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabPane, {
                                        tab: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 31
                                                }, void 0),
                                                "Backups"
                                            ]
                                        }, void 0, true),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                            direction: "vertical",
                                            style: {
                                                width: '100%'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            type: "primary",
                                                            onClick: ()=>handleCreateBackup('FULL'),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " Full Backup"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            onClick: ()=>handleCreateBackup('INCREMENTAL'),
                                                            children: "Incremental Backup"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            onClick: ()=>handleCreateBackup('DIFFERENTIAL'),
                                                            children: "Differential Backup"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                    dataSource: backupsData?.data?.items || [],
                                                    renderItem: (backup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item, {
                                                            actions: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                    color: backup.status === 'COMPLETED' ? 'green' : backup.status === 'FAILED' ? 'red' : 'blue',
                                                                    children: backup.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 454,
                                                                    columnNumber: 27
                                                                }, void 0)
                                                            ],
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"].Item.Meta, {
                                                                title: `${backup.type} Backup`,
                                                                description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                            children: [
                                                                                "Started: ",
                                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(backup.startTime), {
                                                                                    addSuffix: true
                                                                                })
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 463,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 463,
                                                                            columnNumber: 123
                                                                        }, void 0),
                                                                        backup.endTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                            children: [
                                                                                "Duration: ",
                                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDistance"])(new Date(backup.startTime), new Date(backup.endTime))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 464,
                                                                            columnNumber: 50
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 464,
                                                                            columnNumber: 144
                                                                        }, void 0),
                                                                        backup.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                            children: [
                                                                                "Size: ",
                                                                                (backup.size / 1024 / 1024).toFixed(2),
                                                                                " MB"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                            lineNumber: 465,
                                                                            columnNumber: 47
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                    lineNumber: 462,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                                lineNumber: 459,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 23
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 436,
                                            columnNumber: 17
                                        }, this)
                                    }, "backups", false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabPane, {
                                        tab: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UploadOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadOutlined$3e$__["UploadOutlined"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 31
                                                }, void 0),
                                                "Updates"
                                            ]
                                        }, void 0, true),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                            title: "System Updates",
                                            extra: updatesData?.available && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                type: "primary",
                                                onClick: ()=>installUpdatesMutation.mutate(),
                                                loading: installUpdatesMutation.isPending,
                                                children: "Install Updates"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 480,
                                                columnNumber: 23
                                            }, void 0),
                                            children: updatesData?.available ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                                message: `Update Available: v${updatesData.latestVersion}`,
                                                description: `Current version: v${updatesData.currentVersion}. ${updatesData.updates?.length} update(s) available.`,
                                                type: "warning",
                                                showIcon: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 491,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                                message: "System Up to Date",
                                                description: `Current version: v${updatesData?.currentVersion}. No updates available.`,
                                                type: "success",
                                                showIcon: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                                lineNumber: 498,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                            lineNumber: 476,
                                            columnNumber: 17
                                        }, this)
                                    }, "updates", false, {
                                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: "Update Configuration",
                open: configModal,
                onOk: form.submit,
                onCancel: ()=>{
                    setConfigModal(false);
                    setSelectedConfig(null);
                    form.resetFields();
                },
                confirmLoading: updateConfigMutation.isPending,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                    form: form,
                    onFinish: handleUpdateConfig,
                    layout: "vertical",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                            label: "Key",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                value: selectedConfig?.key,
                                disabled: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 530,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                            lineNumber: 529,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                            label: "Value",
                            name: "value",
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter a value'
                                }
                            ],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"].TextArea, {
                                rows: 3
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 537,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                            lineNumber: 532,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                            label: "Description",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                type: "secondary",
                                children: selectedConfig?.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                                lineNumber: 540,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                            lineNumber: 539,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                    lineNumber: 524,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/admin/SystemAdminDashboard.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
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
"[project]/src/app/(dashboard)/admin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$SystemAdminDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/SystemAdminDashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function AdminDashboardPage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Redirect non-admin users
        if (user && user.role !== 'ADMIN') {
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
                description: "Please log in to access the admin dashboard.",
                type: "error"
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/admin/page.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/admin/page.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this);
    }
    if (user.role !== 'ADMIN') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            style: {
                textAlign: 'center',
                padding: '50px'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                message: "Access Denied",
                description: "This dashboard is only available for administrator accounts.",
                type: "error"
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/admin/page.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/admin/page.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$SystemAdminDashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        adminId: user.id
    }, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/admin/page.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1752be8b._.js.map