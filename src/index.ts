import * as _ from "lodash";
import * as angular from "angular";
import {IPromise} from "angular";
// import PhotoSwipe from "photoswipe";

declare global {
    interface JQLite {
        lightGallery(options: any): this
    }
}

interface GalleryOptions {
    images?: string[] | GalleryImage[],
    currentImage?: string | GalleryImage,
    current?: string | GalleryImage,
    container: string | JQuery,
    index: number,
    lgoptions?: any
}

interface LightGalleryOptions extends GalleryOptions {
}

interface PhotoSwipeOptions extends GalleryOptions {
}

interface GalleryImage {
    url?: string,
    src?: string,
    thumb?: string,
    width?: number,
    height?: number,
    w?: number,
    h?: number
}

class LightGalleryService {

    open(options: LightGalleryOptions): any {
        let images = options.images;
        const currentImage = options.currentImage || options.current;
        const container = options.container || "body";
        let index = options.index;

        if (!index && index !== 0 && currentImage) {
            index = _.indexOf(images, currentImage);
        } else {
            index = 0;
        }

        let $images = _(images).map(function (image: GalleryImage | string) {
            let img: GalleryImage = {}
            if (_.isString(image)) {
                img.src = image;
                img.thumb = image;
            } else if (_.isObject(image)) {
                img.src = image.url || image.src;
                img.thumb = image.thumb || img.src;
            }
            return img;
        }).value();

        const $lg = angular.element(container);

        const lgopt = {
            ...options.lgoptions,
            dynamic: true,
            index: index || 0,
            dynamicEl: $images
        }

        if ($images.length) {
            $lg.lightGallery(lgopt)
            $lg.one("onCloseAfter.lg", function () {
                $lg.data('lightGallery').destroy(true)
            })
        }

    }
}

class PhotoSwipeService {
    open(options): any {
        let images = options.images || [];
        let index = options.index;
        const currentImage = options.currentImage || options.current;
        const container = options.container || "body";

        if (!angular.element(container).children(".pswp").length) {


            angular.element(container).append(`

        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

            <!-- Background of PhotoSwipe.
                 It's a separate element as animating opacity is faster than rgba(). -->
            <div class="pswp__bg"></div>

            <!-- Slides wrapper with overflow:hidden. -->
            <div class="pswp__scroll-wrap">

                <!-- Container that holds slides.
                    PhotoSwipe keeps only 3 of them in the DOM to save memory.
                    Don't modify these 3 pswp__item elements, data is added later on. -->
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>

                <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                <div class="pswp__ui pswp__ui--hidden">

                    <div class="pswp__top-bar">

                        <!--  Controls are self-explanatory. Order can be changed. -->

                        <div class="pswp__counter"></div>

                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                        <button class="pswp__button pswp__button--share" title="Share"></button>

                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                        <!-- element will get class pswp__preloader--active when preloader is running -->
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                              <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>

                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>

                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>

                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>

                </div>

            </div>

        </div>

        `)

        }

        const pswpElement = angular.element(container).children(".pswp");

        if (!index && index !== 0 && currentImage) {
            index = images.indexOf(currentImage);
        } else {
            index = 0;
        }

        images = images.map(function (image: GalleryImage) {
            let img: GalleryImage = {};
            if (_.isString(image)) {
                img.src = image;
            } else if (_.isObject(image)) {
                img.src = image.url || image.src;
            }
            img.w = image.w || image.width || 0;
            img.h = image.h || image.height || 0;
            return img;
        })

        const lgopt: any = {
            // history & focus options are disabled on CodePen
            history: false,
            focus: false,
            index: index
        };

        if (options.targetEvent) {
            lgopt.getThumbBoundsFn = function (index) {
                var thumbnail = options.targetEvent.target,
                    pageYScroll =
                        window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
            }
        }

        _.merge(lgopt, options.photoswipeOptions)

        // @ts-ignore
        const $lg = new PhotoSwipe(pswpElement[0], PhotoSwipeUI_Default, images, lgopt);

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
                }
                img.src = item.src; // let's download image
            }
        });

        return $lg;
    }
}

angular.module("ngLightgallery", [])

    .service("$lightGallery", LightGalleryService)

    .service("$photoswipe", PhotoSwipeService)

    //     .factory('$lightGallery', [
    //         '$q',
    //         ($q: IQService) => {
    //             const service = {};
    //
    //             service.open = function (options) {
    //                 let images = options.images || [];
    //                 const currentImage = options.currentImage || options.current;
    //                 const container = options.container || "body";
    //                 let index = options.index;
    //
    //                 if (!index && index !== 0 && currentImage) {
    //                     index = images.indexOf(currentImage);
    //                 } else {
    //                     index = 0;
    //                 }
    //
    //                 images = images.map(function (image) {
    //                     const img = {};
    //                     if (_.isString(image)) {
    //                         img.src = image;
    //                         img.thumb = image;
    //                     } else if (_.isObject(image)) {
    //                         img.src = image.url || image.src;
    //                         img.thumb = image.thumb || img.src;
    //                     }
    //                     return img;
    //                 })
    //
    //                 const $lg = angular.element(container);
    //
    //                 const lgopt = {};
    //                 _.merge(lgopt, options.lgoptions)
    //
    //                 lgopt.dynamic = true;
    //                 lgopt.index = index || 0;
    //                 lgopt.dynamicEl = images;
    //
    //                 if (images.length) {
    //                     $lg.lightGallery(lgopt)
    //
    //                     $lg.one("onCloseAfter.lg", function () {
    //                         $lg.data('lightGallery').destroy(true)
    //                     })
    //                 }
    //
    //                 return $lg;
    //             }
    //
    //             return service;
    //         }
    //     ])
    //
    //     .factory('$photoswipe', ['$q', function ($q) {
    //         const service = {};
    //
    //         service.open = function (options) {
    //             let images = options.images || [];
    //             let index = options.index;
    //             const currentImage = options.currentImage || options.current;
    //             const container = options.container || "body";
    //
    //             if (!angular.element(container).children(".pswp").length) {
    //
    //
    //                 angular.element(container).append(`
    //
    // <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    //
    //     <!-- Background of PhotoSwipe.
    //          It's a separate element as animating opacity is faster than rgba(). -->
    //     <div class="pswp__bg"></div>
    //
    //     <!-- Slides wrapper with overflow:hidden. -->
    //     <div class="pswp__scroll-wrap">
    //
    //         <!-- Container that holds slides.
    //             PhotoSwipe keeps only 3 of them in the DOM to save memory.
    //             Don't modify these 3 pswp__item elements, data is added later on. -->
    //         <div class="pswp__container">
    //             <div class="pswp__item"></div>
    //             <div class="pswp__item"></div>
    //             <div class="pswp__item"></div>
    //         </div>
    //
    //         <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
    //         <div class="pswp__ui pswp__ui--hidden">
    //
    //             <div class="pswp__top-bar">
    //
    //                 <!--  Controls are self-explanatory. Order can be changed. -->
    //
    //                 <div class="pswp__counter"></div>
    //
    //                 <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
    //
    //                 <button class="pswp__button pswp__button--share" title="Share"></button>
    //
    //                 <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
    //
    //                 <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
    //
    //                 <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
    //                 <!-- element will get class pswp__preloader--active when preloader is running -->
    //                 <div class="pswp__preloader">
    //                     <div class="pswp__preloader__icn">
    //                       <div class="pswp__preloader__cut">
    //                         <div class="pswp__preloader__donut"></div>
    //                       </div>
    //                     </div>
    //                 </div>
    //             </div>
    //
    //             <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
    //                 <div class="pswp__share-tooltip"></div>
    //             </div>
    //
    //             <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
    //             </button>
    //
    //             <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
    //             </button>
    //
    //             <div class="pswp__caption">
    //                 <div class="pswp__caption__center"></div>
    //             </div>
    //
    //         </div>
    //
    //     </div>
    //
    // </div>
    //
    // `)
    //
    //             }
    //
    //             const pswpElement = angular.element(container).children(".pswp");
    //
    //
    //             if (!index && index !== 0 && currentImage) {
    //                 index = images.indexOf(currentImage);
    //             } else {
    //                 index = 0;
    //             }
    //
    //             images = images.map(function (image) {
    //                 const img = {};
    //
    //                 if (_.isString(image)) {
    //                     img.src = image;
    //                 } else if (_.isObject(image)) {
    //                     img.src = image.url || image.src;
    //                 }
    //
    //                 img.w = image.w || image.width || 0;
    //                 img.h = image.h || image.height || 0;
    //                 return img;
    //             })
    //
    //             const lgopt = {
    //                 // history & focus options are disabled on CodePen
    //                 history: false,
    //                 focus: false,
    //                 index: index
    //             };
    //
    //             if (options.targetEvent) {
    //                 lgopt.getThumbBoundsFn = function (index) {
    //                     var thumbnail = options.targetEvent.target,
    //                         pageYScroll =
    //                             window.pageYOffset || document.documentElement.scrollTop,
    //                         rect = thumbnail.getBoundingClientRect();
    //                     return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
    //                 }
    //             }
    //
    //             _.merge(lgopt, options.photoswipeOptions)
    //
    //             const $lg = new PhotoSwipe(pswpElement[0], PhotoSwipeUI_Default, images, lgopt);
    //
    //             $lg.init();
    //
    //             $lg.listen('gettingData', function (index, item) {
    //                 if (item.w < 1 || item.h < 1) { // unknown size
    //                     var img = new Image();
    //                     img.onload = function () { // will get size after load
    //                         item.w = this.width; // set image width
    //                         item.h = this.height; // set image height
    //                         $lg.invalidateCurrItems(); // reinit Items
    //                         $lg.updateSize(true); // reinit Items
    //                     }
    //                     img.src = item.src; // let's download image
    //                 }
    //             });
    //
    //             return $lg;
    //         }
    //
    //         return service;
    //     }
    //     ])
    //
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