import { defineEventHandler } from 'h3';
import { connect } from '~/server/mongodb';

export default defineEventHandler(async () => {
    const db = await connect();

    return await db.collection('users').find({}).toArray();
});
