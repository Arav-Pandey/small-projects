import type { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

// ✅ Environment checks
if (!process.env.MONEY_API_KEY)
  throw new Error("Missing MONEY_API_KEY environment variable.");
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
    // ✅ Only allow GET requests
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

    if (user.moneyRequestsUsed >= user.moneyRequestLimit) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "You have reached your request limit on this page. You can no longer use this page :(",
        }),
      };
    }

    // ✅ Now increment because they are allowed
    await users.updateOne({ auth0Id }, { $inc: { moneyRequestsUsed: 1 } });

    // ✅ Fetch money (exchange rate) data
    const API_KEY = process.env.MONEY_API_KEY;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Error fetching money data: ${response.statusText}`,
        }),
      };
    }

    const data = await response.json();

    // ✅ Return data + updated usage
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Currency data fetched successfully!",
        conversion_rates: data.conversion_rates,
        moneyRequestsUsed: user.moneyRequestsUsed,
        moneyRequestLimit: user.moneyRequestLimit,
      }),
    };
  } catch (error) {
    console.error("Error in money function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
