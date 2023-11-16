<script setup lang="ts">
import ModeSelectorCursor from './mode-selector-cursor.vue'

interface Props {
  isActive: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['click'])

const onClick = () => {
  if (props.isActive) { return }
  emit('click')
}
</script>

<template>
  <div class="relative py-1 px-3 text-default-500 cursor-pointer" :class="{ 'text-default-900': isActive }" @click="onClick">
    <div class="relative z-20 text-sm">
      <slot />
    </div>

    <ModeSelectorCursor v-if="isActive" />
  </div>
</template>
