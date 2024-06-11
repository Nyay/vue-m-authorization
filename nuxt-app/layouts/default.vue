<template>
  <div style="height: 100%">
    <AppHeader style="position: relative"/>
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>
