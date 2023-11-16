<script setup lang="ts">
import { HeroProvider } from 'hero-motion'
</script>

<template>
  <HeroProvider>
    <div class="w-screen h-screen overflow-hidden relative flex p-6 box-border gap-6 bg-gradient-to-br from-orange-400 to-pink-600">
      <RouterView class="w-full h-full" />
    </div>
  </HeroProvider>
</template>

<style>
::-webkit-scrollbar {
  height: 1rem;
  width: .5rem;
}

::-webkit-scrollbar-thumb {
  --tw-border-opacity: 1;
  background-color: rgba(217,217,227,.8);
  border-color: rgba(255,255,255,var(--tw-border-opacity));
  border-radius: 9999px;
  border-width: 1px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 9999px;
}
</style>
