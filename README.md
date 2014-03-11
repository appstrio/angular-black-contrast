# angular-black-contrast
> Check if the best contrast for an image is black (or white)

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Getting Started

Download the [production version][min] or the [development version][max].

In your web page:

```html
<script src="angular.js"></script>
<script src="dist/aio-black-contrast.min.js"></script>
```

## Documentation

Inject the module in your Angular app like so:
```js
angular.module('yourAngularApp', ['aio.image.black-contrast']);
```

Then when you need to use the Black Contrast tool you inject it into your controller/factory like so:
```js
myApp.factory('yourCoolFactory', ['aioBlackContrast', function(){
}])
```

## API & Usage

You can check whether an image url (or base64) best contrast is black or white using the following:
```js
aioBlackContrast.contrastFromUrl('http://www.yourdomain.com/someimage.jpg')
  .then(function(shouldUseBlack){
    // -> True/False
  })
```

**aioBlackContrast** has 1 public API:

```jsdoc
/**
  * contrastFromUrl
  *
  * @param {String} imageUrl image url or base64 to test
  * @param {Booelan} [isCrossDomain] should cross domain requests be used
  * @return {@promise}
  **/
```

## License
MIT Copyright (c) 2014 Appstr.io

[min]: https://raw.github.com/appstrio/angular-black-contrast/master/dist/angular-black-contrast.min.js
[max]: https://raw.github.com/appstrio/angular-black-contrast/master/dist/angular-black-contrast.js
