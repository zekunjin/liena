<script setup lang="ts">
import { ref } from 'vue'
import ModeItem from './mode-item.vue'
import { useSystemProxy } from '~/composables/use-system-proxy'
import * as Constants from '~/utils/constants'

const modes = [
  { label: 'Config', value: Constants.MODE_CONFIG },
  { label: 'Direct', value: Constants.MODE_DIRECT }
]

const activeKey = ref(modes[0].value)
const { config, setSystemProxy } = useSystemProxy()

watch(config, (value) => {
  if (!value) { return }
  if (!config.value?.enable) {
    activeKey.value = Constants.MODE_DIRECT
  }
})

const isProxy = (value: string) => [Constants.MODE_CONFIG].includes(value)
const isDirect = (value: string) => value === Constants.MODE_DIRECT

const onSelect = (value: string) => {
  if (isDirect(value)) {
    setSystemProxy({ enable: false, port: 1080 })
  }

  if (isProxy(value)) {
    setSystemProxy({ enable: true, port: 1080 })
  }

  activeKey.value = value
}
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="flex relative bg-black/10 rounded-xl p-1">
      <ModeItem v-for="mode in modes" :key="mode.value" :is-active="activeKey === mode.value" @click="onSelect(mode.value)">
        {{ mode.label }}
      </ModeItem>
    </div>
  </div>
</template>
