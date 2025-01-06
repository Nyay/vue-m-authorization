import { defineEventHandler } from 'h3';
import { connect } from '~/server/mongodb';
import { AxiosError } from 'axios';
import { ObjectId } from 'mongodb';
import { decryptString } from '~/composables/encryptor';

export default defineEventHandler(async (event) => {
	const userToken = getCookie(event, 'auth_token');

	if (!userToken) {
		throw new AxiosError('User ID is required', '400');
	}

	const decryptedToken = decryptString(userToken as string);

	const dbConnection = await connect();
	const userObjectId = new ObjectId(decryptedToken);

	const requestFilter = { _id: userObjectId };
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
	} catch (error) {
		throw new AxiosError('Cannot get users data from DB', '500');
	}
});
