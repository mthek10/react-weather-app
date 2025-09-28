```typescript
import axios from 'axios';

/**
 * @typedef {Object} WeatherResponse
 * @property {string} location - The location for which the weather is forecasted.
 * @property {string} description - The description of the current weather.
 * @property {number} temperature - The current temperature.
 */

/**
 * Fetches live weather forecast for a given zip code.
 *
 * @param {string} zipCode - The zip code for which to fetch the weather forecast.
 * @returns {Promise<WeatherResponse>} The weather forecast for the given zip code.
 * @throws {Error} Will throw an error if the API request fails.
 */
async function getWeatherForecast(zipCode: string): Promise<WeatherResponse> {
    try {
        // For demonstration purposes, we're using a mock API endpoint.
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

        if (response.status !== 200) {
            throw new Error('Failed to fetch weather forecast');
        }

        const data = response.data;

        return {
            location: data.location.name,
            description: data.current.condition.text,
            temperature: data.current.temp_c,
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch weather forecast');
    }
}
```
Please replace `YOUR_API_KEY` with your actual API key from Weather API. This is a simple demonstration and does not include all possible error handling or edge cases.