const plugin = require('../index')
const fs = require('fs')
const path = require('path')
const regx = require('../regex.js')

const resolve = (dir) => path.resolve(__dirname, dir)

test('js file FLAG true // #ifdef FLAG', () => {
  testOne('example/oneFlag.js', { type: 'js', FLAG: true }, /console\.log\('FLAG'\)/)
})

test('js file FLAG false // #ifdef FLAG', () => {
  testOne('example/oneFlag.js', { type: 'js', FLAG: false }, null, /console\.log\('FLAG'\)/)
})

test('js file FLAG-A true // #ifdef FLAG-A || FLAG-B', () => {
  testOne('example/multiFlag.js', { type: 'js', 'FLAG-A': true }, /console\.log\('FLAG-A OR FLAG-B'\)/)
})

test('js file FLAG-B true // #ifdef FLAG-A || FLAG-B', () => {
  testOne('example/multiFlag.js', { type: 'js', 'FLAG-B': true }, /console\.log\('FLAG-A OR FLAG-B'\)/)
})

test('js file FLAG-A false FLAG-B false // #ifdef FLAG-A || FLAG-B', () => {
  testOne('example/multiFlag.js', { type: 'js' }, null, /console\.log\('FLAG-A OR FLAG-B'\)/)
})

test('vue file FLAG true <!-- #ifdef FLAG -->', () => {
  testOne('example/oneFlag.vue', { type: 'vue', FLAG: true }, /<header>FLAG<\/header>/)
})

test('vue file FLAG false <!-- #ifdef FLAG -->', () => {
  testOne('example/oneFlag.vue', { type: 'vue' }, null, /<header>FLAG<\/header>/)
})

test('vue file FLAG-A true <!-- #ifdef FLAG-A || FLAG-B -->', () => {
  testOne('example/multiFlag.vue', { type: 'vue', 'FLAG-A': true }, /<header>FLAG-A OR FLAG-B<\/header>/)
})

test('vue file FLAG-B true <!-- #ifdef FLAG-A || FLAG-B -->', () => {
  testOne('example/multiFlag.vue', { type: 'vue', 'FLAG-B': true }, /<header>FLAG-A OR FLAG-B<\/header>/)
})

test('vue file FLAG-A false FLAG-B false <!-- #ifdef FLAG-A || FLAG-B -->', () => {
  testOne('example/multiFlag.vue', { type: 'vue' }, null, /<header>FLAG-A OR FLAG-B<\/header>/)
})

test('less file FLAG true /* #ifdef FLAG */', () => {
  testOne('example/oneFlag.less', { type: 'less', FLAG: true }, /background: cornflowerblue;/)
})

test('less file FLAG false /* #ifdef FLAG */', () => {
  testOne('example/oneFlag.less', { type: 'less', FLAG: false }, null, /background: cornflowerblue;/)
})

test('less file FLAG-A true /* #ifdef FLAG-A || FLAG-B */', () => {
  testOne('example/multiFlag.less', { type: 'less', 'FLAG-A': true }, /background: pink;/)
})

test('less file FLAG-B true /* #ifdef FLAG-A || FLAG-B */', () => {
  testOne('example/multiFlag.less', { type: 'less', 'FLAG-B': true }, /background: pink;/)
})

test('less file FLAG-A false FLAG-B false /* #ifdef FLAG-A || FLAG-B */', () => {
  testOne('example/multiFlag.less', { type: 'less' }, null, /background: pink;/)
})

test('jsx file FLAG true {/* #ifdef FLAG */}', () => {
  testOne('example/oneFlag.jsx', { type: 'jsx', FLAG: true }, /<header>FLAG<\/header>/)
})

test('jsx file FLAG false {/* #ifdef FLAG */}', () => {
  testOne('example/oneFlag.jsx', { type: 'jsx' }, null, /<header>FLAG<\/header>/)
})

test('jsx file FLAG-A true {/* #ifdef FLAG-A || FLAG-B */}', () => {
  testOne('example/multiFlag.jsx', { type: 'jsx', 'FLAG-A': true }, /<header>FLAG-A OR FLAG-B<\/header>/)
})

test('jsx file FLAG-B true {/* #ifdef FLAG-A || FLAG-B */}', () => {
  testOne('example/multiFlag.jsx', { type: 'jsx', 'FLAG-B': true }, /<header>FLAG-A OR FLAG-B<\/header>/)
})

test('jsx file FLAG-B false FLAG-B false {/* #ifdef FLAG-A || FLAG-B */}', () => {
  testOne('example/multiFlag.jsx', { type: 'jsx' }, null, /<header>FLAG-A OR FLAG-B<\/header>/)
})

function mockPlugin(src, option) {
  return plugin.call({ query: option }, src)
}

function testOne(file, options, reg, notReg) {
  const src = fs.readFileSync(resolve(file), 'utf-8')
  const result = mockPlugin(src, options)

  reg && expect(result).toMatch(reg)
  notReg && expect(result).not.toMatch(notReg)
  expect(result).not.toMatch(regx)
}
