'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const fs = require('fs')
const mockStorage = require('../mock-storage')
const uploadStream = require('./upload-stream')

describe('upload-stream', () => {
  const sandbox = sinon.sandbox.create()
  const storage = mockStorage(sandbox)()

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should work', async () => {
    const file = storage
      .bucket('test-bucket-0')
      .file('test-key-0')

    const stream = fs.createReadStream('package.json')
    await uploadStream({
      stream,
      file,
      metadata: {
        contentType: 'application/json'
      },
      options: {
        public: true
      }
    })

    assert.deepEqual(file.createWriteStream.args[0][0], {
      metadata: {
        contentType: 'application/json'
      },
      public: true
    })
  })
})
