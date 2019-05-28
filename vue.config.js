const fs = require('fs');
const axios = require('axios');
const webpack = require('webpack');

module.exports = {
  lintOnSave: false,

  devServer: {
      host: 'localhost',
      https: {
          key: fs.readFileSync('/home/v0idnull/certs/localhost.key'),
          cert: fs.readFileSync('/home/v0idnull/certs/localhost.crt'),
      },

      proxy: {
        '/api': {
          target: 'http://localhost:18000'
        },
        '/mqtt': {
          target: 'http://localhost:18000',
          ws: true,
          secure: false,
          changeOrigin: false
        }
      }
  },
  configureWebpack: {
    optimization: {
      minimize: false
    }
  },
  assetsDir: 'assets'
};
