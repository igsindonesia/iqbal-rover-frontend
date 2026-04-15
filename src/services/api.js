import axios from "axios";
import { STORAGE_KEYS } from "@/constants";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "";

const createApiInstance = (tokenKey, authEventName, onUnauthorized) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Debug: Cek URL apa yang bikin error 401
      console.log("Error URL:", error.config?.url);
      console.log("Error Status:", error.response?.status);

      const isAuthPath = error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/register");

      if (error.response?.status === 401) {
        // JANGAN jalankan alert jika ini request login/regis
        if (!isAuthPath) {
          localStorage.removeItem(tokenKey);
          if (onUnauthorized) localStorage.removeItem(onUnauthorized);
          window.dispatchEvent(new Event(authEventName));
        } else {
          // Kalau gagal login, biarkan LoginView yang urus, jangan kirim event auth-changed
          console.warn("Kredensial salah, tapi bukan token expired.");
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

// User API Instance
export const api = createApiInstance(
  STORAGE_KEYS.USER_TOKEN,
  'auth-changed',
  STORAGE_KEYS.USER_USERNAME
);

// Admin API Instance
export const adminApi = createApiInstance(
  STORAGE_KEYS.ADMIN_TOKEN,
  'admin-auth-changed',
  STORAGE_KEYS.ADMIN_USERNAME
);

// ========== User API Services ==========
export const authApi = {
  login: (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return api.post("/users/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
  register: (data) => api.post("/users/register", data),
  forgotPassword: (email) => api.post("/users/forgot-password", { email }),
  resetPassword: (token, newPassword) =>
    api.post("/users/reset-password", { token, new_password: newPassword }),
};

export const postsApi = {
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/posts/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getHistory: () => api.get("/posts/history"),
  deletePost: (postId) => api.delete(`/posts/${postId}`),
};

export const getImageUrl = (path) => {
  if (!path) return "/placeholder-image.jpg";
  const cleanPath = path.replace(/^\/+/, "").replace(/\\/g, "/");
  return `${API_BASE_URL}/${cleanPath}`;
};

// ========== Admin API Services ==========
export const adminApiService = {
  login: (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return adminApi.post("/admin/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },

  getDashboard: () => adminApi.get("/admin/dashboard"),
  getAnalytics: (days = 30) => adminApi.get(`/admin/analytics?days=${days}`),
  getUsers: (skip = 0, limit = 50) => adminApi.get(`/admin/users?skip=${skip}&limit=${limit}`),
  getUserDetail: (userId) => adminApi.get(`/admin/users/${userId}`),
  deleteUser: (userId) => adminApi.delete(`/admin/users/${userId}`),
  getHarvest: () => adminApi.get("/admin/harvests"),
  getAllPosts: () => adminApi.get("/admin/harvests"),
  deletePost: (postId) => adminApi.delete(`/admin/posts/${postId}`),
};
