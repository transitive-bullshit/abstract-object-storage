'use strict'

const assertParam = require('../assert-param')

module.exports = async function downloadBuffer (opts) {
  assertParam(opts, 'file')
  const { file } = opts

  return file.download()
}
