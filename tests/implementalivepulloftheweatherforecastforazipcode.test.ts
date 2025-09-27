```typescript
import axios from 'axios';
import { fetchWeather } from './fetchWeather';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchWeather', () => {
  it('should return the correct weather data when the request is successful', async () => {
    // Arrange
    const mockResponse = {
      data: {
        current: {
          temp_f: 75,
          text: 'Sunny',
        },
        location: {
          name: 'San Francisco',
        },
      },
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    // Act
    const result = await fetchWeather('94101');

    // Assert
    expect(result).toEqual({
      temperature: 75,
      condition: 'Sunny',
      location: 'San Francisco',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=94101');
  });

  it('should throw an error when the request fails', async () => {
    // Arrange
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    // Act and Assert
    await expect(fetchWeather('94101')).rejects.toThrow('Could not fetch weather');
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=94101');
  });
});
```
This Jest test suite contains two tests. The first test checks that the `fetchWeather` function correctly processes a successful response from the API. The second test checks that the function correctly throws an error when the API request fails. The `axios` module is mocked to isolate the function from its external dependencies.