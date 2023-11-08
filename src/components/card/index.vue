<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { defu } from 'defu'

interface Transition {
  delay?: number
}

interface Props {
  isDark?: boolean
  transition?: Transition
}

const props = defineProps<Props>()

const domRef = ref()

const transitionDefaults = {
  type: 'spring',
  duration: 500,
  bounce: 0
}

useMotion(domRef, {
  initial: { opacity: 0, scale: 1, x: 200, y: -300 },
  enter: { opacity: 1, scale: 1, x: 0, y: 0, transition: defu(props.transition, transitionDefaults) }
})
</script>

<template>
  <div ref="domRef" :class="{ 'bg-white/25': !isDark, 'bg-black/25': isDark }" class="shadow rounded-xl backdrop-blur border-b-2 border-r-2 border-white/10">
    <slot />
  </div>
</template>
