```typescript
import axios from 'axios';

/**
 * Interface for the weather data response
 */
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
}

/**
 * Fetches weather data for a given zip code.
 * 
 * @param zipCode - The zip code for which to fetch weather data.
 * @returns A Promise that resolves to the weather data.
 * @throws Will throw an error if the API request fails.
 */
async function getWeatherData(zipCode: string): Promise<WeatherData> {
  try {
    // For demonstration purposes, we are using a mock API URL.
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    // Check if the response is valid
    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    const data = response.data;

    // Construct the weather data object
    const weatherData: WeatherData = {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    };

    return weatherData;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error}`);
  }
}
```