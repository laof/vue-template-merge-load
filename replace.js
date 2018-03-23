var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')
var loaderUtils = require('loader-utils')

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir)
}
function url(src, opts) {
  src += ''
  var _alias= opts._alias
  var inx = -1;
  var isAlias =false

  for(var i =0;i<_alias.length;i++){
    inx = src.indexOf(_alias[i])
    if (inx > -1) {
      isAlias=true
      src = src.replace(_alias[i], opts.alias[_alias[i]])
      break
    }
  }

  if(!isAlias){
    src = resolve(src)
  }

  return src
}

function target(src) {
  if (src.indexOf('.html') === -1) {
    src += '.html'
  }

  var htmlstr = ''
  
  try {
    htmlstr = fs.readFileSync(src);
  } catch (e) {
    htmlstr = '<h6 style="color:red">read file fail ' + src + '</h6>'
  }
  return htmlstr
}

function replace(source, options) {

  var $ = cheerio.load(source, {
    xmlMode: true, decodeEntities: false
  })

  var attr = options.attr

  $('[' + attr + ']').each(function (i, d) {
    var v = $(d)
    var src = (v.attr(attr) +'').replace(/(^\s*)|(\s*$)/g, ""); 
    if(src!=='' ){
      v.html(target(url(src, options)))
      v.attr(attr,'')
    }
   
  })

  return $.html()
}

module.exports = replace
