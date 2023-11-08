<script setup lang="ts">
import ProxyItem from './item.vue'

const activeKey = ref('c32s2')

const proxies = ['c32s1', 'c32s2', 'c32s3', 'c32s4', 'c32s5']

const onSelect = (key: string) => { activeKey.value = key }
</script>

<template>
  <div>
    <div class="flex items-center gap-4">
      <span class="font-bold text-xl text-default-900">Proxy</span>
    </div>
    <div class="grid gap-2 grid-cols-2 mt-2">
      <ProxyItem
        v-for="(item, index) in proxies"
        :key="item"
        :is-active="activeKey === item"
        :delay="(index - 1) * 50"
        :name="item"
        @click="onSelect(item)"
      />
    </div>
  </div>
</template>
