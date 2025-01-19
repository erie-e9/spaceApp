import { useCallback } from 'react';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker';
// import { openPicker, Config } from '@baronha/react-native-multiple-image-picker'
import { Logger } from '@services';

export type Type = 'library' | 'capture';
// export type MediaType = 'image' | 'video' | 'all';
export type MediaType = 'photo' | 'video' | 'mixed';

export interface PickerOptions {
  type: Type;
  mediaType?: MediaType;
  quality?: number;
  selectionLimit?: number;
  includeExtra?: boolean;
  options?: CameraOptions | ImageLibraryOptions;
  callback?: (response: ImagePickerResponse) => void;
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
      try {
        // const config: Config = {
        //   maxSelect: selectionLimit,
        //   maxVideo: selectionLimit,
        //   primaryColor: '#fb0071',
        //   numberOfColumn: 4,
        //   mediaType: mediaType || 'all',
        //   selectBoxStyle: 'number',
        //   selectMode: (selectionLimit || 10) > 1 ? 'multiple' : 'single',
        //   language: 'system', // 🇻🇳 Vietnamese
        //   theme: 'system',
        //   isHiddenOriginalButton: !false,
        //   allowSwipeToSelect: true,
        // }

        let listImages: Asset[] | undefined = [];
        if (type === 'library') {
          const { assets } = await launchImageLibrary(
            options
              ? options
              : ({
                mediaType,
                selectionLimit: selectionLimit || 1,
                quality: quality || 0.8,
                includeBase64: true,
                includeExtra,
              } as ImageLibraryOptions),
            callback,
          );
          // const images = await openPicker(config);
          listImages = assets
        } else {
          // camera
          const photos = await launchCamera(
            options
              ? options
              : ({
                mediaType,
                selectionLimit: selectionLimit || 1,
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
      } catch (error) {
        Logger.log('[usePhotoLibraryCamera] pickImage:', { error })
      }
    },
    [],
  );

  return {
    pickImage,
  };
};
