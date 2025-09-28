```typescript
import axios from 'axios';
import { getWeatherForecast, IWeatherResponse } from './weatherService';

jest.mock('axios');

describe('getWeatherForecast', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns weather data when request is successful', async () => {
    const data: IWeatherResponse = {
      location: 'New York',
      temperature: 20,
      condition: 'Sunny',
    };

    mockedAxios.get.mockResolvedValueOnce({ status: 200, data });

    const result = await getWeatherForecast('10001');

    expect(result).toEqual(data);
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001`);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('throws an error when the response status is not 200', async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 404 });

    await expect(getWeatherForecast('10001')).rejects.toThrow('Failed to fetch weather data');
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001`);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('throws an error when the request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getWeatherForecast('10001')).rejects.toThrow('Network Error');
    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001`);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
```
Please replace `YOUR_API_KEY` with your actual API key from the weather API service. Also, the structure of the response object and the endpoint URL are based on the WeatherAPI service. If you are using a different API service, you may need to adjust these accordingly.