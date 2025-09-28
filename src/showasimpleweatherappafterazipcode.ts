```typescript
import axios from 'axios';

/**
 * Interface for the response object
 */
interface IWeatherResponse {
  location: string;
  temperature: number;
  condition: string;
}

/**
 * Fetches weather data for the provided zip code.
 * @param {string} zipCode - The zip code for which to fetch weather data.
 * @returns {Promise<IWeatherResponse>} - A promise that resolves to the weather data.
 * @throws {Error} - Throws an error if the request fails.
 */
async function getWeatherByZipCode(zipCode: string): Promise<IWeatherResponse> {
  try {
    // Replace with your actual API endpoint and key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    const data = response.data;

    const weatherResponse: IWeatherResponse = {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    };

    return weatherResponse;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
```