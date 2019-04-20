"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var angular = require("angular");
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
exports.default = PhotoSwipeService;
//# sourceMappingURL=PhotoSwipeService.js.map