<script setup>
import { ref } from "vue";
import {
  Camera,
  DollarSign,
  Smartphone,
  Upload,
  Eye,
  Download,
  Users,
  Award,
  TrendingUp,
  ChevronUp,
  ChevronDown
} from "lucide-vue-next";

import Footer from "@/components/user/UserFooter.vue"

const openFaq = ref(null);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index;
}
</script>

<template>
  <div class="w-full overflow-x-hidden">

    <!-- Hero Section -->
    <section class="pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
            <span class="text-green-700 font-semibold text-sm">🌴 Solusi Cerdas untuk Petani Sawit</span>
          </div>
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Deteksi Kematangan Buah Sawit dengan <span class="text-green-600">AI</span>
          </h1>
          <p class="text-xl text-gray-600 mb-10 leading-relaxed">
            Tingkatkan produktivitas kebun sawit Anda dengan teknologi deteksi kematangan buah berbasis AI. 
            Cepat, akurat, dan mudah digunakan langsung dari smartphone Anda.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <router-link 
              to="/register" 
              class="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Daftar Akun Sekarang →
            </router-link>
            
            <button 
              class="px-8 py-4 bg-white border-2 border-green-600 text-green-700 font-semibold rounded-xl hover:bg-green-50 transform hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Lihat Demo
            </button>
          </div>
          <div class="flex justify-center gap-12 text-center">
            <div>
              <div class="text-3xl font-bold text-green-600">98%</div>
              <div class="text-gray-600 text-sm">Akurasi Deteksi</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-green-600">5000+</div>
              <div class="text-gray-600 text-sm">Petani Aktif</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-green-600">50K+</div>
              <div class="text-gray-600 text-sm">Deteksi Harian</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
          <p class="text-xl text-gray-600">Teknologi canggih untuk mendukung produktivitas Anda</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Deteksi Cepat</h3>
              <p class="text-gray-600 leading-relaxed">
                Cukup ambil foto buah sawit, AI kami akan menganalisis tingkat kematangan dalam hitungan detik dengan akurasi tinggi.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Info Harga Terkini</h3>
              <p class="text-gray-600 leading-relaxed">
                Dapatkan informasi harga sawit real-time dari berbagai daerah untuk membantu Anda merencanakan panen yang menguntungkan.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
              <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Mudah Digunakan</h3>
              <p class="text-gray-600 leading-relaxed">
                Interface sederhana dan intuitif, dirancang khusus untuk petani dan pekerja lapangan tanpa perlu pelatihan khusus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 bg-gradient-to-br from-green-50 to-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Cara Kerja</h2>
          <p class="text-xl text-gray-600">Tiga langkah mudah untuk deteksi kematangan buah sawit</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Step 1 -->
          <div class="relative">
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <div class="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <Upload class="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Ambil Foto</h3>
              <p class="text-gray-600 text-center">
                Upload foto buah sawit dari kebun Anda menggunakan kamera smartphone
              </p>
            </div>
            <!-- Arrow for desktop -->
            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <div class="text-green-600 text-4xl">→</div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative">
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <div class="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <Eye class="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Analisis AI</h3>
              <p class="text-gray-600 text-center">
                Sistem AI menganalisis foto dan menentukan tingkat kematangan buah secara otomatis
              </p>
            </div>
            <!-- Arrow for desktop -->
            <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <div class="text-green-600 text-4xl">→</div>
            </div>
          </div>

          <!-- Step 3 -->
          <div>
            <div class="bg-white rounded-2xl p-8 shadow-lg">
              <div class="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <Download class="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Dapatkan Hasil</h3>
              <p class="text-gray-600 text-center">
                Terima hasil deteksi lengkap dengan rekomendasi waktu panen yang optimal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Manfaat untuk Anda</h2>
          <p class="text-xl text-gray-600">Tingkatkan produktivitas dan keuntungan kebun sawit Anda</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex gap-4 items-start p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div class="flex-shrink-0">
              <CheckCircle2 class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Meningkatkan Kualitas Panen</h3>
              <p class="text-gray-600">
                Deteksi yang akurat memastikan buah dipanen pada waktu yang tepat, menghasilkan kualitas TBS (Tandan Buah Segar) yang lebih baik.
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div class="flex-shrink-0">
              <CheckCircle2 class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Menghemat Waktu & Tenaga</h3>
              <p class="text-gray-600">
                Tidak perlu lagi inspeksi manual yang memakan waktu. Satu foto sudah cukup untuk mendapat hasil analisis lengkap.
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div class="flex-shrink-0">
              <CheckCircle2 class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Maksimalkan Keuntungan</h3>
              <p class="text-gray-600">
                Dengan info harga real-time, Anda dapat menentukan strategi panen terbaik untuk mendapat harga jual tertinggi.
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div class="flex-shrink-0">
              <CheckCircle2 class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Dokumentasi Digital</h3>
              <p class="text-gray-600">
                Semua hasil deteksi tersimpan otomatis, memudahkan Anda melacak riwayat panen dan membuat analisis produktivitas.
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div class="flex-shrink-0">
              <CheckCircle2 class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Akses Kapan Saja</h3>
              <p class="text-gray-600">
                Aplikasi berbasis cloud memungkinkan Anda mengakses data dan melakukan deteksi dari mana saja, kapan saja.
              </p>
            </div>
          </div>

          <div class="flex gap-4 items-start p-6 rounded-xl hover:bg-green-50 transition-colors">
            <div class="flex-shrink-0">
              <CheckCircle2 class="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Ramah Pemula</h3>
              <p class="text-gray-600">
                Interface yang sederhana dan panduan lengkap membuat siapa saja bisa menggunakan aplikasi ini dengan mudah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-20 bg-green-600 text-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Dipercaya oleh Ribuan Petani</h2>
          <p class="text-xl text-green-100">Data dan pencapaian kami</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <Users class="w-12 h-12 mx-auto mb-4" />
            <div class="text-4xl font-bold mb-2">5,000+</div>
            <div class="text-green-100">Petani Aktif</div>
          </div>
          <div class="text-center">
            <Camera class="w-12 h-12 mx-auto mb-4" />
            <div class="text-4xl font-bold mb-2">50K+</div>
            <div class="text-green-100">Deteksi Per Hari</div>
          </div>
          <div class="text-center">
            <Award class="w-12 h-12 mx-auto mb-4" />
            <div class="text-4xl font-bold mb-2">98%</div>
            <div class="text-green-100">Akurasi AI</div>
          </div>
          <div class="text-center">
            <TrendingUp class="w-12 h-12 mx-auto mb-4" />
            <div class="text-4xl font-bold mb-2">35%</div>
            <div class="text-green-100">Peningkatan Hasil</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gradient-to-br from-white to-green-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Testimoni Pengguna</h2>
          <p class="text-xl text-gray-600">Apa kata petani tentang PalmDetector</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="flex items-center gap-1 mb-4">
              <span v-for="star in 5" :key="star" class="text-yellow-400 text-xl">★</span>
            </div>
            <p class="text-gray-600 mb-6 italic">
              "Aplikasi ini sangat membantu! Sekarang saya bisa menentukan waktu panen yang tepat dan hasilnya meningkat 40%. Terima kasih PalmDetector!"
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-700 font-bold text-lg">BP</span>
              </div>
              <div>
                <div class="font-bold text-gray-900">Budi Prasetyo</div>
                <div class="text-sm text-gray-500">Petani Sawit - Riau</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="flex items-center gap-1 mb-4">
              <span v-for="star in 5" :key="star" class="text-yellow-400 text-xl">★</span>
            </div>
            <p class="text-gray-600 mb-6 italic">
              "Sebagai mandor kebun, aplikasi ini memudahkan pekerjaan kami. Deteksi cepat dan akurat, pekerja jadi lebih efisien."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-700 font-bold text-lg">SM</span>
              </div>
              <div>
                <div class="font-bold text-gray-900">Siti Maryam</div>
                <div class="text-sm text-gray-500">Mandor Kebun - Jambi</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div class="flex items-center gap-1 mb-4">
              <span v-for="star in 5" :key="star" class="text-yellow-400 text-xl">★</span>
            </div>
            <p class="text-gray-600 mb-6 italic">
              "Info harga sawit real-time sangat berguna untuk strategi penjualan. Keuntungan meningkat signifikan sejak pakai PalmDetector."
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-700 font-bold text-lg">AH</span>
              </div>
              <div>
                <div class="font-bold text-gray-900">Ahmad Hidayat</div>
                <div class="text-sm text-gray-500">Pengusaha Sawit - Sumatra Utara</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
          <p class="text-xl text-gray-600">Temukan jawaban untuk pertanyaan Anda</p>
        </div>
        <div class="space-y-4">
          <!-- FAQ 1 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleFaq(0)"
              class="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900 text-lg">Bagaimana cara kerja deteksi AI?</span>
              <ChevronUp v-if="openFaq === 0" class="w-5 h-5 text-gray-600" />
              <ChevronDown v-else class="w-5 h-5 text-gray-600" />
            </button>
            <div v-if="openFaq === 0" class="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <p class="text-gray-600 leading-relaxed">
                Sistem AI kami menggunakan teknologi computer vision yang telah dilatih dengan ribuan gambar buah sawit pada berbagai tingkat kematangan. Ketika Anda mengunggah foto, AI akan menganalisis warna, tekstur, dan karakteristik visual lainnya untuk menentukan tingkat kematangan dengan akurasi 98%.
              </p>
            </div>
          </div>

          <!-- FAQ 2 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleFaq(1)"
              class="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900 text-lg">Apakah aplikasi ini gratis?</span>
              <ChevronUp v-if="openFaq === 1" class="w-5 h-5 text-gray-600" />
              <ChevronDown v-else class="w-5 h-5 text-gray-600" />
            </button>
            <div v-if="openFaq === 1" class="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <p class="text-gray-600 leading-relaxed">
                Kami menyediakan paket gratis dengan kuota deteksi terbatas per bulan. Untuk penggunaan yang lebih intensif, tersedia paket premium dengan fitur tambahan seperti analisis historis, rekomendasi panen otomatis, dan prioritas dukungan pelanggan.
              </p>
            </div>
          </div>

          <!-- FAQ 3 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleFaq(2)"
              class="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900 text-lg">Apakah bisa digunakan offline?</span>
              <ChevronUp v-if="openFaq === 2" class="w-5 h-5 text-gray-600" />
              <ChevronDown v-else class="w-5 h-5 text-gray-600" />
            </button>
            <div v-if="openFaq === 2" class="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <p class="text-gray-600 leading-relaxed">
                Saat ini aplikasi membutuhkan koneksi internet untuk proses analisis AI. Namun, Anda dapat mengambil foto secara offline dan sistem akan otomatis mengunggah untuk dianalisis ketika koneksi tersedia. Kami sedang mengembangkan mode offline untuk versi mendatang.
              </p>
            </div>
          </div>

          <!-- FAQ 4 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleFaq(3)"
              class="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900 text-lg">Smartphone apa yang kompatibel?</span>
              <ChevronUp v-if="openFaq === 3" class="w-5 h-5 text-gray-600" />
              <ChevronDown v-else class="w-5 h-5 text-gray-600" />
            </button>
            <div v-if="openFaq === 3" class="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <p class="text-gray-600 leading-relaxed">
                PalmDetector kompatibel dengan hampir semua smartphone Android (versi 8.0 ke atas) dan iOS (versi 13 ke atas). Aplikasi ini dioptimalkan untuk bekerja dengan baik bahkan pada perangkat dengan spesifikasi menengah.
              </p>
            </div>
          </div>

          <!-- FAQ 5 -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <button
              @click="toggleFaq(4)"
              class="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900 text-lg">Bagaimana cara mendapatkan dukungan teknis?</span>
              <ChevronUp v-if="openFaq === 4" class="w-5 h-5 text-gray-600" />
              <ChevronDown v-else class="w-5 h-5 text-gray-600" />
            </button>
            <div v-if="openFaq === 4" class="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <p class="text-gray-600 leading-relaxed">
                Tim support kami siap membantu Anda melalui WhatsApp, email, atau live chat dalam aplikasi. Untuk pengguna premium, tersedia hotline 24/7 dan dedicated account manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-6">Siap Meningkatkan Produktivitas Kebun Sawit Anda?</h2>
        <p class="text-xl text-green-100 mb-8">
          Bergabunglah dengan ribuan petani yang sudah merasakan manfaatnya
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transform hover:scale-105 transition-all shadow-lg">
            Daftar Gratis Sekarang
          </button>
          <button class="px-8 py-4 bg-green-800 text-white font-semibold rounded-xl hover:bg-green-900 transform hover:scale-105 transition-all border-2 border-white/20">
            Hubungi Sales
          </button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>