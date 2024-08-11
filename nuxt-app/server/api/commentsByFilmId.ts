import { AxiosError } from 'axios';
import { connect } from '~/server/mongodb';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
	const { movieId } = await readBody(event);

	if (!movieId) {
		throw new AxiosError('Movie ID is required', '400');
	}

	const dbConnection = await connect();

	const requestFilter = { movie_id: new ObjectId(movieId) };

	let movieComments;

	try {
		movieComments = await dbConnection
			.collection('comments')
			.find(requestFilter)
			.sort({ date: -1 })
			.toArray();
	} catch (error) {
		console.error(error);
		throw new AxiosError('Cannot get comments data from DB', '500');
	}

	if (movieComments.length) {
		return movieComments.map((comment) => ({
			...comment,
			_id: new ObjectId(comment._id).toHexString(),
			movie_id: new ObjectId(comment.movie_id).toHexString(),
		}));
	} else {
		throw new AxiosError('Comments not found', '401');
	}
});
