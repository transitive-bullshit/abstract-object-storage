'use strict'

const assertParam = require('../assert-param')

module.exports = async function uploadBuffer (opts) {
  assertParam(opts, 'buffer')
  assertParam(opts, 'file')

  const {
    buffer,
    metadata,
    file,
    options
  } = opts

  return file.save(buffer, Object.assign({ metadata }, options))
}
