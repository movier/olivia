var path = require('path')
var webpack = require('webpack')

var config = {
  entry: './src/main.js',
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    /**
     * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本
     */
    alias: {
      vue: 'vue/dist/vue.js'
    },
    extensions: ['*', '.js', '.vue']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  }
}

module.exports = config
