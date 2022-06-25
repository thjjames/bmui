# 定制主题

### 样式变量

Mui 使用了 [Less](http://lesscss.org/) 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。
下面是所有的[基础样式变量](https://github.com/thjjames/bmui/blob/master/src/style/variable.less)，组件的样式变量请参考各个组件的文档。

```less
@primary-color: #2784ff;
@success-color: #02c499;
@error-color: #e64a4a;
@warning-color: #f7bd2e;
@text-color: #323232;
@text-color-secondary: #848484;
@background-color: #f5f5f5;
@background-color-tip: #fef6e5;
@background-color-error: #fff7f6;
@border-color: #ebebeb;
@gradient-primary: linear-gradient(90deg, #2784ff 0%, #0071f5 100%);
```

## 定制方法

### 修改样式变量

使用 Less 提供的 [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 即可对变量进行修改，下面是参考的 webpack 配置。

```js
// webpack.config.js
module.exports = {
  rules: [
    {
      test: /\.less$/,
      use: [
        // ...其他 loader 配置
        {
          loader: "less-loader",
          options: {
            // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
            lessOptions: {
              modifyVars: {
                // 直接覆盖变量
                "text-color": "#111",
                "border-color": "#eee",
                // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                hack: `true; @import "your-less-file-path.less";`,
              },
            },
          },
        },
      ],
    },
  ],
};
```

如果 vue-cli 搭建的项目，可以在 `vue.config.js` 中进行配置。

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#111",
            "border-color": "#eee",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "your-less-file-path.less";`,
          },
        },
      },
    },
  },
};
```
