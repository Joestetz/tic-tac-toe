'use strict';

angular.module('xoApp')
  .factory('xoNotify', function () {
    return {
      success: function (msg, title) {
        toastr.success(msg, title);
      },
      error: function (msg, title) {
        toastr.error(msg, title);
      },
      info: function (msg, title) {
        toastr.info(msg, title);
      },
      warning: function (msg, title) {
        toastr.warning(msg, title);
      },
      clear: function() {
        toastr.clear();
      }
    };
  });
