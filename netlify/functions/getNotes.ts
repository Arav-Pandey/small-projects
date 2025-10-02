import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

// Ensure environment variables are set
if (!process.env.JWT_SECRET)
  throw new Error("Missing JWT_SECRET environment variable.");
if (!process.env.MONGO_URI)
  throw new Error("Mongo URI environment variable not found.");

// MongoDB client singleton
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
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const client = await getClient();
    const db = client.db("users_db");
    const notesCollection = db.collection("notes");

    const auth0Id = event.headers["authorization"]?.split("Bearer ")[1];
    if (!auth0Id) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }

    const notes = await notesCollection.find({ auth0Id }).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify({ notes }),
    };
  } catch (error) {
    console.error("Error in notes function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
