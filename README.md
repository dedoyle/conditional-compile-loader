# conditional-compile-loader

`conditional-compile-loader` 根据设定的参数对 vue、js、jsx 和 css(less, sass 等) 代码进行条件编译。

## 安装

先安装 `conditional-compile-loader`

```shell
npm install -D conditional-compile-loader
# or
yarn add -D conditional-compile-loader
```

## 规则说明

<table>
  <thead>
    <tr>
      <th>条件编译写法</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>#ifdef APP-PLUS</p>
        <p>需条件编译的代码</p>
        <p>#endif</p>
      </td>
      <td>仅出现在 App 平台下的代码</td>
    </tr>
    <tr>
      <td>
        <p>#ifndef H5</p>
        <p>需条件编译的代码</p>
        <p>#endif</p>
      </td>
      <td>除了 H5 平台，其它平台均存在的代码</td>
    </tr>
    <tr>
      <td>
        <p>#ifdef H5 || MP-WEIXIN</p>
        <p>需条件编译的代码</p>
        <p>#endif</p>
      </td>
      <td>在 H5 平台或微信小程序平台存在的代码（多个的情况使用 ||）</td>
    </tr>
  </tbody>
<table>

## 参数配置

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

## 使用示例

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

example.jsx

```js
{
  /* #ifdef FLAG */
}
;<header>FLAG</header>
{
  /* #endif */
}

{
  /* #ifdef FLAG-A || FLAG-B */
}
;<header>FLAG-A OR FLAG-B</header>
{
  /* #endif */
}
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
          FLAG: true,
          'FLAG-A': true,
        },
      },
    ],
  },
  {
    test: /\.jsx?$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'conditional-compile-loader',
        options: {
          FLAG: true,
          'FLAG-B': true,
        },
      },
    ],
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
          FLAG: true,
          'FLAG-A': true,
        },
      },
    ],
  },
]
```

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
