describe('Module: aioBlackContrast', function() {
  'use strict';
  var aioBlackContrast, rootScope;
  var blackUrl = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+f+iiigD/2Q==';
  var whiteUrl = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q==';

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
