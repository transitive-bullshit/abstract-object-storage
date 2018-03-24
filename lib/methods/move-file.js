'use strict'

const assertParam = require('../assert-param')

module.exports = async function moveFile (source, dest) {
  assertParam(source, 'file')
  assertParam(dest, 'file')

  const {
    file: sourceFile
  } = source

  const {
    file: destFile
  } = dest

  return sourceFile.move(destFile)
}
