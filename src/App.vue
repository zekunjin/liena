<script setup lang="ts">
import { HeroProvider } from 'hero-motion'
import Sidebar from './components/sidebar/index.vue'
</script>

<template>
  <HeroProvider>
    <div class="w-screen h-screen flex p-6 box-border gap-6 bg-gradient-to-br from-purple-500 to-pink-500">
      <Sidebar />

      <div class="flex-1 h-full flex flex-col text-white overflow-y-auto">
        <RouterView class="w-full h-0 flex-1" />
      </div>
    </div>
  </HeroProvider>
</template>
