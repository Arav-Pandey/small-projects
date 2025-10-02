import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

if (!process.env.MONGO_URI) throw new Error('Mongo URI environment variable not found.');
const client = new MongoClient(process.env.MONGO_URI);

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const { username, password } = JSON.parse(event.body || '{}');
    if (!username || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Username and password required' }) };
    }

    await client.connect();
    const db = client.db('users_db');
    const users = db.collection('users');

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return { statusCode: 409, body: JSON.stringify({ error: 'Username already exists' }) };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username, password: hashedPassword, createdAt: new Date() });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully!' }),
    };
  } catch (err: any) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  } finally {
    await client.close();
  }
};
