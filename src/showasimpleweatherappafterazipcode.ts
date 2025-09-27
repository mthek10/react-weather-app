```typescript
import axios from 'axios';

/**
 * @typedef {Object} WeatherResponse
 * @property {string} location - The location for which the weather data is provided.
 * @property {number} temperature - The current temperature in the location.
 * @property {string} condition - The current weather condition in the location.
 */

/**
 * Fetches weather data for a given zip code.
 * 
 * @param {string} zipCode - The zip code for which to fetch the weather data.
 * @returns {Promise<WeatherResponse>} The weather data for the given zip code.
 * @throws {Error} Will throw an error if the request fails or if the zip code is invalid.
 */
async function getWeatherByZipCode(zipCode: string): Promise<WeatherResponse> {
    if (!zipCode || zipCode.length !== 5 || isNaN(Number(zipCode))) {
        throw new Error('Invalid zip code.');
    }

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
        const data = response.data;

        const weatherResponse: WeatherResponse = {
            location: data.location.name,
            temperature: data.current.temp_f,
            condition: data.current.condition.text
        };

        return weatherResponse;
    } catch (error) {
        throw new Error('Failed to fetch weather data.');
    }
}
```
Please replace `YOUR_API_KEY` with your actual API key. This function uses the WeatherAPI service to fetch weather data. You need to sign up for a free API key from their website. The API key is used to authenticate your requests.