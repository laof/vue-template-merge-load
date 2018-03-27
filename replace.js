const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const compiler = require('./lib/build.js')

function resolve(dir) {
  return path.join(__dirname, '..', '..', dir)
}


function postfix(str) {
  const s = (str + '');
  const pos = s.lastIndexOf('.');
  const pfstr = str.substring(pos + 1, str.length);
  if (pos <= 0 || pfstr === '') {
    return false;
  }
  return pfstr.toLocaleLowerCase();
}


function url(src, opts) {
  src += ''
  let isAlias = false

  for (let key in opts.alias) {

    const inx = src.indexOf(key)

    if (inx > -1) {

      const val = opts.alias[key]
      src = src.replace(key, val)
      isAlias = true

      break

    }
  }

  if (!isAlias) {
    src = resolve(src)
  }

  return src
}

function target(src) {

  const type = postfix(src)
  const vue = type === 'vue'
  if (!type) {
    src += '.html'
  }

  let htmlstr = ''

  try {
    htmlstr = fs.readFileSync(src);

    if (vue) {
      const vueObj = compiler.parseComponent(htmlstr + '')
      htmlstr = vueObj.template.content
    }

  } catch (e) {
    htmlstr = '<h6 style="color:red">fail ' + src + '</h6>'
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
    const src = (v.attr(attr) + '').replace(/(^\s*)|(\s*$)/g, '');
    if (src !== '') {
      v.html(target(url(src, options)))
      v.attr(attr, '')
    }
  })

  const substr = source.substring(vueObj.template.start, vueObj.template.end)
  const newStr = source.replace(substr, $.html())

  return newStr
}

module.exports = replace
