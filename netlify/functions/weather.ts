import type { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

// ✅ Environment checks
if (!process.env.MONGO_URI) throw new Error("Mongo URI environment variable not found.");
if (!process.env.WEATHER_API_KEY) throw new Error("Missing WEATHER_API_KEY environment variable.");
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

    // ✅ Get the city from query parameters (?city=London)
    const city = decodeURIComponent(event.queryStringParameters?.city || "");
    if (!city) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "City parameter is required" }),
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

    // 🟢 CHANGED: Check next request *before* it exceeds the limit
    if (user.weatherRequestsUsed + 1 > user.weatherRequestLimit) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Request limit reached" }),
      };
    }

    // ✅ Fetch weather data
    const API_KEY = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Error fetching weather data: ${response.statusText}` }),
      };
    }

    const data = await response.json();

    // ✅ Increment requestsUsed in MongoDB after successful request
    await users.updateOne(
      { username: decoded.username },
      { $inc: { weatherRequestsUsed: 1 } }
    );

    // ✅ Return weather data
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Weather data fetched successfully!",
        data,
        // 🟢 CHANGED: these now accurately reflect the new count
        weatherRequestsUsed: user.weatherRequestsUsed + 1,
        weatherRequestLimit: user.weatherRequestLimit,
      }),
    };
  } catch (error) {
    console.error("Error in weather function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
