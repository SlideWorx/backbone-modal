define(function(require, exports, module) {
  'use strict';

  var positionProvider = require('./positionProvider');

  module.exports = {

    /**
     * Fixes position of the modal to fit within visible area.
     * @method modalCheckPosition
     */
    modalCheckPosition: function() {
      this.$el.css(positionProvider.getPositionChange(this.$el));
    },

    /**
     * Centers modal window in viewport.
     * @method modalCenter
     */
    modalCenter: function() {
      this.$el.css(positionProvider.getCenter(this.$el));
    },

    /**
     * Position popup on screen.
     * @method modalSetPosition
     * @param {Number} x Desired X position.
     * @param {Number} y Desired Y position.
     * @param {Object} options Options for setting position.
     * @param {Number} options.padding What padding should be added to bounding of window or to position of cursor.
     * @param {String} options.vertical Vertical position. Possible values: 'auto', 'right', 'left', 'center'.
     * @param {String} options.horizontal Horizontal position. Possible values: 'auto', 'top', 'bottom', 'center'.
     * @returns {ModalView} Instance of modal view
     */
    modalSetPosition: function(x, y, options) {
      this.$el.css(positionProvider.getSetPosition(this.$el, x, y, options));
      return this;
    }
  };
});
