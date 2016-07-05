define(function(require, exports, module) {
  'use strict';

  var $ = require('jquery');
  var Backbone = require('backbone');
  var nullifyObject = require('../utils/nullifyObject');

  var WINDOW = $(window);

  module.exports = {
    closeAnimationTime: 300,

    /**
     * Renders modal window and shows it to the user.
     * @method render
     */
    render: function() {
      /* Check if we want to render resize controls */
      if (this.modalIsResizeable) {
        this.modalResizeRenderHandles();
      }
      /*
       If this.$el is already appended, don't repeat the process.
       In theory we could just check for mw__container class.
       However checking for valid parent is much safer.
       */
      var $wrapper = this.$el.parent();
      if ($wrapper.length && $wrapper.hasClass('mw__wrapper')) {
        return;
      }

      $wrapper = $('<div class="mw__wrapper"/>');

      if (this.modalHasBackground) {
        $wrapper.append($('<div class="mw__background"/>').on('click', this.modalCancel));
      }

      $wrapper
        .append(this.$el.addClass('mw__container'))
        .appendTo('body')
        .addClass('mw--open');

      this.modalCenter();

      WINDOW
        .on('keydown.mw__keybinds-' + this.cid, this.modalKeyboard)
        .on('resize.mw__resize-' + this.cid, this.modalCheckPosition);
    },
    /**
     * Unbinds events, starts animation of closing modal.
     * @method remove
     */
    remove: function() {
      /* This is just security check for cases where modal is closed more than once. */
      if (this.removed) {
        return;
      }
      this.removed = true;
      WINDOW.off('keydown.mw__keybinds-' + this.cid).off('resize.mw__resize-' + this.cid);
      this.$el.parent().removeClass('mw--open').addClass('mw--close');
      setTimeout(this.modalRemove, this.closeAnimationTime);
    },

    /**
     * Removes element from the DOM. Also calls `modalOnHide()` method.
     * @method modalRemove
     * @returns {ModalView} Instance
     */
    modalRemove: function() {
      var $parent = this.$el.parent();
      this.modalOnHide();
      Backbone.View.prototype.remove.apply(this, arguments);
      $parent.remove();
      nullifyObject(this);
      this.removed = true;
      return this;
    }
  };
});
