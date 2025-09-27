```typescript
import axios from 'axios';

/**
 * Interface for the response object
 */
interface WeatherResponse {
  temperature: number;
  humidity: number;
  description: string;
}

/**
 * Fetches the weather forecast for a given zipcode.
 *
 * @param {string} zipcode - The zipcode for which to fetch the weather forecast.
 * @returns {Promise<WeatherResponse>} The weather forecast for the given zipcode.
 * @throws {Error} When the request fails.
 */
async function fetchWeatherForecast(zipcode: string): Promise<WeatherResponse> {
  try {
    // Replace with your actual API endpoint and key
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${zipcode}`);

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    const { temp_c: temperature, humidity } = response.data.current;
    const { text: description } = response.data.current.condition;

    return { temperature, humidity, description };
  } catch (error) {
    throw new Error(`Failed to fetch weather forecast: ${error.message}`);
  }
}
```