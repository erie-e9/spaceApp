import React, { memo, useCallback, useState } from 'react';
import { LinearTransition, FadeIn, FadeOut } from 'react-native-reanimated';
import { ImagePickerResponse } from 'react-native-image-picker';
import { type User } from '@slices/types';
import { usePhotoLibraryCamera, Type, MediaType, usePermission, useModal } from '@hooks';
import { SVGIcon } from '@components/atoms';
import {
  AttachmentContainer,
  AttatchContainer,
  ImagePreview,
  ImageThumbnail,
  AddButton,
  StyledButton,
  DeleteIcon,
  AddPanelContainer,
  AttachmentTitleContainer,
  Title,
} from './styles';

interface ImagePickerProps {
  origin?: Type;
  mediaType?: MediaType;
  selectionLimit?: number;
  panel?: boolean;
  children?: React.ReactNode;
  onSelect: (response?: User['photo'] | Array<User['photo']>) => void;
}

export const MultimediaPicker: React.FC<ImagePickerProps> = ({
  panel = true,
  origin,
  mediaType = 'photo',
  selectionLimit = 1,
  children,
  onSelect,
}) => {
  const [images, setImages] = useState<Array<User['photo']>>([]);
  const toggleAddRemove = images?.length >= selectionLimit;

  const { showModal, hideModal } = useModal();
  const { pickImage } = usePhotoLibraryCamera();
  const { requestPhotoLibraryPermission } = usePermission();

  const handleImageResponse = useCallback((response: ImagePickerResponse) => {
    if (response.didCancel || !response.assets) return;
    if (selectionLimit > 1 && images.length < selectionLimit) {
      setImages((prev) => [...prev, ...response.assets!]);
      onSelect(response.assets);
    } else if (selectionLimit === 1) {
      setImages(response.assets);
      onSelect(response.assets[0]);
    }
  }, []);

  const imageOrigin = useCallback(
    async (originParam: Type) => {
      await hideModal();
      await pickImage({
        type: originParam,
        callback: handleImageResponse,
        options: {
          mediaType,
          selectionLimit: selectionLimit > 1 ? selectionLimit - images?.length : selectionLimit,
          quality: 0.8,
          includeBase64: false,
          includeExtra: true,
        },
      });
    },
    [mediaType, selectionLimit, images],
  );

  const showLibraryOrCamAlert = useCallback(() => {
    showModal({
      type: 'alert',
      title: 'common:alerts.permissions.libraryOrCam.title',
      description: 'common:alerts.permissions.libraryOrCam.description',
      showCancelIcon: true,
      options: [
        {
          text: 'common:alerts.permissions.libraryOrCam.buttons.buttonOne',
          handler: () => imageOrigin('capture'),
          isSimpleButton: true,
        },
        {
          text: 'common:alerts.permissions.libraryOrCam.buttons.buttonTwo',
          handler: async () => imageOrigin('library'),
          isSimpleButton: true,
        },
      ],
    });
  }, []);

  const imagePickerHandler = useCallback(async () => {
    const permissionStatus = await requestPhotoLibraryPermission();
    if (permissionStatus === 'granted' || permissionStatus === 'limited') {
      if (origin) {
        await imageOrigin(origin);
      } else {
        await showLibraryOrCamAlert();
      }
    } else {
      await requestPhotoLibraryPermission();
    }
  }, [origin, imageOrigin, showLibraryOrCamAlert, requestPhotoLibraryPermission]);

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setImages([]);
  };

  return (
    <>
      {panel ? (
        <AttachmentContainer>
          <AttachmentTitleContainer>
            <Title type="Body2" weight={900} color="tertiary600">
              {images?.length > 0 ? 'common:forms:fields.controllers.multimedia.addImages': ''}
            </Title>
            <Title type="Body4" weight={900} color="tertiary600">
              {`(${images?.length}/${selectionLimit})`}
            </Title>
          </AttachmentTitleContainer>
          <AttatchContainer alignItems={images.length > 0 ? 'flex-start' : 'center'}>
            {images.length >= 1 && (
              <AddButton onPress={toggleAddRemove ? handleClearAll : imagePickerHandler}>
                {toggleAddRemove ? <SVGIcon icon="remove" iconColor="tertiary600"/> : <SVGIcon icon="add"iconColor="tertiary600" />}
              </AddButton>
            )}
            {images.map((image, index) => (
              <ImagePreview
                key={index}
                entering={FadeIn}
                exiting={FadeOut}
                layout={LinearTransition.springify()}
              >
                <ImageThumbnail resizeMode="cover" source={{ uri: image?.uri }} />
                <DeleteIcon onPress={() => handleRemoveImage(index)}>
                  <SVGIcon icon="close" iconColor="#FFFFFF" />
                </DeleteIcon>
              </ImagePreview>
            ))}
            {images.length === 0 && (
              <AddButton fullSize onPress={imagePickerHandler}>
                <AddPanelContainer>
                  <SVGIcon icon="add" iconColor="tertiary600" />
                  <Title type="Body2" weight={900} color="tertiary600">
                    {selectionLimit > 1 ? 'common:forms:fields.controllers.multimedia.addImages' : 'common:forms:fields.controllers.multimedia.addImage'}
                  </Title>
                </AddPanelContainer>
              </AddButton>
            )}
          </AttatchContainer>
        </AttachmentContainer>
      ) : (
        <StyledButton onPress={imagePickerHandler}>{children}</StyledButton>
      )}
    </>
  );
};

export default memo(MultimediaPicker);
