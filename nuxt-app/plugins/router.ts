import { defineNuxtPlugin } from '#app';
import { type Router } from 'vue-router';
import {useAuthStore} from "~/store/auth";
import {AUTH_CODE} from "~/store/constants";

export default defineNuxtPlugin((nuxtApp) => {
    const router = nuxtApp.$router as Router;
    router.beforeEach((to, from, next) => {
        const store = useAuthStore()
        if ((store.getLoginCode !== AUTH_CODE.SUCCESS) && to.path === '/shop') {
            next('/login')
        } else {
            next()
        }
    });
});
