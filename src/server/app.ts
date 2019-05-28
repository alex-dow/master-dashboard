const { resolve } = require('path');
const express = require('express');
const app = express();

const configure_app = require('./routes.ts');

const publicPath = resolve(__dirname, '../../dist');
const staticConf = { maxAge: '1y', etag: false };

const { PORT = 18000 } = process.env;

app.use(express.static(publicPath, staticConf));

configure_app(app);

app.listen(PORT, () => {
  console.log('================================================================');
  console.log('Master Dashboard Server - STARTED');
});