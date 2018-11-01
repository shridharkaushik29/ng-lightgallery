"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var angular = require("angular");
var LightGalleryService = /** @class */ (function () {
    function LightGalleryService() {
    }
    LightGalleryService.prototype.open = function (options) {
        var images = options.images;
        var currentImage = options.currentImage || options.current;
        var container = options.container || "body";
        var index = options.index;
        if (!index && index !== 0 && currentImage) {
            index = _.indexOf(images, currentImage);
        }
        else {
            index = 0;
        }
        var $images = _(images).map(function (image) {
            var img = {};
            if (_.isString(image)) {
                img.src = image;
                img.thumb = image;
            }
            else if (_.isObject(image)) {
                img.src = image.url || image.src;
                img.thumb = image.thumb || img.src;
            }
            return img;
        }).value();
        var $lg = angular.element(container);
        var lgopt = __assign({}, options.lgoptions, { dynamic: true, index: index || 0, dynamicEl: $images });
        if ($images.length) {
            $lg.lightGallery(lgopt);
            $lg.one("onCloseAfter.lg", function () {
                $lg.data('lightGallery').destroy(true);
            });
        }
    };
    return LightGalleryService;
}());
var PhotoSwipeService = /** @class */ (function () {
    function PhotoSwipeService() {
    }
    PhotoSwipeService.prototype.open = function (options) {
        var images = options.images || [];
        var index = options.index;
        var currentImage = options.currentImage || options.current;
        var container = options.container || "body";
        if (!angular.element(container).children(".pswp").length) {
            angular.element(container).append("\n\n        <div class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n\n            <!-- Background of PhotoSwipe.\n                 It's a separate element as animating opacity is faster than rgba(). -->\n            <div class=\"pswp__bg\"></div>\n\n            <!-- Slides wrapper with overflow:hidden. -->\n            <div class=\"pswp__scroll-wrap\">\n\n                <!-- Container that holds slides.\n                    PhotoSwipe keeps only 3 of them in the DOM to save memory.\n                    Don't modify these 3 pswp__item elements, data is added later on. -->\n                <div class=\"pswp__container\">\n                    <div class=\"pswp__item\"></div>\n                    <div class=\"pswp__item\"></div>\n                    <div class=\"pswp__item\"></div>\n                </div>\n\n                <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n                <div class=\"pswp__ui pswp__ui--hidden\">\n\n                    <div class=\"pswp__top-bar\">\n\n                        <!--  Controls are self-explanatory. Order can be changed. -->\n\n                        <div class=\"pswp__counter\"></div>\n\n                        <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n\n                        <button class=\"pswp__button pswp__button--share\" title=\"Share\"></button>\n\n                        <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\n\n                        <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n\n                        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\n                        <!-- element will get class pswp__preloader--active when preloader is running -->\n                        <div class=\"pswp__preloader\">\n                            <div class=\"pswp__preloader__icn\">\n                              <div class=\"pswp__preloader__cut\">\n                                <div class=\"pswp__preloader__donut\"></div>\n                              </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\n                        <div class=\"pswp__share-tooltip\"></div>\n                    </div>\n\n                    <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">\n                    </button>\n\n                    <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">\n                    </button>\n\n                    <div class=\"pswp__caption\">\n                        <div class=\"pswp__caption__center\"></div>\n                    </div>\n\n                </div>\n\n            </div>\n\n        </div>\n\n        ");
        }
        var pswpElement = angular.element(container).children(".pswp");
        if (!index && index !== 0 && currentImage) {
            index = _.indexOf(images, currentImage);
        }
        else {
            index = 0;
        }
        var $images = _(images).map(function (image) {
            var img = {};
            if (_.isString(image)) {
                img.src = image;
            }
            else if (_.isObject(image)) {
                img.src = image.url || image.src;
            }
            img.w = image.w || image.width || 0;
            img.h = image.h || image.height || 0;
            return img;
        });
        var lgopt = {
            // history & focus options are disabled on CodePen
            history: false,
            focus: false,
            index: index
        };
        if (options.targetEvent) {
            lgopt.getThumbBoundsFn = function (index) {
                var thumbnail = options.targetEvent.target, pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            };
        }
        _.merge(lgopt, options.photoswipeOptions);
        // @ts-ignore
        var $lg = new PhotoSwipe(pswpElement[0], PhotoSwipeUI_Default, $images, lgopt);
        $lg.init();
        $lg.listen('gettingData', function (index, item) {
            if (item.w < 1 || item.h < 1) { // unknown size
                var img = new Image();
                img.onload = function () {
                    // @ts-ignore
                    item.w = this.width;
                    // @ts-ignore
                    item.h = this.height;
                    $lg.invalidateCurrItems();
                    $lg.updateSize(true);
                };
                img.src = item.src; // let's download image
            }
        });
        return $lg;
    };
    return PhotoSwipeService;
}());
angular.module("ngLightgallery", [])
    .service("$lightGallery", LightGalleryService)
    .service("$photoswipe", PhotoSwipeService)
    .directive("viewImage", [
    '$lightGallery',
    '$photoswipe',
    function ($lightGallery, $photoswipe) {
        return {
            restrict: "A",
            require: {
                photoswipe: "?^^"
            },
            link: function ($scope, element, attrs, ctrls) {
                var gallery;
                var photoswipe = ctrls.photoswipe;
                if (photoswipe) {
                    photoswipe.addImage(element[0]);
                }
                element.on("click", function (e) {
                    var options;
                    if (photoswipe) {
                        options = $scope.$eval(attrs.viewImage) || {};
                        if (!options.images && element.attr('src')) {
                            options.images = [element.attr('src')];
                            options.index = 0;
                        }
                        options.photoswipeOptions = {};
                        options.photoswipeOptions.getThumbBoundsFn = function (index) {
                            var thumbnail = photoswipe.images()[index], // find thumbnail
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();
                            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                        };
                        $scope.$apply(function () {
                            gallery = $photoswipe.open(options);
                        });
                    }
                    else {
                        options = $scope.$eval(attrs.viewImage) || {};
                        if (!options.images && element.attr('src')) {
                            options.images = [element.attr('src')];
                            options.index = 0;
                        }
                        $scope.$apply(function () {
                            gallery = $lightGallery.open(options);
                        });
                    }
                });
                element.on('$destroy', function () {
                    if (photoswipe) {
                        photoswipe.removeImage(element[0]);
                    }
                    if (gallery && gallery.data('lightGallery')) {
                        gallery.data('lightGallery').destroy(true);
                    }
                });
            }
        };
    }
])
    .directive("photoswipe", [
    '$photoswipe',
    function ($photoswipe) {
        return {
            controller: [
                '$scope',
                function ($scope) {
                    var _this = this;
                    this._images = [];
                    this.images = function () { return _this._images; };
                    this.addImage = function (image) { return _this._images.push(image); };
                    this.removeImage = function (image) { return _.remove(_this._images, image); };
                }
            ]
        };
    }
]);
//# sourceMappingURL=index.js.map