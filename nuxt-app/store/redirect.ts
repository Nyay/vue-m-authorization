import { defineStore } from 'pinia';

export const useRedirectStore = defineStore('redirect', {
    state: () => ({
        redirect: null as string | null,
    }),
    getters: {
        getLastRedirect: (state) => state.redirect,
    },
    actions: {
        setLastRedirect(page: string) {
            this.redirect = page;
        },
    },
})
