const replace = require('./replace')
const loaderUtils = require('loader-utils')

module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable()
  }

  const options = Object.assign({ attr: 'require', alias: {} }, loaderUtils.getOptions(this))


  return replace(content, options)
}
