define(function(require, exports, module) {
  'use strict';

  var getDragContainer = require('../utils/getDragContainer');
  var keepInRange = require('../utils/keepInRange');

  module.exports = {
    getDragData: function(ev, $el) {
      var modalRect = $el[0].getBoundingClientRect();
      var dragRect = getDragContainer($el);
      return {
        padX: ev.pageX - modalRect.left,
        padY: ev.pageY - modalRect.top,
        left: dragRect.left,
        right: dragRect.width - modalRect.width + dragRect.left,
        top: dragRect.top,
        bottom: dragRect.height - modalRect.height + dragRect.top
      };
    },
    getDragChange: function(ev, data) {
      return {
        top: keepInRange(ev.pageY - data.padY, data.top, data.bottom),
        left: keepInRange(ev.pageX - data.padX, data.left, data.right)
      };
    }
  };
});
