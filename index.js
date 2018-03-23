var replace = require('./replace')
var loaderUtils = require('loader-utils')


module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable()
  }
  
  var options = loaderUtils.getOptions(this) || {}

  options.attr = options.attr || 'require'
  options.alias = options.alias || {}
  options._alias=[];

  for(var key in options.alias){
    options._alias.push(key)
  }
  
  return replace(content, options)
}
