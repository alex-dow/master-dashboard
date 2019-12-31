export interface IServerPsistatsMqttConfig {
  hostname: string,
  port: number,
  username?: string,
  password?: string
}

export interface IServerPsistatsConfig {
  mqtt: IServerPsistatsMqttConfig
}

export interface IServerConfigWeather {
  plugin: string,
  configuration: any
};

export interface IServerConfigNews {
  plugin: string,
  configuration: any
};


export interface IServerConfig {
  port: number,
  psistats: IServerPsistatsConfig,
  weather: IServerConfigWeather,
  news: IServerConfigNews;
}