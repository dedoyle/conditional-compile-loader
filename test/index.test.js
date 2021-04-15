const plugin = require('../index')
const fs = require('fs')
const path = require('path')
const regx = require('../regex.js')

const resolve = (dir) => path.resolve(__dirname, dir)

test('js file FLAG true // #ifdef FLAG', () => {
  testOne('example/oneFlag.js', { FLAG: true }, /console\.log\('FLAG'\)/)
})

test('js file FLAG false // #ifdef FLAG', () => {
  testOne('example/oneFlag.js', { FLAG: false }, null, /console\.log\('FLAG'\)/)
})

test('js file APP-PLUS true // #ifndef APP-PLUS', () => {
  testOne(
    'example/oneFlag.js',
    { 'APP-PLUS': true },
    null,
    /console\.log\('NOT APP-PLUS'\)/
  )
})

test('js file APP-PLUS false // #ifndef APP-PLUS', () => {
  testOne(
    'example/oneFlag.js',
    { 'APP-PLUS': false },
    /console\.log\('NOT APP-PLUS'\)/
  )
})

test('js file FLAG-A true // #ifdef FLAG-A || FLAG-B', () => {
  testOne(
    'example/multiFlag.js',
    { 'FLAG-A': true },
    /console\.log\('FLAG-A OR FLAG-B'\)/
  )
})

test('js file FLAG-B true // #ifdef FLAG-A || FLAG-B', () => {
  testOne(
    'example/multiFlag.js',
    { 'FLAG-B': true },
    /console\.log\('FLAG-A OR FLAG-B'\)/
  )
})

test('js file FLAG-A false FLAG-B false // #ifdef FLAG-A || FLAG-B', () => {
  testOne(
    'example/multiFlag.js',
    {},
    null,
    /console\.log\('FLAG-A OR FLAG-B'\)/
  )
})

test('js file APP-PLUS true // #ifndef APP-PLUS || MP-WEXIN', () => {
  testOne(
    'example/multiFlag.js',
    { 'APP-PLUS': true },
    null,
    /console\.log\('NIETHER APP-PLUS NOR MP-WEXIN'\)/
  )
})

test('js file MP-WEXIN true // #ifndef APP-PLUS || MP-WEXIN', () => {
  testOne(
    'example/multiFlag.js',
    { 'MP-WEXIN': true },
    null,
    /console\.log\('NIETHER APP-PLUS NOR MP-WEXIN'\)/
  )
})

test('js file APP-PLUS false AND MP-WEXIN false // #ifndef APP-PLUS || MP-WEXIN', () => {
  testOne(
    'example/multiFlag.js',
    {},
    /console\.log\('NIETHER APP-PLUS NOR MP-WEXIN'\)/
  )
})

test('vue file FLAG true <!-- #ifdef FLAG -->', () => {
  testOne('example/oneFlag.vue', { FLAG: true }, /<header>FLAG<\/header>/)
})

test('vue file FLAG false <!-- #ifdef FLAG -->', () => {
  testOne('example/oneFlag.vue', {}, null, /<header>FLAG<\/header>/)
})

test('vue file APP-PLUS true <!-- #ifndef APP-PLUS -->', () => {
  testOne(
    'example/oneFlag.vue',
    { 'APP-PLUS': true },
    null,
    /<header>NOT APP-PLUS<\/header>/
  )
})

test('vue file APP-PLUS false <!-- #ifndef APP-PLUS -->', () => {
  testOne('example/oneFlag.vue', {}, /<header>NOT APP-PLUS<\/header>/)
})

test('vue file FLAG-A true <!-- #ifdef FLAG-A || FLAG-B -->', () => {
  testOne(
    'example/multiFlag.vue',
    { 'FLAG-A': true },
    /<header>FLAG-A OR FLAG-B<\/header>/
  )
})

test('vue file FLAG-B true <!-- #ifdef FLAG-A || FLAG-B -->', () => {
  testOne(
    'example/multiFlag.vue',
    { 'FLAG-B': true },
    /<header>FLAG-A OR FLAG-B<\/header>/
  )
})

test('vue file FLAG-A false FLAG-B false <!-- #ifdef FLAG-A || FLAG-B -->', () => {
  testOne(
    'example/multiFlag.vue',
    {},
    null,
    /<header>FLAG-A OR FLAG-B<\/header>/
  )
})

test('vue file APP-PLUS true <!-- #ifndef APP-PLUS || MP-WEXIN -->', () => {
  testOne(
    'example/multiFlag.vue',
    { 'APP-PLUS': true },
    null,
    /<header>NIETHER APP-PLUS NOR MP-WEXIN<\/header>/
  )
})

test('vue file MP-WEXIN true <!-- #ifndef APP-PLUS || MP-WEXIN -->', () => {
  testOne(
    'example/multiFlag.vue',
    { 'MP-WEXIN': true },
    null,
    /<header>NIETHER APP-PLUS NOR MP-WEXIN<\/header>/
  )
})

test('vue file APP-PLUS false MP-WEXIN false <!-- #ifndef APP-PLUS || MP-WEXIN -->', () => {
  testOne(
    'example/multiFlag.vue',
    {},
    /<header>NIETHER APP-PLUS NOR MP-WEXIN<\/header>/
  )
})

test('less file FLAG true /* #ifdef FLAG */', () => {
  testOne('example/oneFlag.less', { FLAG: true }, /background: pink;/)
})

test('less file FLAG false /* #ifdef FLAG */', () => {
  testOne('example/oneFlag.less', { FLAG: false }, null, /background: pink;/)
})

test('less file APP-PLUS true /* #ifndef APP-PLUS */', () => {
  testOne(
    'example/oneFlag.less',
    { 'APP-PLUS': true },
    null,
    /background: blue;/
  )
})

test('less file APP-PLUS false /* #ifndef APP-PLUS */', () => {
  testOne('example/oneFlag.less', { 'APP-PLUS': false }, /background: blue;/)
})

test('less file FLAG-A true /* #ifdef FLAG-A || FLAG-B */', () => {
  testOne('example/multiFlag.less', { 'FLAG-A': true }, /background: pink;/)
})

test('less file FLAG-B true /* #ifdef FLAG-A || FLAG-B */', () => {
  testOne('example/multiFlag.less', { 'FLAG-B': true }, /background: pink;/)
})

test('less file FLAG-A false FLAG-B false /* #ifdef FLAG-A || FLAG-B */', () => {
  testOne('example/multiFlag.less', {}, null, /background: pink;/)
})

test('less file APP-PLUS true /* #ifndef APP-PLUS || MP-WEXIN */', () => {
  testOne(
    'example/multiFlag.less',
    { 'APP-PLUS': true },
    null,
    /background: blue;/
  )
})

test('less file MP-WEXIN true /* #ifndef APP-PLUS || MP-WEXIN */', () => {
  testOne(
    'example/multiFlag.less',
    { 'MP-WEXIN': true },
    null,
    /background: blue;/
  )
})

test('less file APP-PLUS false MP-WEXIN false /* #ifndef APP-PLUS || MP-WEXIN */', () => {
  testOne('example/multiFlag.less', {}, /background: blue;/)
})

test('jsx file FLAG true {/* #ifdef FLAG */}', () => {
  testOne('example/oneFlag.jsx', { FLAG: true }, /<header>FLAG<\/header>/)
})

test('jsx file FLAG false {/* #ifdef FLAG */}', () => {
  testOne('example/oneFlag.jsx', {}, null, /<header>FLAG<\/header>/)
})

test('jsx file APP-PLUS true {/* #ifndef APP-PLUS */}', () => {
  testOne(
    'example/oneFlag.jsx',
    { 'APP-PLUS': true },
    null,
    /<header>NOT APP-PLUS<\/header>/
  )
})

test('jsx file APP-PLUS false {/* #ifndef APP-PLUS */}', () => {
  testOne(
    'example/oneFlag.jsx',
    { 'APP-PLUS': false },
    /<header>NOT APP-PLUS<\/header>/
  )
})

test('jsx file FLAG-A true {/* #ifdef FLAG-A || FLAG-B */}', () => {
  testOne(
    'example/multiFlag.jsx',
    { 'FLAG-A': true },
    /<header>FLAG-A OR FLAG-B<\/header>/
  )
})

test('jsx file FLAG-B true {/* #ifdef FLAG-A || FLAG-B */}', () => {
  testOne(
    'example/multiFlag.jsx',
    { 'FLAG-B': true },
    /<header>FLAG-A OR FLAG-B<\/header>/
  )
})

test('jsx file FLAG-B false FLAG-B false {/* #ifdef FLAG-A || FLAG-B */}', () => {
  testOne(
    'example/multiFlag.jsx',
    {},
    null,
    /<header>FLAG-A OR FLAG-B<\/header>/
  )
})

test('jsx file APP-PLUS true {/* #ifndef APP-PLUS || MP-WEXIN */}', () => {
  testOne(
    'example/multiFlag.jsx',
    { 'APP-PLUS': true },
    null,
    /<header>NIETHER APP-PLUS NOR MP-WEXIN<\/header>/
  )
})

test('jsx file MP-WEXIN true {/* #ifndef APP-PLUS || MP-WEXIN */}', () => {
  testOne(
    'example/multiFlag.jsx',
    { 'MP-WEXIN': true },
    null,
    /<header>NIETHER APP-PLUS NOR MP-WEXIN<\/header>/
  )
})

test('jsx file APP-PLUS false MP-WEXIN false {/* #ifndef APP-PLUS || MP-WEXIN */}', () => {
  testOne(
    'example/multiFlag.jsx',
    {},
    /<header>NIETHER APP-PLUS NOR MP-WEXIN<\/header>/
  )
})

test('jsx file FLAG true // #ifdef FLAG', () => {
  testOne('example/component.jsx', { FLAG: true }, /pullCamera/)
})

test('jsx file FLAG false // #ifdef FLAG', () => {
  testOne('example/component.jsx', { FLAG: false }, null, /pullCamera/)
})

test('jsx file APP-PLUS true // #ifndef APP-PLUS', () => {
  testOne(
    'example/component.jsx',
    { 'APP-PLUS': true },
    null,
    /className="not-app-plus"/
  )
})

test('jsx file APP-PLUS false // #ifndef APP-PLUS', () => {
  testOne(
    'example/component.jsx',
    { 'APP-PLUS': false },
    /className="not-app-plus"/
  )
})

function mockPlugin(src, option) {
  return plugin.call({ query: option }, src)
}

/**
 *
 * @param {string} file 文件地址
 * @param {object} options 配置
 * @param {regex} reg 需要出现的内容的正则
 * @param {regex} notReg 不能出现的内容的正则
 */
function testOne(file, options, reg, notReg) {
  const src = fs.readFileSync(resolve(file), 'utf-8')
  const result = mockPlugin(src, options)

  reg && expect(result).toMatch(reg)
  notReg && expect(result).not.toMatch(notReg)
  expect(result).not.toMatch(regx)
}
