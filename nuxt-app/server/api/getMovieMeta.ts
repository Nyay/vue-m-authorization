import { defineEventHandler, readBody } from 'h3';
import { connect } from '~/server/mongodb';

export default defineEventHandler(async (event) => {
	const { amountLimit } = await readBody(event);
	const db = await connect();

	const limit = Number(amountLimit);

	return await db.collection('movies').find(
		{},
		{
			projection: {
				_id: 1,
				title: 1,
				poster: 1,
				year: 1,
				plot: 1,
			},
		}
	).limit(limit || Infinity).toArray();
});
