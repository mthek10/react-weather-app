```typescript
import axios from 'axios';
import { getWeatherForecast } from './weather'; // Assuming the function is exported from a file called weather.ts

jest.mock('axios');

describe('getWeatherForecast', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return weather forecast for a given zipcode', async () => {
    const mockResponse = {
      data: {
        location: { name: 'Los Angeles' },
        current: { temp_c: 20, condition: { text: 'Sunny' } },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const expectedResponse = {
      location: 'Los Angeles',
      temperature: 20,
      condition: 'Sunny',
    };

    await expect(getWeatherForecast('90001')).resolves.toEqual(expectedResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=90001');
  });

  it('should throw an error when the request fails', async () => {
    const error = new Error('Network error');
    mockedAxios.get.mockRejectedValueOnce(error);

    await expect(getWeatherForecast('90001')).rejects.toThrow('Network error');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=90001');
  });
});
```