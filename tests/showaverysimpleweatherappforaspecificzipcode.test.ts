```typescript
import axios from 'axios';
import { fetchWeatherData } from './fetchWeatherData';

jest.mock('axios');

describe('fetchWeatherData', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should fetch weather data successfully', async () => {
    const mockData = {
      current: {
        temp_c: 20,
        humidity: 80,
        wind_kph: 10,
      },
    };

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockData,
    });

    const zipCode = '12345';
    const result = await fetchWeatherData(zipCode);

    expect(result).toEqual({
      temperature: mockData.current.temp_c,
      humidity: mockData.current.humidity,
      windSpeed: mockData.current.wind_kph,
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
  });

  it('should throw an error when the response status is not 200', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 404,
      data: {},
    });

    const zipCode = '12345';

    await expect(fetchWeatherData(zipCode)).rejects.toThrow('Failed to fetch weather data');
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
  });

  it('should throw an error when the request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const zipCode = '12345';

    await expect(fetchWeatherData(zipCode)).rejects.toThrow('Network error');
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${zipCode}`);
  });
});
```