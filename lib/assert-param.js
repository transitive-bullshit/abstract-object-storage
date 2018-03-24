'use strict'

module.exports = (opts, param) => {
  if (!opts || !(param in opts)) {
    throw new Error(`missing required param "${param}"`)
  }
}
