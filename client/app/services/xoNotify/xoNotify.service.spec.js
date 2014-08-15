'use strict';

describe('Service: xoNotify', function () {

  // load the service's module
  beforeEach(module('xoApp'));

  // instantiate service
  var xoNotify;
  beforeEach(inject(function (_xoNotify_) {
    xoNotify = _xoNotify_;
  }));

  it('should do something', function () {
    expect(!!xoNotify).toBe(true);
  });

});
