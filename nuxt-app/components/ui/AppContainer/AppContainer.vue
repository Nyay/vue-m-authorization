<template>
	<v-container
		class="mt-4 pa-4 bg-grey-lighten-4 rounded pr-16 pl-16 d-flex app-container"
	>
		<slot />
	</v-container>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.app-container {
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: all 0.3s;

	&:hover {
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
		transform: scale(1.01);
	}
}
</style>
