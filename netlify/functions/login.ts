import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI)
  throw new Error("Mongo URI environment variable not found.");
if (!process.env.JWT_SECRET)
  throw new Error("JWT secret environment variable not found.");

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

  if (!process.env.MONGO_URI)
    throw new Error("Mongo URI environment variable not found.");
  client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const client = await getClient();
  const db = client.db("users_db");
  const users = db.collection("users");
  const notes = db.collection("notes");

  if (!event.body)
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "No body. Sorry bye" }),
    };

  const { id: auth0Id } = JSON.parse(event.body);
  const user = await users.findOne({ auth0Id: auth0Id });

  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "User already made" }),
    };
  }

  await users.insertOne({
    auth0Id: auth0Id,
    weatherRequestLimit: process.env.WEATHER_REQUEST_LIMIT ?? 200,
    weatherRequestsUsed: 0,
    quoteStockRequestLimit: process.env.STOCK_QUOTE_REQUEST_LIMIT ?? 100,
    quoteStockRequestsUsed: 0,
    moneyRequestLimit: process.env.MONEY_REQUEST_LIMIT ?? 100,
    moneyRequestsUsed: 0,
    measureRequestLimit: process.env.MEASURE_REQUEST_LIMIT ?? 100,
    measureRequestsUsed: 0,
  });

  await notes.insertOne({
    auth0Id: auth0Id,
    text: "",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Successful login!" }),
  };
};
