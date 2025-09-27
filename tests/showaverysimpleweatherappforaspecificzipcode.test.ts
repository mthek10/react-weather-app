```typescript
import { WeatherService, WeatherPopup } from './weather';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ weather: 'sunny' }),
  })
);

describe('WeatherService', () => {
  let weatherService: WeatherService;

  beforeEach(() => {
    weatherService = new WeatherService('http://api.openweathermap.org/data/2.5/weather', 'your_api_key');
  });

  it('should fetch weather data successfully', async () => {
    const data = await weatherService.getWeatherByZipCode('12345');
    expect(data).toEqual({ success: true, data: { weather: 'sunny' } });
  });

  it('should handle network errors', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));
    const data = await weatherService.getWeatherByZipCode('12345');
    expect(data).toEqual({ success: false, message: 'Network response was not ok' });
  });
});

describe('WeatherPopup', () => {
  let weatherService: WeatherService;
  let weatherPopup: WeatherPopup;

  beforeEach(() => {
    weatherService = new WeatherService('http://api.openweathermap.org/data/2.5/weather', 'your_api_key');
    weatherPopup = new WeatherPopup(weatherService);
    jest.spyOn(window, 'prompt').mockImplementation(() => '12345');
  });

  it('should show weather data successfully', async () => {
    const data = await weatherPopup.show();
    expect(data).toEqual({ success: true, data: { weather: 'sunny' } });
  });

  it('should handle no zip code provided', async () => {
    (window.prompt as jest.Mock).mockImplementationOnce(() => '');
    const data = await weatherPopup.show();
    expect(data).toEqual({ success: false, message: 'No zip code provided' });
  });
});
```
This test code mocks the global fetch function and window.prompt function to simulate different scenarios. It tests both the WeatherService and WeatherPopup classes, checking that they handle both success and error cases correctly.