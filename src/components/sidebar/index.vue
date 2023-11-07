<script setup lang="ts">
import SidebarItem from './sidebar-item.vue'
import Dashboard from '~icons/carbon/dashboard'
import Settings from '~icons/carbon/settings'

interface MenuRoute {
  name: string
}

const route = useRoute()

const menus = [
  { to: { name: 'dashboard' }, icon: Dashboard },
  { to: { name: 'settings' }, icon: Settings }
]

const isActive = ({ name }: MenuRoute) => {
  if (!name) { return false }
  return (route.name as string)?.includes(name) ?? false
}
</script>

<template>
  <div class="shadow-xl rounded-xl p-2 flex flex-col gap-1 bg-white/5 backdrop-blur border-b-2 border-r-2 border-white/10">
    <SidebarItem
      v-for="(item, index) in menus"
      :key="index"
      :to="item.to"
      :icon="item.icon"
      :is-active="isActive(item.to)"
    />
  </div>
</template>
