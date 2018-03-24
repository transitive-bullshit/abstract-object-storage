'use strict'

const fs = require('mz/fs')
const mime = require('mime-types')

const assertParam = require('../assert-param')

module.exports = async function uploadFile (opts) {
  assertParam(opts, 'localPath')

  const {
    localPath
  } = opts

  const fileStat = await fs.stat(localPath)

  return this.uploadStream(Object.assign({
    stream: fs.createReadStream(localPath),
    metadata: {
      contentType: mime.lookup(localPath),
      contentLength: fileStat.size
    }
  }, opts))
}
