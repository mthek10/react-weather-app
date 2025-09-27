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
 * @returns {Promise<IWeatherData>} - A promise that resolves to the weather data
 */
async function fetchWeatherData(zipCode: string): Promise<IWeatherData> {
  try {
    // Replace with your actual weather API endpoint and API key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    const data = response.data;

    const weatherData: IWeatherData = {
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
    };

    return weatherData;
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    throw error;
  }
}
```

Note: This function assumes that you are using a weather API that returns the current temperature, humidity, and wind speed in the response. You would need to replace the API endpoint and API key with your actual values. Also, you need to handle the API key securely.