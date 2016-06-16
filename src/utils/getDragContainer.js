define(function(require, exports, module) {
  'use strict';

  module.exports = function getDragContainer($el) {
    var bg = $el.siblings('.mw__background');
    if (bg.length) {
      return bg[0].getBoundingClientRect();
    }
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
});
