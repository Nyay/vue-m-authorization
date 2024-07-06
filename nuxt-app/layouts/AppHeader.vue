<template>
	<div>
		<v-navigation-drawer
			v-if="userStore.currentUserInfo"
			v-model="isDrawerOpen"
			location="right"
			temporary
		>
			<ProfileDrawer
				:user-name="userStore.currentUserInfo.name"
				:user-email="userStore.currentUserInfo.email"
				:user-avatar="userStore.currentUserInfo.avatar"
				@logout="logout"
			/>
		</v-navigation-drawer>
		<v-app-bar scroll-behavior="hide" :elevation="2">
			<v-menu>
				<template #activator="{ props }">
					<v-btn icon="mdi-menu" v-bind="props" />
				</template>
				<v-list class="mt-2 app-menu-dropdown">
					<v-list-item
						v-for="(item, i) in menuItems"
						:key="i"
						:class="{ active: item.page === route.name }"
						@click="goToPage(item.page)"
					>
						<v-hover>
							<template #default="{ props }">
								<v-list-item-title v-bind="props">{{
									item.title
								}}</v-list-item-title>
							</template>
						</v-hover>
					</v-list-item>
				</v-list>
			</v-menu>

			<template v-if="!isLoginPage" #append>
				<v-btn v-if="token" icon="mdi-account-cowboy-hat" @click="openDrawer" />
				<v-btn v-else icon="mdi-login" @click="goToLogin" />
			</template>
		</v-app-bar>
	</div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useCookie } from '#app';
import { ref, computed } from 'vue';
import { useUserStore } from '~/store/users';

const router = useRouter();
const route = useRoute();
const token = useCookie<string | null>('auth_token');

const userStore = useUserStore();

const isDrawerOpen = ref(false);

const menuItems = ref([
	{ title: 'Home', page: 'index' },
	{ title: 'Movies', page: 'movies' },
]);

const isLoginPage = computed(() => route.name === 'login');

const goToPage = (page: string) => {
	if (page !== route.name) {
		router.push(`/${page === 'index' ? '' : page}`);
	}
};

const goToLogin = () => {
	router.push('/login');
};

const openDrawer = () => {
	isDrawerOpen.value = true;
};

const logout = () => {
	token.value = null;
	isDrawerOpen.value = false;
};

onBeforeMount(async () => {
	if (token.value && !userStore.currentUserInfo) {
		await userStore.loadUserInfo(token.value);
	}
});
</script>

<style scoped lang="scss">
.app-menu-dropdown {
	min-width: 100px;
}

.active > div > div {
	font-weight: bold;
}
</style>
