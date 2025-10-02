import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// If MONGO_URI isn't truey throw an error saying "Mongo URI environment variable not found."
if (!process.env.MONGO_URI)
  throw new Error("Mongo URI environment variable not found.");
const client = new MongoClient(process.env.MONGO_URI); // Makes a client ready to connect to the database

const WEATHER_REQUEST_LIMIT = process.env.WEATHER_REQUEST_LIMIT
  ? parseInt(process.env.WEATHER_REQUEST_LIMIT)
  : 200; // Makes a new variable called REQUEST_LIMIT
const MONEY_REQUEST_LIMIT = process.env.MONEY_REQUEST_LIMIT
  ? parseInt(process.env.MONEY_REQUEST_LIMIT)
  : 100;
const MEASURE_REQUEST_LIMIT = process.env.MEASURE_REQUEST_LIMIT
  ? parseInt(process.env.MEASURE_REQUEST_LIMIT)
  : 100;
const STOCK_QUOTE_REQUEST_LIMIT = process.env.STOCK_QUOTE_REQUEST_LIMIT
  ? parseInt(process.env.STOCK_QUOTE_REQUEST_LIMIT)
  : 100;

export const handler: Handler = async (event) => {
  // exporting a const called handler following the Handler netlify type and it takes an event representing the following http commands
  try {
    if (event.httpMethod !== "POST") {
      // if event.httpMethod is not 'POST' ->
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      }; // Return an error saying method not allowed.
    }

    const { username, password } = JSON.parse(event.body || "{}"); // Takes the JSON request body and parse it into an object, if event.body is undifined or null, use '{}'
    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Username and password required" }),
      };
    }

    await client.connect(); // Connects the mongo client, without this client doesn't accually do anything
    const db = client.db("users_db"); // From the MongoDB client connection, find me users_db
    const users = db.collection("users"); // Gets the users document in a folder in mongoDB, and user equals whatever that is

    const existingUser = await users.findOne({ username }); // Sees if there is another of the same username in the collection
    if (existingUser) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: "Username already exists" }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashing is encrypting something and password is the object getting encrypted and 10 means the level of intensity

    await users.insertOne({
      // Inserts a new document in the users collection
      username,
      password: hashedPassword,
      createdAt: new Date(),
      weatherRequestLimit: WEATHER_REQUEST_LIMIT, // new variable added here
      weatherRequestsUsed: 0, // optionally track how many have been used
      moneyRequestLimit: MONEY_REQUEST_LIMIT,
      moneyRequestsUsed: 0,
      measureRequestsUsed: 0,
      measureRequestLimit: MEASURE_REQUEST_LIMIT,
      stockQuoteRequestsUsed: 0,
      stockQuoteRequestLimit: STOCK_QUOTE_REQUEST_LIMIT,
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User registered successfully!",
        weatherLimit: WEATHER_REQUEST_LIMIT,
        moneyLimit: MONEY_REQUEST_LIMIT,
        weatherRequestsUsed: 0,
        moneyRequestsUsed: 0,
        measureLimit: MEASURE_REQUEST_LIMIT,
        measureRequestsUsed: 0,
        stockQuoteRequestsUsed: 0,
        stockQuoteRequestLimit: STOCK_QUOTE_REQUEST_LIMIT,
      }),
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  } finally {
    // Runs no matter error or not. Runs after error if there is one. If no error it runs after try block
    await client.close(); // Means that I'm done with the MongoDB connection. Kinda like hangup the call
  }
};
