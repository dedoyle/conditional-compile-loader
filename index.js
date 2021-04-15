const loaderUtils = require('loader-utils')
const regx = require('./regex.js')

function replaceMatched(source, options) {
  return source.replace(options.reg, (match, ...args) => {
    // () | () 多个分组匹配的情况时，其实只有一个会命中
    // 只要匹配上，做替换即可
    for (let i = 0, l = args.length; i < l; i += 3) {
      const type = args[i] // #ifdef or #ifndef
      const keys = args[i + 1] // APP-PLUS
      const code = args[i + 2]
      if (!type || !keys || !code) {
        continue
      }
      if (type === '#ifdef') {
        const isKeep = keys.split(/\s*\|\|\s*/).some((k) => options[k])
        return isKeep ? code : ''
      } else if (type === '#ifndef') {
        // 非这些平台的时候，才保留 code
        // 也就是所有 key 都为 false 才能保留 code
        const noKeep = keys.split(/\s*\|\|\s*/).some((k) => options[k])
        return noKeep ? '' : code
      }
    }
  })
}

module.exports = function (source) {
  let options = loaderUtils.getOptions(this)
  !options.type && (options.type = 'js')
  // 如果同时配置 type 和 reg，采用用户配置的 reg
  // 如果只配置 type，初始化 options.reg 为内置的 type 对应的 reg
  !options.reg && (options.reg = regx)
  return replaceMatched(source, options)
}
