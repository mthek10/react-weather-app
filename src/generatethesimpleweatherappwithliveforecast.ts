```typescript
import axios from 'axios';

/**
 * Interface for the weather response
 */
interface IWeatherResponse {
  temperature: number;
  humidity: number;
  description: string;
}

/**
 * Fetches the weather forecast for a given zip code
 * @param {string} zipCode - The zip code to fetch the weather for
 * @returns {Promise<IWeatherResponse>} The weather response
 * @throws {Error} If the API request fails
 */
async function fetchWeatherForecast(zipCode: string): Promise<IWeatherResponse> {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
    const data = response.data;

    if (!data || !data.current) {
      throw new Error('Invalid API response');
    }

    const weatherResponse: IWeatherResponse = {
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      description: data.current.condition.text,
    };

    return weatherResponse;
  } catch (error) {
    throw new Error(`Failed to fetch weather: ${error.message}`);
  }
}
```

Please replace `YOUR_API_KEY` with your actual API key from weatherapi.com. This function fetches the current weather for a given zip code using the WeatherAPI. It returns an object with the current temperature (in Celsius), humidity (in percentage), and a text description of the current weather condition. If the API request fails for any reason, the function throws an error.