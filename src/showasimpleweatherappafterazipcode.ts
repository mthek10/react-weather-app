```typescript
import axios, { AxiosResponse } from 'axios';

/**
 * Interface for the weather data response
 */
interface IWeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

/**
 * Function to fetch weather data based on zip code
 * @param {string} zipCode - The zip code for the location
 * @returns {Promise<IWeatherData>} - A promise that resolves to the weather data
 */
async function fetchWeatherData(zipCode: string): Promise<IWeatherData> {
  try {
    // Replace with your actual weather API endpoint and API key
    const response: AxiosResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);

    // Check if the response is successful
    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }

    // Extract the required data from the response
    const data = response.data;
    const weatherData: IWeatherData = {
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      description: data.current.condition.text,
    };

    return weatherData;
  } catch (error) {
    console.error(`Failed to fetch weather data: ${error}`);
    throw error;
  }
}
```

Please note that you need to replace `YOUR_API_KEY` with your actual API key from the weather API provider. The URL and the way of accessing the data (`data.current.temp_c`, `data.current.humidity`, `data.current.condition.text`) are based on the WeatherAPI (https://www.weatherapi.com/). If you are using a different API, you need to adjust the URL and the way of accessing the data accordingly.