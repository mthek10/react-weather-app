```typescript
import axios from 'axios';
import { getWeatherFromZipcode } from './weather'; // Assuming the function is exported from 'weather.ts'

jest.mock('axios');

describe('getWeatherFromZipcode', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns weather data when API call is successful', async () => {
    const mockData = {
      current: {
        temp_c: 20,
        humidity: 80,
        weather: { description: 'Sunny' },
      },
    };

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: mockData,
    });

    const expectedResponse = {
      temperature: 20,
      humidity: 80,
      description: 'Sunny',
    };

    await expect(getWeatherFromZipcode('12345')).resolves.toEqual(expectedResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });

  it('throws an error when the API call is unsuccessful', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(getWeatherFromZipcode('12345')).rejects.toThrow('Failed to fetch weather data: Network error');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });

  it('throws an error when the response status is not 200', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      status: 404,
      data: {},
    });

    await expect(getWeatherFromZipcode('12345')).rejects.toThrow('Unexpected response code: 404');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
  });
});
```