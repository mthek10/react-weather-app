```typescript
import axios from 'axios';
import { fetchWeatherData } from './weatherService';

jest.mock('axios');

describe('fetchWeatherData', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return weather data when the request is successful', async () => {
    const data = {
      current: {
        temp_c: 20,
        humidity: 70,
        wind_kph: 10,
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ status: 200, data });

    const result = await fetchWeatherData('12345');

    expect(result).toEqual({
      temperature: data.current.temp_c,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345`);
  });

  it('should throw an error when the request fails', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchWeatherData('12345')).rejects.toThrow(`Failed to fetch weather data: ${errorMessage}`);

    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345`);
  });

  it('should throw an error when the response status is not 200', async () => {
    const statusText = 'Not Found';

    mockedAxios.get.mockResolvedValueOnce({ status: 404, statusText });

    await expect(fetchWeatherData('12345')).rejects.toThrow(`Failed to fetch weather data: ${statusText}`);

    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345`);
  });
});
```
This Jest test suite includes three test cases for the `fetchWeatherData` function: a successful request, a failed request, and a request with a non-200 response status. It uses Jest's mocking capabilities to simulate axios's behavior in different scenarios.