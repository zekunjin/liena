<script setup lang="ts">
defineProps<{ isActive: boolean }>()
const emit = defineEmits(['click'])
</script>

<template>
  <div
    :class="{ 'bg-black/10 text-default-900': isActive, 'hover:bg-black/5 hover:text-default-700': !isActive }"
    class="w-full h-full text-2xl flex items-center justify-center rounded-lg cursor-pointer text-default-500 duration-300 transition-all"
    @click="emit('click')"
  >
    <slot />
  </div>
</template>
