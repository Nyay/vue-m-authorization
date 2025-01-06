<template>
	<v-container class="h-100 pt-16">
		<FilmOfTheDayWidget :movie="movieStore.movieOfTheDay || null" />
		<GenreBar
			v-if="movieStore.movieGenres.length"
			:genres="movieStore.movieGenres || []"
			@genre-update="updateGenreCallback"
		/>
		<MovieList
			v-if="!movieStore.isLoadingMoviesByGenres"
			:movies="movieStore.loadedMoviesByGenres"
		/>
		<div v-else class="w-100 h-25 d-flex align-center justify-center">
			<v-progress-circular
				:size="100"
				:width="7"
				color="grey-lighten-1"
				indeterminate
			/>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useMoviesStore } from '~/store/movies';
import MovieList from '~/components/MovieList/MovieList.vue';

const movieStore = useMoviesStore();

const updateGenreCallback = async (genre: string) => {
	await movieStore.loadMoviesByGenres(genre);
};

onBeforeMount(async () => {
	if (!movieStore.movieOfTheDay) {
		await movieStore.loadMovieOfTheDay();
	}

	if (!movieStore.movieGenres.length) {
		await movieStore.loadMovieGenres();
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
