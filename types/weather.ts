export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherData {
  current: CurrentWeatherResponse;
  forecast: ForecastResponse;
}

// Air Quality Types
export interface AirQualityComponents {
  co: number;      // Carbon monoxide, μg/m3
  no: number;      // Nitrogen monoxide, μg/m3
  no2: number;     // Nitrogen dioxide, μg/m3
  o3: number;      // Ozone, μg/m3
  so2: number;     // Sulphur dioxide, μg/m3
  pm2_5: number;   // Fine particles matter, μg/m3
  pm10: number;    // Coarse particulate matter, μg/m3
  nh3: number;     // Ammonia, μg/m3
}

export interface AirQualityData {
  dt: number;
  main: {
    aqi: number;   // Air Quality Index: 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
  };
  components: AirQualityComponents;
}

export interface AirQualityResponse {
  coord: {
    lon: number;
    lat: number;
  };
  list: AirQualityData[];
}
