"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var LightGalleryService_1 = require("./LightGalleryService");
var PhotoSwipeService_1 = require("./PhotoSwipeService");
var angular = require("angular");
var module = angular.module("ngLightgallery", [])
    .service("$lightGallery", LightGalleryService_1.default)
    .service("$photoswipe", PhotoSwipeService_1.default)
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
exports.default = module;
//# sourceMappingURL=module.js.map