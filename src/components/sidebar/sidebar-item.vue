<script setup lang="ts">
import { Hero } from 'hero-motion'

interface Props {
  isActive: boolean
  to: { name: string }
  icon: any
}

defineProps<Props>()

const LAYOUT_ID = 'SIDEBAR_CURSOR'
const router = useRouter()
</script>

<template>
  <div
    :class="{ 'text-white': isActive, 'hover:text-white/90 text-white/50': !isActive }"
    class="relative p-2 rounded-lg duration-300 transition-all cursor-pointer hover:bg-white/5"
    @click="router.push({ name: to.name })"
  >
    <Component :is="icon" class="relative z-20" />

    <Hero v-if="isActive" :layout-id="LAYOUT_ID" class="absolute z-10 inset-0 rounded-lg bg-primary-700" />
  </div>
</template>
