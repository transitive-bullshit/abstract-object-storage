'use strict'

const readdirSync = require('fs').readdirSync
const toCamelCase = require('to-camel-case')

readdirSync(__dirname)
  .filter((filename) => filename.endsWith('.js') && !filename.endsWith('.test.js') && filename !== 'index.js')
  .forEach((filename) => {
    const moduleName = toCamelCase(filename.replace('.js', ''))
    module.exports[moduleName] = require(`${__dirname}/${filename}`)
  })
