'use strict'

module.exports = (key) => {
  return key.startsWith('/') ? key.slice(1) : key
}
