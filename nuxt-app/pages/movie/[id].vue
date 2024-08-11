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
		<MovieCommentsWrapper
			v-if="!isMovieCommentsLoadingError"
			:movie-comments="currentMovieComments"
			@add-comment="addCommentButtonClick"
		/>
	</v-container>
	<v-empty-state
		v-else-if="isMovieInfoLoadingError"
		headline="Hm... Something went wrong"
		title="film with such ID not found"
		icon="mdi-weather-lightning"
	/>
	<PageLoader v-else />
</template>

<script setup lang="ts">
import { useMoviesStore } from '~/store/movies';
import { storeToRefs } from 'pinia';
import MovieScoresWrapper from '~/components/MovieScoresWrapper/MovieScoresWrapper.vue';
import PageLoader from '~/components/ui/PageLoader/PageLoader.vue';

const route = useRoute();

const movieStore = useMoviesStore();

const {
	currentMovieInfo,
	isMovieInfoLoadingError,
	currentMovieComments,
	isMovieCommentsLoadingError,
} = storeToRefs(movieStore);
const { loadMovieInfo, loadMovieComments, resetCurrentMovieInfo, sendComment } =
	movieStore;

const computedMovieTitle = computed(
	() => `${currentMovieInfo.value?.title} (${currentMovieInfo.value?.year})`,
);

const addCommentButtonClick = async (commentText: string) => {
	if (typeof route.params.id === 'string') {
		try {
			await sendComment(route.params.id, commentText);
		} catch (error) {
			console.error(error);
		}
	}
};

onMounted(async () => {
	if (typeof route.params.id === 'string') {
		await loadMovieComments(route.params.id);
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
