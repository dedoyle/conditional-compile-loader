# conditional-compile-loader

`conditional-compile-loader` 根据设定的参数对 vue、js 和 less 代码进行条件编译。

## Getting Started

先安装 `conditional-compile-loader`

```shell
npm install -D conditional-compile-loader
# or
yarn add -D conditional-compile-loader
```

然后添加这个 loader 到 webpack 配置，例如：

example.vue

```vue
<template>
  <div>
    <!-- #ifdef FLAG -->
    <header>If FLAG is true</header>
    <!-- #endif -->
  </div>
</template>
```

example.js

```js
const str = 'demo'
// #ifdef FLAG
console.log('If FLAG is true')
// #endif
console.log(str)
```

example.less

```less
body {
  /* #ifdef FLAG */
  background: cornflowerblue;
  /* #endif */
}
```

webpack.config.js

```js
rules: [
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
      },
      {
        loader: 'conditional-compile-loader',
        options: {
          type: 'vue',
          FLAG: true
        }
      }
    ]
  },
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'conditional-compile-loader',
        options: {
          type: 'js',
          FLAG: true
        }
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: 'less-loader',
      },
      {
        loader: 'conditional-compile-loader',
        options: {
          type: 'less',
          FLAG: true
        }
      }
    ]
  }
]
```

## Options

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>参数描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>type</td>
      <td>{String}</td>
      <td>'js'</td>
      <td>资源类型</td>
    </tr>
    <tr>
      <td>reg</td>
      <td>{Regex}</td>
      <td></td>
      <td>自定义正则表达式</td>
    </tr>
    <tr>
      <td>符合 /[A-Z-]+/ 的变量名</td>
      <td>{Boolean}</td>
      <td>true</td>
      <td>环境变量，为 true 的时候保留代码</td>
    </tr>
  </tbody>
<table>