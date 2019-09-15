'use strict'

const methods = require('./lib/methods')
const resolveOptions = require('./lib/resolve-options')

function defaults (defaultOptions = { }) {
  const resolve = module.exports.resolveOptions || resolveOptions
  const { context } = resolve(Object.assign(defaultOptions, { validate: false }))
  const storage = {
    context,
    defaults: (opts) => {
      return defaults(Object.assign({ }, defaultOptions, opts))
    }
  }

  for (const method in methods) {
    const impl = methods[method]
    storage[method] = (...args) => {
      const resolvedArgs = args.map(opts => {
        return module.exports.resolveOptions(defaultOptions, opts)
      })

      return impl.call(storage, ...resolvedArgs)
    }
  }

  return storage
}

module.exports = defaults()
module.exports.resolveOptions = resolveOptions
