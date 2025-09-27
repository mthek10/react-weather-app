```typescript
import axios from 'axios';
import { getWeatherData } from './getWeatherData';

jest.mock('axios');

describe('getWeatherData', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns weather data when API request is successful', async () => {
    const mockResponse = {
      data: {
        main: {
          temp: 280.32,
        },
        weather: [
          {
            description: 'clear sky',
            icon: '01d',
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const expected = {
      temperature: 280.32,
      description: 'clear sky',
      icon: '01d',
    };

    await expect(getWeatherData('90210')).resolves.toEqual(expected);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather?zip=90210,us&appid=YOUR_API_KEY');
  });

  it('throws an error when API request fails', async () => {
    const error = new Error('Network error');

    mockedAxios.get.mockRejectedValue(error);

    await expect(getWeatherData('90210')).rejects.toThrow('Failed to fetch weather data: Network error');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather?zip=90210,us&appid=YOUR_API_KEY');
  });
});
```