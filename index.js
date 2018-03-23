const replace = require('./replace')
const loaderUtils = require('loader-utils')

module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable()
  }

  const options = loaderUtils.getOptions(this) || {}

  options.attr = options.attr || 'require'
  options.alias = options.alias || {}
  options._alias = [];

  for (let key in options.alias) {
    options._alias.push(key)
  }

  return replace(content, options)
}
