<template>
	<v-list-item
		class="mt-4"
		:prepend-avatar="userAvatar"
		:title="userName"
		:subtitle="userEmail"
	/>

	<v-list density="compact" nav>
		<v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home" />
		<v-list-item prepend-icon="mdi-forum" title="About" value="about" />
	</v-list>

	<v-list class="d-flex justify-center" density="comfortable" nav>
		<v-btn color="error" @click="handleLogoutClick"> Logout </v-btn>
	</v-list>
</template>
<script setup lang="ts">
interface IProfileDrawerProps {
	userName: string;
	userEmail: string;
	userAvatar: string;
}

defineProps<IProfileDrawerProps>();

const emit = defineEmits<{
	(event: 'logout'): void;
}>();

const handleLogoutClick = () => {
	emit('logout');
};
</script>
