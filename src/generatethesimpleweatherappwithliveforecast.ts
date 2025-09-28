```typescript
import axios from 'axios';

/**
 * Interface for the weather data response
 */
interface IWeatherResponse {
  location: string;
  temperature: number;
  condition: string;
}

/**
 * Fetches live weather forecast for a given zip code
 * @param {string} zipCode - The zip code for which to fetch the weather forecast
 * @returns {Promise<IWeatherResponse>} The weather forecast data
 */
async function getWeatherForecast(zipCode: string): Promise<IWeatherResponse> {
  try {
    // Replace with your actual weather API endpoint and API key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    const data = response.data;

    const weatherResponse: IWeatherResponse = {
      location: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    };

    return weatherResponse;
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    throw error;
  }
}
```
Please note that you need to replace `YOUR_API_KEY` with your actual API key from the weather API service. Also, the structure of the response object and the endpoint URL are based on the WeatherAPI service. If you are using a different API service, you may need to adjust these accordingly.