import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { getNews, newsPlugins } from '@retro-dashboard/library';

import { IServerConfig } from '@/interfaces/config.ts';

import { getLogger } from 'log4js';

const LOGGER = getLogger('newsController');

@Controller('api')
export class NewsController {

  private config: IServerConfig;
  private getNews: getNews;

  constructor(config: IServerConfig) {
    this.config = config;
    this.getNews = newsPlugins[this.config.news.plugin];
  }

  @Get('news')
  private async get(req: Request, res: Response) {

    try {
      LOGGER.info('Fetching RSS feeds');
      const items = await this.getNews(this.config.news.configuration);

      res.status(200).json(items);
    } catch (err) {
      LOGGER.error(err);
      res.status(500).send(err);
    }

  }
}