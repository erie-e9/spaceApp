import React, { useState, useCallback, memo, useMemo, ReactNode, forwardRef } from 'react';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { testProperties } from '@utils/functions';
import { type UserState } from '@slices/types';
import { usePhotoLibraryCamera, Type, MediaType, usePermission, useModal } from '@hooks';
import useAutoFocus from '@components/molecules/TextInput/hooks/useAutoFocus';
import { RenderWhen } from '@components/atoms';
import { FieldInputMask } from '@components/molecules';
import { StyledButton, StyledElementContainer, StyledText } from './styles';

interface Props {
  testID?: string;
  label?: string;
  value?: UserState['photo'];
  required?: boolean;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  editable?: boolean;
  onSelect: (image?: UserState['photo']) => void;
  maintainFocus?: boolean;
  origin?: Type;
  mediaType?: MediaType;
  selectionLimit?: number;
  children?: JSX.Element | ReactNode;
}

const ButtonImagePicker: React.FC<Props> = forwardRef(
  (
    {
      testID,
      label,
      value,
      required,
      placeholder = 'Pick an image/video',
      error,
      touched,
      editable = true,
      onSelect,
      maintainFocus,
      origin = undefined,
      mediaType = 'photo',
      selectionLimit = 1,
      children,
    },
    ref,
  ) => {
    const [selectedItems, setSelectedItems] = useState<
      UserState['photo'] | Array<UserState['photo']>
    >([]);
    const { showModal } = useModal();
    const { pickImage } = usePhotoLibraryCamera();
    const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
    const { requestPhotoLibraryPermission } = usePermission();
    const { focused } = useAutoFocus(
      () => null,
      () => null,
    );

    const selectedImageName = useMemo(() => {
      // return !isEmptyArray(selectedItems) ? selectedItems?.fileName : '';
      return selectedItems?.fileName;
    }, [selectedItems]);

    const imageOrigin = useCallback(
      async (originParam: Type) => {
        const images = await pickImage({
          type: originParam,
          mediaType,
          selectionLimit,
          includeExtra: true,
        });

        if (images && images.length > 0) {
          const selectedImage: UserState['photo'] = {
            fileName: images[0].fileName || '',
            base64: images[0].base64 || '',
            fileSize: images[0].fileSize || 0,
            type: images[0].type || '',
            uri: images[0].uri || '',
          };
          onSelect(selectedImage);
          setSelectedItems(selectedImage as any);
        }
      },
      [mediaType, selectionLimit, onSelect, setSelectedItems],
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
            handler: () => imageOrigin('library'),
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

    return (
      <RenderWhen isTrue={remoteConfigFeatures?.editPhoto?.status === 'on'}>
        {!children ? (
          <FieldInputMask
            {...testProperties(testID || 'ButtonImagePickerID')}
            value={value?.fileName || ''}
            required={required}
            label={label || ''}
            maintainFocus={maintainFocus || !!value?.fileName}
            error={error}
            touched={touched}
            editable={editable}
            focused={focused || !!value?.fileName}
          >
            <StyledButton
              ref={ref}
              hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
              onPress={imagePickerHandler}
            >
              <StyledElementContainer error={!!error} hasValue={!!value?.fileName}>
                <StyledText
                  type="Caption"
                  error={!value?.fileName && !!error}
                  hasValue={!!value?.fileName}
                >
                  {selectedImageName || value?.fileName || placeholder}
                  {required && !selectedImageName ? '*' : ''}
                </StyledText>
              </StyledElementContainer>
            </StyledButton>
          </FieldInputMask>
        ) : (
          <StyledButton
            ref={ref}
            hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
            onPress={imagePickerHandler}
          >
            {children}
          </StyledButton>
        )}
      </RenderWhen>
    );
  },
);

export default memo(ButtonImagePicker);
