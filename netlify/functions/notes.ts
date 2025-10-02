import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

if (!process.env.JWT_SECRET)
  throw new Error("Missing JWT_SECRET environment variable.");
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
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    // Get the user id from event headers
    // Token will look like `Bearer <token>`, when we use split, we get an array
    // that looks like ["Bearer", "<token>"], then we grab the second item in the array
    // using [1]
    const auth0Id = event.headers["authorization"]?.split("Bearer ")[1];
    console.log(event.headers);
    if (!auth0Id)
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "No auth0Id. Sorry bye" }),
      };

    // Get the text from the request body
    if (!event.body)
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "No body. Sorry bye" }),
      };
    const { text } = JSON.parse(event.body);

    // Insert the note into the database
    const client = await getClient();
    const db = client.db("users_db");
    const notes = db.collection("notes");
    const result = await notes.insertOne({ auth0Id, text });
    if (!result.acknowledged) {
      // if the insert was not successful return an error response
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to save note" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successful login!" }),
    };
  } catch (error) {
    console.error("Error in notes function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
