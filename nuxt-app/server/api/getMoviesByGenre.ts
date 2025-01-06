import { connect } from '~/server/mongodb';
import { AxiosError } from 'axios';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
	const { genre } = await readBody(event);

	if (!genre) {
		throw new AxiosError('Movie genre is required', '400');
	}

	const dbConnection = await connect();

	const requestOptions = {
		projection: {
			_id: 1,
			title: 1,
			poster: 1,
			year: 1,
			genres: 1,
		},
	};

	const requestFilter = { genres: genre };

	let selectedMovie;

	try {
		selectedMovie = await dbConnection
			.collection('movies')
			.find(requestFilter, requestOptions)
			.toArray();
	} catch (error) {
		console.error(error);
		throw new AxiosError('Cannot get movie data from DB', '500');
	}

	if (selectedMovie) {
		return selectedMovie.map((movie) => ({
			...movie,
			_id: new ObjectId(movie._id).toHexString(),
		}));
	} else {
		throw new AxiosError('Movie not found', '401');
	}
});
