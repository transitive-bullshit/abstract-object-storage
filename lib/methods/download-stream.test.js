'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const mockStorage = require('../mock-storage')
const downloadStream = require('./download-stream')

describe('download-stream', () => {
  const sandbox = sinon.sandbox.create()
  const storage = mockStorage(sandbox)()

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should work', async () => {
    const file = storage
      .bucket('test-bucket-0')
      .file('test-key-0')

    assert.deepEqual(await downloadStream({ file }), 'read-stream')
    assert.deepEqual(file.createReadStream.args[0], [ undefined ])
  })
})
