```typescript
import axios from 'axios';
import { getWeatherByZipCode } from './weather'; // assuming the function is exported from a file named weather.ts

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getWeatherByZipCode', () => {
    beforeEach(() => {
        mockedAxios.get.mockClear();
    });

    it('should throw an error if the zip code is invalid', async () => {
        await expect(getWeatherByZipCode('123')).rejects.toThrow('Invalid zip code.');
        await expect(getWeatherByZipCode('123456')).rejects.toThrow('Invalid zip code.');
        await expect(getWeatherByZipCode('abcde')).rejects.toThrow('Invalid zip code.');
        expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should throw an error if the request fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

        await expect(getWeatherByZipCode('12345')).rejects.toThrow('Failed to fetch weather data.');
        expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
    });

    it('should return the weather data if the request is successful', async () => {
        const mockResponse = {
            data: {
                location: { name: 'Test City' },
                current: { temp_f: 75, condition: { text: 'Sunny' } }
            }
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await getWeatherByZipCode('12345');

        expect(result).toEqual({
            location: 'Test City',
            temperature: 75,
            condition: 'Sunny'
        });
        expect(mockedAxios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=12345');
    });
});
```