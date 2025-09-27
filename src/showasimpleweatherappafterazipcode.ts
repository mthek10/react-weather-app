```typescript
import axios from 'axios';

/**
 * Interface for the weather data response
 */
interface IWeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

/**
 * Function to fetch weather data for a given zip code
 * @param zipCode - The zip code for which to fetch the weather data
 * @returns A Promise that resolves to an object containing the weather data
 */
async function getWeatherData(zipCode: string): Promise<IWeatherData> {
  try {
    // Here we're using a mock API URL, replace with a real weather API endpoint
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${zipCode}`);

    if (response.status !== 200) {
      throw new Error(`Unexpected response code: ${response.status}`);
    }

    const weatherData: IWeatherData = {
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      description: response.data.current.condition.text,
    };

    return weatherData;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
```
Please note that you'll need to replace `YOUR_API_KEY` with your actual API key from the weather API service you're using. The structure of the response object and the endpoints may also vary depending on the weather API service.