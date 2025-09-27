```typescript
import axios from 'axios';

/**
 * Interface for the response object
 */
interface IWeatherResponse {
  location: string;
  temperature: number;
  condition: string;
}

/**
 * Fetches the weather forecast for a given zipcode.
 * 
 * @param {string} zipcode - The zipcode for which to fetch the weather forecast.
 * @returns {Promise<IWeatherResponse>} The weather forecast for the given zipcode.
 * 
 * @throws {Error} When the API request fails.
 */
async function fetchWeatherForecast(zipcode: string): Promise<IWeatherResponse> {
  try {
    // Replace with your actual API endpoint and API key
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipcode}`);

    // Check if the response is successful
    if (response.status !== 200) {
      throw new Error('Failed to fetch the weather forecast.');
    }

    // Extract the required data from the response
    const data = response.data;
    const location = data.location.name;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;

    // Return the meaningful response object
    return {
      location,
      temperature,
      condition
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch the weather forecast.');
  }
}
```