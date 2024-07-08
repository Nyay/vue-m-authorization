<template>
	<AppContainer>
		<div class="d-flex w-100">
			<div class="w-100 d-flex flex-column justify-center">
				<Characteristic
					v-for="line in computedMovieCharacteristics"
					:key="`${line.characteristic}_${line.text}`"
					class="mt-2"
					:characteristic="line.characteristic"
					:text="line.text || ''"
				/>
			</div>
			<div>
				<v-img
					:aspect-ratio="0.8"
					class="bg-white film-poster"
					:src="movieInfo.poster || ''"
					width="200"
				/>
			</div>
		</div>
	</AppContainer>
</template>
<script setup lang="ts">
import type { IMovieInfo } from '~/types/movies';
import AppContainer from '~/components/ui/AppContainer/AppContainer.vue';

interface IMovieCharacteristicProps {
	movieInfo: IMovieInfo;
}

const props = defineProps<IMovieCharacteristicProps>();

const computedMovieCharacteristics = computed(() =>
	props.movieInfo
		? [
				{ characteristic: 'Cast', text: props.movieInfo.cast },
				{ characteristic: 'Directors', text: props.movieInfo.directors },
				{ characteristic: 'Writers', text: props.movieInfo.writers },
				{
					characteristic: 'Released',
					text: new Date(props.movieInfo.released || '')
						.toISOString()
						.slice(0, 10),
				},
				{
					characteristic: 'Runtime',
					text: `${props.movieInfo.runtime} minutes`,
				},
			]
		: [],
);
</script>
<style scoped lang="scss">
.film-poster {
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
