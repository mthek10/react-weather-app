```typescript
import axios from 'axios';
import { fetchWeatherData, showWeatherApp } from './weatherApp'; // Assuming the functions are exported from weatherApp.ts

jest.mock('axios');

describe('Weather App', () => {
  describe('fetchWeatherData', () => {
    it('should fetch weather data successfully', async () => {
      const mockedResponse = {
        status: 200,
        data: {
          current: {
            temp_c: 20,
            humidity: 50,
            wind_kph: 10,
          },
        },
      };

      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);

      const weatherData = await fetchWeatherData('12345');

      expect(weatherData).toEqual({
        temperature: 20,
        humidity: 50,
        windSpeed: 10,
      });
      expect(axios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
    });

    it('should throw an error when the response status is not 200', async () => {
      const mockedResponse = {
        status: 404,
      };

      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);

      await expect(fetchWeatherData('12345')).rejects.toThrow('Error: Received status code 404');
    });

    it('should throw an error when the request fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(fetchWeatherData('12345')).rejects.toThrow('Network error');
    });
  });

  describe('showWeatherApp', () => {
    it('should return a weather message successfully', async () => {
      const mockedWeatherData = {
        temperature: 20,
        humidity: 50,
        windSpeed: 10,
      };

      jest.spyOn(global, 'fetchWeatherData').mockResolvedValue(mockedWeatherData);

      const message = await showWeatherApp('12345');

      expect(message).toBe('The current temperature in 12345 is 20°C with a humidity of 50% and wind speed of 10 kph.');
    });

    it('should throw an error when fetching weather data fails', async () => {
      jest.spyOn(global, 'fetchWeatherData').mockRejectedValue(new Error('Failed to fetch weather data'));

      await expect(showWeatherApp('12345')).rejects.toThrow('Failed to fetch weather data');
    });
  });
});
```
Please replace `YOUR_API_KEY` with your actual API key. This code assumes that you are using the WeatherAPI service. If you are using a different service, you may need to adjust the URL and the way you access the data in the response.