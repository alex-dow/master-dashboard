import { WeatherReport, WeatherType, WeatherItem, CurrentWeatherItem, WeatherWarningPriority, getWeather} from '../../interfaces/weather';
import Axios from 'axios';
import { JSDOM } from 'jsdom';
import { getTagValue, getAttributeValue } from '../../utils';

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


const envCanadaReport: getWeather = async (options: any): Promise<WeatherReport> => {

  let url = options.baseUrl || 'https://dd.weather.gc.ca/citypage_weather/xml/';
  url += options.province + '/' + options.cityId + '_e.xml';

  const req = await Axios.get(url);

  const dom = new JSDOM(req.data, {
    contentType: 'text/xml'
  });

  const doc = dom.window.document;


  const cc = dom.window.document.querySelector('currentConditions');

  let weatherReport: WeatherReport = {
    currentReport: null,
    forecast: new Array(),
    warnings: new Array()
  }



  if (cc) {

    let currentWeather: CurrentWeatherItem;

    const condition = getTagValue(cc, 'condition', 'unknown');
    const temperature  = parseFloat(getTagValue(cc, 'temperature', '0.0'));

    let feelsLike = getTagValue(cc, 'windChill', null);
    if (feelsLike === null) {
      feelsLike = temperature;
    }

    const humidity = parseFloat(getTagValue(cc, 'relativeHumidity', 0));
    const windSpeed = parseFloat(getTagValue(cc, 'wind speed', 0));
    const windGusts = parseFloat(getTagValue(cc, 'wind gust', 0));

    currentWeather = {
      feelsLike: feelsLike,
      relativeHumidity: humidity,
      temp: temperature,
      conditions: (condition in ConditionMap)? ConditionMap[condition] : WeatherType.Unknown,
      windSpeed: windSpeed,
      windGusts: windGusts
    }

    weatherReport.currentReport = currentWeather;
  }

  const forecasts = dom.window.document.querySelectorAll('forecast');

  let counter = 1;

  let forecastItems: Array<WeatherItem> = new Array();

  for (; counter < forecasts.length - 1; ) {

    let forecastItem: WeatherItem;

    const dayForecast = forecasts.item(counter);

    let dayTemp;
    let dayFeelsLikeTemp;

    let nightTemp;
    let nightFeelsLikeTemp;

    let dayConditions;
    let nightConditions;

    let dayWindSpeed;
    let dayWindGusts;
    let nightWindSpeed;
    let nightWindGusts;

    let dayHumidity;
    let nightHumidity;

    dayTemp = parseFloat(getTagValue(dayForecast, 'temperatures temperature[class="high"]', 0));
    dayFeelsLikeTemp = getTagValue(dayForecast, 'windChill calculated', null);
    if (dayFeelsLikeTemp === null) {
      dayFeelsLikeTemp = dayTemp;
    } else {
      dayFeelsLikeTemp = parseFloat(dayFeelsLikeTemp);
    }

    dayConditions = getTagValue(dayForecast, 'abbreviatedForecast textSummary', 'unknown');
    dayWindSpeed = parseFloat(getTagValue(dayForecast, 'winds wind speed', 0));
    dayWindGusts = parseFloat(getTagValue(dayForecast, 'winds wind gust', 0));
    dayHumidity  = parseFloat(getTagValue(dayForecast, 'relativeHumidity', 0));

    counter++;
    const nightForecast = forecasts.item(counter);

    nightTemp = parseFloat(getTagValue(nightForecast, 'temperatures temperature[class="low"]', 0));
    nightFeelsLikeTemp = getTagValue(nightForecast, 'windChill calculated', null);
    if (nightFeelsLikeTemp === null) {
      nightFeelsLikeTemp = nightTemp;
    } else {
      nightFeelsLikeTemp = parseFloat(nightFeelsLikeTemp);
    }

    nightConditions = getTagValue(nightForecast, 'abbreviatedForecast textSummary', 'unknown');
    nightWindSpeed = parseFloat(getTagValue(nightForecast, 'winds wind speed', 0));
    nightWindGusts = parseFloat(getTagValue(nightForecast, 'winds wind gust', 0));
    nightHumidity  = parseFloat(getTagValue(nightForecast, 'relativeHumidity', 0));

    forecastItem = {
      dayConditions: (dayConditions in ConditionMap)? ConditionMap[dayConditions] : WeatherType.Unknown,
      dayFeelsLikeTemp: dayFeelsLikeTemp,
      dayRelativeHumidity: dayHumidity,
      dayTemp: dayTemp,
      dayWindGusts: dayWindGusts,
      dayWindSpeed: dayWindSpeed,
      nightConditions: (nightConditions in ConditionMap)? ConditionMap[nightConditions] : WeatherType.Unknown,
      nightFeelsLikeTemp: nightFeelsLikeTemp,
      nightRelativeHumidity: nightHumidity,
      nightTemp: nightTemp,
      nightWindGusts: nightWindGusts,
      nightWindSpeed: nightWindSpeed
    }

    weatherReport.forecast.push(forecastItem);
    counter++;
  }

  const warnings = doc.querySelectorAll('warnings event');

  warnings.forEach((warning) => {
    weatherReport.warnings.push({
      description: '',
      priority: WeatherWarningPriority.High,
      title: getAttributeValue(warning, null, 'description', 'Unknown').trim()
    });
  });

  return weatherReport;
}

export default envCanadaReport;

/*
envcanada({
  baseUrl: null,
  province: EnvCanadaProvince.QC,
  cityId: 's0000635'
})
.then((report) => {
  console.log(report);
})
.catch((err) => {
  console.error(err);
});
*/