/*!
 *    aio.black-contrast
 *    Check if the best contrast for an image is black (or white)
 *    https://github.com/appstrio/angular-black-contrast
 *    by Gilad Peleg
 *    MIT License
 */
angular.module('aio.image.black-contrast', []);
angular.module('aio.image.black-contrast').factory('aioBlackContrast', [
  '$q',
  '$rootScope',
  function ($q, $rootScope) {
    'use strict';
    /**
     * _blackContrast
     * Use an equation to determine whether to use black as contrast from rgb
     *
     * @private
     * @param {Object} rgb the rgb object to test
     * @param {Number} rgb.red
     * @param {Number} rgb.green
     * @param {Number} rgb.blue
     * @return {Boolean}
     */
    var _blackContrast = function (rgb) {
      var gamma = 2.2;
      var l = 0.2126 * Math.pow(rgb.red / 100, gamma) + 0.7152 * Math.pow(rgb.green / 100, gamma) + 0.0722 * Math.pow(rgb.blue / 100, gamma);
      return l > 0.5;
    };
    /**
     * _loop
     *
     * @private
     * @param x
     * @param y
     * @param callback
     * @return
     */
    var _loop = function (x, y, callback) {
      var i, j;
      for (i = 0; i < x; i++) {
        for (j = 0; j < y; j++) {
          callback(i, j);
        }
      }
    };
    /**
     * _parseImage
     *
     * @private
     * @param sourceImageData
     * @param width
     * @param height
     * @return
     */
    var _parseImage = function (sourceImageData, width, height) {
      var data = {};
      var pixelCount = 0;
      var redTotal = 0;
      var greenTotal = 0;
      var blueTotal = 0;
      _loop(height, width, function (verticalPos, horizontalPos) {
        var offset = (verticalPos * width + horizontalPos) * 4;
        var red = sourceImageData[offset];
        var green = sourceImageData[offset + 1];
        var blue = sourceImageData[offset + 2];
        pixelCount++;
        redTotal += red / 255 * 100;
        greenTotal += green / 255 * 100;
        blueTotal += blue / 255 * 100;
      });
      data.red = Math.floor(redTotal / pixelCount);
      data.green = Math.floor(greenTotal / pixelCount);
      data.blue = Math.floor(blueTotal / pixelCount);
      return data;
    };
    //use imagedata to determine if image best contrast is black (or white)
    var contrastFromImageData = function (imageData, width, height) {
      var imageRgb = _parseImage(imageData.data, width, height);
      return _blackContrast(imageRgb);
    };
    var contrastFromUrl = function (imageUrl, isCrossDomain) {
      var deferred = $q.defer();
      var img;
      //default is to use crossdomain image
      isCrossDomain = typeof isCrossDomain !== 'undefined' ? isCrossDomain : true;
      // Create original image
      img = new Image();
      //img load event
      img.onload = function () {
        var canvasCopy = document.createElement('canvas'), ctxCopy = canvasCopy.getContext('2d');
        // Draw original image in second canvas
        canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        ctxCopy.drawImage(img, 0, 0);
        var imageData = ctxCopy.getImageData(0, 0, img.width, img.height);
        var shouldUseBlack = contrastFromImageData(imageData, img.width, img.height);
        $rootScope.$apply(function () {
          deferred.resolve(shouldUseBlack);
        });
      };
      img.onerror = function (e) {
        $rootScope.$apply(function () {
          deferred.reject(e);
        });
      };
      //need for web cross domain requests
      if (isCrossDomain) {
        img.crossOrigin = 'anonymous';
      }
      img.src = imageUrl;
      return deferred.promise;
    };
    return {
      contrastFromUrl: contrastFromUrl,
      contrastFromImageData: contrastFromImageData
    };
  }
]);