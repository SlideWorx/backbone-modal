define(function(require, exports, module) {
  'use strict';

  module.exports = function keepInRange(value, min, max) {
    return Math.round((value > max) ? max : (value < min ? min : value));
  };
});
