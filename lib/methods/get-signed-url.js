'use strict'

const assertParam = require('../assert-param')

module.exports = async function getSignedUrl (opts) {
  assertParam(opts, 'file')

  const {
    file,
    options
  } = opts

  const TWO_DAYS_FROM_NOW = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const expires = (options && options.expires) || TWO_DAYS_FROM_NOW

  const results = await file.getSignedUrl(Object.assign({
    action: 'read'
  }, Object.assign(options || { }, {
    expires: module.exports.getDate(expires)
  })))

  return results[0]
}

module.exports.getDate = (time) => new Date(time)
