import { useCookie } from '#app';

export const useAuth = () => {
	const authCookie = useCookie('token', { maxAge: 10 });

	const useLogin = (token: string) => {
		authCookie.value = token;
	};

	const useLogout = () => {
		authCookie.value = null;
	};

	return {
		useLogin,
		useLogout,
	};
};
