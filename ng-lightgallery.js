angular.module("ngLightgallery", [])

        .factory('$lightGallery', ['$q', function ($q) {
                var service = {};

                service.open = function (options) {
                    var images = options.images || [];
                    var currentImage = options.currentImage || options.current;
                    var index = options.index;
                    var container = options.container || "body";

                    if (!index && index !== 0 && currentImage) {
                        index = images.indexOf(currentImage);
                    } else {
                        index = 0;
                    }

                    images = images.map(function (image) {
                        var img = {};
                        if (_.isString(image)) {
                            img.src = image;
                            img.thumb = image;
                        } else if (_.isObject(image)) {
                            img.src = image.url || image.src;
                            img.thumb = image.thumb || img.src;
                        }
                        return img;
                    })

                    var $lg = angular.element(container);

                    var lgopt = {};
                    _.merge(lgopt, options.lgoptions)

                    lgopt.dynamic = true;
                    lgopt.index = index;
                    lgopt.dynamicEl = images;

                    if (images.length) {
                        $lg.lightGallery(lgopt)

                        $lg.one("onCloseAfter.lg", function () {
                            $lg.data('lightGallery').destroy(true)
                        })
                    }

                    return $lg;
                }

                return service;
            }
        ])

        .directive("viewImage", ['$lightGallery', function ($lightGallery) {
                return {
                    restrict: "A",
                    link: function ($scope, element, attrs) {
                        var gallery;
                        element.on("click", function (e) {
                            var options = $scope.$eval(attrs.viewImage) || {};
                            if (!options.images && element.attr('src')) {
                                options.images = [element.attr('src')];
                                options.index = 0;
                            }
                            $scope.$apply(function () {
                                gallery = $lightGallery.open(options);
                            })
                        })

                        element.on('$destroy', function () {
                            if (gallery && gallery.data('lightGallery')) {
                                gallery.data('lightGallery').destroy(true)
                            }
                        })
                    }
                }
            }
        ])