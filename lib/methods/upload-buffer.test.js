'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const mockStorage = require('../mock-storage')
const uploadBuffer = require('./upload-buffer')

describe('upload-buffer', () => {
  const sandbox = sinon.sandbox.create()
  const storage = mockStorage(sandbox)()

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should work', async () => {
    const file = storage
      .bucket('test-bucket-0')
      .file('test-key-0')

    const buffer = Buffer.from('test123')
    await uploadBuffer({
      buffer,
      file,
      metadata: {
        contentType: 'image/jpg',
        contentLength: 1024
      },
      options: {
        public: true
      }
    })

    assert.deepEqual(file.save.args[0][0], buffer)
    assert.deepEqual(file.save.args[0][1], {
      metadata: {
        contentType: 'image/jpg',
        contentLength: 1024
      },
      public: true
    })
  })
})
