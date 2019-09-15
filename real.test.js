'use strict'

const fs = require('fs')
const assert = require('chai').assert

const ObjectStorage = require('.')

if (!process.env.CI) {
  describe('object-storage real usage', () => {
    it('upload and download should work for realz', async () => {
      const storage = ObjectStorage.defaults({
        bucket: 'saasify-uploads-prod'
      })

      await storage.uploadFile({
        key: 'test.json',
        localPath: './package.json',
        options: {
          public: true
        }
      })

      const buffer = await storage.downloadBuffer({
        key: 'test.json'
      })
      const result = buffer.toString('utf8')

      assert.deepEqual(result, fs.readFileSync('./package.json', 'utf8'))
    }).timeout(10000)
  })
}
