import { connect } from '~/server/mongodb';
import { AxiosError } from 'axios';

export default defineEventHandler(async () => {
	const dbConnection = await connect();

	try {
		return await dbConnection.collection('movies').distinct('genres');
	} catch (error) {
		throw new AxiosError('Cannot genres list from DB.', '500');
	}
});
