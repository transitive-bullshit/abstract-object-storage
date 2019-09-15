'use strict'

const assert = require('chai').assert
const through2 = require('through2')

module.exports = (sandbox) => {
  function getStorage (opts) {
    return {
      bucket: sandbox.stub().callsFake(getBucket)
    }
  }

  function getBucket (name) {
    assert.ok(name)

    return {
      file: sandbox.stub().callsFake(getFile),
      name
    }
  }

  function getFile (opts) {
    assert.ok(opts)

    return {
      createReadStream: sandbox.stub().callsFake(() => 'read-stream'),
      createWriteStream: sandbox.stub().callsFake(() => through2()),
      copy: sandbox.stub().callsFake(async () => 'copy'),
      download: sandbox.stub().callsFake(async () => ['download']),
      exists: sandbox.stub().callsFake(async () => 'exists'),
      getSignedUrl: sandbox.stub().callsFake(async () => ['signed-url']),
      getMetadata: sandbox.stub().callsFake(async () => [{ size: '-1' }]),
      move: sandbox.stub().callsFake(async () => 'move'),
      save: sandbox.stub().callsFake(async () => 'save')
    }
  }

  return getStorage
}
