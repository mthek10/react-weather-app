```typescript
import axios from 'axios';

/**
 * @typedef {Object} WeatherResponse
 * @property {string} location - The location of the weather forecast.
 * @property {number} temperature - The current temperature.
 * @property {string} condition - The current weather condition.
 */

/**
 * Fetches the live forecast for a given zip code.
 * @param {string} zipCode - The zip code to fetch the weather for.
 * @returns {Promise<WeatherResponse>} The weather forecast.
 * @throws {Error} If there is an error fetching the weather.
 */
async function fetchWeather(zipCode: string): Promise<WeatherResponse> {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
        const data = response.data;

        return {
            location: data.location.name,
            temperature: data.current.temp_f,
            condition: data.current.condition.text
        };
    } catch (error) {
        throw new Error(`Failed to fetch weather: ${error.message}`);
    }
}
```

Please replace `YOUR_API_KEY` with your actual API key from WeatherAPI. This function fetches the current weather for a given zip code by making a GET request to the WeatherAPI. It then returns an object containing the location, current temperature, and weather condition. If there is an error fetching the weather, it throws an error with a message detailing what went wrong.