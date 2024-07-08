import { connect } from '~/server/mongodb';
import { ObjectId } from 'mongodb';
import { AxiosError } from 'axios';

export default defineEventHandler(async () => {
	const dbConnection = await connect();

	// Mocked film of the day id
	// const filmId = new ObjectId('573a1390f29313caabcd587d');
	const filmId = new ObjectId('573a1391f29313caabcd6f98');

	const requestOptions = {
		projection: {
			_id: 1,
			title: 1,
			poster: 1,
			cast: 1,
			directors: 1,
			plot: 1,
		},
	};

	const requestFilters = { _id: filmId };

	try {
		const dbResponse = await dbConnection
			.collection('movies')
			.find(requestFilters, requestOptions)
			.toArray();
		return dbResponse.map((item) => ({
			...item,
			_id: new ObjectId(item._id).toHexString() || '',
		}))[ 0 ];
	} catch (e) {
		console.error(e);
		throw new AxiosError('Cannot get movies list from DB.', '500');
	}
});
