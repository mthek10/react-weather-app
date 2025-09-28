```typescript
import axios, { AxiosResponse } from 'axios';

/**
 * @typedef WeatherResponse
 * @property {string} location
 * @property {string} description
 * @property {number} temperature
 */

/**
 * Fetches weather forecast data from a given zip code.
 * @param {string} zipCode - The zip code to fetch weather data for.
 * @returns {Promise<WeatherResponse>} The weather data for the given zip code.
 * @throws {Error} When the API request fails.
 */
async function fetchWeatherForecast(zipCode: string): Promise<WeatherResponse> {
  try {
    // Replace with your actual API key
    const API_KEY = 'YOUR_API_KEY';
    const response: AxiosResponse = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipCode}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    const { location, current } = response.data;

    const weatherData: WeatherResponse = {
      location: location.name,
      description: current.condition.text,
      temperature: current.temp_c,
    };

    return weatherData;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
```

Please note that this is a simple demonstration of how you might structure a function to fetch weather data in TypeScript. In a real-world application, you would likely need to handle more edge cases and provide more detailed error handling. Also, you would need to replace `'YOUR_API_KEY'` with your actual API key from the weather API.