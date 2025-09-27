```typescript
import axios from 'axios';
import { fetchWeatherForecast } from './fetchWeatherForecast';

jest.mock('axios');

describe('fetchWeatherForecast', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should fetch and return weather forecast successfully', async () => {
    const mockResponse = {
      temperature: 72,
      humidity: 50,
      description: 'Sunny',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await fetchWeatherForecast('12345');

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weather.com/v3/wx/forecast/daily/5day?postal_key=12345&format=json');
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if the request fails', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchWeatherForecast('12345')).rejects.toThrow(`Failed to fetch the weather forecast for zipcode 12345: ${errorMessage}`);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weather.com/v3/wx/forecast/daily/5day?postal_key=12345&format=json');
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
```