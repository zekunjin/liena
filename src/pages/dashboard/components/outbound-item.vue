<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMousePressed, useMouseInElement, useVModel } from '@vueuse/core'
import Draggable from '~icons/carbon/draggable'

interface Props {
  address: string
  protocol: string
  hasPressed: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['click', 'drag', 'drop', 'afterDelete', 'update:hasPressed'])

const domRef = ref()
const dragRef = ref()

const hasPressed = useVModel(props, 'hasPressed', emit)
const { isOutside } = useMouseInElement(domRef)
const { pressed } = useMousePressed({ target: dragRef })

const isInside = computed(() => !isOutside.value)

watch(pressed, (value) => {
  emit('drag')
  hasPressed.value = value
})

watch(() => [isInside.value, hasPressed.value], ([currIsInside, currHasPressed], [_, prevHasPressed]) => {
  if (prevHasPressed && !currHasPressed && currIsInside) {
    emit('drop')
  }
})
</script>

<template>
  <div
    ref="domRef"
    class="outbound-item cursor-pointer transition-all duration-300 p-2 box-border rounded-lg hover:bg-black/5 relative"
    :class="{ 'bg-black/10': pressed }"
    @click="emit('click')"
  >
    <div v-show="hasPressed && isInside" class=" w-5 h-[2px] bg-primary-600 absolute top-0 rounded-full" />

    <div class="flex items-center gap-4">
      <Draggable ref="dragRef" class="cursor-grab text-default-300 hover:text-default-500 duration-300 transition-all" :class="{ 'text-default-500': pressed }" @click.stop />

      <img :src="`/${protocol}.webp`" class="w-8 h-8 rounded-xl block">

      <div class="text-xs">
        <div class="font-bold uppercase text-default-700 flex items-center gap-4">
          <span>{{ address }}</span>

          <span class="relative flex h-[10px] w-[10px]">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-[10px] w-[10px] bg-teal-500" />
          </span>
        </div>
        <div class="text-default-300">
          {{ protocol }}
        </div>
      </div>
    </div>
  </div>
</template>
