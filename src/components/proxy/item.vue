<script setup lang="ts">
import Card from '../card/index.vue'

interface Props {
  name: string
}

defineProps<Props>()
</script>

<template>
  <Card class="rounded-md p-2 cursor-pointer text-xs text-default-700">
    {{ name }}
  </Card>
</template>
