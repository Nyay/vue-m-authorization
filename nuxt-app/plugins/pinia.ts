import { createPinia } from 'pinia';

const store = createPinia();

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
});
