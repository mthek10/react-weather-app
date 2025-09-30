```typescript
import axios from 'axios';
import { fetchWeatherForecast } from './weather'; // Assuming the function is in weather.ts

jest.mock('axios');

describe('fetchWeatherForecast', () => {
  it('should return weather data when API request is successful', async () => {
    const mockData = {
      current: {
        temp_c: 20,
        humidity: 80,
        condition: {
          text: 'Sunny',
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const expectedResponse = {
      temperature: 20,
      humidity: 80,
      description: 'Sunny',
    };

    await expect(fetchWeatherForecast('12345')).resolves.toEqual(expectedResponse);
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });

  it('should throw an error when API response is invalid', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: {} });

    await expect(fetchWeatherForecast('12345')).rejects.toThrow('Invalid API response');
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });

  it('should throw an error when API request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchWeatherForecast('12345')).rejects.toThrow('Failed to fetch weather: Network error');
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });
});
```

Please replace `YOUR_API_KEY` with your actual API key from weatherapi.com.