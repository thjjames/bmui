<template>
  <div class="mui-example-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'mui-example-content'
};
</script>

<style lang="less">
@border-radius: 12px;
@mui-example-blue: #1989fa;
@mui-example-text-color: #34495e;
@mui-example-background-color: #f7f8fa;

.mui-example-content {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;

  .card {
    margin-bottom: 24px;
    padding: 24px;
    background-color: #fff;
    border-radius: @border-radius;
    box-shadow: 0 8px 12px #ebedf0;
  }

  a {
    margin: 0 1px;
    color: @mui-example-blue;
    -webkit-font-smoothing: auto;

    &:hover {
      color: darken(@mui-example-blue, 10%);
    }

    &:active {
      color: darken(@mui-example-blue, 20%);
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #323233;
    font-weight: normal;
    line-height: 1.5;

    &[id] {
      cursor: pointer;
    }
  }

  h1 {
    margin: 0 0 30px;
    font-size: 30px;
    cursor: default;
  }

  h2 {
    margin: 36px 0 20px;
    font-size: 24px;
  }

  h3 {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 18px;
  }

  h4 {
    margin: 24px 0 12px;
    font-weight: 600;
    font-size: 16px;
  }

  h5 {
    margin: 24px 0 12px;
    font-weight: 600;
    font-size: 15px;
  }

  p {
    color: @mui-example-text-color;
    font-size: 15px;
    line-height: 26px;
  }

  table {
    width: 100%;
    margin-top: 12px;
    color: @mui-example-text-color;
    font-size: 14px;
    line-height: 1.5;
    border-collapse: collapse;

    th {
      padding: 8px 10px;
      font-weight: 600;
      text-align: left;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }

    td {
      padding: 8px;
      border-top: 1px solid #f1f4f8;

      &:first-child {
        padding-left: 0;

        // version tag
        code {
          margin: 0;
          padding: 2px 6px;
          color: @mui-example-blue;
          font-weight: 600;
          font-size: 11px;
          background-color: fade(@mui-example-blue, 10%);
          border-radius: 20px;
        }
      }

      &:last-child {
        padding-right: 0;
      }
    }

    em {
      color: #4fc08d;
      font-size: 14px;
      font-style: normal;
      -webkit-font-smoothing: auto;
    }
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ul li,
  ol li {
    list-style: none;
    position: relative;
    margin: 5px 0 5px 10px;
    padding-left: 15px;
    color: @mui-example-text-color;
    font-size: 15px;
    line-height: 26px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 6px;
      height: 6px;
      margin-top: 10px;
      border: 1px solid #666;
      border-radius: 50%;
      content: '';
    }
  }

  hr {
    margin: 30px 0;
    border: 0 none;
    border-top: 1px solid #eee;
  }

  p > code,
  li > code,
  table code {
    display: inline;
    margin: 0 2px;
    padding: 2px 5px;
    font-size: 14px;
    font-family: inherit;
    word-break: keep-all;
    background-color: @mui-example-background-color;
    border-radius: 4px;
    -webkit-font-smoothing: antialiased;
  }

  p > code {
    font-size: 14px;
  }

  section {
    padding: 10px 20px;
    overflow: hidden;
  }

  blockquote {
    margin: 16px 0 0;
    padding: 16px;
    background-color: #ecf9ff;
    border-radius: @border-radius;
  }

  img {
    width: 100%;
    margin: 16px 0;
    border-radius: @border-radius;
  }
}
</style>
