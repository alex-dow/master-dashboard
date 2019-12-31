import yargs from 'yargs';
import { getWeather, getNews, weatherPlugins, newsPlugins } from '@retro-dashboard/library';

import { IServerConfig } from './interfaces/config';
import fs from 'fs';
import path from 'path';
import DashboardServer from './dashboardServer';
import * as log4js from 'log4js';

const argv = yargs.options({
  c: { type: 'string', alias: 'config', demandOption: true }
}).argv;

const config: IServerConfig = JSON.parse(fs.readFileSync(argv.c).toString());

log4js.configure({
  appenders: {
    out: { type: 'stdout' }
  },
  categories: {
    default: { appenders: ['out'], level: 'debug' }
  }
});


const logger = log4js.getLogger('main');
logger.info('Starting');

const server = new DashboardServer(config);
server.start();

/*
const DashboardServer = require('./dashboardServer').default;

const es = new DashboardServer();
es.start(10000);
*/