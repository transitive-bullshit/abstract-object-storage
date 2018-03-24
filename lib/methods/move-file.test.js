'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const mockStorage = require('../mock-storage')
const moveFile = require('./move-file')

describe('move-file', () => {
  const sandbox = sinon.sandbox.create()
  const storage = mockStorage(sandbox)()

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should work', async () => {
    const sourceFile = storage
      .bucket('test-bucket-0')
      .file('test-key-0')

    const destFile = storage
      .bucket('test-bucket-1')
      .file('test-key-1')

    await moveFile({ file: sourceFile }, { file: destFile })
    assert.deepEqual(sourceFile.move.args[0], [ destFile ])
  })
})
