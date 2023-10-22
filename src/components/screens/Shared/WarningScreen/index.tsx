import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useCopy } from '@services';
import { useTheme, useToast, useModal } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { CallToActionTemplate } from '@components/templates';
import {
  BodyContainer,
  DescriptionContainer,
  SubDescriptionContainer,
  TitleText,
} from './styles';

export const WarningScreen = () => {
  const animationRef = useRef<LottieViewProps>(null);
  const { getCopyValue } = useCopy();
  const { showModal } = useModal();
  const { Animations } = useTheme();
  const [loadingValue, setLoadingValue] = useState(false);
  const [loadingValue2, setLoadingValue2] = useState(false);

  const handlePrimaryButton = useCallback(async (): Promise<void> => {
    showModal({
      type: 'alert',
      title: 'security:WarningScreen.actions.primaryButton.modal.title',
      description:
        'security:WarningScreen.actions.primaryButton.modal.description',
      legacyOptions: { typeError: 'error' },
    });
    setLoadingValue2(false);
    await setLoadingValue(!loadingValue);
  }, []);

  const handleSecondaryButton = useCallback(async (): Promise<void> => {
    await setLoadingValue(false);
    setLoadingValue2(!loadingValue2);
    useToast.info({
      message: getCopyValue(
        'security:WarningScreen.actions.secondaryButton.message',
      ),
      duration: 3000,
    });
  }, []);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <CallToActionTemplate
      title={getCopyValue('security:WarningScreen.title')}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer testID="WarningScreenID">
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
          <SubDescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="secondary"
              color="surfaceL1"
              textAlign="center"
              weight="bold"
            >
              {getCopyValue('security:WarningScreen.sub-description')}
            </TitleText>
          </SubDescriptionContainer>
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
