```typescript
import axios from 'axios';
import { getWeatherByZipCode } from './weatherService'; // Assuming the function is exported from weatherService.ts

jest.mock('axios');

describe('getWeatherByZipCode', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    it('should return weather data when API request is successful', async () => {
        const mockResponse = {
            status: 200,
            data: {
                location: { name: 'New York' },
                current: { temp_c: '20', condition: { text: 'Sunny' } }
            }
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await getWeatherByZipCode('10001');

        expect(result).toEqual({
            location: 'New York',
            temperature: '20',
            condition: 'Sunny'
        });
        expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
    });

    it('should throw an error when API request status is not 200', async () => {
        const mockResponse = { status: 500 };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        await expect(getWeatherByZipCode('10001')).rejects.toThrow('Failed to fetch weather data');
        expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
    });

    it('should throw an error when API request fails', async () => {
        const mockError = new Error('Network error');
        mockedAxios.get.mockRejectedValueOnce(mockError);

        await expect(getWeatherByZipCode('10001')).rejects.toThrow('Network error');
        expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=10001');
    });
});
```
Please replace `YOUR_API_KEY` with your actual API key from weatherapi.com.