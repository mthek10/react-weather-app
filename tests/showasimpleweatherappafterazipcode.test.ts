```typescript
import axios from 'axios';
import { getWeatherData } from './getWeatherData';

jest.mock('axios');

describe('getWeatherData', () => {
  it('should return weather data when the request is successful', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const data = {
      location: {
        name: 'New York',
      },
      current: {
        temp_c: 20,
        condition: {
          text: 'Sunny',
        },
      },
    };
    mockedAxios.get.mockResolvedValueOnce({ status: 200, data });

    const result = await getWeatherData('10001');
    expect(result).toEqual({
      location: 'New York',
      temperature: 20,
      condition: 'Sunny',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
  });

  it('should throw an error when the request fails', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(getWeatherData('10001')).rejects.toThrow('Failed to fetch weather data: Network error');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
  });

  it('should throw an error when the response status is not 200', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce({ status: 404 });

    await expect(getWeatherData('10001')).rejects.toThrow('Unexpected response code: 404');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
  });
});
```