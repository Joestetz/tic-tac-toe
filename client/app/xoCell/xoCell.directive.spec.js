'use strict';

describe('Directive: xoCell', function () {

  // load the directive's module and view
  beforeEach(module('xoApp'));
  beforeEach(module('app/xoCell/xoCell.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<xo-cell></xo-cell>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the xoCell directive');
  }));
});