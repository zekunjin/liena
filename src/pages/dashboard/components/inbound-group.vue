<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ inbound: Record<string, any> }>()

const inboundGroup = computed(() => Object.entries(props.inbound).filter(([_, value]) => typeof value !== 'object'))
</script>

<template>
  <div class="flex flex-col gap-2 text-sm">
    <div v-for="([key, value]) in inboundGroup" :key="key">
      <div class="flex relative items-center justify-between uppercase">
        <span class="font-bold  text-default-700">{{ key }}</span>
        <span class="text-default-500 underline">{{ value }}</span>
      </div>
    </div>
  </div>
</template>
