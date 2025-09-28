```typescript
import axios from 'axios';
import { fetchWeatherForecast } from './weather'; // assuming the function is exported from weather.ts

jest.mock('axios');

describe('fetchWeatherForecast', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should fetch weather data successfully', async () => {
    const mockResponse = {
      status: 200,
      data: {
        location: { name: 'New York' },
        current: { condition: { text: 'Sunny' }, temp_c: 25 },
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await fetchWeatherForecast('10001');

    expect(result).toEqual({
      location: 'New York',
      description: 'Sunny',
      temperature: 25,
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=10001'
    );
  });

  it('should throw an error when the API request fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(fetchWeatherForecast('10001')).rejects.toThrow(
      'Failed to fetch weather data: Network error'
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=10001'
    );
  });

  it('should throw an error when the response status is not 200', async () => {
    const mockResponse = { status: 404 };
    mockedAxios.get.mockResolvedValue(mockResponse);

    await expect(fetchWeatherForecast('10001')).rejects.toThrow(
      'Failed to fetch weather data'
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=10001'
    );
  });
});
```