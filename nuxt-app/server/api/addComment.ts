import { AxiosError } from 'axios';
import { connect } from '~/server/mongodb';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
	const { movieId, commentText, userId } = await readBody(event);

	if (!movieId && !commentText && !userId) {
		throw new AxiosError(
			'Movie ID, comment text and user ID is required',
			'400',
		);
	}

	const dbConnection = await connect();

	const requestFilter = { _id: new ObjectId(userId) };

	let userInfo = await dbConnection.collection('users').findOne(requestFilter);

	console.log(userInfo, movieId, commentText, userId);

	if (!userInfo) {
		throw new AxiosError('User not found', '401');
	}

	let insertResult;

	try {
		insertResult = await dbConnection.collection('comments').insertOne({
			name: userInfo.name,
			email: userInfo.email,
			movie_id: new ObjectId(movieId),
			text: commentText,
			date: new Date(),
		});
	} catch (error) {
		throw new AxiosError('Cannot add comment to DB', '500');
	}

	if (!insertResult.acknowledged) {
		throw new AxiosError('Cannot add comment to DB', '500');
	}

	return insertResult;
});
