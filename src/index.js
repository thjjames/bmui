/**
 * 业务组件
 */
import Gantt from './gantt';

const components = {
  Gantt,
};
const install = function (Vue) {
  if (install.installed) return;

  Object.keys(components).forEach((key) => {
    Vue.component(`Bmui${key}`, components[key]);
  });
};
const BMUI = {
  install,
  ...components,
};
export default BMUI;
