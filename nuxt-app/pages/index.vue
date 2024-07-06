<template>
	<v-container class="h-100 pt-16">
		<FilmOfTheDayWidget :movie="movieStore.movieOfTheDay || null" />
	</v-container>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useMoviesStore } from '~/store/movies';

const movieStore = useMoviesStore();

onBeforeMount(async () => {
	if (!movieStore.movieOfTheDay) {
		await movieStore.loadMovieOfTheDay();
	}
});
</script>

<style scoped lang="scss">
.film-of-the-day-container {
	height: 250px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.3s;

	&:hover {
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	}

	.film-poster {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.film-info-button {
		width: 100px;
	}
}
.film-of-the-day-widget {
	display: flex;
}
</style>
