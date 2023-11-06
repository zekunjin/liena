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
    :class="{ 'text-white': isActive}"
    class="relative p-2 rounded-lg text-default-500 duration-300 transition-all cursor-pointer hover:bg-black/5"
    @click="router.push({ name: to.name })"
  >
    <Component :is="icon" class="relative z-20" />

    <Hero v-if="isActive" :layout-id="LAYOUT_ID" class="absolute z-10 inset-0 rounded-xl bg-primary-700" />
  </div>
</template>
