import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { IServerConfig } from '@/interfaces/config.ts';
import { getWeather, weatherPlugins } from '@retro-dashboard/library';


@Controller('api')
export class WeatherController {

  private config: IServerConfig;
  private getWeather: getWeather;

  constructor(config: IServerConfig) {
    this.config = config;
    this.getWeather = weatherPlugins[config.weather.plugin];
  }

  @Get('weather')
  private async weather(req: Request, res: Response) {
    try {
      const weatherReport = await this.getWeather(this.config.weather.configuration);

      res.status(200).json(weatherReport);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}