const { merge } = require('webpack-merge')

const commConfig = require('./build/common.config')
const developmentConfig = require('./build/development.config')
const productionConfig = require('./build/production.config')
const localConfig = require('./build/local.config')

module.exports = (env) => {
  let c = null
  if (env.mode === 'production') {
    c = merge(commConfig, productionConfig)
  } else if (env.mode === 'development') {
    c = merge(commConfig, developmentConfig)
  } else {
    c = merge(commConfig, localConfig)
  }
  return c
}
