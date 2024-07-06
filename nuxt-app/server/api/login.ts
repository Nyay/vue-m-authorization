import { defineEventHandler } from 'h3';
import { connect } from '~/server/mongodb';
import { AxiosError } from 'axios';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);

	if (!email || !password) {
		throw new AxiosError('Email and password are required', '400');
	}

	const dbConnection = await connect();
	const filter = { email: email, password:  password };
	const options = {
		projection: { _id: 1 },
	};

	let user;

	try {
		user = await dbConnection.collection('users').findOne(filter, options);
	} catch (error) {
		console.error(error);
		throw new AxiosError('Unable to authenticate, please try again later.', '500');
	}

	if (user && user._id) {
		return { token : new ObjectId(user._id).toHexString() };
	} else {
		throw new AxiosError('Wrong email or password', '401');
	}
});
