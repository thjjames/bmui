const { readFileSync, writeFileSync } = require('fs-extra');
const { join } = require('path');
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');
const { render } = require('less');
const { CWD } = require('./constant');

function replaceExt(path, ext) {
  return path.replace(/\.\w+$/, ext);
}

async function compileCss(filePath) {
  const source = readFileSync(filePath, 'utf-8');
  const config = await postcssrc({}, join(CWD, '.postcssrc'));
  const { css } = await postcss(config.plugins).process(source, {
    from: undefined,
  });

  return css.styles;
}

async function compileLess(filePath) {
  const source = readFileSync(filePath, 'utf-8');
  const { css } = await render(source, {
    filename: filePath,
  });

  return css;
}

module.exports = async function(filePath) {
  let source;
  if (/\.less$/.test(filePath)) {
    source = await compileLess(filePath);
  } else {
    source = await compileCss(filePath);
  }
  writeFileSync(replaceExt(filePath, '.css'), source);
}
