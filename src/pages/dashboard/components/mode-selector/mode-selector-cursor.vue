<script setup lang="ts">
import { Hero } from 'hero-motion'

const LAYOUT_ID = 'MODE_SELECTOR_CURSOR'
</script>

<template>
  <Hero :layout-id="LAYOUT_ID" class="absolute inset-0 bg-white shadow z-10 rounded-lg" />
</template>
