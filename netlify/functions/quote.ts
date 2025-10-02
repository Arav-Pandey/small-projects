import type { Handler } from "@netlify/functions";

if (!process.env.QUOTE_API_KEY)
  throw new Error("Missing QUOTE_API_KEY environment variable.");

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

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
