'use strict';

describe('Service: scoreFactory', function () {

  // load the service's module
  beforeEach(module('xoApp'));

  // instantiate service
  var scoreFactory;
  beforeEach(inject(function (_scoreFactory_) {
    scoreFactory = _scoreFactory_;
  }));

  it('should do something', function () {
    expect(!!scoreFactory).toBe(true);
  });

});
