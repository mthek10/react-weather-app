```typescript
import axios from 'axios';

/**
 * Interface for the weather response data
 */
interface IWeatherResponse {
  temperature: number;
  humidity: number;
  description: string;
}

/**
 * Fetches weather data for a given zip code
 * @param {string} zipCode - The zip code to fetch weather data for
 * @returns {Promise<IWeatherResponse>} - The weather data
 * @throws {Error} - Throws an error if the request fails
 */
async function fetchWeatherData(zipCode: string): Promise<IWeatherResponse> {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
    const data = response.data;

    return {
      temperature: data.current.temp_f,
      humidity: data.current.humidity,
      description: data.current.condition.text,
    };
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

export default fetchWeatherData;
```

Please replace `YOUR_API_KEY` with your actual API key from weatherapi.com. This is a simple demonstration and does not include all the possible error handling and edge cases you might encounter in a real-world application.