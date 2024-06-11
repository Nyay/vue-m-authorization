import { defineStore } from 'pinia';
import axios from 'axios';

interface IMovieAwards { wins: number, nominations: number, text: string }
interface IMovieIMDB { rating: number, votes: number, id: string }
interface IMovieTomatoes {
    viewer: { rating: number, numReviews: number, meter: number },
    critics: { rating: number, numReviews: number, meter: number },
    fresh: number,
    rotten: number,
}
interface ICurrentMovie {
    plot: string,
    genres: string[],
    cast: string[],
    poster: string,
    title: string,
    languages: string[],
    released: string,
    directors: string[],
    rated: string,
    awards: IMovieAwards,
    year: number,
    imdb: IMovieIMDB,
    type: string,
    tomatoes: IMovieTomatoes,
    num_mflix_comments: number,
}

interface IMoviesList {
    plot: string,
    poster: string,
    title: string,
    year: number,
}

export const useMoviesStore = defineStore('movies', {
	state: () => ({
		currentMovie: null as ICurrentMovie | null,
		moviesList: [] as IMoviesList[],
	}),
	getters: {
		getCurrentMovie: (state) => state.currentMovie,
		getMoviesList: (state) => state.moviesList,
	},
	actions: {
		async loadMovieList() {
			const response = await axios.post(
				'/api/getMovieMeta',
				{ amountLimit: 10 }
			);

			if (response.status === 200) {
				this.moviesList = response.data;
			}
		}
	}
});
