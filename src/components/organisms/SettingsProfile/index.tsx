import React, { Fragment, memo, useCallback, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { type ApplicationScreenProps } from '@types';
import { useAuthenticationHook, useTheme } from '@hooks';
import { isEmpty } from '@utils/functions';
import { TransformAnimation } from '@components/animated';
import { SVGIcon } from '@components/atoms';
import { AvatarProfile } from '@components/molecules';
import {
  ProfileButton,
  ProfileDetailText,
  ProfileDetailContainer,
  StyledText,
  AuthButton,
  AuthButtonContainer,
  CardContainer,
  StyledTextContainer,
  ProfileContainer,
  ProfileDetailHorizontalContainer,
} from './styles';

const SettingsProfile = () => {
  const navigation: ApplicationScreenProps = useNavigation();
  const { darkMode } = useTheme();
  const { user } = useAuthenticationHook();
  const { token } = useAuthenticationHook();
  const isAuthenticated = !isEmpty(token);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const { username, firstName, lastName } = user;
  const navigationHandler = useCallback((): void => {
    if (isAuthenticated) {
      navigation.navigate('Private', {
        screen: 'Profile',
      } as never);
    } else {
      navigation.navigate('Auth', {
        screen: 'Authentication',
      } as never);
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      <TransformAnimation
        duration={900}
        initialYValue={0}
        finalYValue={8}
        repeat={0}
        reverse
        easing="linear"
      >
        <CardContainer>
          {isAuthenticated ? (
            <ProfileContainer>
              <AvatarProfile showImagePickerButton={false} size={70} />
              <ProfileDetailContainer>
                <StyledText type="Body1" weight="bold">
                  {'common:banners.auth.greeting'}{' '}
                  <StyledText type="Body1" weight="bold">
                    {firstName} {lastName}
                  </StyledText>
                </StyledText>
                <ProfileDetailHorizontalContainer>
                  <ProfileButton onPress={navigationHandler}>
                    <SVGIcon icon="edit" />
                  </ProfileButton>
                  {username && (
                    <ProfileDetailText type="Body3" color="typography300">
                      @{username}
                    </ProfileDetailText>
                  )}
                </ProfileDetailHorizontalContainer>
              </ProfileDetailContainer>
            </ProfileContainer>
          ) : (
            <>
              <StyledTextContainer>
                <StyledText type="Body4" weight={300}>
                  {'common:banners.auth.invitation'}
                </StyledText>
              </StyledTextContainer>
              <AuthButtonContainer>
                <AuthButton
                  title={'common:banners.auth.buttons.auth'}
                  onPress={navigationHandler}
                  textColor={darkMode ? 'tertiary50' : 'secondary950'}
                />
              </AuthButtonContainer>
            </>
          )}
        </CardContainer>
      </TransformAnimation>
    </Fragment>
  );
};

export default memo(SettingsProfile);
