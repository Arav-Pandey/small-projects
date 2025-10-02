import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

// ✅ Environment checks
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
  try {
    // ✅ Only allow GET requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    // ✅ Connect to MongoDB
    const client = await getClient();
    const db = client.db("users_db");
    const users = db.collection("users");
    if (!event.body)
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "No body. Sorry bye" }),
      };

    const { id: auth0Id } = JSON.parse(event.body);
    const user = await users.findOne({ auth0Id: auth0Id });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Authenticated user info",
        user: {
          weatherRequestLimit: user?.weatherRequestLimit,
          weatherRequestsUsed: user?.weatherRequestsUsed,
          quoteStockRequestsUsed: user?.quoteStockRequestsUsed,
          quoteStockRequestLimit: user?.quoteStockRequestLimit,
          moneyRequestLimit: user?.moneyRequestLimit,
          moneyRequestsUsed: user?.moneyRequestsUsed,
          measureRequestsUsed: user?.measureRequestsUsed,
          measureRequestLimit: user?.measureRequestLimit,
        },
      }),
    };
  } catch (err: any) {
    console.error("Error in whoami function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
