import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB_NAME || '';

let dbConnection: Db | null = null;

export async function connect(): Promise<Db> {
	if (dbConnection) {
		return dbConnection;
	}

	const client = new MongoClient(uri);
	console.info('Making connection to mongodb');
	await client.connect();
	dbConnection =  client.db(dbName);

	return dbConnection;
}
