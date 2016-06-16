var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var BackboneModal = require('../../index');
var markup = require('text!./markup.html');

var CustomModal = BackboneModal.extend({
  template: _.template(markup),

  events: {
    'click .js-spawn': 'spawnNew'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  spawnNew: function() {
    return new CustomModal().render();
  }
});

var Application = Backbone.View.extend({
  events: {
    'click #open-modal': 'openModal'
  },

  openModal: function() {
    var modal = new CustomModal();

    modal.render();
  }
});

var module = {
  init: function() {
    var application = new Application({
      el: $('body')
    });
  }
};

module.init();
