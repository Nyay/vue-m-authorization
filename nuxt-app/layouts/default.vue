<template>
  <div style="height: 100%">
    <AppHeader/>
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>
