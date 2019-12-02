const _ = require('lodash')

module.exports = (req, res, next) => {
  const bundleErrors = res.locals.bundle.errors

  if (bundleErrors) {
    const errors = parseErrors(bundleErrors)
    res.status(500).json({ errors })
  }
  else
    next()
}

const parseErrors = nodeRestfulErrors => {
  const errors = new Array()

  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}