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
 * Function to fetch weather data for a specific zip code
 * @param {string} zipCode - The zip code for which to fetch the weather data
 * @returns {Promise<IWeatherData>} - Returns a promise that resolves with the weather data
 */
async function fetchWeatherData(zipCode: string): Promise<IWeatherData> {
  try {
    // Replace with your actual weather API endpoint
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
    
    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }

    const weatherData: IWeatherData = {
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_kph,
    };

    return weatherData;
  } catch (error) {
    console.error(`Failed to fetch weather data: ${error}`);
    throw error;
  }
}

/**
 * Function to show a simple weather app for a specific zip code
 * @param {string} zipCode - The zip code for which to show the weather
 * @returns {Promise<string>} - Returns a promise that resolves with a message about the weather
 */
async function showWeatherApp(zipCode: string): Promise<string> {
  try {
    const weatherData = await fetchWeatherData(zipCode);
    const message = `The current temperature in ${zipCode} is ${weatherData.temperature}°C with a humidity of ${weatherData.humidity}% and wind speed of ${weatherData.windSpeed} kph.`;
    return message;
  } catch (error) {
    console.error(`Failed to show weather app: ${error}`);
    throw error;
  }
}
```
Please replace `YOUR_API_KEY` with your actual API key. This code assumes that you are using the WeatherAPI service. If you are using a different service, you may need to adjust the URL and the way you access the data in the response.