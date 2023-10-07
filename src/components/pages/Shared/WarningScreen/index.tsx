import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCopy } from '@services/copyLibrary';
import { useTheme, useToast, useModal } from '@hooks';
import { changeTheme } from '@slices/shared/appPreferences';
import { CallToActionTemplate } from '@components/templates';
import { Lottie, LottieViewProps } from '@components/atoms';
import {
  BodyContainer,
  TitleText,
  DescriptionContainer,
  SubdescriptionContainer,
} from './styles';

export const WarningScreen = () => {
  const animationRef = useRef<LottieViewProps>(null);
  const { getCopyValue } = useCopy();
  const { showModal } = useModal();
  const { Animations } = useTheme();
  const isMounted = useRef(true);
  const { darkMode: isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const [loadingValue, setLoadingValue] = useState(false);
  const [loadingValue2, setLoadingValue2] = useState(false);

  const handlePrimaryButton = async (): Promise<void> => {
    showModal({
      type: 'alert',
      title: 'security:WarningScreen.actions.primaryButton.modal.title',
      description:
        'security:WarningScreen.actions.primaryButton.modal.description',
      legacyOptions: { typeError: 'error' },
    });
    setLoadingValue2(false);
    await setLoadingValue(!loadingValue);
    dispatch(changeTheme({ theme: 'default', darkMode: !isDarkMode }));
  };

  const handleSecondaryButton = async (): Promise<void> => {
    await setLoadingValue(false);
    setLoadingValue2(!loadingValue2);
    useToast.info({
      message: getCopyValue(
        'security:WarningScreen.actions.secondaryButton.message',
      ),
      duration: 3500,
    });
  };

  useEffect(() => {
    isMounted.current = true;
    let timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
      isMounted.current = false;
    };
  }, []);

  return (
    <CallToActionTemplate
      title={getCopyValue('security:WarningScreen.title')}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <Lottie
            ref={animationRef}
            source={Animations.warning}
            autoPlay={false}
            renderMode="SOFTWARE"
            loop={false}
            resizeMode="contain"
            width={120}
            height={120}
          />
          <DescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="secondary"
              color="surfaceL1"
              textAlign="justify"
            >
              {getCopyValue('security:WarningScreen.description', {
                appName: process.env.APP_NAME,
              })}
            </TitleText>
          </DescriptionContainer>
          <SubdescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="secondary"
              color="surfaceL1"
              textAlign="center"
              weight="bold"
            >
              {getCopyValue('security:WarningScreen.sub-description')}
            </TitleText>
          </SubdescriptionContainer>
        </BodyContainer>
      }
      primaryButton={{
        title: getCopyValue(
          'security:WarningScreen.actions.primaryButton.title',
        ),
        onPress: handlePrimaryButton,
        testID: 'WarningScreen.primaryButton',
        disabled: loadingValue,
        loading: loadingValue,
      }}
      secondaryButton={{
        title: getCopyValue(
          'security:WarningScreen.actions.secondaryButton.title',
        ),
        onPress: handleSecondaryButton,
        testID: 'WarningScreen.secondaryButton',
        disabled: loadingValue2,
        loading: loadingValue2,
      }}
    />
  );
};

export default memo(WarningScreen);
