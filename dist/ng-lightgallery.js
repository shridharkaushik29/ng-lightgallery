/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./LightGalleryService.js":
/*!********************************!*\
  !*** ./LightGalleryService.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\r\nvar angular = __webpack_require__(/*! angular */ \"angular\");\r\nvar LightGalleryService = /** @class */ (function () {\r\n    function LightGalleryService() {\r\n    }\r\n    LightGalleryService.prototype.open = function (options) {\r\n        var images = options.images;\r\n        var currentImage = options.currentImage || options.current;\r\n        var container = options.container || \"body\";\r\n        var index = options.index;\r\n        if (!index && index !== 0 && currentImage) {\r\n            index = _.indexOf(images, currentImage);\r\n        }\r\n        else {\r\n            index = 0;\r\n        }\r\n        var $images = _(images).map(function (image) {\r\n            var img = {};\r\n            if (_.isString(image)) {\r\n                img.src = image;\r\n                img.thumb = image;\r\n            }\r\n            else if (_.isObject(image)) {\r\n                img.src = image.url || image.src;\r\n                img.thumb = image.thumb || img.src;\r\n            }\r\n            return img;\r\n        }).value();\r\n        var $lg = angular.element(container);\r\n        var lgopt = __assign({}, options.lgoptions, { dynamic: true, index: index || 0, dynamicEl: $images });\r\n        if ($images.length) {\r\n            $lg.lightGallery(lgopt);\r\n            $lg.one(\"onCloseAfter.lg\", function () {\r\n                $lg.data('lightGallery').destroy(true);\r\n            });\r\n        }\r\n    };\r\n    return LightGalleryService;\r\n}());\r\nexports.default = LightGalleryService;\r\n//# sourceMappingURL=LightGalleryService.js.map\n\n//# sourceURL=webpack:///./LightGalleryService.js?");

/***/ }),

/***/ "./PhotoSwipeService.js":
/*!******************************!*\
  !*** ./PhotoSwipeService.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\r\nvar angular = __webpack_require__(/*! angular */ \"angular\");\r\nvar PhotoSwipeService = /** @class */ (function () {\r\n    function PhotoSwipeService() {\r\n    }\r\n    PhotoSwipeService.prototype.open = function (options) {\r\n        var images = options.images || [];\r\n        var index = options.index;\r\n        var currentImage = options.currentImage || options.current;\r\n        var container = options.container || \"body\";\r\n        if (!angular.element(container).children(\".pswp\").length) {\r\n            angular.element(container).append(\"\\n\\n        <div class=\\\"pswp\\\" tabindex=\\\"-1\\\" role=\\\"dialog\\\" aria-hidden=\\\"true\\\">\\n\\n            <!-- Background of PhotoSwipe.\\n                 It's a separate element as animating opacity is faster than rgba(). -->\\n            <div class=\\\"pswp__bg\\\"></div>\\n\\n            <!-- Slides wrapper with overflow:hidden. -->\\n            <div class=\\\"pswp__scroll-wrap\\\">\\n\\n                <!-- Container that holds slides.\\n                    PhotoSwipe keeps only 3 of them in the DOM to save memory.\\n                    Don't modify these 3 pswp__item elements, data is added later on. -->\\n                <div class=\\\"pswp__container\\\">\\n                    <div class=\\\"pswp__item\\\"></div>\\n                    <div class=\\\"pswp__item\\\"></div>\\n                    <div class=\\\"pswp__item\\\"></div>\\n                </div>\\n\\n                <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\\n                <div class=\\\"pswp__ui pswp__ui--hidden\\\">\\n\\n                    <div class=\\\"pswp__top-bar\\\">\\n\\n                        <!--  Controls are self-explanatory. Order can be changed. -->\\n\\n                        <div class=\\\"pswp__counter\\\"></div>\\n\\n                        <button class=\\\"pswp__button pswp__button--close\\\" title=\\\"Close (Esc)\\\"></button>\\n\\n                        <button class=\\\"pswp__button pswp__button--share\\\" title=\\\"Share\\\"></button>\\n\\n                        <button class=\\\"pswp__button pswp__button--fs\\\" title=\\\"Toggle fullscreen\\\"></button>\\n\\n                        <button class=\\\"pswp__button pswp__button--zoom\\\" title=\\\"Zoom in/out\\\"></button>\\n\\n                        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\\n                        <!-- element will get class pswp__preloader--active when preloader is running -->\\n                        <div class=\\\"pswp__preloader\\\">\\n                            <div class=\\\"pswp__preloader__icn\\\">\\n                              <div class=\\\"pswp__preloader__cut\\\">\\n                                <div class=\\\"pswp__preloader__donut\\\"></div>\\n                              </div>\\n                            </div>\\n                        </div>\\n                    </div>\\n\\n                    <div class=\\\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\\\">\\n                        <div class=\\\"pswp__share-tooltip\\\"></div>\\n                    </div>\\n\\n                    <button class=\\\"pswp__button pswp__button--arrow--left\\\" title=\\\"Previous (arrow left)\\\">\\n                    </button>\\n\\n                    <button class=\\\"pswp__button pswp__button--arrow--right\\\" title=\\\"Next (arrow right)\\\">\\n                    </button>\\n\\n                    <div class=\\\"pswp__caption\\\">\\n                        <div class=\\\"pswp__caption__center\\\"></div>\\n                    </div>\\n\\n                </div>\\n\\n            </div>\\n\\n        </div>\\n\\n        \");\r\n        }\r\n        var pswpElement = angular.element(container).children(\".pswp\");\r\n        if (!index && index !== 0 && currentImage) {\r\n            index = _.indexOf(images, currentImage);\r\n        }\r\n        else {\r\n            index = 0;\r\n        }\r\n        var $images = _(images).map(function (image) {\r\n            var img = {};\r\n            if (_.isString(image)) {\r\n                img.src = image;\r\n            }\r\n            else if (_.isObject(image)) {\r\n                img.src = image.url || image.src;\r\n            }\r\n            img.w = image.w || image.width || 0;\r\n            img.h = image.h || image.height || 0;\r\n            return img;\r\n        });\r\n        var lgopt = {\r\n            // history & focus options are disabled on CodePen\r\n            history: false,\r\n            focus: false,\r\n            index: index\r\n        };\r\n        if (options.targetEvent) {\r\n            lgopt.getThumbBoundsFn = function (index) {\r\n                var thumbnail = options.targetEvent.target, pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();\r\n                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };\r\n            };\r\n        }\r\n        _.merge(lgopt, options.photoswipeOptions);\r\n        // @ts-ignore\r\n        var $lg = new PhotoSwipe(pswpElement[0], PhotoSwipeUI_Default, $images, lgopt);\r\n        $lg.init();\r\n        $lg.listen('gettingData', function (index, item) {\r\n            if (item.w < 1 || item.h < 1) { // unknown size\r\n                var img = new Image();\r\n                img.onload = function () {\r\n                    // @ts-ignore\r\n                    item.w = this.width;\r\n                    // @ts-ignore\r\n                    item.h = this.height;\r\n                    $lg.invalidateCurrItems();\r\n                    $lg.updateSize(true);\r\n                };\r\n                img.src = item.src; // let's download image\r\n            }\r\n        });\r\n        return $lg;\r\n    };\r\n    return PhotoSwipeService;\r\n}());\r\nexports.default = PhotoSwipeService;\r\n//# sourceMappingURL=PhotoSwipeService.js.map\n\n//# sourceURL=webpack:///./PhotoSwipeService.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar module_1 = __webpack_require__(/*! ./module */ \"./module.js\");\r\nexports.default = module_1.default.name;\r\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./module.js":
/*!*******************!*\
  !*** ./module.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar _ = __webpack_require__(/*! lodash */ \"lodash\");\r\nvar LightGalleryService_1 = __webpack_require__(/*! ./LightGalleryService */ \"./LightGalleryService.js\");\r\nvar PhotoSwipeService_1 = __webpack_require__(/*! ./PhotoSwipeService */ \"./PhotoSwipeService.js\");\r\nvar angular = __webpack_require__(/*! angular */ \"angular\");\r\nvar module = angular.module(\"ngLightgallery\", [])\r\n    .service(\"$lightGallery\", LightGalleryService_1.default)\r\n    .service(\"$photoswipe\", PhotoSwipeService_1.default)\r\n    .directive(\"viewImage\", [\r\n    '$lightGallery',\r\n    '$photoswipe',\r\n    function ($lightGallery, $photoswipe) {\r\n        return {\r\n            restrict: \"A\",\r\n            require: {\r\n                photoswipe: \"?^^\"\r\n            },\r\n            link: function ($scope, element, attrs, ctrls) {\r\n                var gallery;\r\n                var photoswipe = ctrls.photoswipe;\r\n                if (photoswipe) {\r\n                    photoswipe.addImage(element[0]);\r\n                }\r\n                element.on(\"click\", function (e) {\r\n                    var options;\r\n                    if (photoswipe) {\r\n                        options = $scope.$eval(attrs.viewImage) || {};\r\n                        if (!options.images && element.attr('src')) {\r\n                            options.images = [element.attr('src')];\r\n                            options.index = 0;\r\n                        }\r\n                        options.photoswipeOptions = {};\r\n                        options.photoswipeOptions.getThumbBoundsFn = function (index) {\r\n                            var thumbnail = photoswipe.images()[index], // find thumbnail\r\n                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();\r\n                            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };\r\n                        };\r\n                        $scope.$apply(function () {\r\n                            gallery = $photoswipe.open(options);\r\n                        });\r\n                    }\r\n                    else {\r\n                        options = $scope.$eval(attrs.viewImage) || {};\r\n                        if (!options.images && element.attr('src')) {\r\n                            options.images = [element.attr('src')];\r\n                            options.index = 0;\r\n                        }\r\n                        $scope.$apply(function () {\r\n                            gallery = $lightGallery.open(options);\r\n                        });\r\n                    }\r\n                });\r\n                element.on('$destroy', function () {\r\n                    if (photoswipe) {\r\n                        photoswipe.removeImage(element[0]);\r\n                    }\r\n                    if (gallery && gallery.data('lightGallery')) {\r\n                        gallery.data('lightGallery').destroy(true);\r\n                    }\r\n                });\r\n            }\r\n        };\r\n    }\r\n])\r\n    .directive(\"photoswipe\", [\r\n    '$photoswipe',\r\n    function ($photoswipe) {\r\n        return {\r\n            controller: [\r\n                '$scope',\r\n                function ($scope) {\r\n                    var _this = this;\r\n                    this._images = [];\r\n                    this.images = function () { return _this._images; };\r\n                    this.addImage = function (image) { return _this._images.push(image); };\r\n                    this.removeImage = function (image) { return _.remove(_this._images, image); };\r\n                }\r\n            ]\r\n        };\r\n    }\r\n]);\r\nexports.default = module;\r\n//# sourceMappingURL=module.js.map\n\n//# sourceURL=webpack:///./module.js?");

/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = angular;\n\n//# sourceURL=webpack:///external_%22angular%22?");

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = _;\n\n//# sourceURL=webpack:///external_%22_%22?");

/***/ })

/******/ });