```typescript
import axios from 'axios';
import { getWeatherData } from './weather'; // Assuming the function is exported from 'weather.ts'

jest.mock('axios');

describe('getWeatherData', () => {
  it('returns weather data when request is successful', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const response = {
      data: {
        current: {
          temp_c: 20,
          humidity: 60,
          condition: {
            text: 'Sunny',
          },
        },
      },
      status: 200,
    };

    mockedAxios.get.mockResolvedValue(response);

    const result = await getWeatherData('90210');

    expect(result).toEqual({
      success: true,
      data: {
        temperature: 20,
        humidity: 60,
        description: 'Sunny',
      },
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });

  it('returns error message when request fails', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const error = new Error('Network error');

    mockedAxios.get.mockRejectedValue(error);

    const result = await getWeatherData('90210');

    expect(result).toEqual({
      success: false,
      message: 'Network error',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });

  it('returns error message when status is not 200', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const response = {
      data: {},
      status: 404,
    };

    mockedAxios.get.mockResolvedValue(response);

    const result = await getWeatherData('90210');

    expect(result).toEqual({
      success: false,
      message: 'Unable to fetch weather data',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });
});
```