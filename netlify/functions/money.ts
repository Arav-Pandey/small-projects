import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const API_KEY = process.env.MONEY_API_KEY;
  console.log(API_KEY)
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing MONEY_API_KEY environment variable" }),
    };
  }

  try {
    // ✅ Fetch stock price from API Ninjas
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
    );

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Failed to fetch money currencies: ${res.statusText}` }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Money API error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
