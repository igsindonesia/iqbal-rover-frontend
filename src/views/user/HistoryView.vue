<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { postsApi, getImageUrl } from '@/services/api'

const router = useRouter()

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const showDeleteConfirm = ref(false)
const postToDelete = ref(null)

const fetchHistory = async () => {
  try {
    const response = await postsApi.getHistory()
    posts.value = response.data
  } catch (err) {
    console.error('Error fetching history:', err)
    error.value = err.response?.data?.detail || 'Gagal memuat histori'
    if (err.response?.status === 401) {
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

const getLabelCounter = (post) => {
  const result = post.result || {}
  
  if (result.predict && typeof result.predict === 'object') {
    return Object.entries(result.predict)
  }
  
  if (Array.isArray(result.labels) && Array.isArray(result.counters)) {
    const counter = {}
    result.labels.forEach((label, i) => {
      counter[label] = (counter[label] || 0) + (result.counters[i] || 1)
    })
    return Object.entries(counter)
  }
  
  return []
}

const getTotalObjects = (post) => {
  const labels = getLabelCounter(post)
  return labels.reduce((sum, [, count]) => sum + (Number(count) || 0), 0)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hari ini'
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari yang lalu`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`
  return `${Math.floor(diffDays / 30)} bulan yang lalu`
}

const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) return posts.value
  
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => {
    const labels = getLabelCounter(post)
    return labels.some(([label]) => label.toLowerCase().includes(query))
  })
})

// this for handle delete post
const deletePost = async () => {
  if (!postToDelete.value) return

  try {
    await postsApi.deletePost(postToDelete.value.post_id)

    // Hapus dari list secara lokal (optimistic update)
    posts.value = posts.value.filter(p => p.post_id !== postToDelete.value.post_id)
    
    // Reset modal
    showDeleteConfirm.value = false
    postToDelete.value = null
    
  } catch (err) {
    console.error('Error deleting post:', err)
    console.error('Response:', err.response?.data)
    
    error.value = err.response?.data?.detail || 'Gagal menghapus data'
    
    // Auto hide error setelah 5 detik
    setTimeout(() => { error.value = null }, 5000)
  }
}

const confirmDelete = (post) => {
  postToDelete.value = post
  showDeleteConfirm.value = true
}

const closeModal = () => {
  showDeleteConfirm.value = false
  postToDelete.value = null
}

onMounted(() => {
  fetchHistory()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-6">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold text-gray-800">Histori Deteksi</h1>
        <p class="text-gray-600">Lihat semua riwayat deteksi buah sawit kamu</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-green-600">{{ posts.length }}</div>
          <div class="text-xs text-gray-500 mt-1">Total Deteksi</div>
        </div>
        <div class="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-blue-600">
            {{ posts.reduce((sum, post) => sum + getTotalObjects(post), 0) }}
          </div>
          <div class="text-xs text-gray-500 mt-1">Total Objek</div>
        </div>
        <div class="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 col-span-2">
          <div class="text-sm font-semibold text-gray-700 mb-2">📅 Deteksi Terakhir</div>
          <div class="text-lg text-gray-600">
            {{ posts[0] ? formatRelativeTime(posts[0].create_at) : 'Belum ada' }}
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Cari berdasarkan kategori (mentah, matang, dll)..."
          class="w-full px-5 py-4 pl-12 bg-white rounded-2xl border border-gray-200 shadow-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-gray-700"
        />
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3">
        <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 text-sm flex-1">{{ error }}</p>
        <button @click="error = null" class="text-red-500 hover:text-red-700 font-bold">✕</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        <p class="text-gray-600 mt-4">Memuat histori...</p>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="post in filteredPosts"
          :key="post.post_id"
          :data-post-id="post.post_id"
          class="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <!-- Image -->
          <div class="relative h-48 bg-gray-50 overflow-hidden">
            <img
              :src="getImageUrl(post.image_url)"
              alt="Hasil Deteksi"
              class="w-full h-full object-contain p-4"
              @error="(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Gambar+Tidak+Tersedia'"
            />
            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow">
              {{ formatRelativeTime(post.create_at) }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-4 space-y-3">
            <!-- Date -->
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ formatDate(post.create_at) }}
            </div>

            <!-- Total Objects Badge -->
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                📊 {{ getTotalObjects(post) }} Objek
              </span>
            </div>

            <!-- Labels -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="[label, count] in getLabelCounter(post)"
                :key="label"
                class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg font-medium"
              >
                {{ label.charAt(0).toUpperCase() + label.slice(1) }} ×{{ count }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-2 border-t border-gray-100">
              <a
                :href="getImageUrl(post.image_url)"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition font-medium text-sm"
              >
                🔍 Lihat Gambar
              </a>
              <button
                @click="confirmDelete(post)"
                class="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition flex items-center justify-center"
                title="Hapus"
                aria-label="Hapus history"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-20">
        <div class="text-7xl mb-4">📭</div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          {{ searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada histori deteksi' }}
        </h3>
        <p class="text-gray-500 mb-6">
          {{ searchQuery ? 'Coba kata kunci lain' : 'Mulai deteksi buah sawit pertama kamu!' }}
        </p>
        <router-link
          to="/detection"
          class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-green-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Deteksi Sekarang
        </router-link>
      </div>

      <!-- ✅ Delete Confirmation Modal -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="showDeleteConfirm" 
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            @click.self="closeModal"
          >
            <div class="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 text-center">Hapus Data?</h3>
              <p class="text-gray-600 text-center text-sm">
                Data yang dihapus tidak dapat dikembalikan.
              </p>
              <div class="flex gap-3 pt-2">
                <button
                  @click="closeModal"
                  class="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition"
                >
                  Batal
                </button>
                <button
                  @click="deletePost"
                  class="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Back Button -->
      <div class="text-center pt-4 pb-8">
        <router-link
          to="/dashboard"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Kembali ke Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth card animations */
.group {
  transition: all 0.3s ease;
}

.group:hover {
  transform: translateY(-4px);
}

/* Prevent zoom on iOS */
@media screen and (max-width: 768px) {
  input, select, textarea {
    font-size: 16px;
  }
}

/* Better touch feedback */
* {
  -webkit-tap-highlight-color: transparent;
}

button, a {
  min-height: 44px;
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>