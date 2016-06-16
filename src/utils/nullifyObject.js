define(function(require, exports, module) {
  'use strict';

  var _ = require('lodash');


  /**
   * Nullifies All properties to avoid memory leaks.
   * @param {Object} Object o nullify
   * @return {Boolean} False if passed argument is not an object, true otherwise.
   */
  function nullifyObject(obj) {
    if (!_.isObject(obj)){
      return false;
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop] = null;
      }
    }
    return true;
  }

  module.exports = nullifyObject;
});
