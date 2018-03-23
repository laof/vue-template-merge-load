const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const compiler = require('vue-template-compiler')

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir)
}

function url(src, opts) {
  src += ''
  const _alias = opts._alias
  let isAlias = false

  for (const i = 0; i < _alias.length; i++) {
    const inx = src.indexOf(_alias[i])
    if (inx > -1) {
      isAlias = true
      src = src.replace(_alias[i], opts.alias[_alias[i]])
      break
    }
  }

  if (!isAlias) {
    src = resolve(src)
  }

  return src
}

function target(src) {
  if (src.indexOf('.html') === -1) {
    src += '.html'
  }

  let htmlstr = ''

  try {
    htmlstr = fs.readFileSync(src);
  } catch (e) {
    htmlstr = '<h6 style="color:red">read file fail ' + src + '</h6>'
  }
  return htmlstr
}

function replace(source, options) {

  const attr = options.attr
  const vueObj = compiler.parseComponent(source)
  const $ = cheerio.load(vueObj.template.content, {
    xmlMode: true, decodeEntities: false
  })

  $('[' + attr + ']').each(function (i, d) {
    const v = $(d)
    const src = (v.attr(attr) + '').replace(/(^\s*)|(\s*$)/g, "");
    if (src !== '') {
      v.html(target(url(src, options)))
      v.attr(attr, '')
    }
  })

  source.replace(source.substring(vueObj.start, vueObj.end), $.html())

  return source
}

module.exports = replace
