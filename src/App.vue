<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserHeader from "@/components/user/UserHeader.vue";
import { ROUTES } from "@/constants";

const route = useRoute();
const router = useRouter();
const isRedirecting = ref(false); // Flag untuk hindari double redirect

const showUserHeader = computed(() => {
  return !route.path.startsWith("/admin");
});

// Helper: Show notification (ganti alert dengan yang lebih user-friendly)
const showNotification = (message, type = "warning") => {
  // Opsional: Gunakan toast library seperti vue-toastification
  if (import.meta.env.DEV) {
    console.warn(`[${type.toUpperCase()}] ${message}`);
  }
};

// Handler untuk User Token Expired
const handleUserAuthExpired = () => {
  if (isRedirecting.value) return;
  isRedirecting.value = true;
  
  showNotification("Sesi Anda telah berakhir. Silakan login kembali.", "warning");
  
  // Bersihkan storage user
  localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_USERNAME);
  
  // Redirect dengan delay kecil agar notifikasi terlihat
  setTimeout(() => {
    if (route.path !== ROUTES.LOGIN) {
      router.push(ROUTES.LOGIN);
    }
    isRedirecting.value = false;
  }, 800);
};

// Handler untuk Admin Token Expired
const handleAdminAuthExpired = () => {
  if (isRedirecting.value) return;
  isRedirecting.value = true;
  
  showNotification("Sesi Admin telah berakhir.", "warning");
  
  // Bersihkan storage admin
  localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ADMIN_USERNAME);
  
  setTimeout(() => {
    if (route.path !== ROUTES.ADMIN_LOGIN) {
      router.push(ROUTES.ADMIN_LOGIN);
    }
    isRedirecting.value = false;
  }, 800);
};

onMounted(() => {
  window.addEventListener("auth-changed", handleUserAuthExpired);
  window.addEventListener("admin-auth-changed", handleAdminAuthExpired);
});

onUnmounted(() => {
  // Cleanup listener with funcntion refence 
  window.removeEventListener("auth-changed", handleUserAuthExpired);
  window.removeEventListener("admin-auth-changed", handleAdminAuthExpired);
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- User Header - Only show for non-admin routes -->
    <UserHeader v-if="showUserHeader" />
    
    <!-- Main Section -->
    <main :class="showUserHeader ? 'flex-grow pt-16' : 'flex-grow'">
      <RouterView />
    </main>

  </div>
</template>