<script setup lang="ts">
import { HeroProvider } from 'hero-motion'
import Sidebar from './components/sidebar/index.vue'
</script>

<template>
  <HeroProvider>
    <div class="w-screen h-screen overflow-hidden relative flex p-6 box-border gap-6 bg-gradient-to-br from-purple-500 to-pink-500">
      <div class="absolute inset-0 bg-black/50" />
      <Sidebar />

      <div class="flex-1 h-full flex flex-col">
        <div class="flex flex-col shadow-xl h-full rounded-xl p-4 bg-white/5 backdrop-blur border-b-2 border-r-2 border-white/25">
          <RouterView class="w-full h-0 flex-1" />
        </div>
      </div>
    </div>
  </HeroProvider>
</template>
