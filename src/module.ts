import * as _ from "lodash";
import LightGalleryService from "./LightGalleryService";
import PhotoSwipeService from "./PhotoSwipeService";
import * as angular from "angular";

const module = angular.module("ngLightgallery", [])

    .service("$lightGallery", LightGalleryService)

    .service("$photoswipe", PhotoSwipeService)

    .directive("viewImage", [
        '$lightGallery',
        '$photoswipe',
        ($lightGallery: LightGalleryService, $photoswipe: PhotoSwipeService) => {
            return {
                restrict: "A",
                require: {
                    photoswipe: "?^^"
                },
                link: function ($scope, element, attrs, ctrls: any) {
                    let gallery;
                    let photoswipe = ctrls.photoswipe;

                    if (photoswipe) {
                        photoswipe.addImage(element[0])
                    }

                    element.on("click", function (e) {
                        let options;
                        if (photoswipe) {
                            options = $scope.$eval(attrs.viewImage) || {};
                            if (!options.images && element.attr('src')) {
                                options.images = [element.attr('src')];
                                options.index = 0;
                            }
                            options.photoswipeOptions = {};
                            options.photoswipeOptions.getThumbBoundsFn = function (index) {
                                const thumbnail = photoswipe.images()[index], // find thumbnail
                                    pageYScroll =
                                        window.pageYOffset || document.documentElement.scrollTop,
                                    rect = thumbnail.getBoundingClientRect();

                                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                            }
                            $scope.$apply(function () {
                                gallery = $photoswipe.open(options);
                            })
                        } else {
                            options = $scope.$eval(attrs.viewImage) || {};
                            if (!options.images && element.attr('src')) {
                                options.images = [element.attr('src')];
                                options.index = 0;
                            }
                            $scope.$apply(function () {
                                gallery = $lightGallery.open(options);
                            })
                        }
                    })

                    element.on('$destroy', function () {
                        if (photoswipe) {
                            photoswipe.removeImage(element[0]);
                        }
                        if (gallery && gallery.data('lightGallery')) {
                            gallery.data('lightGallery').destroy(true)
                        }
                    })
                }
            }
        }
    ])

    .directive("photoswipe", [
        '$photoswipe',
        ($photoswipe) => {
            return {
                controller: [
                    '$scope',
                    function ($scope) {
                        this._images = []
                        this.images = () => this._images;
                        this.addImage = image => this._images.push(image);
                        this.removeImage = image => _.remove(this._images, image);
                    }
                ]
            }
        }
    ])


export default module;
