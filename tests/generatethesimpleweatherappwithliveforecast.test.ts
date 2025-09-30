```typescript
import axios from 'axios';
import { getWeatherForecast } from './getWeatherForecast'; // Assuming the function is exported from this file

jest.mock('axios');

describe('getWeatherForecast', () => {
  it('should fetch weather data successfully given a valid zip code', async () => {
    const data = {
      location: {
        name: 'New York',
      },
      current: {
        temp_c: 20,
        condition: {
          text: 'Sunny',
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data });

    const result = await getWeatherForecast('10001');
    expect(result).toEqual({
      location: 'New York',
      temperature: 20,
      condition: 'Sunny',
    });
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
  });

  it('should throw an error when the zip code is invalid', async () => {
    await expect(getWeatherForecast('1234')).rejects.toThrow('Invalid zip code. Must be a 5-digit number.');
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('should throw an error when the API request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(getWeatherForecast('10001')).rejects.toThrow('Failed to fetch weather data: Network error');
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
  });
});
```
This Jest test suite includes three tests: one for a successful API request, one for an invalid zip code, and one for a failed API request. It uses Jest's mocking capabilities to mock the axios.get function, allowing us to control its behavior and avoid making actual HTTP requests during testing.