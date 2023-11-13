<script setup lang="ts">
import { useRaynerRequest } from '~/composables/use-rayner'
const { data } = useRaynerRequest()('/outbounds').get()
</script>

<template>
  <div class="w-full h-full grid gap-4 grid-cols-3 grid-rows-3">
    {{ data }}
  </div>
</template>
