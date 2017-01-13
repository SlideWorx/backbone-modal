define(function(require, exports, module) {
  'use strict';

  var $ = require('jquery');

  module.exports = {
    /**
     * Handle keyboard strokes on modal.
     * @method modalKeyboard
     * @param {Event} ev jQuery Event object.
     * @returns {undefined|false} It depends if event has been blocked or not.
     */
    modalKeyboard: function(ev) {
      if ((ev.which !== 27) && (ev.which !== 13)) {
        return;
      }

      /* Check if current instance is the last open modal */
      if ($('.mw__wrapper.mw--open').last().children('.mw__container')[0] !== this.el) {
        return;
      }

      if (ev.which === 27) {
        this.modalCancel();
      } else {
        this.modalOk();
      }

      ev.stopImmediatePropagation();
      ev.preventDefault();

      return false;
    }
  };
});
