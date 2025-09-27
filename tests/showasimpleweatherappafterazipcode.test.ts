```typescript
import axios from 'axios';
import { getWeatherData } from './your-file'; // replace 'your-file' with the actual file name

jest.mock('axios');

describe('getWeatherData', () => {
  it('should return weather data when the request is successful', async () => {
    const mockData = {
      data: {
        current: {
          temp_c: 20,
          humidity: 80,
          condition: {
            text: 'Sunny',
          },
        },
      },
      status: 200,
    };

    (axios.get as jest.Mock).mockResolvedValue(mockData);

    const weatherData = await getWeatherData('12345');

    expect(axios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=12345');
    expect(weatherData).toEqual({
      temperature: 20,
      humidity: 80,
      description: 'Sunny',
    });
  });

  it('should throw an error when the response status is not 200', async () => {
    const mockData = {
      data: {},
      status: 404,
    };

    (axios.get as jest.Mock).mockResolvedValue(mockData);

    await expect(getWeatherData('12345')).rejects.toThrow('Unexpected response code: 404');
    expect(axios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=12345');
  });

  it('should throw an error when the request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getWeatherData('12345')).rejects.toThrow('Failed to fetch weather data: Network error');
    expect(axios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=12345');
  });
});
```
Please replace `'your-file'` with the actual file name where the `getWeatherData` function is exported from. Also replace `'YOUR_API_KEY'` with your actual API key.