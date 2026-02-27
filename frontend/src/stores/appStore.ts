import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  Notification, 
  BreadcrumbItem, 
  ThemeMode,
  DashboardWidget 
} from '@/types/common';

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  isMobile: boolean;
  theme: ThemeMode;
  
  // Navigation
  breadcrumbs: BreadcrumbItem[];
  currentPage: string;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Loading states
  globalLoading: boolean;
  
  // Dashboard
  dashboardWidgets: DashboardWidget[];
  
  // Search
  searchVisible: boolean;
  searchQuery: string;
  
  // Actions - UI
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  
  // Actions - Navigation
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  setCurrentPage: (page: string) => void;
  
  // Actions - Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  
  // Actions - Loading
  setGlobalLoading: (loading: boolean) => void;
  
  // Actions - Dashboard
  updateDashboardWidgets: (widgets: DashboardWidget[]) => void;
  updateWidget: (id: string, data: Partial<DashboardWidget>) => void;
  
  // Actions - Search
  setSearchVisible: (visible: boolean) => void;
  setSearchQuery: (query: string) => void;
  
  // Actions - Reset
  resetApp: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
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
        toggleSidebar: () => {
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
        },

        setSidebarCollapsed: (collapsed: boolean) => {
          set({ sidebarCollapsed: collapsed });
        },

        setIsMobile: (isMobile: boolean) => {
          set({ isMobile });
          // Auto-collapse sidebar on mobile
          if (isMobile) {
            set({ sidebarCollapsed: true });
          }
        },

        setTheme: (theme: ThemeMode) => {
          set({ theme });
        },

        // Navigation Actions
        setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => {
          set({ breadcrumbs });
        },

        setCurrentPage: (page: string) => {
          set({ currentPage: page });
        },

        // Notification Actions
        addNotification: (notification) => {
          const id = Math.random().toString(36).substr(2, 9);
          const timestamp = new Date();
          
          set((state) => {
            const newNotification: Notification = {
              id,
              timestamp,
              read: false,
              ...notification,
            };
            
            const notifications = [newNotification, ...state.notifications];
            const unreadCount = notifications.filter(n => !n.read).length;
            
            return {
              notifications,
              unreadCount,
            };
          });
          
          // Auto-remove notification after 5 seconds for success messages
          if (notification.type === 'success') {
            setTimeout(() => {
              get().removeNotification(id);
            }, 5000);
          }
        },

        removeNotification: (id: string) => {
          set((state) => {
            const notifications = state.notifications.filter(n => n.id !== id);
            const unreadCount = notifications.filter(n => !n.read).length;
            
            return {
              notifications,
              unreadCount,
            };
          });
        },

        markNotificationRead: (id: string) => {
          set((state) => {
            const notifications = state.notifications.map(n =>
              n.id === id ? { ...n, read: true } : n
            );
            const unreadCount = notifications.filter(n => !n.read).length;
            
            return {
              notifications,
              unreadCount,
            };
          });
        },

        markAllNotificationsRead: () => {
          set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true })),
            unreadCount: 0,
          }));
        },

        clearNotifications: () => {
          set({
            notifications: [],
            unreadCount: 0,
          });
        },

        // Loading Actions
        setGlobalLoading: (loading: boolean) => {
          set({ globalLoading: loading });
        },

        // Dashboard Actions
        updateDashboardWidgets: (widgets: DashboardWidget[]) => {
          set({ dashboardWidgets: widgets });
        },

        updateWidget: (id: string, data: Partial<DashboardWidget>) => {
          set((state) => ({
            dashboardWidgets: state.dashboardWidgets.map(widget =>
              widget.id === id ? { ...widget, ...data } : widget
            ),
          }));
        },

        // Search Actions
        setSearchVisible: (visible: boolean) => {
          set({ searchVisible: visible });
          if (!visible) {
            set({ searchQuery: '' });
          }
        },

        setSearchQuery: (query: string) => {
          set({ searchQuery: query });
        },

        // Reset
        resetApp: () => {
          set({
            sidebarCollapsed: false,
            breadcrumbs: [],
            currentPage: '',
            notifications: [],
            unreadCount: 0,
            globalLoading: false,
            dashboardWidgets: [],
            searchVisible: false,
            searchQuery: '',
          });
        },
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          // Only persist UI preferences
          sidebarCollapsed: state.sidebarCollapsed,
          theme: state.theme,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
);