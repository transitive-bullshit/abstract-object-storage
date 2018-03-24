'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const mockStorage = require('../mock-storage')
const getSignedUrl = require('./get-signed-url')

describe('get-signed-url', () => {
  const sandbox = sinon.sandbox.create()
  const storage = mockStorage(sandbox)()

  sandbox.stub(getSignedUrl, 'getDate')

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should work', async () => {
    getSignedUrl.getDate.callsFake(() => 'test-date-0')

    const file = storage
      .bucket('test-bucket-0')
      .file('test-key-0')

    assert.deepEqual(await getSignedUrl({ file }), 'signed-url')
    assert.deepEqual(file.getSignedUrl.args[0], [{
      expires: 'test-date-0',
      action: 'read'
    }])
  })
})
