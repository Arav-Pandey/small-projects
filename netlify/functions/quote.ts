import type { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

if (!process.env.QUOTE_API_KEY)
  throw new Error("Missing QUOTE_API_KEY environment variable.");
if (!process.env.MONGO_URI)
  throw new Error("Mongo URI environment variable not found.");

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
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const client = await getClient();
    const db = client.db("users_db");
    const users = db.collection("users");

    if (!event.body)
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "No body. Sorry bye" }),
      };

    const { id: auth0Id } = JSON.parse(event.body);
    const user = await users.findOne({ auth0Id });

    if (!user)
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    if (user.quoteStockRequestsUsed >= user.quoteStockRequestLimit) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "You have reached your request limit on this page. You can no longer use this page :(",
        }),
      };
    }

    // ✅ Now increment because they are allowed
    await users.updateOne({ auth0Id }, { $inc: { quoteStockRequestsUsed: 1 } });

    const API_KEY = process.env.QUOTE_API_KEY;
    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Missing QUOTE_API_KEY environment variable",
        }),
      };
    }

    // ✅ Fetch stock price from API Ninjas
    const res = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({
          error: `Failed to fetch quote: ${res.statusText}`,
        }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Successful quote fetch!",
        data,
      }),
    };
  } catch (error) {
    console.error("Quote API error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
