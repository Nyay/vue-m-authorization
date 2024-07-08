<template>
	<v-container v-if="currentMovieInfo" class="h-100 pt-16">
		<p class="text-h3 mt-16 text-right block-title">
			{{ computedMovieTitle }}
		</p>
		<MovieCharacteristics
			v-if="currentMovieInfo"
			:movie-info="currentMovieInfo"
		/>
		<MoviePlotContainer :current-movie-info="currentMovieInfo" />
		<MovieScoresWrapper :current-movie-info="currentMovieInfo" />
	</v-container>
	<PageLoader v-else />
</template>

<script setup lang="ts">
import { useMoviesStore } from '~/store/movies';
import { storeToRefs } from 'pinia';
import MovieScoresWrapper from '~/components/MovieScoresWrapper/MovieScoresWrapper.vue';
import PageLoader from '~/components/ui/PageLoader/PageLoader.vue';

const route = useRoute();

const movieStore = useMoviesStore();

const { currentMovieInfo } = storeToRefs(movieStore);
const { loadMovieInfo, resetCurrentMovieInfo } = movieStore;

const computedMovieTitle = computed(
	() => `${currentMovieInfo.value?.title} (${currentMovieInfo.value?.year})`,
);

onMounted(async () => {
	if (typeof route.params.id === 'string') {
		await loadMovieInfo(route.params.id);
	}
});

onUnmounted(() => {
	resetCurrentMovieInfo();
});

definePageMeta({
	validate: async ({ params }) => {
		return !!params;
	},
});
</script>

<style scoped lang="scss">
.block-title {
	animation: text-appear 1s ease-in-out;
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
