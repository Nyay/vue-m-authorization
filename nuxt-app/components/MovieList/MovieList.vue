<template>
	<v-data-iterator class="pb-10" :items="computedMovieList" :items-per-page="6">
		<template #default="{ items }">
			<v-row class="ga-16 mt-16" no-gutters>
				<MovieCard
					v-for="(film, index) in items"
					:key="index"
					:title="film.raw.title"
					:genres="film.raw.genres"
					:poster="film.raw.poster"
					:year="film.raw.year"
					:_id="film.raw._id"
				/>
			</v-row>
		</template>

		<template
			v-if="computedMovieList.length > 6"
			#footer="{ page, pageCount, prevPage, nextPage }"
		>
			<div class="d-flex align-center justify-center pa-4">
				<v-btn
					:disabled="page === 1"
					density="comfortable"
					icon="mdi-arrow-left"
					variant="tonal"
					rounded
					@click="prevPage"
				/>

				<div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

				<v-btn
					:disabled="page >= pageCount"
					density="comfortable"
					icon="mdi-arrow-right"
					variant="tonal"
					rounded
					@click="nextPage"
				/>
			</div>
		</template>
	</v-data-iterator>
</template>
<script setup lang="ts">
import type { IMovieCard } from '~/types/movies';

const props = defineProps<{ movies: IMovieCard[] }>();

const computedMovieList = computed(() => props.movies);
</script>
