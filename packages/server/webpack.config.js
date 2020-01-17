const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },{
      test: [
        /mqtt\.js/,
        /mqtt\/bin\/pub\.js/,
        /mqtt\/bin\/sub\.js/
      ],
      use: 'shebang-loader',
      include: [/node_modules\/mqtt/]
    },{
      test: /\.node$/,
      use: 'node-loader'
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin([
      { from: 'serverconfig.json', to: 'serverconfig.json' }
    ])
  ]
}
