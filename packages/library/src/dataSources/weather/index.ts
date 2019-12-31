import { default as EnvironmentCanada } from './EnvironmentCanada';
import { getWeather } from '../../interfaces/weather';
export { default as EnvironmentCanada } from './EnvironmentCanada';

export const weatherPlugins: { [key: string]: getWeather } = {
  EnvironmentCanada
};

// export default plugins;