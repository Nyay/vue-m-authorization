import type { IMovieInfo } from '~/types/movies';

const getScore = (value?: number | null) => (value ?? 'N/A').toString();

export const formMovieScoresData = (movieInfo: IMovieInfo | null) => {
	if (!movieInfo) return null;

	const awards = [
		{ name: 'Nominations', value: getScore(movieInfo.awards?.nominations) },
		{ name: 'Wins', value: getScore(movieInfo.awards?.wins) },
	];

	const imdb = [
		{ name: 'Rating', value: getScore(movieInfo.imdb?.rating) },
		{ name: 'Votes', value: getScore(movieInfo.imdb?.votes) },
	];

	const tomatoes = movieInfo.tomatoes;
	const tomato = [
		{ name: 'Rotten', value: getScore(tomatoes?.rotten) },
		{ name: 'Fresh', value: getScore(tomatoes?.fresh) },
	];

	return [
		{ title: 'Awards', characteristics: awards },
		{ title: 'IMDb', characteristics: imdb },
		{ title: 'Tomatoes', characteristics: tomato },
	];
};
