import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

// ✅ Environment checks
if (!process.env.MONGO_URI) throw new Error('Mongo URI environment variable not found.');
if (!process.env.JWT_SECRET) throw new Error('JWT secret environment variable not found.');

let client: MongoClient | null = null;

async function getClient() {
  try {
    if (client) {
      // ✅ If client exists and can access db(), reuse it
      client.db();
      return client;
    }
  } catch (err) {
    console.warn("Existing MongoDB client seems disconnected. Reconnecting...");
  }

  if (!process.env.MONGO_URI) throw new Error('Mongo URI environment variable not found.');
  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client;
}



export const handler: Handler = async (event) => {
  try {
    // ✅ Only allow GET requests
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    // ✅ Get token from the "Authorization" header
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Authorization token missing or malformed' }),
      };
    }

    const token = authHeader.split(' ')[1];

    // ✅ Verify the token
    let decoded;
    try {
        if(process.env.JWT_SECRET === undefined)  return {
        statusCode: 500,
        body: JSON.stringify({ error: 'JWT_SECRET not found' }),
      };
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid or expired token' }),
      };
    }

    // ✅ Connect to MongoDB
    const client = await getClient();
const db = client.db("users_db");
    const users = db.collection('users');

    // ✅ Find the user by username from token payload
    if(typeof decoded === "string")  return {
        statusCode: 400,
        body: JSON.stringify({ error: 'BYEEEEEEEE' }),
      };
    const user = await users.findOne({ username: (decoded).username });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    // ✅ Return safe user data (never include password)
    const { password, ...safeUser } = user;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Authenticated user info',
        user: {
          username: safeUser.username,
          createdAt: safeUser.createdAt,
          weatherRequestLimit: safeUser.weatherRequestLimit,
          weatherRequestsUsed: safeUser.weatherRequestsUsed,
        },
      }),
    };
  } catch (err: any) {
    console.error('Error in whoami function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
