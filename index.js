var replace = require('./replace')
var loaderUtils = require('loader-utils')


module.exports = function (content) {
  var options = loaderUtils.getOptions(this) || {}

  options.attr = options.attr || 'require'
  options.alias = options.alias || {}
  options._alias=[];

  for(var key in options.alias){
    options._alias.push(key)
  }

  if (this.cacheable) {
    this.cacheable()
  }
  return replace(content, options)
}
