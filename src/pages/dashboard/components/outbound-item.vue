<script setup lang="ts">
import { ref } from 'vue'
import TrashCan from '~icons/carbon/trash-can'
import { useRaynerRequest } from '~/composables/use-rayner'

interface Props {
  address: string
  protocol: string
}

defineProps<Props>()

const emit = defineEmits(['click', 'afterDelete'])

const showBtn = ref(false)

const onDelete = async (data: { address: string }) => {
  const client = await useRaynerRequest()
  await client('/outbounds', { method: 'DELETE', body: data })
  emit('afterDelete')
}
</script>

<template>
  <div class="outbound-item cursor-pointer transition-all duration-300 p-2 rounded-lg hover:bg-black/5" @click="emit('click')" @mouseenter="showBtn = true" @mouseleave="showBtn = false">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img :src="`/${protocol}.webp`" class="w-12 h-12 rounded-xl block">
        <div class="text-sm font-bold">
          <div class="uppercase text-default-700 flex items-center gap-4">
            <span> {{ address }}</span>

            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-teal-500" />
            </span>
          </div>
          <div class="text-default-300">
            {{ protocol }}
          </div>
        </div>
      </div>

      <div class="cursor-pointer mr-4 text-lg hover:text-sm p-2 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-lg" :class="{ 'opacity-1': showBtn, 'opacity-0': !showBtn }" @click="onDelete({ address })">
        <TrashCan />
      </div>
    </div>
  </div>
</template>
