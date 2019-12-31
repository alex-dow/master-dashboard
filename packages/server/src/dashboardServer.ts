import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { IServerConfig } from './interfaces/config';
import http from 'http';
import * as log4js from 'log4js';
import * as psistatsClient from '@/psistatsRelay';
import * as express from 'express';

import { WebSocketServer } from '@/websocketServer';

const LOGGER = log4js.getLogger('server');

export default class DashboardServer extends Server {

  private cwd: string;
  private config: IServerConfig;
  private wss?: WebSocketServer;

  constructor(config: IServerConfig) {
    super(true);
    this.app.use(bodyParser.json());
    this.cwd = process.cwd();
    this.config = config;

  }

  public start(): void {
    this.setupControllers();

    const server = http.createServer(this.app);
    server.listen(this.config.port, () => {
      LOGGER.info('Server started @ http://localhost:' + this.config.port);
    });

    this.wss = new WebSocketServer(server);

    psistatsClient.start(this.config.psistats.mqtt, this.wss);

    this.app.use('/dashboard', express.static('dashboard'));
  }

  private setupControllers(): void {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
        const controller = (controllers as any)[name];
        if (typeof controller === 'function') {
            controllerInstances.push(new controller(this.config));
        }
    }
    super.addControllers(controllerInstances);
  }
}
