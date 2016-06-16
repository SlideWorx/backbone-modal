define(function(require, exports, module) {
  'use strict';

  var _ = require('lodash');
  var keepInRange = require('../utils/keepInRange');
  var getDragContainer = require('../utils/getDragContainer');

  function calculateSetPosition(x, option, padding, popupSize, containerSize) {
    var value;

    switch (option) {
      case 'left':
      case 'top':
        value = padding + popupSize;
        break;
      case 'right':
      case 'bottom':
        value = -padding;
        break;
      case 'center':
        value = popupSize / 2;
        break;
      default:
        /* TODO make this more readable */
        if (x > (containerSize - popupSize) / 2 && x < (containerSize + popupSize) / 2) {
          // should be centered
          value = popupSize / 2;
        } else {
          // should be aligned to a side
          value = (x < containerSize / 2) ? -padding : padding + popupSize;
        }
        break;
    }

    return keepInRange(x - value, padding, containerSize - popupSize - padding);
  }

  module.exports = {
    getPositionChange: function($el) {
      var modalRect = $el[0].getBoundingClientRect();
      var dragRect = getDragContainer($el);
      return {
        top: keepInRange(modalRect.top, 0, dragRect.top + dragRect.height - modalRect.height, 0),
        left: keepInRange(modalRect.left, 0, dragRect.left + dragRect.width - modalRect.width, 0)
      };
    },
    getCenter: function($el) {
      var modalRect = $el[0].getBoundingClientRect();
      var dragRect = getDragContainer($el);
      return {
        top: Math.round(dragRect.top + (dragRect.height - modalRect.height) / 2),
        left: Math.round(dragRect.left + (dragRect.width - modalRect.width) / 2)
      };
    },
    getSetPosition: function($el, x, y, options) {
      options = _.extend({
        horizontal: 'auto', // possible values: auto, right, left, center
        vertical: 'auto', // possible values: auto, top, bottom, center
        padding: 10
      }, options);

      var popupRect = $el[0].getBoundingClientRect();
      var dragRect = getDragContainer($el);

      return {
        top: calculateSetPosition(y, options.vertical, options.padding, popupRect.height, dragRect.height),
        left: calculateSetPosition(x, options.horizontal, options.padding, popupRect.width, dragRect.width)
      };
    }
  };
});
