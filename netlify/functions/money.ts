import type { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

// ✅ Environment checks
if (!process.env.MONGO_URI) throw new Error("Mongo URI environment variable not found.");
if (!process.env.MONEY_API_KEY) throw new Error("Missing MONEY_API_KEY environment variable.");
if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET environment variable.");

const client = new MongoClient(process.env.MONGO_URI);
let isConnected = false;

export const handler: Handler = async (event) => {
  try {
    // ✅ Only allow GET requests
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    // ✅ Get token from the Authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Authorization token missing or malformed" }),
      };
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid or expired token" }),
      };
    }

    // ✅ Connect to MongoDB
    if(!isConnected){ 
      await client.connect();  
      isConnected = true;
    }
    const db = client.db("users_db");
    const users = db.collection("users");

    // ✅ Find the user by username from token payload
    if (typeof decoded === "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid token format" }),
      };
    }

    const user = await users.findOne({ username: decoded.username });
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    // ✅ Check request limits
    if (user.moneyRequestsUsed + 1 > user.moneyRequestLimit) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Request limit reached" }),
      };
    }

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

    // ✅ Increment moneyRequestsUsed after successful request
    await users.updateOne(
      { username: decoded.username },
      { $inc: { moneyRequestsUsed: 1 } }
    );

    // ✅ Return data + updated usage
    return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
              message: "Currency data fetched successfully!",
              conversion_rates: data.conversion_rates, // ✅ send this directly
              moneyRequestsUsed: user.moneyRequestsUsed + 1,
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
