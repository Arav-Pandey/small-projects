import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// If environment variables aren't found
if (!process.env.MONGO_URI) throw new Error('Mongo URI environment variable not found.');
if (!process.env.JWT_SECRET) throw new Error('JWT secret environment variable not found.');

const client = new MongoClient(process.env.MONGO_URI); // Makes a connection to the mongoDB database using the uri

export const handler: Handler = async (event) => { // exports a const handler using the Handler netlify type and event represents the following http request
  try {
    if (event.httpMethod !== 'POST') { // If http method isn't creating data (POST) say method not allowed
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const { username, password } = JSON.parse(event.body || '{}'); // Makes 
    if (!username || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Username and password required' }) };
    }

    await client.connect();
    const db = client.db('users_db');
    const users = db.collection('users');

    const user = await users.findOne({ username });
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }

    if(process.env.JWT_SECRET === undefined) {
        return {
            statusCode:500,
            body: JSON.stringify({message: "JWT_SECRET not set"}),
        };
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful', token }),
    };
  } catch (err: any) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  } finally {
    await client.close();
  }
};
