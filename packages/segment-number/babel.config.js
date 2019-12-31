/* eslint-disable */
module.exports = function(api) {
  api.cache(true);

  const plugins = [
    ['@babel/plugin-proposal-decorators', {
      legacy: true
    }],

    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-transform-runtime', {
        useESModules: false
    }]
  ];


  const presets = [
    '@babel/preset-typescript',
    ['@babel/preset-env', {
        modules: "commonjs",
        //useBuiltIns: 'usage',
        //corejs: 3
    }]
  ];

  return {
    presets,
    plugins,
    sourceType: "unambiguous"
  };
}
