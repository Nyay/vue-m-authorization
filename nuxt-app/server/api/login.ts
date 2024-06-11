import { defineEventHandler } from 'h3';
import { connect } from '~/server/mongodb';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const db = await connect();

    const user = await db.collection('users').findOne({ email: email });

    if (user && user.password && password === user?.password) {
        return { status: 200, message: 'Logged in successfully', token: user._id };
    } else {
        return { status: 400, message: 'Invalid credentials' };
    }
})
