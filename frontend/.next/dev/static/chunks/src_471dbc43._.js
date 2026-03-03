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
"[project]/src/components/auth/LoginForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-client] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/alert/index.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/divider/index.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/checkbox/index.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/UserOutlined.js [app-client] (ecmascript) <export default as UserOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$LockOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/LockOutlined.js [app-client] (ecmascript) <export default as LockOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EyeInvisibleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeInvisibleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EyeInvisibleOutlined.js [app-client] (ecmascript) <export default as EyeInvisibleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EyeTwoTone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeTwoTone$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EyeTwoTone.js [app-client] (ecmascript) <export default as EyeTwoTone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/appStore.ts [app-client] (ecmascript)");
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
const { Title, Text, Link } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
function LoginForm(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(46);
    if ($[0] !== "2fc0fa262e6e5257a3d30a05f6afede633fee3dee12bda6ac837c7fb6a5ee886") {
        for(let $i = 0; $i < 46; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2fc0fa262e6e5257a3d30a05f6afede633fee3dee12bda6ac837c7fb6a5ee886";
    }
    const { onSwitchToRegister } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { login, isLoading, error, clearError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { addNotification } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])();
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const [rememberMe, setRememberMe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] !== addNotification || $[2] !== clearError || $[3] !== login || $[4] !== router) {
        t1 = ({
            "LoginForm[handleSubmit]": async (values)=>{
                ;
                try {
                    clearError();
                    await login(values);
                    addNotification({
                        type: "success",
                        title: "Welcome Back!",
                        message: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUCCESS_MESSAGES"].LOGIN
                    });
                    router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD);
                } catch (t2) {
                    const error_0 = t2;
                    console.error("Login failed:", error_0);
                }
            }
        })["LoginForm[handleSubmit]"];
        $[1] = addNotification;
        $[2] = clearError;
        $[3] = login;
        $[4] = router;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    const handleSubmit = t1;
    let t2;
    if ($[6] !== router) {
        t2 = ({
            "LoginForm[handleForgotPassword]": ()=>{
                router.push("/auth/forgot-password");
            }
        })["LoginForm[handleForgotPassword]"];
        $[6] = router;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    const handleForgotPassword = t2;
    let t3;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px"
        };
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    let t5;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
        };
        t5 = {
            body: {
                padding: "40px"
            }
        };
        $[9] = t4;
        $[10] = t5;
    } else {
        t4 = $[9];
        t5 = $[10];
    }
    let t6;
    let t7;
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            width: "100%"
        };
        t7 = {
            textAlign: "center"
        };
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                fontSize: "48px",
                color: "#1890ff",
                marginBottom: "16px"
            },
            children: "🚌"
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 129,
            columnNumber: 10
        }, this);
        $[11] = t6;
        $[12] = t7;
        $[13] = t8;
    } else {
        t6 = $[11];
        t7 = $[12];
        t8 = $[13];
    }
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t7,
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                    level: 2,
                    style: {
                        margin: "0 0 8px 0"
                    },
                    children: "Welcome Back"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 144,
                    columnNumber: 30
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    type: "secondary",
                    children: "Sign in to your SKS Transportation account"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 146,
                    columnNumber: 30
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 144,
            columnNumber: 10
        }, this);
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== clearError || $[16] !== error) {
        t10 = error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$alert$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
            message: "Login Failed",
            description: error,
            type: "error",
            showIcon: true,
            closable: true,
            onClose: clearError
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 153,
            columnNumber: 20
        }, this);
        $[15] = clearError;
        $[16] = error;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = [
            {
                required: true,
                message: "Email is required"
            },
            {
                type: "email",
                message: "Please enter a valid email address"
            }
        ];
        $[18] = t11;
    } else {
        t11 = $[18];
    }
    let t12;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
            name: "email",
            rules: t11,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$UserOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserOutlined$3e$__["UserOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 175,
                    columnNumber: 62
                }, void 0),
                placeholder: "Email address",
                autoComplete: "username"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 175,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = [
            {
                required: true,
                message: "Password is required"
            }
        ];
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
            name: "password",
            rules: t13,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"].Password, {
                prefix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$LockOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LockOutlined$3e$__["LockOutlined"], {}, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 192,
                    columnNumber: 74
                }, void 0),
                placeholder: "Password",
                autoComplete: "current-password",
                iconRender: _LoginFormInputPasswordIconRender
            }, void 0, false, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 192,
                columnNumber: 50
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 192,
            columnNumber: 11
        }, this);
        $[21] = t14;
    } else {
        t14 = $[21];
    }
    let t15;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        };
        $[22] = t15;
    } else {
        t15 = $[22];
    }
    let t16;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = ({
            "LoginForm[<Checkbox>.onChange]": (e)=>setRememberMe(e.target.checked)
        })["LoginForm[<Checkbox>.onChange]"];
        $[23] = t16;
    } else {
        t16 = $[23];
    }
    let t17;
    if ($[24] !== rememberMe) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$checkbox$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
            checked: rememberMe,
            onChange: t16,
            children: "Remember me"
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[24] = rememberMe;
        $[25] = t17;
    } else {
        t17 = $[25];
    }
    let t18;
    if ($[26] !== handleForgotPassword) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
            onClick: handleForgotPassword,
            children: "Forgot password?"
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 227,
            columnNumber: 11
        }, this);
        $[26] = handleForgotPassword;
        $[27] = t18;
    } else {
        t18 = $[27];
    }
    let t19;
    if ($[28] !== t17 || $[29] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: t15,
                children: [
                    t17,
                    t18
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 235,
                columnNumber: 22
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 235,
            columnNumber: 11
        }, this);
        $[28] = t17;
        $[29] = t18;
        $[30] = t19;
    } else {
        t19 = $[30];
    }
    let t20;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = {
            height: 48
        };
        $[31] = t20;
    } else {
        t20 = $[31];
    }
    let t21;
    if ($[32] !== isLoading) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                type: "primary",
                htmlType: "submit",
                loading: isLoading,
                block: true,
                style: t20,
                children: "Sign In"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 253,
                columnNumber: 22
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 253,
            columnNumber: 11
        }, this);
        $[32] = isLoading;
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    let t22;
    if ($[34] !== form || $[35] !== handleSubmit || $[36] !== t19 || $[37] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
            form: form,
            name: "login",
            onFinish: handleSubmit,
            autoComplete: "off",
            size: "large",
            layout: "vertical",
            children: [
                t12,
                t14,
                t19,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 261,
            columnNumber: 11
        }, this);
        $[34] = form;
        $[35] = handleSubmit;
        $[36] = t19;
        $[37] = t21;
        $[38] = t22;
    } else {
        t22 = $[38];
    }
    let t23;
    if ($[39] !== onSwitchToRegister) {
        t23 = onSwitchToRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                    children: "or"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 272,
                    columnNumber: 35
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: "center"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                        type: "secondary",
                        children: [
                            "Don't have an account?",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                onClick: onSwitchToRegister,
                                children: "Sign up now"
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/LoginForm.tsx",
                                lineNumber: 274,
                                columnNumber: 60
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/LoginForm.tsx",
                        lineNumber: 274,
                        columnNumber: 10
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 272,
                    columnNumber: 56
                }, this)
            ]
        }, void 0, true);
        $[39] = onSwitchToRegister;
        $[40] = t23;
    } else {
        t23 = $[40];
    }
    let t24;
    if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = ("TURBOPACK compile-time value", "development") === "development" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: "#f0f0f0",
                padding: "12px",
                borderRadius: "6px",
                fontSize: "12px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    strong: true,
                    children: "Demo Credentials:"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 8
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 52
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    children: "Admin: admin@demo.com / password123"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 58
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 106
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    children: "Teacher: teacher@demo.com / password123"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 112
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 164
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    children: "Driver: driver@demo.com / password123"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 170
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 220
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                    children: "Parent: parent@demo.com / password123"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 287,
                    columnNumber: 226
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 282,
            columnNumber: 53
        }, this);
        $[41] = t24;
    } else {
        t24 = $[41];
    }
    let t25;
    if ($[42] !== t10 || $[43] !== t22 || $[44] !== t23) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t3,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                style: t4,
                styles: t5,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    orientation: "vertical",
                    size: "large",
                    style: t6,
                    children: [
                        t9,
                        t10,
                        t22,
                        t23,
                        t24
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/auth/LoginForm.tsx",
                    lineNumber: 294,
                    columnNumber: 56
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/auth/LoginForm.tsx",
                lineNumber: 294,
                columnNumber: 27
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/LoginForm.tsx",
            lineNumber: 294,
            columnNumber: 11
        }, this);
        $[42] = t10;
        $[43] = t22;
        $[44] = t23;
        $[45] = t25;
    } else {
        t25 = $[45];
    }
    return t25;
}
_s(LoginForm, "vc0JfugI4y59hKyEv0DDDzThQqY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$appStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm
    ];
});
_c = LoginForm;
function _LoginFormInputPasswordIconRender(visible) {
    return visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EyeTwoTone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeTwoTone$3e$__["EyeTwoTone"], {}, void 0, false, {
        fileName: "[project]/src/components/auth/LoginForm.tsx",
        lineNumber: 305,
        columnNumber: 20
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EyeInvisibleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeInvisibleOutlined$3e$__["EyeInvisibleOutlined"], {}, void 0, false, {
        fileName: "[project]/src/components/auth/LoginForm.tsx",
        lineNumber: 305,
        columnNumber: 37
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "LoginForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/auth/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/app.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$LoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/LoginForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function LoginPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "c033b8b1d5dd21e142820819c05750de5d80e19d99aebf5b8d833c1e0da51821") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c033b8b1d5dd21e142820819c05750de5d80e19d99aebf5b8d833c1e0da51821";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    let t0;
    let t1;
    if ($[1] !== isAuthenticated || $[2] !== router) {
        t0 = ({
            "LoginPage[useEffect()]": ()=>{
                if (isAuthenticated) {
                    router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$app$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD);
                }
            }
        })["LoginPage[useEffect()]"];
        t1 = [
            isAuthenticated,
            router
        ];
        $[1] = isAuthenticated;
        $[2] = router;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[5] !== router) {
        t2 = ({
            "LoginPage[handleSwitchToRegister]": ()=>{
                router.push("/auth/register");
            }
        })["LoginPage[handleSwitchToRegister]"];
        $[5] = router;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const handleSwitchToRegister = t2;
    if (isAuthenticated) {
        return null;
    }
    let t3;
    if ($[7] !== handleSwitchToRegister) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$LoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onSwitchToRegister: handleSwitchToRegister
        }, void 0, false, {
            fileName: "[project]/src/app/auth/login/page.tsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        $[7] = handleSwitchToRegister;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return t3;
}
_s(LoginPage, "MF7hOZm67wfKBg+BVPrJixxHReo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_471dbc43._.js.map