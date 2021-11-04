'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:8090"',
  SOURCE_BASE_URL: '"http://localhost:8090"'
}