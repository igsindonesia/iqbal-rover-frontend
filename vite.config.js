// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // ✅ Load env variables berdasarkan mode
  // Parameter ke-3: '' = load semua variabel (tanpa prefix VITE_)
  const env = loadEnv(mode, process.cwd(), '');
  const port = parseInt(env.FE_PORT_EXPOSE, 10);
  return {  // ✅ WAJIB: return object config
    plugins: [
      vue(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    // ✅ Opsional: ekspos env ke define untuk akses di global
    define: {
      __APP_MODE__: JSON.stringify(mode),
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },

    // ✅ Opsional: konfigurasi server
    server: {
      host: "0.0.0.0",
      port: port,
      strictPort: true,        // ✅ Error jika port sudah terpakai
      watch: {
        usePolling: true,      // ✅ Untuk Docker hot-reload
      },
    }
  }
})