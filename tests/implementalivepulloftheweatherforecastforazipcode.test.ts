```typescript
import axios from 'axios';
import { fetchWeatherForecast } from './weather'; // assuming the function is exported from a file named 'weather.ts'

jest.mock('axios');

describe('fetchWeatherForecast', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns weather forecast data when request is successful', async () => {
    const mockData = {
      location: {
        name: 'Los Angeles',
        region: 'California',
        country: 'USA',
        lat: 34.05,
        lon: -118.25,
        tz_id: 'America/Los_Angeles',
        localtime_epoch: 1631290536,
        localtime: '2021-09-10 16:22'
      },
      current: {
        temp_c: 27.0,
        temp_f: 80.6,
        is_day: true,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          code: 1000
        },
        wind_mph: 6.7,
        wind_kph: 10.8,
        wind_degree: 90,
        wind_dir: 'E',
        pressure_mb: 1015.0,
        pressure_in: 30.4,
        precip_mm: 0.0,
        precip_in: 0.0,
        humidity: 34,
        cloud: 0,
        feelslike_c: 27.3,
        feelslike_f: 81.1,
        vis_km: 10.0,
        vis_miles: 6.0,
        uv: 6.0,
        gust_mph: 7.6,
        gust_kph: 12.2
      }
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchWeatherForecast('90001');
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=your-api-key&q=90001');
  });

  it('throws an error when request fails', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchWeatherForecast('90001')).rejects.toThrow(errorMessage);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=your-api-key&q=90001');
  });
});
```