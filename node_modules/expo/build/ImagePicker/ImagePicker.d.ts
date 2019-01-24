declare const MEDIA_TYPE_OPTIONS: {
    All: string;
    Videos: string;
    Images: string;
};
declare type ImageInfo = {
    uri: string;
    width: number;
    height: number;
};
declare type ImageResult = {
    cancelled: true;
} | ({
    cancelled: false;
} & ImageInfo);
declare type ImageLibraryOptions = {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
    mediaTypes?: keyof (typeof MEDIA_TYPE_OPTIONS);
};
export declare function launchImageLibraryAsync(options?: ImageLibraryOptions): Promise<ImageResult>;
declare type CameraOptions = {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
};
export declare function launchCameraAsync(options?: CameraOptions): Promise<ImageResult>;
export declare const MediaTypeOptions: {
    All: string;
    Videos: string;
    Images: string;
};
export {};
