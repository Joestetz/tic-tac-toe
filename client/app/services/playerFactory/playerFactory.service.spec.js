'use strict';

describe('Service: playerFactory', function () {

  // load the service's module
  beforeEach(module('xoApp'));

  // instantiate service
  var playerFactory;
  beforeEach(inject(function (_playerFactory_) {
    playerFactory = _playerFactory_;
  }));

  it('should do something', function () {
    expect(!!playerFactory).toBe(true);
  });

});
