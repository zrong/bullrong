const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')
const staticDir = path.resolve(__dirname, '../static')

module.exports = {
  entry: './src/main.js',
  target: ['web', 'es5'],
  output: {
    filename: 'main.js',
    path: staticDir,
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
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
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: staticDir
        }
      },
      {
        test: require.resolve(path.resolve(__dirname, '../src/vendor/swfobject.js')),
        loader: 'exports-loader'
        // options: {
        //   exports: 'swfobject'
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/start.html',
      filename: path.resolve(__dirname, '../layouts/partials/start.html'),
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}
