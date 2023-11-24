<script setup lang="ts">
import { parseURL } from 'ufo'
import { useRaynerSubscriptions } from '~/composables/use-rayner'
import Link from '~icons/carbon/link'

const { data } = useRaynerSubscriptions()
</script>

<template>
  <div class="flex flex-col w-full gap-px">
    <div v-for="item in data ?? []" :key="item.link" class="flex gap-2 items-center text-sm bg-black/10 transition-all duration-300 py-1 px-2 rounded-lg cursor-pointer">
      <Link class="text-xs" />
      <span class="font-bold">{{ parseURL(item.link).host }}</span>
    </div>
  </div>
</template>
