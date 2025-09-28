```typescript
import axios from 'axios';
import { fetchWeather } from './fetchWeather';

jest.mock('axios');

describe('fetchWeather', () => {
  it('returns weather data when request is successful', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({
      data: {
        location: {
          name: 'New York'
        },
        current: {
          temp_f: 75,
          condition: {
            text: 'Sunny'
          }
        }
      }
    });

    const weather = await fetchWeather('10001');

    expect(weather).toEqual({
      location: 'New York',
      temperature: 75,
      condition: 'Sunny'
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
  });

  it('throws an error when request fails', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockRejectedValue(new Error('Network error: Something went wrong'));

    await expect(fetchWeather('10001')).rejects.toThrow('Failed to fetch weather: Network error: Something went wrong');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
  });
});
```
Please replace `YOUR_API_KEY` with your actual API key from WeatherAPI.