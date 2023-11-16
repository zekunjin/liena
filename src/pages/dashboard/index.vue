<script setup lang="ts">
import Return from '~icons/carbon/return'
import TrashCan from '~icons/carbon/trash-can'
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
  <div class="flex flex-col gap-4">
    <div class="relative">
      <input v-model="url" placeholder="Subscription URL" class="text-white/75 bg-black/25 rounded-xl py-2 px-4 w-full focus:outline-none placeholder:text-white/10" @input.enter="onImport()">
      <Return class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" @click="onImport()" />
    </div>

    <div class="w-full flex-1 h-0 grid gap-4 grid-cols-3">
      <Card class="py-2 select-none col-span-2 overflow-y-auto w-full flex flex-col">
        <div v-for="item in data ?? []" :key="item.address" class="cursor-pointer transition-all duration-300 px-4 py-2 hover:bg-black/10">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-default-900">
                {{ item.address }}
              </div>
              <div>
                {{ item.protocol }}
              </div>
            </div>

            <TrashCan class="cursor-pointer" @click="onDelete(item)" />
          </div>
        </div>
      </Card>

      <Card :transition="{ delay: 100 }" class="p-4 select-none">
        <div>
          i
        </div>
      </Card>

      <Card :transition="{ delay: 200 }" class="p-4 select-none col-span-3">
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
      </Card>
    </div>
  </div>
</template>
