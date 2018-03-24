# object-storage

> Collection of useful utilities for working with [Google Cloud Storage](https://cloud.google.com/storage).

The goal is to eventually add support for AWS S3 as well.

## Installation

```
yarn add abstract-object-storage
```

This module uses async await and therefore requires node >= 8.

## Usage

```javascript
process.env.GOOGLE_APPLICATION_CREDENTIALS = '<insert auth credentials here>'

const storage = require('abstract-object-storage').defaults({
  bucket: 'my-test-bucket'
})

await storage.uploadFile({
  key: 'test/example.jpg',
  localPath: './example.jpg'
})

const buffer = await storage.downloadBuffer({
  key: 'test/example.jpg'
})

// buffer should equal the contents of './example.jpg'
```

## API

All methods take a generic Options Object which may specify auth, bucket, and file properties.

### Options

**Storage authentication** ([gcs docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/v0.53.0/google-cloud))

- `projectId`
- `keyFilename`
- `email`
- `credentials`
- `client_email`
- `private_key`
- `autoRetry`
- `maxRetries`
- `promise`

Note that the preferred way of authenticating with GCS is to use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable, which case, nothing from this section is a required param to `storage`.

---

**Bucket** ([gcs docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/1.1.0/storage?method=bucket))

- `bucket` - string, required name of bucket to operate against

---

**File** ([gcs docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/1.1.0/storage/bucket?method=file))

- `key` - string, required name of file in `bucket` to operate against

---

**Path**

- `path` - string, optional `gs://` url including both `bucket` and `key`. Note that specifying a `path` will override any `bucket` or `key` that is specified.

### Convenience Methods

This module uses the *defaults pattern* similar to node's popular [request](https://github.com/request/request#convenience-methods) module.

`storage.defaults(opts) => storage`

This method *returns a wrapper* around the normal `storage` api that defaults to whatever options you pass to it.

**Note**: You can call `.defaults()` on the wrapper that is returned from `storage.defaults` to add/override defaults that were previously defaulted.

### Methods

#### contentLength

Returns the length of the remote file specified by the given `bucket` and `key`.

`storage.contentLength({ key }) => Promise<Number>`

#### copyFile

Copies one remote file to another file location. Note that both the `source` and `dest` files are specified via the common parameters specified above and will inherit from values specified on the storage defaults.

`storage.copyFile(source, dest) => Promise`

#### downloadBuffer

Downloads the remote file specified by the given `bucket` and `key` to a `Buffer`.

`storage.downloadBuffer({ key }) => Promise<Buffer>`

#### downloadStream

Downloads the remote file specified by the given `bucket` and `key` to a readable stream.

`storage.downloadStream({ key }) => ReadableStream`

#### downloadFile

Downloads the remote file specified by the given `bucket` and `key` to a local file.

`storage.downloadFile({ key, localPath }) => Promise`

- `localPath` - string, required path of the destination file

#### getSignedUrl

Returns a signed url to access the remote file specified by the given `bucket` and `key`.

Note that the returned url has a TTL and may have ACLs applied to it.

`storage.getSignedUrl({ key }) => Promise<String>`

- `options` - object, optional
- `options.expires` - number | string | date, optional expiration date for the url (defaults to 2 days from `Date.now()`)
- `options.action` - string, optional acl ([gcs docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/1.1.0/storage/file?method=getSignedUrl))

#### moveFile

Moves one remote file to another file location. Note that both the `source` and `dest` files are specified via the common parameters specified above and will inherit from values specified on the storage defaults.

`storage.moveFile(source, dest) => Promise`

#### uploadBuffer

Uploads a buffer to the remote file specified by the given `bucket` and `key`.

`storage.uploadBuffer({ key, buffer, metadata, options }) => Promise`

- `buffer` - Buffer, required Buffer to upload
- `metadata` - Object, optional resource metadata to be attached to the upload ([gcs docs](https://cloud.google.com/storage/docs/json_api/v1/objects/insert#request_properties_JSON))
- `options` - Object, optional additional options to customize the upload ([gcs docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/1.1.0/storage/bucket?method=upload))

#### uploadFile

Uploads the contents of a local file to the remote file specified by the given `bucket` and `key`.

`storage.uploadFile({ key, localPath, metadata, options }) => Promise`

- `localPath` - string, required path of the local source file
- `metadata` - Object, optional resource metadata to be attached to the upload ([gcs docs](https://cloud.google.com/storage/docs/json_api/v1/objects/insert#request_properties_JSON))
- `options` - Object, optional additional options to customize the upload ([gcs docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/1.1.0/storage/bucket?method=upload))

**Note** that `uploadFile` defaults its resource `metadata` to the `content-type` and `content-length` of the local file (via [mime-types](https://www.npmjs.com/package/mime-types)).

#### uploadStream

Uploads a readable stream to the file specified by the given `bucket` and `key`.

`storage.uploadStream({ key, stream, metadata, options }) => Promise`

- `stream` - [stream](https://nodejs.org/api/stream.html#stream_class_stream_readable), required readable stream to upload
- `metadata` - Object, optional resource metadata to be attached to the upload ([gcs docs](https://cloud.google.com/storage/docs/json_api/v1/objects/insert#request_properties_JSON))
- `options` - Object, optional additional options to customize the upload ([gcs docs](https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/1.1.0/storage/bucket?method=upload))

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
