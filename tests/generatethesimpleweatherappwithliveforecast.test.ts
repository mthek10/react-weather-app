```typescript
import axios from 'axios';
import { getWeatherForecast } from './weather'; // Assuming the function is exported from a file named weather.ts

jest.mock('axios');

describe('getWeatherForecast', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns the weather forecast for a given zip code', async () => {
    const mockResponse = {
      status: 200,
      data: {
        location: { name: 'San Francisco' },
        current: { condition: { text: 'Sunny' }, temp_c: 20 },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getWeatherForecast('94101');

    expect(result).toEqual({
      location: 'San Francisco',
      description: 'Sunny',
      temperature: 20,
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=94101');
  });

  it('throws an error when the API request fails', async () => {
    const mockResponse = {
      status: 500,
      data: {},
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    await expect(getWeatherForecast('94101')).rejects.toThrow('Failed to fetch weather forecast');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=94101');
  });

  it('throws an error when the API request throws an exception', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(getWeatherForecast('94101')).rejects.toThrow('Network error');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=94101');
  });
});
```
Please replace `YOUR_API_KEY` with your actual API key. This test assumes that you are using the WeatherAPI service. If you are using a different service, you may need to adjust the URL and the way you extract data from the mock response.