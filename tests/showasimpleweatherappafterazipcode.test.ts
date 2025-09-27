```typescript
import axios from 'axios';
import { fetchWeatherData } from './fetchWeatherData';

jest.mock('axios');

describe('fetchWeatherData', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns weather data when request is successful', async () => {
    const mockData = {
      current: {
        temp_c: 20,
        humidity: 50,
        condition: {
          text: 'Sunny',
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockData });

    const expectedData = {
      temperature: mockData.current.temp_c,
      humidity: mockData.current.humidity,
      description: mockData.current.condition.text,
    };

    await expect(fetchWeatherData('90210')).resolves.toEqual(expectedData);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });

  it('throws an error when the response status is not 200', async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 404, data: {} });

    await expect(fetchWeatherData('90210')).rejects.toThrow('Error: Received status code 404');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });

  it('throws an error when the request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchWeatherData('90210')).rejects.toThrow('Network error');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=90210');
  });
});
```