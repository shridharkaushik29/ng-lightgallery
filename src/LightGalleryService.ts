import LightGalleryOptions from "./LightGalleryOptions";
import * as _ from "lodash";
import GalleryImage from "./GalleryImage";
import * as angular from "angular";

export default class LightGalleryService {

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
