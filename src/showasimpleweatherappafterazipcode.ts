```typescript
import axios from 'axios';

/**
 * Interface for the response data from the weather API
 */
interface IWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

/**
 * Interface for the response object of the function
 */
interface IWeatherData {
  temperature: number;
  description: string;
  icon: string;
}

/**
 * Fetches weather data for a given zip code
 * @param {string} zipCode - The zip code to fetch weather data for
 * @returns {Promise<IWeatherData>} The weather data
 * @throws {Error} When the API request fails
 */
async function getWeatherData(zipCode: string): Promise<IWeatherData> {
  try {
    const response = await axios.get<IWeatherResponse>(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=YOUR_API_KEY`);

    return {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    };
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error}`);
  }
}
```

Please replace `YOUR_API_KEY` with your actual API key from OpenWeatherMap.