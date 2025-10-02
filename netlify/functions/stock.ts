import type { Handler } from "@netlify/functions";
import jwt from "jsonwebtoken";

if (!process.env.QUOTE_API_KEY)
  throw new Error("Missing QUOTE_API_KEY environment variable.");
if (!process.env.JWT_SECRET)
  throw new Error("Missing JWT_SECRET environment variable.");

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

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Stock data fetched successfully!",
        data,
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
