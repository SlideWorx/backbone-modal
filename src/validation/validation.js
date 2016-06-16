define(function(require, exports, module) {
  'use strict';

  module.exports = {
    /**
     * Locks modal window.
     *
     * @method modalLock
     * @param {Boolean} lockOK Indicator of locking OK button.
     *
     * @returns {ModalView} Instance of the modal.
     */
    modalLock: function(lockOK) {
      return this.modalLockToggle(true, lockOK);
    },

    /**
     * Unlocks locked modal window.
     *
     * @method modalUnlock
     * @param {Boolean} unlockOK Indicator of unlocking OK button.
     *
     * @returns {ModalView} Instance of the modal.
     */
    modalUnlock: function(unlockOK) {
      return this.modalLockToggle(false, !unlockOK);
    },

    /**
     * Locks modal content and/or OK button.
     *
     * @method modalLockToggle
     * @param {Boolean} lockContent Lock content by adding is-disabled class.
     * @param {Boolean} lockOK Lock OK button by adding is-disabled class.
     *
     * @returns {ModalView} Instance of the modal.
     */
    modalLockToggle: function(lockContent, lockOK) {
      this.$('.js-m-ok').toggleClass('is-disabled', lockOK);
      this.$('.js-m-content').toggleClass('is-disabled', lockContent);

      return this;
    },

    /**
     * Validates modal and then disables/enables ok button.
     *
     * @method modalValidate
     *
     * @returns {Boolean} Is modal valid.
     */
    modalValidate: function() {
      var isValid = this.modalIsValid();
      this.$('.js-m-ok').toggleClass('is-disabled', !isValid);
      return isValid;
    },

    /**
     * Check if modal is valid.
     *
     * @method modalIsValid
     *
     * @returns {Boolean} Is modal valid.
     */
    modalIsValid: function() {
      return !this.$('.has-error').length;
    }
  };
});
