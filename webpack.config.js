const { merge } = require('webpack-merge')

const commConfig = require('./build/common.config')
const developmentConfig = require('./build/development.config')
const productionConfig = require('./build/production.config')

module.exports = (env) => {
  let c = null
  if (env.mode === 'production') {
    c = merge(commConfig, productionConfig)
  } else {
    c = merge(commConfig, developmentConfig)
  }
  return c
}
