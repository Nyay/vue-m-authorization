<template>
	<p class="text-h3 mt-16 text-right widget-title">Movie of The Day</p>
	<v-container
		class="mt-4 pa-4 bg-grey-lighten-4 rounded pr-16 pl-16 d-flex justify-center align-center film-of-the-day-container"
	>
		<div v-if="movie" class="d-flex w-100">
			<div class="w-100 d-flex flex-column justify-center">
				<p class="text-h4 font-weight-thin">{{ movie.title }}</p>
				<p class="mt-2 text-caption w-50 font-italic font-weight-thin">
					{{ movie.plot }}
				</p>
				<p class="mt-2 text-caption w-50 font-weight-thin">
					<span class="font-weight-bold">Cast: </span
					>{{ movie.cast.join(', ') }}
				</p>
				<p class="mt-2 text-caption w-50 font-weight-thin">
					<span class="font-weight-bold">Directors: </span
					>{{ movie.directors.join(', ') }}
				</p>
				<v-btn class="mt-4 film-info-button" size="small" variant="outlined">
					More info
				</v-btn>
			</div>
			<div>
				<v-img
					:aspect-ratio="1"
					class="bg-white film-poster"
					:src="movie.poster || ''"
					width="200"
					cover
				/>
			</div>
		</div>
		<v-progress-circular
			v-else
			:size="100"
			:width="7"
			color="grey-lighten-1"
			indeterminate
		/>
	</v-container>
</template>

<script setup lang="ts">
import type { IMovieOfTheDay } from '~/types/movies';

defineProps<{ movie: IMovieOfTheDay | null }>();
</script>

<style lang="scss" scoped>
.widget-title {
	animation: text-appear 1s ease-in-out;
}
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

@keyframes text-appear {
	0% {
		opacity: 0;
		transform: translateY(10px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
