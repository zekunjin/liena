<script setup lang="ts">
import SidebarItem from './sidebar-item.vue'
import Dashboard from '~icons/carbon/dashboard'
import Settings from '~icons/carbon/settings'
import ServerProxy from '~icons/carbon/server-proxy'

interface MenuRoute {
  name: string
}

const route = useRoute()

const menus = [
  { to: { name: 'dashboard' }, icon: Dashboard },
  { to: { name: 'profiles' }, icon: ServerProxy },
  { to: { name: 'settings' }, icon: Settings }
]

const isActive = ({ name }: MenuRoute) => {
  if (!name) { return false }
  return route.name?.includes(name) ?? false
}
</script>

<template>
  <div class="shadow-xl rounded-2xl p-3 flex flex-col gap-1 bg-white">
    <SidebarItem
      v-for="(item, index) in menus"
      :key="index"
      :to="item.to"
      :icon="item.icon"
      :is-active="isActive(item.to)"
    />
  </div>
</template>
