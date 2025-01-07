import { AxiosError } from 'axios';
import { connect } from '~/server/mongodb';
import type { IMovieList, IMovieListFilter, IMovieListRequestBody } from '~/types';

const buildYearFilter = (minYear?: number, maxYear?: number) => {
	const yearFilter: Record<string, number> = {};
	if (minYear !== undefined) yearFilter.$gt = minYear;
	if (maxYear !== undefined) yearFilter.$lt = maxYear;
	return Object.keys(yearFilter).length > 0 ? { year: yearFilter } : {};
};

const buildRequestFilter = (filters: IMovieListFilter) => {
	const { genres, languages, types } = filters;
	const yearFilter = buildYearFilter(filters.minYear, filters.maxYear);

	return {
		...(genres && genres.length ? { genres: { $all: genres } } : {}),
		...(languages && languages.length ? { languages: { $all: languages } } : {}),
		...yearFilter,
		...(types && types.length ? { type: { $in: types } } : {}),
	};
};

export default defineEventHandler(async (event) => {
	try {
		const { filters, cursor }: IMovieListRequestBody = await readBody(event);
		const dbConnection = await connect();
		const projection = {
			_id: 1,
			title: 1,
			year: 1,
			plot: 1,
			genres: 1,
			runtime: 1,
			cast: 1,
			directors: 1,
			num_mflix_comments: 1,
			released: 1,
			writers: 1,
			fullplot: 1,
			awards: 1,
			poster: 1,
			imdb: 1,
			type: 1,
			tomatoes: 1,
		};

		const requestFilter = buildRequestFilter(filters);

		const filteredMovies: IMovieList[] = await dbConnection
			.collection<IMovieList>('movies')
			.find(requestFilter, { projection })
			.toArray();

		if (cursor !== undefined && Number.isInteger(cursor)) {
			const pageSize = 30;
			const newCursor = Math.min(cursor + pageSize, filteredMovies.length);
			const moviesSlice = filteredMovies.slice(cursor, newCursor);

			return {
				movies: moviesSlice.map(movie => ({
					...movie,
					_id: movie._id.toHexString(),
				})),
				nextCursor: newCursor < filteredMovies.length ? newCursor : null,
			};
		} else {
			if (filteredMovies.length === 0) {
				throw new AxiosError('No movies found matching the criteria.', '404');
			}

			return filteredMovies.map(movie => ({
				...movie,
				_id: movie._id.toHexString(),
			}));
		}
	} catch (error) {
		console.error('Error fetching movies:', error);
		if (error instanceof AxiosError) {
			throw error;
		}
		throw new AxiosError('Internal Server Error', '500');
	}
});
