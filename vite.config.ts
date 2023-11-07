import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import Unimport from 'unimport/unplugin'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [vue(), Pages(), Icons({ compiler: 'vue3' }), Unimport.vite({ dts: true, presets: ['vue', 'vue-router'] })],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.app/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_']
}))
