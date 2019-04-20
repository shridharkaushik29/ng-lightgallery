import GalleryImage from "./GalleryImage";

export default interface GalleryOptions {
    images?: string[] | GalleryImage[],
    currentImage?: string | GalleryImage,
    current?: string | GalleryImage,
    container: string | JQuery,
    index: number,
    lgoptions?: any
}
