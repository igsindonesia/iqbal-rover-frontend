// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'token',
  USER_USERNAME: 'username',
  ADMIN_TOKEN: 'admin_token',
  ADMIN_USERNAME: 'admin_username',
};

// Route Paths
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // User Protected
  DASHBOARD: '/dashboard',
  DETECTION: '/detection',
  HASIL_DETEKSI: '/hasil-deteksi',
  HISTORY: '/history',

  // Admin
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_USERS: '/admin/users',
  ADMIN_USER_DETAIL: '/admin/users/:user_id',
  ADMIN_HARVEST: '/admin/harvests',
};

// Route Meta Keys
export const META_KEYS = {
  REQUIRES_AUTH: 'requiresAuth',
  REQUIRES_ADMIN_AUTH: 'requiresAdminAuth',
  GUEST_ONLY: 'guestOnly',
};

export const MENU_ITEMS = [
  { path: ROUTES.ADMIN_DASHBOARD, label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { path: ROUTES.ADMIN_ANALYTICS, label: "Analitik", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { path: ROUTES.ADMIN_HARVEST, label: "Hasil Panen", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" },
  { path: ROUTES.ADMIN_USERS, label: "Pengguna", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
];