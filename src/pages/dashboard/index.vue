<script setup lang="ts">
import OutboundItem from './components/outbound-item.vue'
import SubscriptionInput from './components/subscription-input.vue'
import ModeSelector from './components/mode-selector/index.vue'
import { useRaynerOutbounds } from '~/composables/use-rayner'
import { useXray } from '~/composables/use-xray'

const { data, execute } = useRaynerOutbounds()
const { data: xrayConf } = useXray()
</script>

<template>
  <div class="flex flex-col gap-4">
    <SubscriptionInput @after-import="execute?.()" />

    <div class="w-full flex-1 h-0 grid gap-4 grid-cols-3 grid-rows-3">
      <div class="select-none col-span-2 row-span-2 flex flex-col rounded-xl overflow-hidden">
        <div class="bg-gray-50 p-3 shadow relative z-10">
          <ModeSelector />
        </div>
        <div class="p-4 overflow-y-auto w-full h-0 flex-1 flex flex-col bg-white gap-2">
          <OutboundItem
            v-for="item in data ?? []"
            :key="item.address"
            :address="item.address"
            :protocol="item.protocol"
            @after-delete="execute?.()"
          />
        </div>
      </div>

      <div
        :transition="{
          delay:
            100
        }"
        class="p-4 select-none bg-white rounded-xl row-span-2"
      >
        <div>
          i
        </div>
      </div>

      <div :transition="{ delay: 200 }" class="p-4 select-none col-span-3 shrink-0 bg-white rounded-xl overflow-y-auto">
        {{ xrayConf }}
      </div>
    </div>
  </div>
</template>
