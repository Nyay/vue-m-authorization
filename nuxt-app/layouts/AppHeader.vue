<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title class="text-overline" @click="() => router.push('/')">Beer store</v-app-bar-title>

    <template v-if="!isLoginPage" #append>
      <v-btn
          icon="mdi-store"
          @click="goShop"
      />
      <v-btn
          v-if="token"
          icon="mdi-logout"
          @click="logout"
      />
      <v-btn
          v-else
          icon="mdi-login"
          @click="() => router.push('/login')"
      />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRedirectStore } from '~/store/redirect';

const { useLogout } = useAuth();

const router = useRouter();
const token = useCookie('token');

const redirectStore = useRedirectStore();

const logout = () => {
  useLogout();
  router.push('/');
};

const goShop = () => {
  redirectStore.setLastRedirect('/shop');
  router.push('/shop');
};

const isLoginPage = computed(() => router.currentRoute.value.name == 'login');
</script>

<style scoped lang="scss">
</style>
