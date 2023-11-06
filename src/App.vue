<script setup lang="ts">
import { HeroProvider } from 'hero-motion'
import Sidebar from './components/sidebar/index.vue'
</script>

<template>
  <HeroProvider>
    <div class="w-screen h-screen flex p-6 box-border gap-4 bg-black/5">
      <Sidebar />

      <div class="flex-1 h-full overflow-y-auto">
        <RouterView class="w-full h-full" />
      </div>
    </div>
  </HeroProvider>
</template>
