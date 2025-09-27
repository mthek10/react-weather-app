```typescript
import axios from 'axios';

/**
 * Interface for the response data from the weather API
 */
interface IWeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    is_day: boolean;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

/**
 * Fetches the weather forecast for a given zipcode.
 * @param {string} zipcode - The zipcode to fetch the weather forecast for.
 * @returns {Promise<IWeatherResponse>} The weather forecast data.
 */
async function fetchWeatherForecast(zipcode: string): Promise<IWeatherResponse> {
  try {
    // Replace 'your-api-key' with your actual API key
    const response = await axios.get<IWeatherResponse>(`http://api.weatherapi.com/v1/current.json?key=your-api-key&q=${zipcode}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch weather forecast for zipcode: ${zipcode}`, error);
    throw error;
  }
}
```