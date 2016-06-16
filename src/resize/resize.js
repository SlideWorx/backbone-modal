define(function(require, exports, module) {
  'use strict';

  var $ = require('jquery');
  var resizeProvider = require('./resizeProvider');

  var BODY = $('body');
  var WINDOW = $(window);

  module.exports = {
    /**
     * @method modalResizeRenderHandles
     * @return {undefined} Nothing is returned.
     */
    modalResizeRenderHandles: function() {
      this.$('.js-m-resize-handlers').off().remove();
      this.$el.append(resizeProvider.template);
    },

    /**
     * Handle start of resize event.
     * @method modalResizeStart
     * @param {Event} ev jQuery event object.
     * @return {ModalView} Instance of modal.
     */
    modalResizeStart: function(ev) {
      var $handle = $(ev.currentTarget);
      var resizeData = resizeProvider.getResizeData($handle, this.$el);
      BODY.css('cursor', $handle.css('cursor'));

      WINDOW
        .on('mousemove.mw__resize', resizeData, this.modalResizeMove)
        .one('mouseup.mw__resize', resizeData, this.modalResizeStop);

      return this;
    },

    /**
     * Handle of resize moving event
     * @method modalResizeMove
     * @param {Event} ev jQuery event object
     * @return {undefined} Nothing is returned.
     */
    modalResizeMove: function(ev) {
      var data = ev.data;
      this.$el.css(resizeProvider[data.dir](ev, data));
      this.modalOnResize(ev, data);
    },

    /**
     * Handle stop resizing event.
     * @method modalResizeStop
     * @param {Event} ev jQuery event object.
     * @return {undefined} Nothing is returned.
     */
    modalResizeStop: function(ev) {
      WINDOW.off('mousemove.mw__resize');
      BODY.css('cursor', '');
      this.modalOnResize(ev, ev.data);
    }
  };
});
