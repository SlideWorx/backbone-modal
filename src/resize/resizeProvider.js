define(function(require, exports, module) {
  'use strict';

  var _ = require('lodash');
  var keeepInRange = require('../utils/keepInRange');
  var getDragContainer = require('../utils/getDragContainer');
  var markup = require('text!./resize.html');
  var template = _.template(markup);

  module.exports = {
    template: template,
    getResizeData: function($handle, $el) {
      var modalRect = $el[0].getBoundingClientRect();
      var dragRect = getDragContainer($el);
      var minHeight = parseInt($el.css('min-height'), 10);
      var minWidth = parseInt($el.css('min-width'), 10);
      return {
        dir: $handle.attr('data-dir'),
        top: modalRect.top,
        left: modalRect.left,
        right: modalRect.right,
        bottom: modalRect.bottom,
        ww: dragRect.width,
        wh: dragRect.height,
        nHeight: modalRect.bottom - minHeight,
        sHeight: modalRect.top + minHeight,
        wWidth: modalRect.right - minWidth,
        eWidth: modalRect.left + minWidth,
        minHeight: minHeight,
        minWidth: minWidth
      };
    },
    N: function(ev, resizeData) {
      var t = keeepInRange(ev.pageY, 0, resizeData.nHeight);
      return {
        top: t,
        height: resizeData.bottom - t
      };
    },
    S: function(ev, resizeData) {
      return {
        height: keeepInRange(ev.pageY, resizeData.sHeight, resizeData.wh) - resizeData.top
      };
    },
    W: function(ev, resizeData) {
      var l = keeepInRange(ev.pageX, 0, resizeData.wWidth);
      return {
        left: l,
        width: resizeData.right - l
      };
    },
    E: function(ev, resizeData) {
      return {
        width: keeepInRange(ev.pageX, resizeData.wWidth, resizeData.ww) - resizeData.left
      };
    },
    NE: function(ev, resizeData) {
      var t = keeepInRange(ev.pageY, 0, resizeData.nHeight);
      return {
        top: t,
        height: resizeData.bottom - t,
        width: keeepInRange(ev.pageX, resizeData.eWidth, resizeData.ww) - resizeData.left
      };
    },
    SE: function(ev, resizeData) {
      return {
        width: keeepInRange(ev.pageX, resizeData.eWidth, resizeData.ww) - resizeData.left,
        height: keeepInRange(ev.pageY, resizeData.sHeight, resizeData.wh) - resizeData.top
      };
    },
    SW: function(ev, resizeData) {
      var l = keeepInRange(ev.pageX, 0, resizeData.wWidth);
      return {
        left: l,
        width: resizeData.right - l,
        height: keeepInRange(ev.pageY, resizeData.sHeight, resizeData.wh) - resizeData.top
      };
    },
    NW: function(ev, resizeData) {
      var t = keeepInRange(ev.pageY, 0, resizeData.nHeight);
      var l = keeepInRange(ev.pageX, 0, resizeData.wWidth);
      return {
        left: l,
        top: t,
        width: resizeData.right - l,
        height: resizeData.bottom - t
      };
    }
  };

});
