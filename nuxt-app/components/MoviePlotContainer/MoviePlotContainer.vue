<template>
	<p class="text-h5 mt-4 text-left block-title pl-8">Movie plot</p>
	<AppContainer>
		<p class="text-caption font-italic">
			{{ computedMoviePlot }}
		</p>
	</AppContainer>
</template>
<script setup lang="ts">
import AppContainer from '~/components/ui/AppContainer/AppContainer.vue';
import type { IMovieInfo } from '~/types/movies';

interface IMoviePlotContainerProps {
	currentMovieInfo: IMovieInfo | null;
}

const props = defineProps<IMoviePlotContainerProps>();

const computedMoviePlot = computed(
	() =>
		`" ${
			props.currentMovieInfo?.fullplot ||
			props.currentMovieInfo?.plot ||
			'No plot available.'
		} "`,
);
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
