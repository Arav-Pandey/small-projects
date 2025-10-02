import type { Handler } from "@netlify/functions";

// ✅ Environment checks
if (!process.env.MONEY_API_KEY)
  throw new Error("Missing MONEY_API_KEY environment variable.");

export const handler: Handler = async (event) => {
  try {
    // ✅ Only allow GET requests
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
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

    // ✅ Return data + updated usage
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Currency data fetched successfully!",
        conversion_rates: data.conversion_rates, // ✅ send this directly
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
