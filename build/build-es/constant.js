const { join } = require('path');
const CWD = process.cwd();

module.exports = {
  CWD,
  SRC_DIR: join(CWD, 'src'),
  ES_DIR: join(CWD, 'es')
};