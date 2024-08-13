import { defineStore } from 'pinia';
import {
	addMovieComment,
	getMovieComments,
	getMovieGenres,
	getMovieInfo,
	getMovieOfTheDay,
	getMoviesByGenre,
} from '~/services/moviesDataService';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type {
	IMovieCard,
	IMovieComment,
	IMovieInfo,
	IMovieOfTheDay,
} from '~/types/movies';

interface IMovieStore {
	currentMovieInfo: IMovieInfo | null;
	currentMovieComments: IMovieComment[] | [];
	movieOfTheDay: IMovieOfTheDay | null;
	isMovieCommentsLoadingError: boolean;
	isMovieInfoLoadingError: boolean;
	isCommentSendError: boolean;
	movieGenres: string[];
	isLoadingMoviesByGenres: boolean;
	loadedMoviesByGenres: IMovieCard[];
}

export const useMoviesStore = defineStore('movie', {
	state: (): IMovieStore => ({
		currentMovieInfo: null,
		currentMovieComments: [],
		movieOfTheDay: null,
		isMovieCommentsLoadingError: false,
		isMovieInfoLoadingError: false,
		isCommentSendError: false,
		movieGenres: [],
		isLoadingMoviesByGenres: false,
		loadedMoviesByGenres: [],
	}),
	getters: {},
	actions: {
		async loadMovieOfTheDay() {
			const response = await getMovieOfTheDay();

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.movieOfTheDay = response.data;
			}
		},
		async loadMovieGenres() {
			const response = await getMovieGenres();

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.movieGenres = response.data;
			}
		},
		async loadMovieInfo(movieId: string) {
			const response = await getMovieInfo(movieId);

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.currentMovieInfo = response.data;
			} else if (response.status === ServiceStatuses.ERROR) {
				this.isMovieInfoLoadingError = true;
			}
		},
		async loadMovieComments(movieId: string) {
			const response = await getMovieComments(movieId);

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.currentMovieComments = response.data;
				this.isMovieCommentsLoadingError = false;
			} else if (response.status === ServiceStatuses.ERROR) {
				this.isMovieCommentsLoadingError = true;
			}
		},
		async sendComment(movieId: string, comment_text: string) {
			const response = await addMovieComment(movieId, comment_text);

			if (response.status === ServiceStatuses.SUCCESS) {
				await this.loadMovieComments(movieId);
			} else {
				this.isCommentSendError = true;
			}
		},
		async loadMoviesByGenres(genre: string) {
			this.isLoadingMoviesByGenres = true;
			const response = await getMoviesByGenre(genre);

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.loadedMoviesByGenres = response.data;
			}
			this.isLoadingMoviesByGenres = false;
		},
		resetCurrentMovieInfo() {
			this.currentMovieInfo = null;
			this.isMovieInfoLoadingError = false;
			this.currentMovieComments = [];
			this.isMovieCommentsLoadingError = false;
		},
	},
});
