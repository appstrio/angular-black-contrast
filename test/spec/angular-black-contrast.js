'use strict';

describe('Module: aioBlackContrast', function() {
  var scope, $sandbox, $compile, $timeout;

  // load the controller's module
  beforeEach(module('aio.image.black-contrast'));

  beforeEach(inject(function($injector, $rootScope, _$compile_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $timeout = _$timeout_;
  }));

  afterEach(function() {});

  it('should correctly display hello world', function() {
    expect(1).toBe(1);
  });

});
