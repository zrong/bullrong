const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')

module.exports = {
  entry: './src/main.js',
  target: ['web', 'es5'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../static'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  optimization: {
    // minify: false
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // new CopyWebpackPlugin({
    //   patterns: [{ from: './src/assets', to: 'assets' }]
    // }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/start.html',
      filename: path.resolve(__dirname, '../layouts/partials/start.html'),
      minify: false
    })
  ]
}
