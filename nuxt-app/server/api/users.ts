import { defineEventHandler } from 'h3';
import { connect } from '~/server/mongodb';
import { parse } from 'url';

export default defineEventHandler(async (event) => {
    const db = await connect();

    const query = parse(event.node.req.url || '', true).query;
    const filter = query.email ? { email: query.email } : {};

    return await db.collection('users').find(filter).toArray();
});
