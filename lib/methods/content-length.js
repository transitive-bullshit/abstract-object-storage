'use strict'

const assertParam = require('../assert-param')

module.exports = async function contentLength (opts) {
  assertParam(opts, 'file')
  const { file } = opts

  const [ metadata ] = await file.getMetadata().catch((err) => {
    if (err.code === 404) return [{ size: 0 }]
    throw err
  })

  return parseInt(metadata.size, 10)
}
