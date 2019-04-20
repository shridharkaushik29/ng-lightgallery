import module from "./module";

declare global {
    interface JQLite {
        lightGallery(options: any): this
    }
}

export default module.name;
