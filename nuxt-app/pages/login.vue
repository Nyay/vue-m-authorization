<template>
  <div class="login-container">
    <v-sheet class="mx-auto" width="500">
      <v-form ref="form" class="d-flex flex-column align-center" @submit.prevent="handleLogin">
        <h1 class="ma-2 text-h7">Please Login</h1>
        <v-text-field
            v-model="email"
            label="Email"
            class="ma-2 w-100"
            :rules="emailRules"
            required
            @update:focused="handleInput"
        />
        <v-text-field
            v-model="password"
            class="ma-2 w-100"
            label="Password"
            :rules="passwordRules"
            required
            @update:focused="handleInput"
        />
        <v-btn v-if="!authStore.isAuthLoading" :disabled="isLoginError" class="mt-2" type="submit" block>Submit</v-btn>
        <v-progress-circular v-else color="dark-blue" indeterminate :size="44"/>
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
const isLoginError = ref(false);

const handleInput = () => {
	if (isLoginError.value) {
		isLoginError.value = false;
		form.value.validate();
	}
	return activeInput.value = true;
};

const emailRules = [
	(value: string) => value.length < 1 ? 'Email required' : true,
	() => isLoginError.value ? 'Invalid email or password' : true,
];

const passwordRules = [
	(value: string) => value.length < 1 ? 'Password required' : true,
	() => !isLoginError.value,
];

const handleLogin = async () => {
	await authStore.login(email.value, password.value);

	if (authStore.loginCode === AUTH_CODE.SUCCESS && authStore.getLastLoginToken) {
		useLogin(authStore.getLastLoginToken);
		await router.push(redirectStore.getLastRedirect || '/');
	} else {
		isLoginError.value = true;
		form.value.validate();
	}
};
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
