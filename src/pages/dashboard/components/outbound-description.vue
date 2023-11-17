<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import Close from '~icons/carbon/close'
import TrashCan from '~icons/carbon/trash-can'
import { type RaynerOutbound } from '~/composables/use-rayner'
import { useRaynerRequest } from '~/composables/use-rayner'

const props = withDefaults(defineProps<{ outbound?: RaynerOutbound }>(), { outbound: {} })
const emit = defineEmits(['update:outbound'])
const outbound = useVModel(props, 'outbound', emit)

const isSelected = computed(() => props.outbound?.address)

const onDelete = async (data: { address: string }) => {
  const client = await useRaynerRequest()
  await client('/outbounds', { method: 'DELETE', body: data })
  emit('afterDelete')
}
</script>

<template>
  <div v-if="isSelected" class="flex flex-col relative h-full">
    <div class="flex justify-end">
      <div class="bg-black/25 text-white/75 hover:text-white hover:bg-black/50 duration-300 transition-all cursor-pointer rounded-lg p-[2px] absolute top-4 right-4" @click="outbound = {}">
        <Close />
      </div>
    </div>

    <div class="h-0 flex-1 px-4 overflow-y-auto">
      {{ outbound }}
    </div>

    <div class="py-3 flex justify-center duration-300 transition-all hover:bg-red-500 hover:text-white cursor-pointer bg-gray-100" @click="onDelete({ address })">
      <TrashCan />
    </div>
  </div>
</template>
