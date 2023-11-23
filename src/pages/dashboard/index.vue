<script setup lang="ts">
import { klona } from 'klona'
import OutboundItem from './components/outbound-item.vue'
import SubscriptionInput from './components/subscription-input.vue'
import ModeSelector from './components/mode-selector/index.vue'
import InboundGroup from './components/inbound-group.vue'
import OutboundDescription from './components/outbound-description.vue'
import { type RaynerOutbound, useRaynerOutbounds, usePatchRaynerOutbounds } from '~/composables/use-rayner'
import { useXray } from '~/composables/use-xray'

let from = -1

const { outbounds, execute } = useRaynerOutbounds()
const { profile, inbound } = useXray()
const selectedRow = ref<RaynerOutbound>()
const hasPressed = ref(false)

const isOutRange = (index: number, length: number) => index < 0 || index >= length

const onSelect = (item: RaynerOutbound) => { selectedRow.value = item }

const onDrag = (_: RaynerOutbound, index: number) => {
  from = index
}

const onDrop = async (_: RaynerOutbound, to: number) => {
  const _arr = klona(outbounds.value)
  const _len = _arr.length

  if (isOutRange(from, _len) || isOutRange(to, _len)) {
    return
  }
  const element = _arr.splice(from, 1)[0]
  _arr.splice(to, 0, element)
  await usePatchRaynerOutbounds(_arr)
  execute()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <SubscriptionInput @after-import="execute?.()" />

    <div class="w-full flex-1 h-0 grid gap-4 grid-cols-3 grid-rows-3">
      <div class="select-none col-span-2 row-span-2 flex flex-col rounded-xl overflow-hidden">
        <div class="bg-gray-50 p-3 shadow relative z-10 flex items-center justify-between">
          <ModeSelector :xray-port="inbound.port" />
        </div>
        <TransitionGroup tag="div" class="p-3 overflow-y-auto w-full h-0 flex-1 flex flex-col bg-white gap-1">
          <OutboundItem
            v-for="(item, index) in outbounds ?? []"
            :key="item.address"
            v-model:hasPressed="hasPressed"
            :address="item.address"
            :protocol="item.protocol"
            @click="onSelect(item)"
            @drag="onDrag(item, index)"
            @drop="onDrop(item, index)"
          />
        </TransitionGroup>
      </div>

      <div :transition="{ delay: 100 }" class="select-none bg-white rounded-xl row-span-2 relative overflow-y-auto">
        <OutboundDescription v-model:outbound="selectedRow" @after-delete="execute?.()" />
      </div>

      <div :transition="{ delay: 200 }" class="p-4 select-none shrink-0 bg-white rounded-xl overflow-x-hidden overflow-y-auto">
        <InboundGroup :inbound="inbound" />
      </div>

      <div :transition="{ delay: 300 }" class="p-4 select-none shrink-0 bg-white rounded-xl overflow-x-hidden overflow-y-auto">
        {{ inbound.listen }}
      </div>

      <div :transition="{ delay: 400 }" class="p-4 select-none shrink-0 bg-white rounded-xl overflow-x-hidden overflow-y-auto">
        {{ profile }}
      </div>
    </div>
  </div>
</template>
