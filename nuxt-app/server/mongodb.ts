import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB_NAME || '';

const client = new MongoClient(uri);

export async function connect(): Promise<Db> {
	await client.connect();
	return client.db(dbName);
}
