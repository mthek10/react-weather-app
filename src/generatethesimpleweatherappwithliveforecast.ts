```typescript
import axios from 'axios';

/**
 * @typedef WeatherResponse
 * @property {string} location - The location of the forecast
 * @property {string} forecast - The weather forecast
 */

/**
 * Fetches the weather forecast for a given zip code.
 *
 * @param {string} zipCode - The zip code to fetch the weather for
 * @returns {Promise<WeatherResponse>} The weather forecast
 * @throws {Error} When an error occurs during the API call
 */
async function fetchWeatherForecast(zipCode: string): Promise<WeatherResponse> {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${zipCode}`);
        const data = response.data;

        if (response.status !== 200) {
            throw new Error(`Unexpected response code: ${response.status}`);
        }

        return {
            location: data.location.name,
            forecast: data.forecast.forecastday[0].day.condition.text,
        };
    } catch (error) {
        throw new Error(`Failed to fetch weather forecast: ${error.message}`);
    }
}
```

Please replace `YOUR_API_KEY` with your actual API key from the weather API. This code uses the WeatherAPI service, but you can replace it with any other weather API service you prefer.