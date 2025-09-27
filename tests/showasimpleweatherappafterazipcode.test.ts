```typescript
import axios from 'axios';
import fetchWeatherData from './fetchWeatherData';

jest.mock('axios');

describe('fetchWeatherData', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return weather data when request is successful', async () => {
    const mockData = {
      current: {
        temp_f: 75,
        humidity: 80,
        condition: {
          text: 'Partly cloudy',
        },
      },
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchWeatherData('90210');

    expect(result).toEqual({
      temperature: mockData.current.temp_f,
      humidity: mockData.current.humidity,
      description: mockData.current.condition.text,
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });

  it('should throw an error when request fails', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchWeatherData('90210')).rejects.toThrow(`Failed to fetch weather data: ${errorMessage}`);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });
});
```
This Jest test suite mocks the axios module and tests both successful and error cases for the `fetchWeatherData` function. It includes proper assertions and uses descriptive test names.