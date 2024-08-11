import { AxiosError } from 'axios';
import { connect } from '~/server/mongodb';
import { ObjectId } from 'mongodb';
import { decryptString } from '~/composables/encryptor';

export default defineEventHandler(async (event) => {
	const { movieId, commentText } = await readBody(event);
	const userToken = getCookie(event, 'auth_token');

	if (!movieId && !commentText && !userToken) {
		throw new AxiosError(
			'Movie ID, comment text and user token is required',
			'400',
		);
	}

	const decryptedToken = decryptString(userToken as string);

	const dbConnection = await connect();

	const requestFilter = { _id: new ObjectId(decryptedToken) };

	const userInfo = await dbConnection.collection('users').findOne(requestFilter);

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
