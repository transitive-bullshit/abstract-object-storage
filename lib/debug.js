'use strict'

const debug = require('debug')
const info = require('../package')

module.exports = (name) => debug(`${info.name}:${name}`)
