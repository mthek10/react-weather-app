```typescript
import axios from 'axios';

/**
 * Interface for the response object
 */
interface IWeatherResponse {
  temperature: number;
  condition: string;
  location: string;
}

/**
 * Fetches the weather forecast for a given zipcode
 * @param {string} zipcode - The zipcode to fetch the weather for
 * @returns {Promise<IWeatherResponse>} The weather forecast
 * @throws {Error} When there's an error fetching the weather
 */
async function fetchWeather(zipcode: string): Promise<IWeatherResponse> {
  try {
    // For demonstration purposes, we'll use a mock API endpoint
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${zipcode}`);

    // Extract the necessary data from the response
    const { temp_f: temperature, text: condition } = response.data.current;
    const { name: location } = response.data.location;

    // Return the weather forecast
    return { temperature, condition, location };
  } catch (error) {
    // Basic error handling
    console.error(`Error fetching weather for zipcode ${zipcode}: ${error}`);
    throw new Error('Could not fetch weather');
  }
}
```
Please note that you need to replace `YOUR_API_KEY` with your actual API key from the weatherapi.com. This is a simple demonstration and does not include all possible error handling or data validation that a production application would require.