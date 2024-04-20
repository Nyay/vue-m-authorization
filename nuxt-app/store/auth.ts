import { defineStore } from 'pinia';
import axios from 'axios';
import {AUTH_CODE} from "~/store/constants";

interface IAuthStoreState { loginCode: null | number }

export const useAuthStore = defineStore('auth', {
    state: ():IAuthStoreState => ({
        loginCode: null,
    }),
    getters: {
        getLoginCode: (state) => state.loginCode,
        isAuthenticated: (state) => state.loginCode === AUTH_CODE.SUCCESS,
    },
    actions: {
        async login(email: string, password: string) {
            const response = await axios.post('/api/login', { email: email, password: password });

            if (response.data && response.data.status) {
                switch (response.data.status) {
                    case AUTH_CODE.SUCCESS:
                        this.loginCode = AUTH_CODE.SUCCESS;
                        break
                    case AUTH_CODE.INVALID_CREDENTIALS:
                        this.loginCode = AUTH_CODE.INVALID_CREDENTIALS;
                        break
                    default:
                        this.loginCode = AUTH_CODE.INTERNAL_SERVER_ERROR;
                }
            }
        },
        async logout() {
            this.loginCode = null;
        },
    },
})
