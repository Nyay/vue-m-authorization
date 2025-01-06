<template>
	<v-col class="movie-card pa-3 rounded">
		<div class="d-flex w-100" @click.prevent="openMoviePageCallback">
			<div class="w-100 d-flex flex-column">
				<div class="d-flex align-center">
					<v-img class="film-poster" height="300" :src="poster || ''" cover />
				</div>
				<div>
					<p class="text-h6 font-weight-thin movie-card-text mt-3">
						{{ title }}
					</p>
					<p class="text-body-1 font-weight-thin movie-card-text">
						{{ `${year}, ${genres && genres.join(', ')}` }}
					</p>
				</div>
			</div>
		</div>
	</v-col>
</template>
<script setup lang="ts">
import type { IMovieCard } from '~/types/movies';

const props = defineProps<IMovieCard>();

const router = useRouter();

const openMoviePageCallback = () => {
	router.push(`/movie/${props?._id}`);
};
</script>
<style scoped lang="scss">
.film-poster {
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-card {
	transition: all 0.3s;
}

.movie-card:hover {
	cursor: pointer;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	transform: scale(1.01);
}

.movie-card-text {
	width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
}
</style>
