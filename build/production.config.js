const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  output: {
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ]
  }
}
