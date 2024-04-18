<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Application Bar</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from '#app';

const email = ref('');
const password = ref('');
const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post('/api/login', { email: email.value, password: password.value });
    console.log(response)
    if (response.data && response.data.status === 200) {
      // localStorage.setItem('token', response.data.token);
      // await router.replace('/store');
      alert('Login successful');
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert(error);
  }
}
</script>

<style scoped lang="scss">

</style>
