```typescript
import axios from 'axios';
import { fetchWeatherForecast } from './weather'; // Assuming the function is exported from weather.ts

jest.mock('axios');

describe('fetchWeatherForecast', () => {
  it('returns weather data when request is successful', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        current: {
          temp_c: 25,
          humidity: 80,
          condition: {
            text: 'Sunny',
          },
        },
      },
    });

    const expectedResponse = {
      temperature: 25,
      humidity: 80,
      description: 'Sunny',
    };

    await expect(fetchWeatherForecast('12345')).resolves.toEqual(expectedResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=12345');
  });

  it('throws an error when the request fails', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(fetchWeatherForecast('12345')).rejects.toThrow('Failed to fetch weather forecast: Network error');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=12345');
  });

  it('throws an error when the response status is not 200', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({
      status: 404,
      data: {},
    });

    await expect(fetchWeatherForecast('12345')).rejects.toThrow('Unexpected response code: 404');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=12345');
  });
});
```