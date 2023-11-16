<script setup lang="ts">
import Return from '~icons/carbon/return'
import { useSubscription } from '~/composables/use-subscription'

const emit = defineEmits(['afterImport'])

const { url, parseOutbounds } = useSubscription()

const onImport = async () => {
  await parseOutbounds()
  emit('afterImport')
}
</script>

<template>
  <div class="relative flex items-center">
    <input v-model="url" placeholder="Subscription URL" class="text-white/75 bg-black/50 font-bold rounded-xl py-3 pl-4 pr-10 w-full focus:outline-none placeholder:text-white/25">
    <Return class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-white/25 hover:text-white duration-100 transition-all" @click="onImport()" />
  </div>
</template>
