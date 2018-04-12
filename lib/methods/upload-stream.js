'use strict'

const pipe = require('pump-promise')
const assertParam = require('../assert-param')

module.exports = async function uploadStream (opts) {
  assertParam(opts, 'file')
  assertParam(opts, 'stream')

  const {
    file,
    metadata,
    options,
    stream
  } = opts

  const dest = file.createWriteStream(Object.assign({ metadata }, options))
  return pipe(stream, dest)
}
