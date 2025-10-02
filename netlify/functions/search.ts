// netlify/functions/search.ts
import type { Handler } from "@netlify/functions";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config(); // Loads all environemnt variables in .env if not in live server (If locally)
}

export const handler: Handler = async (event) => { // exports a const handler that follows the Handler netlify type and it takes a variable, event, representing the following commands
  const q = event.queryStringParameters?.q; // Gets all the parameters in the url but if there is none, use undifined, not error

  if (!q) { // If q is falsey return an error saying ->
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Search query parameter 'q' is required" }),
    };
  }

  const API_KEY = process.env.WEATHER_API_KEY;

  if (!API_KEY) { // If API_KEY is falsey, return an error saying missing api key
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing WEATHER_API_KEY environment variable" }),
    };
  }

  try { // Fetches from the weather api, not the backend
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(q)}`
    );

    if (!response.ok) { // If response wasn't in status code 200-299 return an error
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Error fetching search results: ${response.statusText}` }),
      };
    }

    const data = await response.json(); // data is response in a json format

    return {
      statusCode: 200, // Everything's good
      headers: { "Content-Type": "application/json" }, // Tells the frontend how to deal with the response 
      body: JSON.stringify(data), // Body must always be a string so this makes data into a json formatted string
    };
  } catch (error) { 
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
