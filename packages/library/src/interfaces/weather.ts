export type getWeather = (options: any) => Promise<WeatherReport>;

export interface CurrentWeatherItem {
  temp: number | null,
  feelsLike: number | null,
  conditions: WeatherType | null,
  windSpeed: number | null,
  windGusts: number | null,
  relativeHumidity: number | null
};

export interface WeatherItem {
  dayTemp: number | null,
  dayFeelsLikeTemp: number | null,
  nightTemp: number | null,
  nightFeelsLikeTemp: number | null,
  dayConditions: WeatherType | null,
  nightConditions: WeatherType | null
  dayWindSpeed: number | null,
  dayWindGusts: number | null,
  nightWindSpeed: number | null,
  nightWindGusts: number | null,
  dayRelativeHumidity: number | null,
  nightRelativeHumidity: number | null
};

export interface WeatherWarning {
  priority: WeatherWarningPriority,
  title: string,
  description: string
};

export enum WeatherWarningPriority {
  Low,
  High
}

export enum WeatherType {
  Clear,
  PartlyCloudy,
  Cloudy,
  Overcast,
  LightRain,
  Rain,
  HeavyRain,
  FreezingRain,
  Thunderstorms,
  Flurries,
  LightSnow,
  Snow,
  HeavySnow,
  Blizzard,
  Hail,
  Unknown
}

export interface WeatherReport {
  warnings: Array<WeatherWarning>,
  currentReport: CurrentWeatherItem | null,
  forecast: Array<WeatherItem>
}