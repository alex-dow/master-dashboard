/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const spawn = require('child_process').spawn;

const {
  productName
} = require('../package.json');

const OUTPUT_DIR = path.resolve(path.join(__dirname, '..', 'dist'));
const SRC_DIR = path.resolve(path.join(__dirname, '..', 'src'));

const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  name: 'renderer',
  mode: process.env.NODE_ENV,
  devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
  entry: {
    renderer: path.join(__dirname, '../src/index.ts')
  },
  output: {
    path: OUTPUT_DIR,
    filename: 'dist/[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': path.join(__dirname, '../src/'),
    },
    extensions: ['.ts', '.js', '.json', '.vue'],
    modules: [
      'node_modules'
    ]
  },
  // target: 'electron-renderer',
  optimization: {
    minimize: false
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }]
    },{
      test: /\.js$/,
      loader: ['babel-loader'],
      exclude: [
        /node_modules/
      ],
    },{
      test: /\.ts$/,
      use: [{
        loader: 'babel-loader'
      },{
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [
            '\\.vue$'
          ],
          happyPackMode: false
        }
      }]
    },{
      test: /\.s(c|a)ss$/,
      use: [{
        loader: 'vue-style-loader'
      },{
        loader: 'css-loader'
      },{
        loader: 'postcss-loader'
      },{
        loader: 'sass-loader',
      }]
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },{
      test: /\.(png|jpe?g|gif|tif?f|bmp|webp|svg)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        }
      }
    },{
      test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
      use: {
        loader: 'url-loader'
      }
    }]
  },
  node: {
    __dirname: isDevelopment,
    __filename: isDevelopment
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new webpack.ProgressPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxInitialRequests: Infinity,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
}

if (isDevelopment) {
  config.devServer = {
    contentBase: OUTPUT_DIR,
    hot: true,
    clientLogLevel: 'info',
    host: 'localhost',
    port: 3000,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9999'
      },
      '/live': {
        target: 'http://localhost:9999',
        ws: true,
        secure: false,
        changeOrigin: false
      }
    },
    before() {
      console.log('spawning backend');
      spawn(
        'yarn',
        ['serve'],
        { shell: true, env: process.env, stdio: 'inherit', cwd: path.join(__dirname, '..', '..', 'server')}
      )
      .on('close', code => process.exit(0))
      .on('error', spawnError => console.error(spawnError));
    },

  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config;
