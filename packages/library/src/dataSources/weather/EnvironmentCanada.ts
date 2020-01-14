import { WeatherReport, WeatherType, WeatherItem, CurrentWeatherItem, WeatherWarningPriority, getWeather} from '../../interfaces/weather';
import Axios from 'axios';
import * as parser from 'fast-xml-parser';

export const ConditionMap: { [key: string]: WeatherType } = {
  'Mainly sunny': WeatherType.PartlyCloudy,
  'A few clouds': WeatherType.PartlyCloudy,
  'A mix of sun and cloud': WeatherType.PartlyCloudy,
  'Increasing cloudiness': WeatherType.PartlyCloudy,
  'Cloudy periods': WeatherType.Cloudy,
  'Cloudy': WeatherType.Cloudy,
  'Sunny': WeatherType.Clear,
  'Clear': WeatherType.Clear,
  'Mainly Clear': WeatherType.Clear,
  'Rain': WeatherType.Rain,
  'Chance of showers': WeatherType.LightRain,
  'Periods of rain': WeatherType.LightRain,
  'Chance of flurries': WeatherType.Flurries,
  'Snow': WeatherType.Snow,
  'Light snow': WeatherType.LightSnow,
  'Chance of light snow': WeatherType.LightSnow,
  'A few flurries': WeatherType.Flurries,
  'Clearing': WeatherType.PartlyCloudy,
  'Blowing snow': WeatherType.LightSnow
};


export enum EnvCanadaProvince {
  AB = "AB",
  BC = "BC",
  HEF = "HEF",
  MB = "MB",
  NB = "NB",
  NL = "NL",
  NS = "NS",
  NT = "NT",
  NU = "NU",
  ON = "ON",
  PE = "PE",
  QC = "QC",
  SK = "SK",
  YT =  "YT"
}

export interface EnvCanadaConfig {
  baseUrl: string | null,
  province: EnvCanadaProvince,
  cityId: string
};

function getCondition(condition: string): WeatherType {
  if (condition in ConditionMap) {
    return ConditionMap[condition];
  } else {
    return WeatherType.Unknown;
  }
}

function getWindChill(forecast: any): number {

  if (forecast.hasOwnProperty('windChill') && forecast.windChill != '')  {

    if (Array.isArray(forecast.windChill.calculated)) {
      return parseFloat(forecast.windChill.calculated[0]);
    } else {
      return parseFloat(forecast.windChill.calculated);
    }
  } else {
    return parseFloat(forecast.temperatures.temperature);
  }
}

function getWindSpeed(forecast: any): number {
  if (forecast.winds != '') {
    if (Array.isArray(forecast.winds.wind)) {
      return parseFloat(forecast.winds.wind.pop().speed);
    } else {
      return parseFloat(forecast.winds.wind.speed);
    }
  } else {
    return 0;
  }
}

function getWindGusts(forecast: any): number {
  if (forecast.winds != '') {
    if (Array.isArray(forecast.winds.wind)) {
      return parseFloat(forecast.winds.wind.pop().gust);
    } else {
      return parseFloat(forecast.winds.wind.gust);
    }
  } else {
    return 0;
  }
}

function getForecastItem(forecasts: Array<any>, idx: number): WeatherItem {

  const dayf = forecasts[idx];
  const nightf = forecasts[idx + 1];

  console.log(dayf.winds);

  const item: WeatherItem = {
    dayConditions: getCondition(dayf.abbreviatedForecast.textSummary),
    dayFeelsLikeTemp: getWindChill(dayf),
    dayRelativeHumidity: dayf.relativeHumidity,
    dayTemp: dayf.temperatures.temperature,
    dayWindGusts: getWindGusts(dayf),
    dayWindSpeed: getWindSpeed(dayf),
    nightConditions: getCondition(nightf.abbreviatedForecast.textSummary),
    nightFeelsLikeTemp: getWindChill(nightf),
    nightRelativeHumidity: nightf.relativeHumidity,
    nightTemp: nightf.temperatures.temperature,
    nightWindGusts: getWindGusts(nightf),
    nightWindSpeed: getWindSpeed(nightf)
  };

  return item;
}


const envCanadaReport: getWeather = async (options: any): Promise<WeatherReport> => {

  let url = options.baseUrl || 'https://dd.weather.gc.ca/citypage_weather/xml/';
  url += options.province + '/' + options.cityId + '_e.xml';

  const req = await Axios.get(url);

  const siteData = parser.parse(req.data).siteData;
  const cc = siteData.currentConditions;
  const forecast = siteData.forecastGroup.forecast;

  let weatherReport: WeatherReport = {
    currentReport: {
      conditions: (cc.condition in ConditionMap)? ConditionMap[cc.condition] : WeatherType.Unknown,
      feelsLike: cc.hasOwnProperty('windChill') ? cc.windChill : cc.temperature,
      relativeHumidity: cc.relativeHumidity,
      windGusts: cc.wind.gust == '' ? 0 : cc.wind.gust,
      windSpeed: cc.wind.speed == '' ? 0 : cc.wind.speed,
      temp: cc.temperature
    },
    forecast: [
      getForecastItem(forecast, 1),
      getForecastItem(forecast, 3),
      getForecastItem(forecast, 5)
    ],
    warnings: new Array()
  }

  return weatherReport;
}

export default envCanadaReport;

/*
envCanadaReport({
  baseUrl: null,
  province: EnvCanadaProvince.QC,
  cityId: 's0000635'
  //province: EnvCanadaProvince.NU,
  //cityId: 's0000412'
})
.then((report) => {
  console.log(report);
})
.catch((err) => {
  console.error(err);
});
*/