define(function(require, exports, module) {
  'use strict';

  /*
   This is base View for modal views.
   Implements most basic methods. All of them except "render" can be overwritten,
   however You might need to only overwrite "modalIsValid".
   Refer to ModalView.extend at the bottom of the file for more enlightment.
   */

  var _ = require('lodash');
  var Backbone = require('backbone');

  var dragMethods = require('./drag/drag');
  var keyboardMethods = require('./keyboard/keyboard');
  var positionMethods = require('./position/position');
  var resizeMethods = require('./resize/resize');
  var domMethods = require('./dom/dom');
  var validationMethods = require('./validation/validation');

  /* To avoid extra binds, these methods will be bound to instance on initialization */
  var boundMethods = [
    'Cancel', 'Keyboard', 'CheckPosition', 'DragStop', 'DragMove', 'Remove', 'ResizeMove', 'ResizeStop'
  ];

  /* Event hooks - optional functions that can be called during certain events */
  var eventHookMethods = ['Show', 'Hide', 'Resize', 'Drag'];

  /**
   * @module components/modal/modalView
   *
   * @example
   * var modal = new ModalView();
   * modal.render();
   */
  var ModalView = Backbone.View
    .extend(dragMethods)
    .extend(keyboardMethods)
    .extend(positionMethods)
    .extend(domMethods)
    .extend(resizeMethods)
    .extend(validationMethods)
    .extend({

      attributes: {
        'class': 'mw__container'
      },

      events: {
        'click.modal .js-m-cancel:not(.is-disabled)': 'modalCancel',
        'click.modal .js-m-close:not(.is-disabled)': 'modalCancel',
        'click.modal .js-m-ok:not(.is-disabled)': 'modalOk',
        'mousedown.modal .js-m-draggable': 'modalDragStart',
        'mousedown.modal .js-m-resize-handle': 'modalResizeStart'
      },

      modalHasBackground: true,

      modalCloseOnOk: true,

      modalIsResizeable: false,

      /**
       * Initialize of the modal window.
       * @method initialize
       */
      initialize: function() {
        boundMethods
          .map(function(method) {
            return 'modal' + method;
          })
          .forEach(function(methodName) {
            this[methodName] = this[methodName].bind(this);
          }, this);

        eventHookMethods
          .map(function(method) {
            return 'modalOn' + method;
          })
          .forEach(function(methodName) {
            if (this[methodName] && _.isFunction(this[methodName])) {
              this[methodName] = this[methodName].bind(this);
            } else {
              this[methodName] = _.identity;
            }
          }, this);
      },

      /**
       * Sends returned data to 'modal-close' trigger.
       * @method modal
       * @returns {Object} Any data which will be passed to 'modal-close' trigger.
       */
      modalSerialize: function() {
        return {};
      },

      /**
       * Handles click events on 'OK' button.
       * @method modalOk
       */
      modalOk: function() {
        if (!this.modalValidate()) {
          return;
        }
        this.trigger('modal-close', this.modalSerialize(), this);
        if (this.modalCloseOnOk) {
          this.remove();
        }
      },

      /**
       * Handles click events on 'Cancel' button.
       * @method modalCancel
       */
      modalCancel: function() {
        this.trigger('modal-close', false, this);
        this.remove();
      }
    });

  /**
   * Extend method.
   *
   * @method extend
   * @param {Object|ModalView} child View to which should extend parent view.
   * @returns {ModalView} Extended view.
   */
  ModalView.extend = function(child) {
    var view;
    var childRender = child.render;
    var childInitialize = child.initialize;
    var childRemove = child.remove;

    /* Make sure descendant view has render function */
    if (!childRender || !_.isFunction(childRender)) {
      throw new Error('View must have "render" function declared.');
    }

    /* Standard extend */
    view = Backbone.View.extend.apply(this, arguments);

    /* Extend ModalView events with descendant events */
    view.prototype.events = _.extend({}, this.prototype.events, child.events);

    /**
     * Mixin ModalView render with decendant view.
     * Make sure we always return view, not anything else.
     *
     * @method render
     * @param {Object} options Options for modal view.
     *
     * @returns {ModalView} Instance of view.
     */
    view.prototype.render = function(options) {
      childRender.call(this, options);
      ModalView.prototype.render.call(this, options);
      this.modalOnShow();

      return this;
    };

    /* Mixin ModalView initialize with descendant view. */
    if (childInitialize && _.isFunction(childInitialize)) {
      view.prototype.initialize = function(options) {
        ModalView.prototype.initialize.call(this, options);
        return childInitialize.call(this, options);
      };
    }

    if (childRemove && _.isFunction(childRemove)) {
      view.prototype.remove = function(options) {
        ModalView.prototype.remove.call(this, options);
        return childRemove.call(this, options);
      };
    }

    return view;
  };

  module.exports = ModalView;
});
