import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware(() => {
	const token = useCookie('token');

	if (!token.value) {
		return navigateTo('/login');
	}
});
