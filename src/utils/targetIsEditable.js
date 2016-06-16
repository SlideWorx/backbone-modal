define(function(require, exports, module) {
  'use strict';

  module.exports = function targetIsEditable(ev) {
    var type;
    var tagName;
    var target = ev.srcElement || ev.target;

    if (!target.readOnly && !target.disabled) {
      tagName = target.tagName.toUpperCase();
      if (tagName === 'TEXTAREA') {
        return true;
      } else {
        if (tagName === 'INPUT') {
          type = target.type.toUpperCase();
          return (type === 'TEXT') || (type === 'PASSWORD') || (type === 'FILE');
        }
      }
    }
    return false;
  };
});
