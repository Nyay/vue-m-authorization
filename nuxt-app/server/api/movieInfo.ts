import { connect } from '~/server/mongodb';
import { AxiosError } from 'axios';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
	const { movieId } = await readBody(event);

	if (!movieId) {
		throw new AxiosError('Movie ID is required', '400');
	}

	const dbConnection = await connect();

	const requestOptions = {
		projection: {
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
		},
	};
	const requestFilter = { _id: new ObjectId(movieId) };

	let selectedMovie;

	try {
		selectedMovie = await dbConnection
			.collection('movies')
			.findOne(requestFilter, requestOptions);
	} catch (error) {
		console.error(error);
		throw new AxiosError('Cannot get movie data from DB', '500');
	}

	if (selectedMovie && selectedMovie._id) {
		return {
			...selectedMovie,
			_id: new ObjectId(selectedMovie._id).toHexString(),
		};
	} else {
		throw new AxiosError('Movie not found', '401');
	}
});
