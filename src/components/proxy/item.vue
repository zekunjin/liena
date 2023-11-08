<script setup lang="ts">
import Card from '../card/index.vue'

interface Props {
  name: string
  isActive?: boolean
  delay?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])

const onClick = () => {
  if (props.isActive) { return }
  emit('click')
}
</script>

<template>
  <Card
    :transition="{ delay }"
    :class="{ 'bg-white/75': isActive, 'hover:bg-white/50': !isActive }"
    class="rounded transition-all duration-300 p-2 cursor-pointer text-xs"
    @click="onClick"
  >
    <div class="uppercase text-default-900">
      {{ name }}
    </div>
    <div class="origin-top-left h-[10px] scale-75 text-default-500">
      {{ 'just my socks' }}
    </div>
  </Card>
</template>
