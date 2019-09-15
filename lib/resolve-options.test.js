'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const mockStorage = require('./mock-storage')
const resolveOptions = require('./resolve-options')

describe('resolve-options', () => {
  const sandbox = sinon.sandbox.create()

  before(() => {
    sandbox.stub(resolveOptions, 'Storage')
  })

  beforeEach(() => {
    resolveOptions.Storage.callsFake(mockStorage(sandbox))
  })

  afterEach(() => sandbox.reset())
  after(() => sandbox.restore())

  it('should resolve bucket, key correctly', async () => {
    const res = resolveOptions({
      projectId: 'test-project-id-0',
      bucket: 'test-bucket-0',
      key: 'test-key-0',
      extraFlag: { deep: true }
    })

    assert.deepEqual(resolveOptions.Storage.args[0], [{ projectId: 'test-project-id-0' }])
    assert.deepEqual(res.storage.bucket.args[0], ['test-bucket-0'])
    assert.deepEqual(res.bucket.file.args[0], ['test-key-0'])

    assert.deepEqual(res.url, 'gs://test-bucket-0/test-key-0')
    assert.deepEqual(res.extraFlag, { deep: true })

    assert.ok(res.bucket)
    assert.ok(res.file)
    assert.ok(res.context)

    assert.deepEqual(res.context.projectId, 'test-project-id-0')
  })

  it('should resolve url correctly', async () => {
    const res = resolveOptions({
      url: 'gs://test-bucket-1/test-key-1.test'
    })

    assert.deepEqual(resolveOptions.Storage.args[0], [{ }])
    assert.deepEqual(res.storage.bucket.args[0], ['test-bucket-1'])
    assert.deepEqual(res.bucket.file.args[0], ['test-key-1.test'])

    assert.deepEqual(res.url, 'gs://test-bucket-1/test-key-1.test')

    assert.ok(res.bucket)
    assert.ok(res.file)
  })

  it('should resolve bucket even if no key specified', async () => {
    const res = resolveOptions({
      bucket: 'test-bucket-2'
    })

    assert.deepEqual(resolveOptions.Storage.args[0], [{ }])
    assert.deepEqual(res.storage.bucket.args[0], ['test-bucket-2'])
    assert.deepEqual(res.bucket.file.callCount, 0)

    assert.ok(res.bucket)
    assert.notOk(res.file)
    assert.notOk(res.url)
  })

  it('should throw if missing bucket', async () => {
    try {
      resolveOptions({
        key: 'test-key-0'
      })
      throw new Error()
    } catch (err) {
      assert.deepEqual(err.message, 'missing required param "bucket"')
      assert.deepEqual(resolveOptions.Storage.args[0], [{ }])
    }
  })
})
