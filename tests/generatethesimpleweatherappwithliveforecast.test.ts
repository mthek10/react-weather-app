```typescript
import axios from 'axios';
import { getWeatherForecast } from './weather';

jest.mock('axios');

describe('getWeatherForecast', () => {
  it('fetches weather forecast successfully', async () => {
    const data = {
      location: {
        name: 'San Francisco',
      },
      current: {
        condition: {
          text: 'Sunny',
        },
        temp_c: 20,
      },
    };

    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data,
    });

    const expectedResponse = {
      location: data.location.name,
      description: data.current.condition.text,
      temperature: data.current.temp_c,
    };

    await expect(getWeatherForecast('94103')).resolves.toEqual(expectedResponse);
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=94103');
  });

  it('throws an error when the API request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getWeatherForecast('94103')).rejects.toThrow('Failed to fetch weather forecast');
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=94103');
  });

  it('throws an error when the response status is not 200', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 404,
      data: {},
    });

    await expect(getWeatherForecast('94103')).rejects.toThrow('Failed to fetch weather forecast');
    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=94103');
  });
});
```
Please replace `YOUR_API_KEY` with your actual API key from Weather API.