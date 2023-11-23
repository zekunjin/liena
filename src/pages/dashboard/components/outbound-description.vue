<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import Close from '~icons/carbon/close'
import TrashCan from '~icons/carbon/trash-can'
import { type RaynerOutbound } from '~/composables/use-rayner'
import { useRaynerRequest } from '~/composables/use-rayner'

const IGNORE_FIELDS = ['enabled', 'index']

const props = withDefaults(defineProps<{ outbound?: Partial<RaynerOutbound> }>(), { outbound: undefined })
const emit = defineEmits(['update:outbound', 'afterDelete'])
const outbound = useVModel(props, 'outbound', emit)

const isSelected = computed(() => props.outbound?.address)

const fields = computed(() => Object.entries(outbound.value ?? []).filter(([k, v]) => {
  if (!v) { return false }
  return !IGNORE_FIELDS.includes(k)
}))

const onClose = () => {
  outbound.value = undefined
}

const onDelete = async () => {
  if (!isSelected.value) { return }
  const client = await useRaynerRequest()
  await client('/outbounds', { method: 'DELETE', body: props.outbound })
  emit('afterDelete')
}
</script>

<template>
  <div class="h-full">
    <div v-if="isSelected" class="flex flex-col relative h-full">
      <div class="flex justify-end">
        <div class="bg-black/25 text-white/75 hover:text-white hover:bg-black/50 duration-300 transition-all cursor-pointer rounded-lg p-[2px] absolute top-4 right-4" @click="onClose()">
          <Close />
        </div>
      </div>

      <div class="h-0 flex-1 px-4 overflow-y-auto flex flex-col justify-end gap-2 mb-4">
        <div v-for="[key, value] in fields" :key="key">
          <div class="font-bold text-xs text-default-700 mr-10 uppercase">
            {{ key }}
          </div>

          <div :title="String(value)" class="text-default-500 truncate cursor-pointer text-xs">
            {{ value }}
          </div>
        </div>
      </div>

      <div class="py-3 flex justify-center duration-300 transition-all hover:bg-red-500 hover:text-white cursor-pointer bg-gray-100" @click="onDelete()">
        <TrashCan />
      </div>
    </div>

    <div v-show="!isSelected" class="h-full w-full flex items-center justify-center flex-col">
      <img src="/liena.webp" class="w-24 h-24 block">
    </div>
  </div>
</template>
