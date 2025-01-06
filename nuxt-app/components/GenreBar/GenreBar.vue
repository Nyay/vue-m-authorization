<template>
	<p class="text-h3 mt-16 text-left widget-title">Find your pick by genre</p>
	<AppContainer class="genre-bar mt-8">
		<v-btn
			v-for="(genre, index) in genres"
			:key="index"
			variant="plain"
			@click.prevent="() => emit('genre-update', genre)"
		>
			{{ genre }}
		</v-btn>
	</AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '~/components/ui/AppContainer/AppContainer.vue';

defineProps<{ genres: string[] }>();
const emit = defineEmits<{ (event: 'genre-update', genre: string): void }>();
</script>

<style scoped lang="scss">
.genre-bar {
	overflow-x: scroll;
	white-space: nowrap;
	scroll-behavior: smooth;
}

.genre-bar::-webkit-scrollbar {
	display: none;
}
</style>
