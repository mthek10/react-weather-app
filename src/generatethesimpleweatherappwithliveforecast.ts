```typescript
import axios from 'axios';

/**
 * Interface for the weather data response
 */
interface IWeatherResponse {
  location: string;
  temperature: number;
  condition: string;
}

/**
 * Fetches weather data from an API based on the provided zip code.
 * @param {string} zipCode - The zip code to fetch weather data for.
 * @returns {Promise<IWeatherResponse>} - The weather data for the provided zip code.
 * @throws {Error} - Throws an error if the zip code is invalid or the API request fails.
 */
async function getWeatherForecast(zipCode: string): Promise<IWeatherResponse> {
  // Validate zip code
  if (!/^\d{5}$/.test(zipCode)) {
    throw new Error('Invalid zip code. Must be a 5-digit number.');
  }

  try {
    // Make API request
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    // Extract relevant data from response
    const location = response.data.location.name;
    const temperature = response.data.current.temp_c;
    const condition = response.data.current.condition.text;

    // Return formatted response
    return {
      location,
      temperature,
      condition,
    };
  } catch (error) {
    // Handle API request failure
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
```

Please note that you need to replace `YOUR_API_KEY` with your actual API key from weatherapi.com. This is a simple demonstration and does not include all possible error handling or data validation that a production application would require.