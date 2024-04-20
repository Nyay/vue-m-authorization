<template>
  <div style="height: 100%">
    <AppHeader v-if="isShowHeader" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'

const router = useRouter();

const isShowHeader = computed(() => router.currentRoute.value.name !== 'login')
</script>
