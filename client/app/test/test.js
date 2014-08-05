'use strict';

angular.module('xoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/test', {
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl'
      });
  });
