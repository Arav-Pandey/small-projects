import type { Handler } from "@netlify/functions";

// ✅ Environment checks
if (!process.env.MONGO_URI)
  throw new Error("Mongo URI environment variable not found.");

export const handler: Handler = async (event) => {
  try {
    // ✅ Only allow GET requests
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const num = event.queryStringParameters?.num;
    const fromUnit = event.queryStringParameters?.fromUnit;
    const toUnit = event.queryStringParameters?.toUnit;

    const response = await fetch(
      `https://api.mathjs.org/v4/?expr=${encodeURIComponent(
        `${num} ${fromUnit} to ${toUnit}`
      )}`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Error fetching measurement data: ${response.statusText}`,
        }),
      };
    }

    // MathJS returns plain text
    const convertedValueText = await response.text();
    const convertedValue = parseFloat(convertedValueText);

    // Increment measureRequestsUsed

    // Return JSON
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Measure data fetched successfully!",
        result: convertedValue,
      }),
    };
  } catch (error) {
    console.error("Error in measure function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
