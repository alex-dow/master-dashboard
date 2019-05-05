const fs = require('fs');
const axios = require('axios');

module.exports = {
  lintOnSave: false,

  pwa: {
    name: 'Psikon Master Control',
    themeColor: '#05532B'
  },

  devServer: {
      host: '0.0.0.0',
      https: {
          key: fs.readFileSync('/home/v0idnull/certs/localhost.key'),
          cert: fs.readFileSync('/home/v0idnull/certs/localhost.crt'),
      },

      proxy: {
        '/rss/news/cbc/montreal': {
          target: 'https://www.cbc.ca',
          pathRewrite: {
            '^/rss/news/cbc/montreal': '/cmlink/rss-canada-montreal'
          }
        },
        '/rss/weather/envcanada/montreal': {
          target: 'https://weather.gc.ca',
          pathRewrite: {
            '^/rss/weather/envcanada/montreal': '/rss/city/qc-147_e.xml'
          }
        }
      }
  },
  assetsDir: 'assets'
};
