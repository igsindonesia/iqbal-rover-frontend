<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth, emitAuthChange } from "@/composables/useAuth";

const router = useRouter();
const route = useRoute();
const open = ref(false);
const { username, isLoggedIn, syncAuth, logout: authLogout } = useAuth();

const isLandingPage = computed(() => {
  return route.path === '/' && !username.value;
});

const refreshUser = () => {
  username.value = localStorage.getItem("username");
};

onMounted(() => {
  refreshUser();
  window.addEventListener("storage", refreshUser);
});

onBeforeUnmount(() => {
  window.removeEventListener("storage", refreshUser);
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username"); 
  emitAuthChange();
  router.replace("/login");
};

const closeMobileMenu = () => {
  open.value = false;
};

const scrollToSection = (sectionId) => {
  closeMobileMenu();
  if (router.currentRoute.value.path === '/') {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  } else {
    router.push({ path: '/', hash: `#${sectionId}` });
  }
};
</script>

<template>
  <nav class="bg-white shadow-md fixed w-full top-0 left-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0 flex items-center">
          <router-link :to="username ? '/dashboard' : '/'" class="flex items-center">
            <img class="w-10 h-10 rounded-lg shadow-sm" src="@/assets/icons/logo.png" alt="PalmDetector Logo" />
            <span class="ml-2 font-bold text-green-700 text-xl tracking-wide">PalmDetector</span>
          </router-link>
        </div>

        <div v-if="isLandingPage" class="hidden md:flex items-center space-x-8">
          <button @click="scrollToSection('features')" class="text-gray-600 hover:text-green-700 font-medium transition-colors">
            Fitur
          </button>
          <button @click="scrollToSection('how-it-works')" class="text-gray-600 hover:text-green-700 font-medium transition-colors">
            Cara Kerja
          </button>
          <button @click="scrollToSection('benefits')" class="text-gray-600 hover:text-green-700 font-medium transition-colors">
            Manfaat
          </button>
          <button @click="scrollToSection('faq')" class="text-gray-600 hover:text-green-700 font-medium transition-colors">
            FAQ
          </button>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <div v-if="username" class="flex items-center space-x-4">
            <span class="text-gray-700 font-medium">Hi, {{ username }}</span>
            <button @click="logout" class="text-gray-500 hover:text-red-600 font-medium">Logout</button>
          </div>

          <div v-else class="flex items-center space-x-4">
            <router-link to="/login" class="text-green-700 hover:text-green-800 font-medium">Masuk</router-link>
            <router-link to="/register" class="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 font-medium transition-all shadow-md hover:shadow-lg">
              Daftar
            </router-link>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button 
            @click="open = !open" 
            class="text-gray-700 hover:text-green-700 focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!open" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div 
      v-show="open" 
      class="md:hidden bg-white border-t border-gray-200 shadow-lg"
    >
      <div class="px-4 pt-2 pb-4 space-y-1">
        <template v-if="isLandingPage">
          <button 
            @click="scrollToSection('features')" 
            class="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded font-medium transition-colors"
          >
            Fitur
          </button>
          <button 
            @click="scrollToSection('how-it-works')" 
            class="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded font-medium transition-colors"
          >
            Cara Kerja
          </button>
          <button 
            @click="scrollToSection('benefits')" 
            class="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded font-medium transition-colors"
          >
            Manfaat
          </button>
          <button 
            @click="scrollToSection('faq')" 
            class="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded font-medium transition-colors"
          >
            FAQ
          </button>
          
          <div class="border-t border-gray-200 my-2"></div>
        </template>
        
        <div v-if="username">
          <div class="px-3 py-2 text-gray-700 font-medium bg-gray-50 rounded">
            Hi, {{ username }}
          </div>
          <button 
            @click="logout; closeMobileMenu()" 
            class="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded font-medium"
          >
            Logout
          </button>
        </div>
        <div v-else class="space-y-2 pt-2">
          <router-link 
            to="/login" 
            @click="closeMobileMenu()"
            class="block px-3 py-2 text-green-700 hover:text-green-800 hover:bg-green-50 rounded font-medium"
          >
            Masuk
          </router-link>
          <router-link 
            to="/register" 
            @click="closeMobileMenu()"
            class="block px-3 py-2 bg-green-600 text-white text-center rounded-xl hover:bg-green-700 font-medium"
          >
            Daftar
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
