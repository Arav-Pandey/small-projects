import type { Handler } from "@netlify/functions";

// ✅ Environment checks
if (!process.env.WEATHER_API_KEY)
  throw new Error("Missing WEATHER_API_KEY environment variable.");

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

    // ✅ Fetch weather data
    const API_KEY = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        city
      )}&days=1`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `Error fetching weather data: ${response.statusText}`,
        }),
      };
    }

    const data = await response.json();

    // ✅ Return weather data
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Weather data fetched successfully!",
        data,
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
