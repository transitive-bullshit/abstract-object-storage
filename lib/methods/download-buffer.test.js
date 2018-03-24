'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const mockStorage = require('../mock-storage')
const downloadBuffer = require('./download-buffer')

describe('download-buffer', () => {
  const sandbox = sinon.sandbox.create()
  const storage = mockStorage(sandbox)()

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should work', async () => {
    const file = storage
      .bucket('test-bucket-0')
      .file('test-key-0')

    assert.deepEqual(await downloadBuffer({ file }), 'download')
    assert.deepEqual(file.download.args[0], [ ])
  })
})
