<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title class="text-overline" @click="() => router.push('/')">Beer store</v-app-bar-title>

    <template v-slot:append>
      <v-btn
          icon="mdi-store"
          @click="goShop"
      ></v-btn>
      <v-btn
          v-if="token"
          icon="mdi-logout"
          @click="logout"
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
import { useRedirectStore } from "~/store/redirect";

const { useLogout } = useAuth();

const router = useRouter();
const token = useCookie('token');

const redirectStore = useRedirectStore();

const logout = () => {
  useLogout();
  router.push('/')
}

const goShop = () => {
  redirectStore.setLastRedirect('/shop')
  router.push('/shop')
}
</script>

<style scoped lang="scss">
</style>
