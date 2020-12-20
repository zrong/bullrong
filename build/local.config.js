const developmentConfig = require('./development.config')
const { merge } = require('webpack-merge')

module.exports = merge(developmentConfig, { output: { publicPath: '/' } })
