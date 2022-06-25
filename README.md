## Description

业务组件库

### Features

- 支持 demo
- readme 格式页面
- 按需加载

### Directory

```
bmui
├─ build     # 构建
├─ umd       # 产物(全局)
├─ es        # 产物(按需)
├─ example   # 单测
   ├─ desktop       # 桌面入口
   └─ mobile        # 移动端
└─ src       # 组件
   ├─ comp.vue      # 代码
   ├─ demo          # 示例
   ├─ index.js      # 入口
   └─ README.md     # 文档
```

### Develop

#### step

1. add "nav" config in bmui.config.js
2. create folder & corresponding files in src directory
   - vue、js（组件代码）
   - demo（测试用例）
   - readme（描述文件）
3. update "component" object in src/index.js
4. update [version](https://semver.org/lang/zh-CN/) & build & commit

#### local

```bash
npm run dev
```

#### build

```bash
npm run build
```

### Env

|            | NODE_ENV      | APP_MODE |
| ---------- | ------------- | -------- |
| dev        | `development` | `dev`    |
| build:SIT  | `production`  | `sit`    |
| build:UAT  | `production`  | `uat`    |
| build:PRE  | `production`  | `pre`    |
| build:PROD | `production`  | `prod`   |

### Usage

Install

```bash
npm i -S git@github.com:thjjames/bmui
```

or add `dependencies` in `package.json`

```
"bmui": "git@github.com:thjjames/bmui"
```

按需加载(推荐)

```bash
# 安装插件
npm i babel-plugin-import -D
```

```js
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "bmui",
      "libraryDirectory": "es"
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'bmui',
      libraryDirectory: 'es'
    }]
  ]
};
```

```js
<template>
  <bmui-gantt />
</template>;

// 插件会自动将代码转化为按需引入形式 import Gantt from 'bmui/es/gantt'
import Vue from "vue";
import { Gantt as BmuiGantt } from "bmui";

// recommended
components: {
  BmuiGantt;
}
// or
Vue.use(BmuiGantt);
```

全局加载

> Tips: Mui 支持一次性导入所有组件，但会增加代码包体积，因此不推荐这种做法。

```js
<template>
  <bmui-gantt />
</template>;

import Vue from "vue";
import Bmui from "bmui";
Vue.use(Bmui);
```
