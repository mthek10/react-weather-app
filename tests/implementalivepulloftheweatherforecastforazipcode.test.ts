```typescript
import axios from 'axios';
import { fetchWeatherForecast } from './fetchWeatherForecast';

jest.mock('axios');

describe('fetchWeatherForecast', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return weather forecast when the request is successful', async () => {
    const mockResponse = {
      status: 200,
      data: {
        location: {
          name: 'Test City',
        },
        current: {
          temp_c: 20,
          condition: {
            text: 'Sunny',
          },
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await fetchWeatherForecast('12345');

    expect(result).toEqual({
      location: 'Test City',
      temperature: 20,
      condition: 'Sunny',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });

  it('should throw an error when the request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchWeatherForecast('12345')).rejects.toThrow('Failed to fetch the weather forecast.');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });

  it('should throw an error when the response status is not 200', async () => {
    const mockResponse = {
      status: 404,
      data: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    await expect(fetchWeatherForecast('12345')).rejects.toThrow('Failed to fetch the weather forecast.');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });
});
```