import * as log4js from 'log4js';
import * as http from 'http';
import * as https from 'https';
import * as WebSocket from 'websocket';

const LOGGER = log4js.getLogger('websocket-server');

export class WebSocketServer {

  private wss: WebSocket.server;
  private connectionCounter: number = 0;
  private connections: Map<number, WebSocket.connection> = new Map();
  private subscriptions: Map<string, Array<number>> = new Map();

  constructor(server: http.Server | https.Server) {
    this.wss = new WebSocket.server({
      httpServer: server,
      autoAcceptConnections: false
    });

    this.wss.on('request', (request) => {
      LOGGER.debug('Incoming request');


      if (request.resource === '/live') {
        LOGGER.debug('Request accepted');
        request.accept();
      } else {
        LOGGER.debug('Request rejected because resource wasn\'t "/live"');
        request.reject();
      }
    });

    this.wss.on('connect', (ws) => {
      const clientId = this.connections.keys.length;

      this.connections.set(clientId, ws);

      ws.on('close', () => {
        LOGGER.debug('Connection closed for client ' + clientId);
        this.connections.delete(clientId);
      });

      ws.on('message', (msg) => {
        this.onMessage(clientId, msg);
      });

      this.send('{"type": "clientId", "msg": ' + clientId + '}', clientId);
    });
  }

  private onMessage(clientId: number, msg: WebSocket.IMessage) {
    LOGGER.debug('Message from ' + clientId + ': ' + msg.utf8Data);

    if (msg.utf8Data?.startsWith('subscribe')) {
      this.subscribe(clientId, msg.utf8Data.split(' ')[1]);
    } else if (msg.utf8Data?.startsWith('unsubscribe')) {
      this.unsubscribe(clientId, msg.utf8Data.split(' ')[1]);
    }
  }

  sendToTopic(topic: string, msg: string) {
    if (!this.subscriptions.has(topic)) {
      return;
    }

    this.subscriptions.get(topic)?.forEach((clientId) => {
      this.send(msg, clientId);
    });
  }

  subscribe(clientId: number, subscription: string) {
    if (!this.subscriptions.has(subscription)) {
      this.subscriptions.set(subscription, new Array());
    }

    const subs = this.subscriptions.get(subscription);

    if (subs?.indexOf(clientId) === -1) {
      subs.push(clientId);
      this.subscriptions.set(subscription, subs);
    }
  }

  unsubscribe(clientId: number, subscription: string) {
    if (!this.subscriptions.has(subscription)) {
      return;
    }

    const subs = this.subscriptions.get(subscription);
    if (subs) {
      let idx = subs.indexOf(clientId);
      if (idx > -1) {
        subs.splice(idx,1);
        this.subscriptions.set(subscription, subs);
      }
    }
  }

  sendObj(msg: any, clientId: number | null) {
    if (clientId === null) {
      this.connections.forEach((conn) => {
        conn.send(JSON.stringify(msg));
      });
    } else {
      if (!this.connections.has(clientId)) {
        LOGGER.warn('Client id ' + clientId + ' is invalid');
      } else {
        this.connections.get(clientId)?.send(JSON.stringify(msg));
      }
    }
  }

  send(msg: string, clientId: number | null) {
    if (clientId === null) {
      this.connections.forEach((conn) => {
        conn.send(msg);
      });
    } else {
      if (!this.connections.has(clientId)) {
        LOGGER.warn('Client id ' + clientId + 'is invalid');
      } else {
        this.connections.get(clientId)?.send(msg);
      }
    }
  }
}