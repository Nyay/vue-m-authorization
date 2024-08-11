<template>
	<v-container class="pl-6 pr-6">
		<v-row no-gutters>
			<MovieScoreContainer
				v-for="(score, index) in computedMovieScores"
				:key="index"
				:title="score.title"
				:characteristics="score.characteristics"
			/>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import type { IMovieInfo } from '~/types/movies';
import { formMovieScoresData } from '~/composables/formMovieScoresData';

interface IMovieScoresWrapperProps {
	currentMovieInfo: IMovieInfo;
}

const props = defineProps<IMovieScoresWrapperProps>();

const computedMovieScores = computed(() =>
	formMovieScoresData(props.currentMovieInfo),
);
</script>

<style scoped lang="scss"></style>
