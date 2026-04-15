import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode"
import { ROUTES, STORAGE_KEYS } from "@/constants";

// Views
import HomeView from "@/views/user/HomeView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import LoginView from "@/views/user/LoginView.vue";
import ForgotPasswordView from "@/views/user/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/user/ResetPasswordView.vue";
import DashboardView from "@/views/user/DashboardView.vue";
import DetectionView from "@/views/user/DectectionView.vue";
import ResultDetectionView from "@/views/user/ResultDetectionView.vue";
import HistoryView from "@/views/user/HistoryView.vue";

import AdminLayout from "@/views/admin/AdminLayout.vue";
import AdminLoginPageView from "@/views/admin/AdminLoginPageView.vue";
import AdminDashboardView from "@/views/admin/AdminDashboardView.vue";
import AdminAnalyticsView from "@/views/admin/AdminAnalyticsView.vue";
import AdminUsersView from "@/views/admin/AdminUsersView.vue";
import AdminUserDetailView from "@/views/admin/AdminUserDetailView.vue";
import AdminHarvestView from "@/views/admin/AdminHarvestView.vue";

const parseJSON = (value) => {
  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const parseIntSafe = (value) => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // tolance 10 second 
    return decoded.exp < (currentTime - 10);
  } catch (e) {
    return true;
  }
};

// Route Definitions
const routes = [
  // Public Routes
  { path: ROUTES.HOME, component: HomeView, meta: { guestOnly: true } },
  { path: ROUTES.REGISTER, component: RegisterView, meta: { guestOnly: true } },
  { path: ROUTES.LOGIN, component: LoginView, meta: { guestOnly: true } },
  { path: ROUTES.FORGOT_PASSWORD, component: ForgotPasswordView, meta: { guestOnly: true } },
  { path: ROUTES.RESET_PASSWORD, component: ResetPasswordView, meta: { guestOnly: true } },

  // User Protected Routes
  { path: ROUTES.DASHBOARD, component: DashboardView, meta: { requiresAuth: true } },
  { path: ROUTES.DETECTION, component: DetectionView, meta: { requiresAuth: true } },
  {
    path: ROUTES.HASIL_DETEKSI,
    name: "result-detection",
    component: ResultDetectionView,
    meta: { requiresAuth: true },
    props: (route) => ({
      imageUrl: route.query.imageUrl ? decodeURIComponent(route.query.imageUrl) : "",
      classLabels: parseJSON(route.query.classLabels),
      yamlLabels: parseJSON(route.query.yamlLabels),
      classCount: parseIntSafe(route.query.classCount),
    }),
  },
  { path: ROUTES.HISTORY, name: "history", component: HistoryView, meta: { requiresAuth: true } },

  // Admin Routes
  { path: ROUTES.ADMIN_LOGIN, component: AdminLoginPageView, meta: { guestOnly: true } },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAdminAuth: true },
    children: [
      { path: "", redirect: ROUTES.ADMIN_DASHBOARD },
      { path: "dashboard", component: AdminDashboardView },
      { path: "analytics", component: AdminAnalyticsView },
      { path: "users", component: AdminUsersView },
      { path: "users/:user_id", component: AdminUserDetailView },
      { path: "harvests", component: AdminHarvestView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, _, next) => {
  const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  const isUserValid = token && !isTokenExpired(token);
  const isLoggedIn = !!token;
  const isAdminLoggedIn = !!adminToken;

  // Admin Routes Guard
  if (to.path.startsWith("/admin")) {
    // Force logout user when accessing admin
    if (isLoggedIn) {
      localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_USERNAME);
      window.dispatchEvent(new Event("auth-changed"));
    }

    if (to.path === ROUTES.ADMIN_LOGIN) {
      return isAdminLoggedIn ? next(ROUTES.ADMIN_DASHBOARD) : next();
    }

    if (!isAdminLoggedIn) {
      return next(ROUTES.ADMIN_LOGIN);
    }
    return isAdminLoggedIn ? next() : next(ROUTES.ADMIN_LOGIN);
  }

  // Auth Required Guard
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next(ROUTES.LOGIN);
  }
  // auth token experied guard
  if (to.meta.requiresAdminAuth && !isUserValid) {
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    return next(ROUTES.LOGIN);
  }
  // Guest Only Guard
  if (to.meta.guestOnly && isLoggedIn) {
    return next(ROUTES.DASHBOARD);
  }


  next();
});

export default router;
