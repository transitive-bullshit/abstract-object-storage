'use strict'

const assertParam = require('../assert-param')

module.exports = function downloadStream (opts) {
  assertParam(opts, 'file')
  const {
    file,
    options
  } = opts

  return file.createReadStream(options)
}
