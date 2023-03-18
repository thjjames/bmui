const commonStyle = [
  'color: #fff',
  'padding: 1px'
];
const style1 = [
  ...commonStyle,
  'background: #848484',
  'border-radius: 3px 0 0 3px'
].join(';');
const style2 = [
  ...commonStyle,
  'background: #1890FF',
  'border-radius: 0 3px 3px 0'
].join(';');
console.log('%c NODE_ENV %c %s ', style1, style2, process.env.NODE_ENV);
console.log('%c APP_MODE %c %s ', style1, style2, process.env.APP_MODE);
console.log('%c BUILD_TIME %c %s ', style1, style2, new Date(process.env.BUILD_TIME).toLocaleString());
