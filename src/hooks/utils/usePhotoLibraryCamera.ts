import { useCallback } from 'react';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  Asset,
} from 'react-native-image-picker';

export type Type = 'library' | 'capture';
export type MediaType = 'photo' | 'video' | 'mixed';

export interface PickerOptions {
  type: Type;
  mediaType: MediaType;
  quality?: number;
  selectionLimit?: number;
  includeExtra: boolean;
  options?: CameraOptions | ImageLibraryOptions;
  callback?: () => void;
}

export const usePhotoLibraryCamera = (): {
  pickImage: ({
    type,
    mediaType,
    quality,
    selectionLimit,
    includeExtra,
    options,
    callback,
  }: PickerOptions) => Promise<Asset[] | undefined>;
} => {
  const pickImage = useCallback(
    async ({
      type,
      mediaType,
      quality,
      selectionLimit,
      includeExtra,
      options,
      callback,
    }: PickerOptions): Promise<Asset[] | undefined> => {
      let listImages: Asset[] | undefined = [];
      if (type === 'library') {
        const images = await launchImageLibrary(
          options
            ? options
            : ({
                selectionLimit: selectionLimit || 1,
                mediaType,
                quality: quality || 0.8,
                includeBase64: true,
                includeExtra,
              } as ImageLibraryOptions),
          callback,
        );
        listImages = images.assets;
      } else {
        // camera
        const photos = await launchCamera(
          options
            ? options
            : ({
                selectionLimit: selectionLimit || 1,
                mediaType,
                quality: quality || 0.8,
                includeBase64: true,
                includeExtra,
                saveToPhotos: true,
              } as CameraOptions),
          callback,
        );
        listImages = photos.assets;
      }

      return listImages;
    },
    [],
  );

  return {
    pickImage,
  };
};