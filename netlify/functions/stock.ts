import type { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

if (!process.env.MONGO_URI)
  throw new Error("Mongo URI environment variable not found.");
if (!process.env.QUOTE_API_KEY)
  throw new Error("Missing QUOTE_API_KEY environment variable.");
if (!process.env.JWT_SECRET)
  throw new Error("Missing JWT_SECRET environment variable.");

const client = new MongoClient(process.env.MONGO_URI);
let isConnected = false;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const ticker = event.queryStringParameters?.ticker?.trim().toUpperCase();

    if (!ticker) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Ticker parameter is required" }),
      };
    }

    const authHeader =
      event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Authorization token missing or malformed",
        }),
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
        body: JSON.stringify({
          error:
            "Invalid or expired token. Please sign out and re-login to use this site.",
        }),
      };
    }

    // ✅ Connect to MongoDB
    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }
    const db = client.db("users_db");
    const users = db.collection("users");

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

    if (user.stockQuoteRequestsUsed + 1 > user.stockQuoteRequestLimit) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Request limit reached" }),
      };
    }

    const API_KEY = process.env.QUOTE_API_KEY;
    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Missing STOCK_API_KEY environment variable",
        }),
      };
    }

    // ✅ Fetch stock price from API Ninjas
    const res = await fetch(
      `https://api.api-ninjas.com/v1/stockprice?ticker=${encodeURIComponent(
        ticker
      )}`,
      { headers: { "X-Api-Key": API_KEY } }
    );

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({
          error: `Failed to fetch stock price: ${res.statusText}`,
        }),
      };
    }

    const data = await res.json();

    await users.updateOne(
      { username: decoded.username },
      { $inc: { stockQuoteRequestsUsed: 1 } }
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Stock data fetched successfully!",
        data,
        // 🟢 CHANGED: these now accurately reflect the new count
        stockQuoteRequestsUsed: user.stockQuoteRequestsUsed + 1,
        stockQuoteRequestLimit: user.stockQuoteRequestLimit,
      }),
    };
  } catch (error) {
    console.error("Error in stock function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
