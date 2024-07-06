<template>
	<v-container class="h-100 pt-16 d-flex flex-column justify-center">
		<v-sheet class="mx-auto" width="500">
			<v-form
				ref="form"
				class="d-flex flex-column align-center"
				@submit.prevent="handleLogin"
			>
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
					type="password"
					required
					@update:focused="handleInput"
				/>
				<v-btn
					v-if="!isAuthLoading"
					:disabled="isLoginError"
					class="mt-2"
					type="submit"
					block
					>Submit</v-btn
				>
				<v-progress-circular
					v-else
					color="dark-blue"
					indeterminate
					:size="36"
					class="mt-2"
				/>
			</v-form>
		</v-sheet>
	</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useCookie } from '#app';
import { checkUserCredentials } from '~/services';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import { useUserStore } from '~/store/users';

const router = useRouter();

const form = ref();
const email = ref('');
const password = ref('');
const isAuthLoading = ref(false);
const isLoginError = ref(false);
const loginErrorText = ref('');

const userStore = useUserStore();

const handleInput = () => {
	if (isLoginError.value) {
		isLoginError.value = false;
		form.value?.validate();
	}
};

const emailRules = [
	(value: string) => (value.length < 1 ? 'Email required' : true),
	() => (isLoginError.value ? loginErrorText.value : true),
];

const passwordRules = [
	(value: string) => (value.length < 1 ? 'Password required' : true),
	() => !isLoginError.value,
];

const handleLogin = async () => {
	isAuthLoading.value = true;
	const authServiceResponse = await checkUserCredentials(
		email.value,
		password.value,
	);

	if (
		authServiceResponse?.status === ServiceStatuses.SUCCESS &&
		authServiceResponse?.data?.token
	) {
		const authCookie = useCookie('auth_token', { maxAge: 60 * 60 });
		authCookie.value = authServiceResponse.data.token;
		await userStore.loadUserInfo(authServiceResponse.data.token);

		await router.push('/');
	} else {
		loginErrorText.value = authServiceResponse?.error || 'Something went wrong';
		isLoginError.value = true;
		form.value?.validate();
	}

	isAuthLoading.value = false;
};
</script>

<style scoped lang="scss"></style>
