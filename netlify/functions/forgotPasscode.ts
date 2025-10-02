import { Handler } from "@netlify/functions";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI)
  throw new Error("Mongo URI environment variable not found.");
const client = new MongoClient(process.env.MONGO_URI);
let isConnected = false;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      // if event.httpMethod is not 'POST' ->
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      }; // Return an error saying method not allowed.
    }

    const { username, password } = JSON.parse(event.body || "{}");
    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Username and password required" }),
      };
    }

    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }
    const db = client.db("users_db");
    const users = db.collection("users");

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.updateOne(
      { username: username }, // Find user by username
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Passcode updated successfully" }),
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
