'use strict'

const assertParam = require('../assert-param')

module.exports = async function downloadBuffer (opts) {
  assertParam(opts, 'file')
  const { file } = opts

  const result = await file.download()
  return result[0]
}
