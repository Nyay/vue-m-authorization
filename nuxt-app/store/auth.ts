import { defineStore } from 'pinia';
import axios from 'axios';
import { AUTH_CODE } from '~/store/constants';

interface IAuthStoreState {
    loginCode: null | number,
    lastLoginToken: string | null,
    isAuthLoading: boolean,
}

export const useAuthStore = defineStore('auth', {
    state: ():IAuthStoreState => ({
        loginCode: null,
        lastLoginToken: null,
        isAuthLoading: false,
    }),
    getters: {
        getLoginCode: (state) => state.loginCode,
        getLastLoginToken: (state) => state.lastLoginToken,
    },
    actions: {
        async login(email: string, password: string) {
            this.isAuthLoading = true;
            const response = await axios.post('/api/login', { email: email, password: password });

            if (response.data && response.data.status) {
                switch (response.data.status) {
                    case AUTH_CODE.SUCCESS:
                        this.loginCode = AUTH_CODE.SUCCESS;
                        this.lastLoginToken = response.data.token;
                        break;
                    case AUTH_CODE.INVALID_CREDENTIALS:
                        this.loginCode = AUTH_CODE.INVALID_CREDENTIALS;
                        break;
                    default:
                        this.loginCode = AUTH_CODE.INTERNAL_SERVER_ERROR;
                }
            }

            this.isAuthLoading = false;
        },
    },
});
