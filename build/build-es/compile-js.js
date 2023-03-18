const { transformAsync } = require('@babel/core');
const { readFileSync, removeSync, outputFileSync } = require('fs-extra');

// "import App from 'App.vue';" => "import App from 'App.xxx';"
function replaceScriptImportExt(code, from, to) {
  const importLines = matchImports(code);

  importLines.forEach((importLine) => {
    const result = importLine.replace(from, to);
    code = code.replace(importLine, result);
  });

  return code;
}
function matchImports(code) {
  const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
  return code.match(IMPORT_RE) || [];
}

module.exports = function(filePath) {
  return new Promise((resolve, reject) => {
    let code = readFileSync(filePath, 'utf-8');
    // code = replaceScriptImportExt(code, '.vue', '');

    transformAsync(code, { filename: filePath }).then(result => {
      if (result) {
        removeSync(filePath);
        outputFileSync(filePath, result.code);
        resolve();
      }
    }).catch(reject);
  });
}
