'use strict'

const Storage = require('@google-cloud/storage')
const filter = require('filter-object')

const assertParam = require('./assert-param')
const normalizeKey = require('./normalize-key')

module.exports = (defaultOptions, options) => {
  const opts = Object.assign({ }, defaultOptions, options)

  const storageKeys = [
    'projectId',
    'keyFilename',
    'email',
    'credentials',
    'client_email',
    'private_key',
    'autoRetry',
    'maxRetries',
    'promise'
  ]

  const storageOpts = filter(opts, storageKeys)
  const storage = opts.storage || module.exports.Storage(storageOpts)

  const url = opts.url
  const urlParts = url && url.match(/^gs:\/\/([^/]+)\/(.+)$/)
  if (urlParts) {
    opts.bucket = urlParts[1]
    opts.key = urlParts[2]
  }

  if (opts.validate !== false) {
    assertParam(opts, 'bucket')
  }

  const bucket = opts.bucket && typeof opts.bucket === 'string'
    ? storage.bucket(opts.bucket)
    : opts.bucket

  const key = opts.key && normalizeKey(opts.key)
  const file = opts.file || (key && bucket && bucket.file(key))

  const contextKeys = ['validate', 'url', 'key', 'bucket'].concat(storageKeys)

  const blacklistKeys = contextKeys.map(key => `!${key}`)
  const remainingOpts = filter(opts, ['*'].concat(blacklistKeys))
  const updatedUrl = url || (opts.key && bucket && `gs://${bucket.name}/${key}`)

  const context = Object.assign({
    url: updatedUrl
  }, filter(opts, contextKeys), remainingOpts, opts.context)

  return Object.assign({ }, remainingOpts, {
    context,
    bucket,
    key,
    file,
    storage,
    url: updatedUrl
  })
}

module.exports.Storage = Storage
