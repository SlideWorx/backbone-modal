define(function(require, exports, module) {
  'use strict';

  var $ = require('jquery');
  var dragProvider = require('./dragProvider');

  var WINDOW = $(window);

  module.exports = {
    /**
     * Handles start of dragging window.     *
     * @method modalDragStart
     * @param {Event} ev Event object
     */
    modalDragStart: function(ev) {
      var dragData = dragProvider.getDragData(ev, this.$el);
      this.$el.parent().addClass('mw-move');

      WINDOW
        .one('mouseup.mw__drag', dragData, this.modalDragStop)
        .on('mousemove.mw__drag', dragData, this.modalDragMove);
    },

    /**
     * Handle drag window.     *
     * @method modalDragMove
     * @param {Event} ev Event object
     */
    modalDragMove: function(ev) {
      this.$el.css(dragProvider.getDragChange(ev, ev.data));
      this.modalOnDrag(ev, ev.data);
    },

    /**
     * Handles event when user stops dragging of the modal.
     *
     * @method modalDragStop
     */
    modalDragStop: function(ev) {
      WINDOW.off('.mw__drag');
      this.$el.css(dragProvider.getDragChange(ev, ev.data)).parent().removeClass('mw-move');
      this.modalOnDrag(ev, ev.data);
    }
  };
});
