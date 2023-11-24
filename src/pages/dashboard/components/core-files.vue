<script setup lang="ts">
import { ref } from 'vue'
import CoreFileItem from './core-file-item.vue'
import ExecutableProgram from '~icons/carbon/executable-program'
import Json from '~icons/carbon/json'
import Datastore from '~icons/carbon/datastore'
import Wikis from '~icons/carbon/wikis'
import CloudServices from '~icons/carbon/cloud-services'

const options = [
  { icon: ExecutableProgram, key: 1 },
  { icon: Datastore, key: 2 },
  { icon: Json, key: 3 },
  { icon: Wikis, key: 4 },
  { icon: CloudServices, key: 5 }
]

const activeKey = ref(1)
</script>

<template>
  <div class="w-full h-full grid grid-cols-3 grid-rows-2 gap-2">
    <CoreFileItem v-for="(item, index) in options" :key="item.key" :is-active="item.key === activeKey" @click="activeKey = index + 1">
      <Component :is="item.icon" />
    </CoreFileItem>
  </div>
</template>
