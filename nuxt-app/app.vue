<template>
	<div>
		<v-app style="height: 100vh">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</v-app>
	</div>
</template>
<script setup lang="ts"></script>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
