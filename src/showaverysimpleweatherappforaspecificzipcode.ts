```typescript
import axios from 'axios';

/**
 * @typedef {Object} WeatherResponse
 * @property {string} location - The location for which the weather data is fetched.
 * @property {string} temperature - The current temperature at the location.
 * @property {string} condition - The current weather condition at the location.
 */

/**
 * Fetches weather data for a given zip code.
 * 
 * @param {string} zipCode - The zip code for which to fetch the weather data.
 * @returns {Promise<WeatherResponse>} The weather data for the given zip code.
 * @throws {Error} When the API request fails.
 */
async function getWeatherByZipCode(zipCode: string): Promise<WeatherResponse> {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

        if (response.status !== 200) {
            throw new Error('Failed to fetch weather data');
        }

        const { location, current } = response.data;

        return {
            location: location.name,
            temperature: current.temp_c,
            condition: current.condition.text
        };
    } catch (error) {
        console.error(`Failed to fetch weather data for zip code ${zipCode}: ${error}`);
        throw error;
    }
}
```

Please replace `YOUR_API_KEY` with your actual API key from weatherapi.com.