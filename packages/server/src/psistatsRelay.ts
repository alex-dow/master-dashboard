import { IServerPsistatsMqttConfig } from './interfaces/config';
import * as mqtt from 'mqtt';
import * as WebSocket from 'websocket';
import { WebSocketServer } from '@/websocketServer';

const clients: Array<WebSocket.connection> = new Array();

let mqttClient: mqtt.Client;

const subscriptions: Array<number> = new Array();

export function addWsClient(ws: WebSocket.connection) {
  clients.push(ws);
}

export function start(config: IServerPsistatsMqttConfig, wss:WebSocketServer): Promise<any> {

  const brokerUrl = 'mqtt://' + config.hostname + ':' + config.port;

  mqttClient = mqtt.connect(brokerUrl, {
    clientId: 'master-dashboard',
    username: config.username,
    password: config.password
  });

  return new Promise((resolve, reject) => {
    mqttClient.on('connect', () => {
      mqttClient.subscribe('psistats/+/reports/+', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      const host = topic.split('/')[1];
      const msg = '{"topic": "psistats", "msg": {"hostname": "' + host + '", "data": ' + message.toString() + "}}";
      wss.sendToTopic('psistats', msg);
    });
  });
}

export function stop() {
  if (mqttClient) {
    mqttClient.end();
  }
}
