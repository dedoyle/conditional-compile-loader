const loaderUtils = require('loader-utils')
const regx = require('./regex.js')

function replaceMatched(source, options) {
  return source.replace(options.reg, (match, ...args) => {
    // () | () 多个分组匹配的情况时，其实只有一个会命中
    // 只要匹配上，做替换即可
    for(let i = 0, l = args.length; i < l; i+=2) {
      const keys = args[i]
      const code = args[i + 1]
      if (!keys || !code) {
        continue
      }
      const isKeep = keys.split(/\s*\|\|\s*/).some(k => options[k])
      return isKeep ? code : ''
    }
  })
}

module.exports = function(source) {
  let options = loaderUtils.getOptions(this)
  !options.type && (options.type = 'js') 
  // 如果同时配置 type 和 reg，采用用户配置的 reg
  // 如果只配置 type，初始化 options.reg 为内置的 type 对应的 reg
  !options.reg && (options.reg = regx)
  return replaceMatched(source, options)
}
