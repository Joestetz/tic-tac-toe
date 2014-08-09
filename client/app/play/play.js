'use strict';

angular.module('xoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play', {
        templateUrl: 'app/play/play.html',
        controller: 'PlayCtrl'
      });
  });
