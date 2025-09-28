```typescript
import axios from 'axios';

/**
 * @typedef WeatherResponse
 * @property {string} location - The location of the weather forecast
 * @property {string} description - The weather description
 * @property {number} temperature - The current temperature
 */

/**
 * Fetches the weather forecast for a given zip code.
 *
 * @param {string} zipCode - The zip code for the location
 * @return {Promise<WeatherResponse>} The weather forecast
 * @throws {Error} When the API request fails
 */
async function getWeatherForecast(zipCode: string): Promise<WeatherResponse> {
  try {
    // Replace with your actual API endpoint and API key
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${zipCode}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather forecast');
    }

    const { location, current } = response.data;

    return {
      location: location.name,
      description: current.condition.text,
      temperature: current.temp_c,
    };
  } catch (error) {
    console.error('Failed to fetch weather forecast:', error);
    throw error;
  }
}
```

Please replace `YOUR_API_KEY` with your actual API key. This function assumes that you are using the WeatherAPI service. If you are using a different service, you may need to adjust the URL and the way you extract data from the response.