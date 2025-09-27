```typescript
import axios from 'axios';

/**
 * Interface for the weather data
 */
interface IWeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

/**
 * Interface for the response object
 */
interface IResponse {
  success: boolean;
  data?: IWeatherData;
  message?: string;
}

/**
 * Fetches weather data for a given zip code.
 *
 * @param {string} zipCode - The zip code.
 * @returns {Promise<IResponse>} The weather data.
 */
async function getWeatherData(zipCode: string): Promise<IResponse> {
  try {
    // Replace with your actual API endpoint and key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    if (response.status !== 200) {
      return {
        success: false,
        message: 'Unable to fetch weather data',
      };
    }

    const weatherData: IWeatherData = {
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      description: response.data.current.condition.text,
    };

    return {
      success: true,
      data: weatherData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
```