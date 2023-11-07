<script setup lang="ts">
import ProxyItem from './item.vue'
import Folders from '~icons/carbon/folders'
</script>

<template>
  <div class="flex cursor-pointer">
    <div class="flex gap-2 text-white items-center px-4 py-1 rounded-tr-lg rounded-tl-lg">
      <Folders />
      <span class="text-xs">Proxys</span>
    </div>
  </div>

  <div class="rounded-lg grid grid-cols-2 gap-4 p-4 w-full bg-white/75 text-white">
    <ProxyItem name="c32s1" />
    <ProxyItem name="c32s2" />
    <ProxyItem name="c32s3" />
    <ProxyItem name="c32s4" />
    <ProxyItem name="c32s5" />
  </div>
</template>
