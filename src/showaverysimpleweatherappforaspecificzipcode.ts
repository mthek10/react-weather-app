```typescript
import axios from 'axios';

/**
 * @typedef {Object} WeatherResponse
 * @property {string} location - The location of the weather report.
 * @property {string} description - The description of the weather.
 * @property {number} temperature - The current temperature.
 */

/**
 * Fetches the weather for a given zip code.
 *
 * @param {string} zipCode - The zip code to fetch the weather for.
 * @returns {Promise<WeatherResponse>} The weather response.
 * @throws {Error} When there's an error fetching the weather.
 */
async function fetchWeather(zipCode: string): Promise<WeatherResponse> {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
        const data = response.data;

        return {
            location: data.location.name,
            description: data.current.condition.text,
            temperature: data.current.temp_c,
        };
    } catch (error) {
        throw new Error(`Failed to fetch weather for zip code ${zipCode}: ${error.message}`);
    }
}
```

Please replace `YOUR_API_KEY` with your actual API key from weatherapi.com. This function fetches the current weather for a given zip code using the weatherapi.com API, and returns an object containing the location name, weather description, and current temperature in Celsius. If there's an error fetching the weather, it throws an error with a descriptive message.