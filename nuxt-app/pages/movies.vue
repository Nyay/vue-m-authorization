<template>
  <v-row v-if="movieList" align="center" justify="center" dense>
    <v-col cols="12" md="6">
      <v-card
          v-for="movie in movieList"
          append-icon="mdi-check"
          class="mx-auto"
          prepend-icon="mdi-account"
          subtitle="prepend-icon and append-icon"
          :title="movie.title"
      >
        <v-card-text>{{ movie.plot }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useMoviesStore } from '~/store/moviesStore';
import {computed, onBeforeMount} from 'vue';

const movieStore = useMoviesStore();
const movieList = computed(() => movieStore.moviesList);

onBeforeMount(async () => {
	await movieStore.loadMovieList();
});
</script>
