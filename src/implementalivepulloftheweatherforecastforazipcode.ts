```typescript
import axios, { AxiosResponse } from 'axios';

/**
 * Interface for the weather forecast response
 */
interface IWeatherForecastResponse {
  temperature: number;
  humidity: number;
  description: string;
}

/**
 * Function to fetch the weather forecast for a given zipcode
 * @param {string} zipcode - The zipcode for which to fetch the weather forecast
 * @returns {Promise<IWeatherForecastResponse>} - The weather forecast for the given zipcode
 * @throws {Error} - Throws an error if the request fails
 */
async function fetchWeatherForecast(zipcode: string): Promise<IWeatherForecastResponse> {
  try {
    // Make a GET request to a hypothetical weather API
    const response: AxiosResponse = await axios.get(`https://api.weather.com/v3/wx/forecast/daily/5day?postal_key=${zipcode}&format=json`);

    // Extract the relevant data from the response
    const { temperature, humidity, description } = response.data;

    // Return the weather forecast
    return {
      temperature,
      humidity,
      description,
    };
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(`Failed to fetch the weather forecast for zipcode ${zipcode}: ${error}`);
  }
}
```