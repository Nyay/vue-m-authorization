import { defineStore } from 'pinia';
import { getMovieOfTheDay } from '~/services/moviesDataService';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type { IMovieCard, IMovieOfTheDay } from '~/types/movies';

export const useMoviesStore = defineStore('movie', {
	state: () => ({
		fullMoviesList: [] as IMovieCard[],
		movieOfTheDay: null as IMovieOfTheDay | null,
	}),
	getters: {},
	actions: {
		async loadMovieOfTheDay() {
			const response = await getMovieOfTheDay();

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.movieOfTheDay = response.data;
			}
		},
	},
});
