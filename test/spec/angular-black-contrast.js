describe('Module: aioBlackContrast', function() {
  'use strict';
  var aioBlackContrast, rootScope;

  var blackUrl = 'http://www.computerweekly.com/blogs/inspect-a-gadget/Eric/Black.jpg';
  var whiteUrl = 'http://www.ledr.com/colours/white.jpg';

  // load the controller's module
  beforeEach(module('aio.image.black-contrast'));

  //get factory
  beforeEach(inject(function($injector) {
    aioBlackContrast = $injector.get('aioBlackContrast');
    rootScope = $injector.get('$rootScope');
  }));

  it('module should load correctly', function() {
    expect(aioBlackContrast).toBeTruthy();
    expect(aioBlackContrast.contrastFromImageData).toBeDefined();
    expect(aioBlackContrast.contrastFromUrl).toBeDefined();
    expect(aioBlackContrast.loop).toBeUndefined();
  });

  describe('contrastFromUrl with mock response', function() {
    //get factory
    beforeEach(inject(function($injector) {
      var q = $injector.get('$q');
      var deferred = q.defer();
      deferred.resolve('resolveData');
      spyOn(aioBlackContrast, 'contrastFromUrl').andReturn(deferred.promise);
    }));

    it('test contrast from url', function() {
      aioBlackContrast.contrastFromUrl(blackUrl).then(function(data) {
        expect(data).toBeTruthy();
        expect(data).toBe('resolveData');
        expect(data).not.toBe(Boolean);
      });

      rootScope.$apply();
    });
  });

  it('test contrastFromUrl - black image', function() {
    var done;
    aioBlackContrast.contrastFromUrl(blackUrl, true).then(function(data) {
      expect(data).toBeFalsy();
      done = true;
    });

    rootScope.$apply();
    waitsFor(function() {
      return done;
    });
  });

  it('test contrastFromUrl - white image', function() {
    var done;
    aioBlackContrast.contrastFromUrl(whiteUrl, true).then(function(data) {
      expect(data).toBeTruthy();
      done = true;
    });

    rootScope.$apply();
    waitsFor(function() {
      return done;
    });
  });
});
