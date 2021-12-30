const { getOptions } = require('loader-utils');
const MarkdownIt = require('markdown-it');
// const markdownItAnchor = require('markdown-it-anchor');
const CardWrapper = require('./card-wrapper');
const highlight = require('./highlight');

function wrapper(content) {
  content = CardWrapper(content);
  content = escape(content);
  return `
    <template>
      <section v-html="content" v-once />
    </template>
    
    <script>
    export default {
      created() {
        this.content = unescape(\`${content}\`);
      },
    };
    </script>
  `;
}

module.exports = function (source) {
  const options = getOptions(this) || {};
  const md = new MarkdownIt({
    html: true,
    highlight,
    ...options
  });

  // 修改MarkdownIt渲染器规则 内链直接跳转 外链新开窗口打开
  const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const hrefAttr = tokens[idx].attrGet('href');

    if (/^https?/.test(hrefAttr)) {
      tokens[idx].attrPush(['target', '_blank']); // add new attribute
    }

    return defaultRender(tokens, idx, options, env, self);
  };

  return wrapper(md.render(source));
};