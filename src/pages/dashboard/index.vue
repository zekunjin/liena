<script setup lang="ts">
import ProxyGroup from '~/components/proxy/group.vue'
import Card from '~/components/card/index.vue'
import ImportExport from '~icons/carbon/import-export'
</script>

<template>
  <div class="w-full h-full grid gap-4 grid-cols-3 grid-rows-3">
    <Card :transition="{ delay: 0 }" class="col-span-2 row-span-2 p-4 border-white">
      <ProxyGroup />
    </Card>

    <Card :transition="{ delay: 100 }" class="row-span-2 p-4 border-white" />

    <Card :transition="{ delay: 200 }" class="p-4 border-white flex flex-col items-center justify-center">
      <div class="bg-primary-700 p-4 rounded-lg shadow cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <ImportExport class="text-white text-4xl" />
      </div>
    </Card>

    <Card :transition="{ delay: 300 }" class="p-4 border-white">
      123
    </Card>

    <Card :transition="{ delay: 400 }" class="p-4 border-white">
      123
    </Card>
  </div>
</template>
