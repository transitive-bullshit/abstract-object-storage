'use strict'

const assertParam = require('../assert-param')

module.exports = async function downloadFile (opts) {
  assertParam(opts, 'localPath')
  assertParam(opts, 'file')

  const {
    localPath,
    file
  } = opts

  return file.download({ destination: localPath })
}
