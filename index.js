define(function(require, exports, module) {
  require('./src/styles/base.scss');
  require('./src/styles/custom.scss');

  module.exports = require('./src/modalView');
});
