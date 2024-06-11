<template>
  <v-container class="mt-16 ">
    <v-row class="h-100" no-gutters>
      <v-col v-for="user in userStore.getUserList" :key="user.email" cols="3">
        <v-sheet class="pa-2 ma-2">
          <v-card
              :title="user.name"
              :subtitle="user.email"
              :text="user.password"
              variant="outlined"
          >
            <v-card-actions>
              <v-btn>Get data >:)</v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { useUserStore } from '~/store/users';

const userStore = useUserStore();

onBeforeMount(() => {
  userStore.loadUsers();
});

definePageMeta({
  middleware: 'auth'
});
</script>
