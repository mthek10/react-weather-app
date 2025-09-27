```typescript
/**
 * WeatherService class to fetch weather data
 */
class WeatherService {
  private apiEndpoint: string;
  private apiKey: string;

  constructor(apiEndpoint: string, apiKey: string) {
    this.apiEndpoint = apiEndpoint;
    this.apiKey = apiKey;
  }

  /**
   * Fetch weather data for a specific zip code
   * @param {string} zipCode - The zip code to fetch weather data for
   * @returns {Promise<any>} The weather data
   */
  async getWeatherByZipCode(zipCode: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiEndpoint}?zip=${zipCode}&appid=${this.apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const weatherData = await response.json();
      return {
        success: true,
        data: weatherData
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}

/**
 * Popup to get user's zip code and show weather data
 */
class WeatherPopup {
  private weatherService: WeatherService;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  /**
   * Show popup to get user's zip code and fetch weather data
   * @returns {Promise<any>} The weather data
   */
  async show(): Promise<any> {
    const zipCode = window.prompt('Please enter your zip code:');
    if (!zipCode) {
      return {
        success: false,
        message: 'No zip code provided'
      };
    }
    return this.weatherService.getWeatherByZipCode(zipCode);
  }
}

// Usage
const weatherService = new WeatherService('http://api.openweathermap.org/data/2.5/weather', 'your_api_key');
const weatherPopup = new WeatherPopup(weatherService);
weatherPopup.show().then(console.log);
```
Please note that this code is for demonstration purposes and might not work in a real-world application without modifications. For example, the OpenWeatherMap API requires an API key which is not included in this code.