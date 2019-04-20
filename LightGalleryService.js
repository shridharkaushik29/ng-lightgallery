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
exports.default = LightGalleryService;
//# sourceMappingURL=LightGalleryService.js.map