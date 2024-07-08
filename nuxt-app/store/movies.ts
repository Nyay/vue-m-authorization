import { defineStore } from 'pinia';
import { getMovieInfo, getMovieOfTheDay } from '~/services/moviesDataService';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type { IMovieInfo, IMovieOfTheDay } from '~/types/movies';

interface IMovieStore {
	currentMovieInfo: IMovieInfo | null;
	movieOfTheDay: IMovieOfTheDay | null;
}

export const useMoviesStore = defineStore('movie', {
	state: (): IMovieStore => ({
		currentMovieInfo: null,
		movieOfTheDay: null,
	}),
	getters: {},
	actions: {
		async loadMovieOfTheDay() {
			const response = await getMovieOfTheDay();

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.movieOfTheDay = response.data;
			}
		},
		async loadMovieInfo(movieId: string) {
			const response = await getMovieInfo(movieId);

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.currentMovieInfo = response.data;
			}
		},
		resetCurrentMovieInfo() {
			this.currentMovieInfo = null;
		},
	},
});
