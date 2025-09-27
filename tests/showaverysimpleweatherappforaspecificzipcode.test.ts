```typescript
import axios from 'axios';
import { fetchWeather } from './weather'; // Assuming the function is exported from a file named weather.ts

jest.mock('axios');

describe('fetchWeather', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should fetch weather data successfully', async () => {
    const mockData = {
      location: {
        name: 'New York',
      },
      current: {
        condition: {
          text: 'Sunny',
        },
        temp_c: 20,
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchWeather('10001');

    expect(result).toEqual({
      location: 'New York',
      description: 'Sunny',
      temperature: 20,
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when the request fails', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchWeather('10001')).rejects.toThrow(`Failed to fetch weather for zip code 10001: ${errorMessage}`);

    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
```
Please replace `YOUR_API_KEY` with your actual API key from weatherapi.com.