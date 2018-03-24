'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const mockStorage = require('./lib/mock-storage')
const ObjectStorage = require('.')

describe('object-storage', () => {
  const sandbox = sinon.sandbox.create()

  before(() => {
    sandbox.stub(ObjectStorage.resolveOptions, 'Storage')
  })

  beforeEach(() => {
    ObjectStorage.resolveOptions.Storage.callsFake(mockStorage(sandbox))
  })

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should resolve bucket, key correctly', async () => {
    const res = ObjectStorage.defaults({
      projectId: 'test-project-id-0',
      bucket: 'test-bucket-0',
      key: 'test-key-0',
      extraFlag: { deep: true }
    })

    assert.deepEqual(res.context.bucket, 'test-bucket-0')
    assert.deepEqual(res.context.key, 'test-key-0')
    assert.deepEqual(res.context.url, 'gs://test-bucket-0/test-key-0')
    assert.deepEqual(res.context.extraFlag, { deep: true })

    assert.deepEqual(typeof res.defaults, 'function')
    assert.deepEqual(typeof res.contentLength, 'function')
    assert.deepEqual(typeof res.copyFile, 'function')
    assert.deepEqual(typeof res.downloadBuffer, 'function')
    assert.deepEqual(typeof res.downloadFile, 'function')
    assert.deepEqual(typeof res.downloadStream, 'function')
    assert.deepEqual(typeof res.getSignedUrl, 'function')
    assert.deepEqual(typeof res.moveFile, 'function')
    assert.deepEqual(typeof res.uploadBuffer, 'function')
    assert.deepEqual(typeof res.uploadFile, 'function')
    assert.deepEqual(typeof res.uploadStream, 'function')
  })

  it('should resolve url correctly', async () => {
    const res = ObjectStorage.defaults({
      url: 'gs://test-bucket-0/test-key-0.mp4'
    })

    assert.deepEqual(res.context.bucket, 'test-bucket-0')
    assert.deepEqual(res.context.key, 'test-key-0.mp4')
    assert.deepEqual(res.context.url, 'gs://test-bucket-0/test-key-0.mp4')

    assert.deepEqual(typeof res.defaults, 'function')
    assert.deepEqual(typeof res.contentLength, 'function')
    assert.deepEqual(typeof res.copyFile, 'function')
    assert.deepEqual(typeof res.downloadBuffer, 'function')
    assert.deepEqual(typeof res.downloadFile, 'function')
    assert.deepEqual(typeof res.downloadStream, 'function')
    assert.deepEqual(typeof res.getSignedUrl, 'function')
    assert.deepEqual(typeof res.moveFile, 'function')
    assert.deepEqual(typeof res.uploadBuffer, 'function')
    assert.deepEqual(typeof res.uploadFile, 'function')
    assert.deepEqual(typeof res.uploadStream, 'function')
  })
})
