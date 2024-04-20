<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title class="text-overline">Login store</v-app-bar-title>

    <template v-slot:append>
      <v-btn
          :icon="storeIcon"
          @click="() => router.push('/shop')"
      ></v-btn>
      <v-btn
          v-if="authStore.isAuthenticated"
          icon="mdi-logout"
          @click="handleLogout"
      ></v-btn>
      <v-btn
          v-else
          icon="mdi-login"
          @click="() => router.push('/login')"
      ></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const router = useRouter();

const storeIcon = computed(() => authStore.isAuthenticated ? "mdi-store" : "mdi-store-off");

const handleLogout = () => {
  authStore.logout();
  router.replace('/');
}
</script>

<style scoped lang="scss">

</style>
