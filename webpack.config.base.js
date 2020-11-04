const path = require('path')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/app.jsx'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // TODO: 使用 babel.rc 指定当前目录 node_modules 路径为所有 presets/plugins 的默认 node_modules 路径
              presets: [
                require.resolve('babel-preset-react'),
                [
                  require.resolve('babel-preset-es2015'),
                  {
                    modules: false
                  }
                ],
                require.resolve('babel-preset-stage-0'),
              ],
              // TODO:  开发环境配置 webpackMerge 无法合并 babel-preset-react-hmre，也许需要在 prod 配置中想办法去除 babel-preset-react-hmre
              env: {
                development: {
                  presets: [
                    require.resolve('babel-preset-react-hmre')
                  ]
                }
              },
              plugins: [
                require.resolve("babel-plugin-transform-runtime"),
                require.resolve("babel-plugin-transform-decorators-legacy"),
                require.resolve("babel-plugin-lodash"),
                [
                  require.resolve("babel-plugin-import"),
                  [{
                    libraryName: "antd",
                    libraryDirectory: "lib",
                    style: "css"
                  }]
                ]
              ]
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        // TODO:  antd 的问题后续排查，目前先这么解决
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../../odin-common'),
          path.resolve(__dirname, 'node_modules/antd'),
          path.resolve(__dirname, 'node_modules/font-awesome'),
          path.resolve(__dirname, 'node_modules/viewerjs')
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)/i,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            name: 'img_[hash:8].[ext]',
          },
        }],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../../odin-common'),
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)/,
        use: ['file-loader'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/font-awesome'),
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  resolve: {
    // 指定当前目录 node_modules 路径为所有文件的的默认 node_modules 路径
    modules: [path.resolve(__dirname, './node_modules')],
    symlinks: true,
    alias: {
      '@': path.resolve('src'),
      '~':path.resolve('../../odin-common')
    },
    extensions:['.js','.jsx','.css'],
  },
}
