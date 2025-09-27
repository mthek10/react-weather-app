```typescript
import axios, { AxiosResponse } from 'axios';

/**
 * @interface WeatherResponse
 * @description Interface for the weather response object
 */
interface WeatherResponse {
  location: string;
  temperature: number;
  condition: string;
}

/**
 * @function getWeatherForecast
 * @description Fetches the weather forecast for a given zipcode
 * @param {string} zipcode - The zipcode for which to fetch the weather forecast
 * @returns {Promise<WeatherResponse>} The weather forecast for the given zipcode
 */
async function getWeatherForecast(zipcode: string): Promise<WeatherResponse> {
  try {
    // Make a GET request to a hypothetical weather API
    const response: AxiosResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${zipcode}`);

    // Extract the necessary data from the response
    const { location, current } = response.data;

    // Construct the response object
    const weatherResponse: WeatherResponse = {
      location: location.name,
      temperature: current.temp_c,
      condition: current.condition.text,
    };

    return weatherResponse;
  } catch (error) {
    // Basic error handling
    console.error(`Failed to fetch weather forecast for zipcode ${zipcode}: `, error);
    throw error;
  }
}
```