<template>
  <div class="login-container">
    <v-sheet class="mx-auto" width="500">
      <v-form ref="form" @submit.prevent="handleLogin">
        <h1 class="ma-2 text-h7">Please Login</h1>
        <v-text-field
            v-model="email"
            label="Email"
            class="ma-2"
            :rules="emailRules"
            @update:focused="handleInput"
            required
        ></v-text-field>

        <v-text-field
            v-model="password"
            class="ma-2"
            label="Password"
            :rules="passwordRules"
            @update:focused="handleInput"
            required
        ></v-text-field>

        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useRouter } from '#app';
import { AUTH_CODE } from '~/store/constants';

const authStore = useAuthStore();
const router = useRouter();

console.log(router)

const activeInput = ref(true);
const form = ref();
const email = ref('');
const password = ref('');

const handleInput = () => {
  return activeInput.value = true
};

const emailRules = [
    (value: string) => value.length < 1 ? 'Email required' : true,
    () => !activeInput.value && authStore.loginCode === AUTH_CODE.INVALID_CREDENTIALS ? 'YOU SHALL NOT PASS!!!' : true,
];

const passwordRules = [
    (value: string) => value.length < 1 ? 'Password required' : true,
    () => !(!activeInput.value && authStore.loginCode === AUTH_CODE.INVALID_CREDENTIALS),
];

const handleLogin = async () => {
  activeInput.value = false;
  await authStore.login(email.value, password.value);
  await form.value.validate();
  router.back()
}

</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
