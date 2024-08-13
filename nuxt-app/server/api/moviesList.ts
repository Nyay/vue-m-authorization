import { connect } from '~/server/mongodb';
import { AxiosError } from 'axios';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async () => {
	const dbConnection = await connect();

	const requestOptions = {
		projection: {
			_id: 1,
			title: 1,
			year: 1,
			poster: 1,
			plot: 1,
			imdb: 1,
			tomatoes: 1,
		},
	};

	try {
		const dbResponse = await dbConnection
			.collection('movies')
			.find({}, requestOptions)
			.toArray();
		return dbResponse.map((item) => ({
			...item,
			_id: new ObjectId(item._id).toHexString() || '',
			imdb: {
				rating: item?.imdb?.rating || null,
			},
			tomatoes: {
				fresh: item?.tomatoes?.fresh || null,
			},
		}));
	} catch (error) {
		throw new AxiosError('Cannot get movies list from DB.', '500');
	}
});
