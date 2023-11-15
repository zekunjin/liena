<script setup lang="ts">
import { useRaynerRequest, useRaynerOutbounds, type RaynerOutbound } from '~/composables/use-rayner'
import { useSubscription } from '~/composables/use-subscription'
import { useSystemProxy } from '~/composables/use-system-proxy'

const { data, isFetching, execute } = useRaynerOutbounds()

const { url, parseOutbounds } = useSubscription()
const { config, setSystemProxy } = useSystemProxy()

const onImport = async () => {
  await parseOutbounds()
  execute?.()
}

const onDelete = async (data: RaynerOutbound) => {
  const client =  await useRaynerRequest()
  await client('/outbounds', { method: 'DELETE', body: data })
  execute?.()
}

const toggleSystemProxy = () => {
  setSystemProxy({ enable: !config.value?.enable ?? false, port: 1080 })
}
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <input v-model="url" class="flex-1">
      <button class="bg-primary-900 px-3 h-full text-white" @click="onImport()">
        import
      </button>
    </div>

    <div>
      <div>{{ config }}</div>
      <button @click="toggleSystemProxy()">
        on / off
      </button>
    </div>

    <div>
      <span>loading: </span>
      <span>{{ isFetching }}</span>
    </div>

    <div class="w-full grid gap-4 grid-cols-3 grid-rows-3">
      <div v-for="item in data ?? []" :key="item.address" class="flex items-center justify-between">
        <span> {{ item.address }}</span>
        <button @click="onDelete(item)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>
