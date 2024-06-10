<template>
  <v-timeline class="h-100" direction="horizontal">
    <v-timeline-item
      v-for="(item, i) in computedTimeLine"
      :key="i"
      :color="item.color"
      :dot-color="item.dotColor"
    >
      <v-alert class="text-overline font-weight-bold" :color="item.color" :icon="item.icon" :value="true">{{ item.text }}</v-alert>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();

const authenticatedTimeline = [
  {
    id: 1,
    color: 'white',
    dotColor: 'green',
    icon:'mdi-numeric-1-box-outline',
    text: 'Weeeeeeeell done. You found our shop.'
  },
  {
    id: 2,
    color: 'white',
    dotColor: 'green',
    icon:'mdi-numeric-2-box-outline',
    text: 'Great, second step done. You have email and password to log in!'
  },
  {
    id: 3,
    color: 'white',
    dotColor: 'green',
    icon:'mdi-numeric-3-box-outline',
    text: 'Yooooo. You are now logged in! Go and enjoy!'
  },
]

const notAuthenticatedTimeline = [
  {
    id: 1,
    color: 'white',
    dotColor: 'green',
    icon:'mdi-numeric-1-box-outline',
    text: 'Weeeeeeeell done. You found our shop.'
  },
  {
    id: 2,
    color: 'white',
    dotColor: 'green',
    icon:'mdi-numeric-2-box-outline',
    text: 'Great, second step done. You have email and password to log in!'
  },
  {
    id: 3,
    color: 'red',
    dotColor: 'red',
    icon:'mdi-numeric-3-box-outline',
    text: 'You need to log in to access the Store page.'
  },
]

const computedTimeLine = computed(() => authStore.isAuthenticated ? authenticatedTimeline : notAuthenticatedTimeline)
</script>

<style scoped lang="scss">

</style>
