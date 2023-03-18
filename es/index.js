import _objectSpread from "/Users/james/Documents/bmui/node_modules/@babel/runtime/helpers/esm/objectSpread2";
import "core-js/modules/web.dom-collections.for-each.js";

/**
 * 业务组件
 */
import Gantt from './gantt';
const components = {
  Gantt
};

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(key => {
    Vue.component(`Bmui${key}`, components[key]);
  });
};

const BMUI = _objectSpread({
  install
}, components);

export default BMUI;