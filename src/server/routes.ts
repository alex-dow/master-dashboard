import * as express from 'express';
const proxy   = require('http-proxy-middleware');

function configure_app(app: express.Application) {

  app.use('/api/news/local', proxy({
    changeOrigin: true,
    target: 'https://www.cbc.ca',
    pathRewrite: {
        '^/api/news/local': '/cmlink/rss-canada-montreal'
    }
}));

app.use('/api/news/national', proxy({
  changeOrigin: true,
  target: 'https://www.cbc.ca',
  pathRewrite: {
    '^/api/news/national': '/cmlink/rss-canada'
  }
}));

app.use('/api/news/international', proxy({
  changeOrigin: true,
  target: 'https://www.cbc.ca',
  pathRewrite: {
    '^/api/news/international': '/cmlink/rss-world'
  }
}));

app.use('/api/weather', proxy({
  changeOrigin: true,
  target: 'https://weather.gc.ca',
  pathRewrite: {
      '^/api/weather': '/rss/city/qc-147_e.xml'
  }
}));

  app.use('/mqtt', proxy({
    target: 'wss://psikon.com:8884',
    pathRewrite: {
      '^/mqtt': '/'
    },
    ws: true,
    secure: false,
    changeOrigin: true
  }));
}

module.exports = configure_app;