const loaderUtils = require('loader-utils')
const REG = require('./regex.js')

function replaceMatched(source, options) {
  return source.replace(options.reg, (match, keys, code) => {
    const isKeep = keys.split(/\s*\|\|\s*/).some(k => options[k])
    return isKeep ? code : ''
  })
}

module.exports = function(source) {
  let options = loaderUtils.getOptions(this)
  !options.type && (options.type = 'js') 
  // 如果同时配置 type 和 reg，采用用户配置的 reg
  // 如果只配置 type，初始化 options.reg 为内置的 type 对应的 reg
  !options.reg && (options.reg = REG[options.type])
  return replaceMatched(source, options)
}
