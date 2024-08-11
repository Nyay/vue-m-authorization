import { defineStore } from 'pinia';
import {
	addMovieComment,
	getMovieComments,
	getMovieInfo,
	getMovieOfTheDay,
} from '~/services/moviesDataService';
import { ServiceStatuses } from '~/enums/serviceStatuses';
import type { IMovieComment, IMovieInfo, IMovieOfTheDay } from '~/types/movies';

interface IMovieStore {
	currentMovieInfo: IMovieInfo | null;
	currentMovieComments: IMovieComment[] | [];
	movieOfTheDay: IMovieOfTheDay | null;
	isMovieCommentsLoadingError: boolean;
	isMovieInfoLoadingError: boolean;
	isCommentSendError: boolean;
}

export const useMoviesStore = defineStore('movie', {
	state: (): IMovieStore => ({
		currentMovieInfo: null,
		currentMovieComments: [],
		movieOfTheDay: null,
		isMovieCommentsLoadingError: false,
		isMovieInfoLoadingError: false,
		isCommentSendError: false,
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
			} else if (response.status === ServiceStatuses.ERROR) {
				this.isMovieInfoLoadingError = true;
			}
		},
		async loadMovieComments(movieId: string) {
			const response = await getMovieComments(movieId);

			if (response.status === ServiceStatuses.SUCCESS && response.data) {
				this.currentMovieComments = response.data;
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
		resetCurrentMovieInfo() {
			this.currentMovieInfo = null;
			this.isMovieInfoLoadingError = false;
			this.currentMovieComments = [];
			this.isMovieCommentsLoadingError = false;
		},
	},
});
