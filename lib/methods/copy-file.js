'use strict'

const assertParam = require('../assert-param')

module.exports = async function copyFile (source, dest) {
  assertParam(source, 'file')
  assertParam(dest, 'file')

  const {
    file: sourceFile
  } = source

  const {
    file: destFile
  } = dest

  return sourceFile.copy(destFile)
}
