const path = require('path')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge(baseConfig, {
  output: {
    path: path.join(__dirname, 'dev-build'),
    // 指定 publicPath 避免热更新配置请求失败
    publicPath: `http://localhost:34687/`,
  },
  // stats: 'verbose',
  devServer: {
    contentBase: path.join(__dirname, 'dev-build'),
    host: '0.0.0.0',
    hot: true,
    overlay: true,
    port: 34687,
    // stats: 'errors-only',
    // stats: 'verbose',
    watchOptions: {
      aggregateTimeout: 600,
      poll: 600,
    },
    writeToDisk: true,
    // 子核放开跨域通讯
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
})
