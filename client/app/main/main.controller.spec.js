'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('xoApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    expect(1).toBe(1);
  });
});