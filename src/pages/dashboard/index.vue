<script setup lang="ts">
import { useRaynerRequest, useRaynerOutbounds, type RaynerOutbound } from '~/composables/use-rayner'
import { useSubscription } from '~/composables/use-subscription'
import { useSystemProxy } from '~/composables/use-system-proxy'
import Card from '~/components/card/index.vue'

const { data, isFetching, execute } = useRaynerOutbounds()

const { url, parseOutbounds } = useSubscription()
const { config, setSystemProxy } = useSystemProxy()

const onImport = async () => {
  await parseOutbounds()
  execute?.()
}

const onDelete = async (data: RaynerOutbound) => {
  const client = await useRaynerRequest()
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
      <Card v-for="(item, index) in data ?? []" :key="item.address" :transition="{ delay: index * 50 }" is-dark class="px-4 py-2 select-none">
        <div class="text-sm text-white/75 font-light">
          {{ item.address }}
        </div>
        <button @click="onDelete(item)">
          delete
        </button>
      </Card>
    </div>
  </div>
</template>
