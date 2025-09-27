```typescript
import axios from 'axios';

/**
 * Interface for the weather data response
 */
interface IWeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
}

/**
 * Fetches weather data for a given zip code
 * @param {string} zipCode - The zip code to fetch weather data for
 * @returns {Promise<IWeatherData>} The weather data
 * @throws {Error} When an error occurs during the fetch
 */
async function fetchWeatherData(zipCode: string): Promise<IWeatherData> {
  try {
    // Replace with your actual API endpoint and key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const weatherData: IWeatherData = {
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_kph,
    };

    return weatherData;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
```
Note: This code assumes that you are using the WeatherAPI service and axios for making HTTP requests. Replace the API endpoint and key with your actual values.