# conditional-compile-loader

`conditional-compile-loader` 根据设定的参数对 vue、js 和 css(less, sass 等) 代码进行条件编译。

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
    <header>FLAG</header>
    <!-- #endif -->
    <!-- #ifdef FLAG-A || FLAG-B -->
    <header>FLAG-A OR FLAG-B</header>
    <!-- #endif -->
  </div>
</template>
```

example.js

```js
// #ifdef FLAG
console.log('FLAG')
// #endif
// #ifdef FLAG-A || FLAG-B
console.log('FLAG-A OR FLAG-B')
// #endif
```

example.less

```less
body {
  /* #ifdef FLAG */
  background: cornflowerblue;
  /* #endif */
  /* #ifdef FLAG-A || FLAG-B */
  background: pink;
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
          FLAG: true,
          'FLAG-A': true
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
          FLAG: true,
          'FLAG-B': true
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
          FLAG: true,
          'FLAG-A': true
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

## 错误使用情况

变量名必须严格符合正则 /[A-Z-]+/，否则不会进行条件编译，例如：

```vue
<template>
  <div>
    <!-- #ifdef flag -->
    <header>FLAG</header>
    <!-- #endif -->
    <!-- #ifdef FLAG-a || flag-B -->
    <header>FLAG-A OR FLAG-B</header>
    <!-- #endif -->
  </div>
</template>
```