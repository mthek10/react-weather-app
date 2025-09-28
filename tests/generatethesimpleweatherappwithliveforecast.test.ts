```typescript
import axios from 'axios';
import { fetchWeatherForecast } from './weather'; // Assuming the function is exported from 'weather.ts'

jest.mock('axios');

describe('fetchWeatherForecast', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    it('should return weather forecast for a given zip code', async () => {
        const data = {
            location: {
                name: 'New York',
            },
            forecast: {
                forecastday: [
                    {
                        day: {
                            condition: {
                                text: 'Sunny',
                            },
                        },
                    },
                ],
            },
        };
        mockedAxios.get.mockResolvedValueOnce({ status: 200, data });

        const result = await fetchWeatherForecast('10001');

        expect(result).toEqual({
            location: 'New York',
            forecast: 'Sunny',
        });
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=10001');
    });

    it('should throw an error when the response status is not 200', async () => {
        mockedAxios.get.mockResolvedValueOnce({ status: 404 });

        await expect(fetchWeatherForecast('10001')).rejects.toThrow('Unexpected response code: 404');
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=10001');
    });

    it('should throw an error when the request fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchWeatherForecast('10001')).rejects.toThrow('Failed to fetch weather forecast: Network error');
        expect(mockedAxios.get).toHaveBeenCalledWith('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=10001');
    });
});
```

Please replace `YOUR_API_KEY` with your actual API key from the weather API.