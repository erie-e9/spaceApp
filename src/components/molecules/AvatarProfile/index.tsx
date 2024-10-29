import React, { memo, useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { useAuthenticationHook, useSVG, useTheme } from '@hooks';
import { testProperties } from '@utils/functions';
import { Lottie } from '@components/atoms';
import { ButtonImagePicker } from '@components/organisms';
import { UserImage, ImagePickerButtonContainer, Container } from './styles';

interface AvatarProfile {
  testID?: string;
  showImagePickerButton?: boolean;
  size?: number;
  trigger?: boolean;
}

export const AvatarProfile: React.FC<AvatarProfile> = ({
  testID,
  showImagePickerButton = true,
  size = 80,
  trigger = true,
}) => {
  const animationRef = useRef<LottieView>(null);
  const { Animations } = useTheme();
  const { user, updateUser } = useAuthenticationHook();
  const { photo } = user;
  const CameraIcon = useSVG('camera');

  useEffect(() => {
    if (trigger) {
      const timeOut = setTimeout(() => {
        animationRef.current?.play();
      }, 400);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, []);

  const profileImageHandler = (image: any) => {
    updateUser({
      photo: {
        fileName: image.fileName,
        base64: image.base64,
        fileSize: image.fileSize,
        type: image.type,
        uri: image.uri,
      },
    });
  };

  return (
    <Container {...testProperties(testID)} size={size}>
      {photo?.uri ? (
        <UserImage source={photo?.uri || ''} size={size} />
      ) : (
        <Lottie
          ref={animationRef}
          source={Animations.profile}
          autoPlay={false}
          renderMode="AUTOMATIC"
          loop={false}
          resizeMode="contain"
          width={size * 1.4}
          height={size * 1.4}
          startFrame={0}
          endFrame={104}
        />
      )}

      {showImagePickerButton && (
        <ButtonImagePicker
          editable
          mediaType="photo"
          selectionLimit={1}
          onSelect={profileImageHandler}
        >
          <ImagePickerButtonContainer>
            <CameraIcon />
          </ImagePickerButtonContainer>
        </ButtonImagePicker>
      )}
    </Container>
  );
};

export default memo(AvatarProfile);
