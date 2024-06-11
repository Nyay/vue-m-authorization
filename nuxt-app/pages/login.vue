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
            required
            @update:focused="handleInput"
        />

        <v-text-field
            v-model="password"
            class="ma-2"
            label="Password"
            :rules="passwordRules"
            required
            @update:focused="handleInput"
        />

        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useRouter } from '#app';
import { AUTH_CODE } from '~/store/constants';
import { useRedirectStore } from '~/store/redirect';

const authStore = useAuthStore();
const redirectStore = useRedirectStore();
const router = useRouter();

const { useLogin } = useAuth();

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
  await authStore.login(email.value, password.value);

  if (authStore.loginCode === AUTH_CODE.SUCCESS && authStore.getLastLoginToken) {
    useLogin(authStore.getLastLoginToken);
    await router.push(redirectStore.getLastRedirect || '/');
  }
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
