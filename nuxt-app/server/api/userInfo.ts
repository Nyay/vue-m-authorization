import { defineEventHandler } from 'h3';
import { connect } from '~/server/mongodb';
import { AxiosError } from 'axios';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
	const { userId } = await readBody(event);

	if (!userId) {
		throw new AxiosError('User ID is required', '400');
	}

	const dbConnection = await connect();
	const userIdObject = new ObjectId(userId);

	const requestFilter = { _id: userIdObject };
	const requestOptions = {
		projection: {
			name: 1,
			email: 1,
			avatar: 1,
		},
	};

	try {
		return await dbConnection
			.collection('users')
			.findOne(requestFilter, requestOptions);
	} catch (e) {
		throw new AxiosError('Cannot get users data from DB', '500');
	}
});
