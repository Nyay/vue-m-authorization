import { defineEventHandler } from 'h3';
import { connect } from '~/server/mongodb';
export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const db = await connect();

    console.log(email, password, 'sd')

    const user = await db.collection('users').findOne({ email: email });

    // console.log(password, user?.password, password === user?.password, await bcrypt.compare(password, user?.password))

    if (user && user.password && password === user?.password) {
        console.log(user)
        return { status: 200, message: 'Logged in successfully', token: user._id };
    } else {
        return { status: 400, message: 'Invalid credentials' };
    }
})
