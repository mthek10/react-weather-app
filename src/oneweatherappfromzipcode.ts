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
 * Fetches weather data for a given zipcode
 * @param {string} zipcode - The zipcode for which to fetch weather data
 * @returns {Promise<WeatherResponse>} The weather data
 * @throws {Error} When an error occurs during the API call
 */
async function getWeatherFromZipcode(zipcode: string): Promise<WeatherResponse> {
  try {
    // Replace with your actual API endpoint and key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipcode}`);

    // Check if the response is successful
    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    // Extract the required data from the response
    const { temp_c, humidity, weather: { description } } = response.data.current;

    // Return the data as a WeatherResponse object
    return {
      temperature: temp_c,
      humidity,
      description,
    };
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
```