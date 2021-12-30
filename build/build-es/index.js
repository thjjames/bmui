const { remove, copy, readdirSync, lstatSync } = require('fs-extra');
const { join } = require('path');
const { SRC_DIR, ES_DIR } = require('./constant');
const compileJs = require('./compile-js');
const compileStyle = require('./compile-style');

async function buildEs() {
  await copy(SRC_DIR, ES_DIR);
  await compileDir(ES_DIR);
}

async function compileDir(dir) {
  const files = readdirSync(dir);

  await Promise.all(
    files.map(filename => {
      const filePath = join(dir, filename);

      console.log(filePath)
      if (/(?<!\/es\/)demo$/.test(filePath)) {
        return remove(filePath);
      }

      if (lstatSync(filePath).isDirectory()) {
        return compileDir(filePath);
      } else {
        return compileFile(filePath);
      }
    })
  );
}

async function compileFile(filePath) {
  if (/\.vue$/.test(filePath)) { // vue
    return Promise.resolve();
  } else if (/\.js$/.test(filePath)) { // script
    return compileJs(filePath);
  } else if (/\.(css|less)$/.test(filePath)) { // style
    return compileStyle(filePath);
  } else if (/\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i.test(filePath)) { // asset
    return Promise.resolve();
  } else {
    return remove(filePath);
  }
}

async function build() {
  try {
    await remove(ES_DIR);
    await buildEs();
    console.log('Build successful');
  } catch (err) {
    console.error('Build failed', err);
    process.exit(1);
  }
};
build();