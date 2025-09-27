```typescript
import axios from 'axios';

/**
 * Type for weather data response
 */
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
}

/**
 * Fetches weather data for a given zip code
 * @param {string} zipCode - The zip code for which to fetch weather data
 * @returns {Promise<WeatherData>} - The weather data for the given zip code
 * @throws {Error} - Throws an error if the request fails
 */
async function fetchWeatherData(zipCode: string): Promise<WeatherData> {
  try {
    // Replace with your actual weather API endpoint and API key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    // Assuming the API response has a structure like this
    const { temp_c, humidity, wind_kph } = response.data.current;

    const weatherData: WeatherData = {
      temperature: temp_c,
      humidity: humidity,
      windSpeed: wind_kph,
    };

    return weatherData;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

/**
 * Shows a simple weather app for a specific zip code
 * @param {string} zipCode - The zip code for which to show weather data
 * @returns {Promise<string>} - A message showing the weather data
 */
export async function showWeatherApp(zipCode: string): Promise<string> {
  try {
    const weatherData = await fetchWeatherData(zipCode);

    return `The current temperature is ${weatherData.temperature}°C, the humidity is ${weatherData.humidity}%, and the wind speed is ${weatherData.windSpeed} kph.`;
  } catch (error) {
    return `An error occurred: ${error.message}`;
  }
}
```
Please note that you need to replace `YOUR_API_KEY` with your actual API key from the weather API you are using. Also, the structure of the API response may vary depending on the API, so you may need to adjust the destructuring of `response.data.current`.